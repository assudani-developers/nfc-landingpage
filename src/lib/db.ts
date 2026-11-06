import { Shop } from '@/types';
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

const LOCAL_STORAGE_KEY = 'tap_tap_nfc_shops_v2';

let memoryShops: Shop[] = [...INITIAL_SHOPS];

export function getLocalShops(): Shop[] {
  if (typeof window === 'undefined') {
    return memoryShops;
  }
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_SHOPS));
      return INITIAL_SHOPS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_SHOPS));
    return INITIAL_SHOPS;
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
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        const fetched: Shop[] = [];
        snap.forEach((docItem) => {
          fetched.push(docItem.data() as Shop);
        });
        saveLocalShops(fetched);
        return fetched;
      } else {
        // Seed initial shops to Firestore
        for (const s of INITIAL_SHOPS) {
          await setDoc(doc(db, 'shops', s.id), s);
        }
        return INITIAL_SHOPS;
      }
    } catch (err) {
      console.warn("Firestore getShops failed, using local storage:", err);
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
      const snap = await getDocs(colRef);
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
      console.warn("Firestore getShopBySlug fallback:", err);
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

export async function trackShopTap(slug: string): Promise<void> {
  const normalized = slug.toLowerCase().trim();
  const shops = getLocalShops();
  const shop = shops.find((s) => s.slug.toLowerCase().trim() === normalized);

  if (shop) {
    shop.tapsCount = (shop.tapsCount || 0) + 1;
    saveLocalShops(shops);

    if (isFirebaseConfigured && db && shop.id) {
      try {
        const docRef = doc(db, 'shops', shop.id);
        await updateDoc(docRef, {
          tapsCount: increment(1),
        });
      } catch (err) {
        // silent
      }
    }
  }
}

export async function resetToDemoShops(): Promise<Shop[]> {
  saveLocalShops(INITIAL_SHOPS);
  if (isFirebaseConfigured && db) {
    try {
      for (const s of INITIAL_SHOPS) {
        await setDoc(doc(db, 'shops', s.id), s);
      }
    } catch (err) {
      console.warn("Firestore reset error:", err);
    }
  }
  return INITIAL_SHOPS;
}
