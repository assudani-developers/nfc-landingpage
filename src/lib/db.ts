import { Shop } from '@/types';
import { db, isFirebaseConfigured } from './firebase';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  increment,
  query,
  where,
  limit,
} from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'tap_tap_nfc_shops_v4';

let memoryShops: Shop[] = [];

// High-speed in-memory TTL caching for zero-latency lookups under heavy NFC tap load
interface CacheItem<T> {
  data: T;
  timestamp: number;
}
const slugCache = new Map<string, CacheItem<Shop | null>>();
let allShopsCache: CacheItem<Shop[]> | null = null;
const CACHE_TTL_MS = 45 * 1000; // 45 seconds TTL

function withTimeout<T>(promise: Promise<T>, ms = 3000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
    ),
  ]);
}

export function getLocalShops(): Shop[] {
  if (typeof window === 'undefined') {
    return memoryShops;
  }
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (e) {
    console.warn("Could not read local shops:", e);
    return memoryShops;
  }
}

export function saveLocalShops(shops: Shop[]): void {
  memoryShops = [...shops];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(shops));
      window.dispatchEvent(new Event('shops_updated'));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  }
}

export async function getShops(): Promise<Shop[]> {
  const now = Date.now();
  if (allShopsCache && now - allShopsCache.timestamp < CACHE_TTL_MS) {
    return allShopsCache.data;
  }

  // If Firestore is configured, fetch live from Firestore
  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, 'shops');
      const snap = await withTimeout(getDocs(colRef), 3000);
      const fetched: Shop[] = [];
      snap.forEach((docItem) => {
        fetched.push(docItem.data() as Shop);
      });

      if (fetched.length > 0) {
        saveLocalShops(fetched);
        allShopsCache = { data: fetched, timestamp: now };
        return fetched;
      } else {
        // If Firestore has 0 shops, check if client has local shops to sync to cloud!
        const local = getLocalShops();
        if (local.length > 0) {
          for (const s of local) {
            try {
              await setDoc(doc(db, 'shops', s.id), s, { merge: true });
            } catch {
              // ignore
            }
          }
          allShopsCache = { data: local, timestamp: now };
          return local;
        }
        allShopsCache = { data: [], timestamp: now };
        return [];
      }
    } catch (err) {
      console.warn("Firestore getShops using local storage cache:", (err as Error)?.message);
    }
  }

  const local = getLocalShops();
  allShopsCache = { data: local, timestamp: now };
  return local;
}

export async function getShopBySlug(slug: string): Promise<Shop | null> {
  const normalizedSlug = slug.toLowerCase().trim();
  const now = Date.now();

  // Check in-memory fast cache first
  const cached = slugCache.get(normalizedSlug);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  // Try Firestore targeted indexed query with limit(1)
  if (isFirebaseConfigured && db) {
    try {
      const q = query(
        collection(db, 'shops'),
        where('slug', '==', normalizedSlug),
        limit(1)
      );
      const snap = await withTimeout(getDocs(q), 3000);
      if (!snap.empty) {
        const found = snap.docs[0].data() as Shop;
        slugCache.set(normalizedSlug, { data: found, timestamp: now });
        return found;
      }
    } catch (err) {
      console.warn("Firestore getShopBySlug query error, checking fallback:", (err as Error)?.message);
    }
  }

  // Fallback to local storage
  const shops = getLocalShops();
  const found = shops.find((s) => s.slug.toLowerCase().trim() === normalizedSlug);
  slugCache.set(normalizedSlug, { data: found || null, timestamp: now });
  return found || null;
}

export async function saveShop(shop: Shop): Promise<Shop> {
  const now = Date.now();
  const shopToSave: Shop = {
    ...shop,
    id: shop.id || `shop-${now}-${Math.random().toString(36).substring(2, 7)}`,
    slug: shop.slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/^-+|-+$/g, '') || `shop-${now}`,
    updatedAt: now,
    createdAt: shop.createdAt || now,
    viewsCount: shop.viewsCount || 0,
    tapsCount: shop.tapsCount || 0,
    referralClicks: shop.referralClicks || 0,
    clickStats: shop.clickStats || {
      google_review: 0,
      whatsapp: 0,
      instagram: 0,
      facebook: 0,
      website: 0,
      main_button: 0,
      referral: 0,
    },
    showReferral: shop.showReferral !== false,
  };

  // Invalidate and refresh cache
  allShopsCache = null;
  slugCache.set(shopToSave.slug, { data: shopToSave, timestamp: now });

  // 1. Sync to local storage immediately
  const current = getLocalShops();
  const existingIdx = current.findIndex((s) => s.id === shopToSave.id || s.slug === shopToSave.slug);
  let updated: Shop[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = shopToSave;
  } else {
    updated = [shopToSave, ...current];
  }
  saveLocalShops(updated);

  // 2. Sync to Firebase Firestore if connected
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'shops', shopToSave.id);
      await setDoc(docRef, shopToSave, { merge: true });
    } catch (err) {
      console.warn("Firestore saveShop failed, saved locally:", err);
    }
  }

  return shopToSave;
}

