'use client';

import React, { useState, useEffect } from 'react';
import { Shop } from '@/types';
import { getLocalShops, getShopBySlug, saveShop } from '@/lib/db';
import ShopPageClient from '@/components/shop/ShopPageClient';
import { useIsClient } from '@/lib/useIsClient';
import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';

interface DynamicShopClientViewProps {
  slug: string;
  serverShop: Shop | null;
}

export default function DynamicShopClientView({
  slug,
  serverShop,
}: DynamicShopClientViewProps) {
  const isClient = useIsClient();
  const [clientShop, setClientShop] = useState<Shop | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!serverShop);

  const shop = serverShop || clientShop;

  useEffect(() => {
    if (serverShop) return;

    let isMounted = true;

    // Asynchronously resolve local cache and remote Firestore to avoid synchronous effect renders
    Promise.resolve().then(() => {
      if (!isMounted) return;

      const local = getLocalShops();
      const foundLocal = local.find(
        (s) => s.slug.toLowerCase().trim() === slug.toLowerCase().trim()
      );

      if (foundLocal) {
        setClientShop(foundLocal);
        setIsLoading(false);
        saveShop(foundLocal).catch(() => {});
        return;
      }

      // Query Firestore directly from client
      getShopBySlug(slug)
        .then((remoteShop) => {
          if (isMounted) {
            if (remoteShop) {
              setClientShop(remoteShop);
            }
            setIsLoading(false);
          }
        })
        .catch(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        });
    });

    return () => {
      isMounted = false;
    };
  }, [slug, serverShop]);

  if (shop) {
    return <ShopPageClient initialShop={shop} />;
  }

  if (!isClient || isLoading) {
    return (
      <div
        className="min-h-dvh min-h-[100dvh] w-full bg-[#FAF7F2] flex flex-col items-center justify-center p-4"
        suppressHydrationWarning
      >
        <div className="w-10 h-10 rounded-full border-3 border-[#5C3A21] border-t-transparent animate-spin mb-3" />
        <p className="text-xs font-semibold text-stone-600">Loading shop profile...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-dvh min-h-[100dvh] w-full bg-[#FAF7F2] text-stone-900 flex flex-col items-center justify-center p-6 text-center"
      suppressHydrationWarning
    >
      <div className="w-16 h-16 rounded-2xl bg-[#F3ECE4] border border-[#E5DACD] flex items-center justify-center mb-4 shadow-sm">
        <AlertCircle className="w-8 h-8 text-[#8C6239]" />
      </div>
      <h1 className="text-2xl font-bold text-stone-900 mb-2">Shop NFC Card Not Found</h1>
      <p className="text-sm text-stone-600 max-w-sm mb-6 leading-relaxed">
        No active business is configured at the URL &ldquo;/{slug}&rdquo;. The link may have changed or has not been added in the admin panel yet.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-[#5C3A21] hover:bg-[#472c19] text-white text-xs font-bold flex items-center justify-center gap-2 transition shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
