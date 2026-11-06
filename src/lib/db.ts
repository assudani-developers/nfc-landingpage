import { Shop, ShopClickStats } from '@/types';
import { db, isFirebaseConfigured } from './firebase';
import { INITIAL_SHOPS } from './initialData';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  increment,
} from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'tap_tap_nfc_shops_v3';

let memoryShops: Shop[] = [...INITIAL_SHOPS];

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
  // If Firestore is configured, fetch live from Firestore
  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, 'shops');
      const snap = await withTimeout(getDocs(colRef), 3000);
      const fetched: Shop[] = [];
      snap.forEach((docItem) => {
        fetched.push(docItem.data() as Shop);
      });
      saveLocalShops(fetched);
      return fetched;
    } catch (err) {
      console.warn("Firestore getShops using local storage cache:", (err as Error)?.message);
    }
  }

  return getLocalShops();
}

export async function getShopBySlug(slug: string): Promise<Shop | null> {
  const normalizedSlug = slug.toLowerCase().trim();

  // Try Firestore first if configured
  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, 'shops');
      const snap = await withTimeout(getDocs(colRef), 3000);
      let match: Shop | null = null;
      snap.forEach((docItem) => {
        const data = docItem.data() as Shop;
        if (data.slug.toLowerCase().trim() === normalizedSlug) {
          match = data;
        }
      });
      if (match) {
        return match;
      }
    } catch (err) {
      console.warn("Firestore getShopBySlug using fallback cache:", (err as Error)?.message);
    }
  }

  const shops = getLocalShops();
  const found = shops.find((s) => s.slug.toLowerCase().trim() === normalizedSlug);
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

/**
 * Comprehensive Click & Referral Tracking per Shop
 * Tracks:
 * - 'visit': NFC tag tapped / shop page opened
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