export async function deleteShop(id: string): Promise<boolean> {
  allShopsCache = null;
  slugCache.clear();

  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'shops', id));
    } catch (err) {
      console.warn("Firestore deleteShop failed:", err);
    }
  }

  const current = getLocalShops();
  const filtered = current.filter((s) => s.id !== id);
  saveLocalShops(filtered);
  return true;
}

/**
 * Wipe all shops completely to give the admin a 100% clean, blank dashboard.
 */
export async function clearAllShops(): Promise<void> {
  allShopsCache = null;
  slugCache.clear();

  const current = getLocalShops();
  if (isFirebaseConfigured && db) {
    try {
      for (const s of current) {
        await deleteDoc(doc(db, 'shops', s.id));
      }
    } catch (err) {
      console.warn("Firestore clearAllShops failed:", err);
    }
  }
  saveLocalShops([]);
}

// Rate-limiting cache for clicks & visits to prevent spam/abuse
const lastTrackTimestamps = new Map<string, number>();

/**
 * Comprehensive Click & Referral Tracking per Shop
 * With built-in rate-limiting and session deduplication:
 * - 'visit': NFC tag tapped / shop page opened (1 per session)
 * - 'referral': "Our Other Services & Solutions" or developer referral clicked
 * - 'google_review': Google 5-star review card tapped
 * - 'whatsapp': WhatsApp / Appointment booking button tapped
 * - 'instagram': Instagram profile card tapped
 * - 'facebook': Facebook profile card tapped
 * - 'website': Shop catalog/menu website tapped
 * - 'main_button': "Visit Our Shop" (Google Maps) tapped
 */
export async function trackShopAction(slug: string, actionType: string): Promise<void> {
  const normalized = slug.toLowerCase().trim();
  const rateLimitKey = `${normalized}_${actionType}`;
  const now = Date.now();
  const lastTime = lastTrackTimestamps.get(rateLimitKey) || 0;

  // Rate limit: prevent spamming same button within 1.2 seconds
  if (now - lastTime < 1200) {
    return;
  }
  lastTrackTimestamps.set(rateLimitKey, now);

  // For visit taps: deduplicate within the same browser session
  if (actionType === 'visit' && typeof window !== 'undefined') {
    try {
      const sessionKey = `visited_shop_${normalized}`;
      if (sessionStorage.getItem(sessionKey)) {
        return;
      }
      sessionStorage.setItem(sessionKey, '1');
    } catch {
      // ignore
    }
  }

  const shops = getLocalShops();
  const shop = shops.find((s) => s.slug.toLowerCase().trim() === normalized);

  if (shop) {
    if (!shop.clickStats) {
      shop.clickStats = {};
    }

    if (actionType === 'visit') {
      shop.tapsCount = (shop.tapsCount || 0) + 1;
    } else {
      shop.clickStats[actionType] = (shop.clickStats[actionType] || 0) + 1;
    }

    if (actionType === 'referral') {
      shop.referralClicks = (shop.referralClicks || 0) + 1;
    }

    saveLocalShops(shops);

    if (isFirebaseConfigured && db && shop.id) {
      try {
        const docRef = doc(db, 'shops', shop.id);
        const updates: Record<string, unknown> = {};

        if (actionType === 'visit') {
          updates.tapsCount = increment(1);
        } else {
          updates[`clickStats.${actionType}`] = increment(1);
        }

        if (actionType === 'referral') {
          updates.referralClicks = increment(1);
        }

        await updateDoc(docRef, updates);
      } catch {
        // silent
      }
    }
  }
}

// Backwards compatibility alias
export async function trackShopTap(slug: string): Promise<void> {
  return trackShopAction(slug, 'visit');
}

/**
 * Reset click and visit stats back to 0 for a shop (useful for testing)
 */
export async function resetShopAnalytics(id: string): Promise<void> {
  const shops = getLocalShops();
  const shop = shops.find((s) => s.id === id);
  if (shop) {
    shop.tapsCount = 0;
    shop.viewsCount = 0;
    shop.referralClicks = 0;
    shop.clickStats = {
      google_review: 0,
      whatsapp: 0,
      instagram: 0,
      facebook: 0,
      website: 0,
      main_button: 0,
      referral: 0,
    };
    saveLocalShops(shops);

    if (isFirebaseConfigured && db && shop.id) {
      try {
        const docRef = doc(db, 'shops', shop.id);
        await updateDoc(docRef, {
          tapsCount: 0,
          viewsCount: 0,
          referralClicks: 0,
          clickStats: shop.clickStats,
        });
      } catch (err) {
        console.warn("Firestore reset analytics failed:", err);
      }
    }
  }
}
