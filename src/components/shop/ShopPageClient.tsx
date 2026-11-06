'use client';

import React, { useState, useEffect } from 'react';
import { Shop, ShopLink } from '@/types';
import { LocalBrandIcon } from '@/components/icons/BrandIcons';
import {
  CurvedWaveMask,
  CoffeeCupIcon,
  BotanicalBranch,
} from '@/components/decorations/LightDecorations';
import {
  MapPin,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { trackShopAction, getLocalShops } from '@/lib/db';
import { useIsClient } from '@/lib/useIsClient';
import Link from 'next/link';

interface ShopPageClientProps {
  initialShop: Shop;
}

export default function ShopPageClient({ initialShop }: ShopPageClientProps) {
  const [shop, setShop] = useState<Shop>(initialShop);
  const mounted = useIsClient();

  // Sync with local DB if changes occur in admin
  useEffect(() => {
    const handleUpdate = () => {
      const localShops = getLocalShops();
      const updated = localShops.find(
        (s) => s.slug === initialShop.slug || s.id === initialShop.id
      );
      if (updated) {
        setShop(updated);
      }
    };

    // Initial check on mount
    handleUpdate();

    window.addEventListener('shops_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    // Track visit
    trackShopAction(shop.slug, 'visit');

    return () => {
      window.removeEventListener('shops_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [initialShop.slug, initialShop.id, shop.slug]);

  // Handle any link click with tracking (and confetti for Google Review)
  const handleLinkClick = (e: React.MouseEvent, link: ShopLink) => {
    trackShopAction(shop.slug, link.type);

    if (link.type === 'google_review') {
      e.preventDefault();
      try {
        confetti({
          particleCount: 65,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#EA4335', '#4285F4', '#FBBC05', '#34A853', '#5C3A21'],
        });
      } catch {
        // ignore
      }
      setTimeout(() => {
        window.open(link.url, '_blank', 'noopener,noreferrer');
      }, 320);
    }
  };

  // Group links: first 3 links for top row, remaining 2 for bottom row (max 5 links)
  const firstRowLinks = shop.links.slice(0, 3);
  const secondRowLinks = shop.links.slice(3, 5);

  const defaultCoverUrl = shop.coverUrl || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&auto=format&fit=crop&q=80';
  const buttonLink = shop.buttonUrl || (shop.address ? `https://maps.google.com/?q=${encodeURIComponent(shop.name + ' ' + shop.address)}` : 'https://maps.google.com');
  const mainButtonBg = shop.themeColor || '#5C3A21';

  if (!mounted) {
    return (
      <div
        className="min-h-screen w-full bg-[#FAF7F2] flex items-center justify-center"
        suppressHydrationWarning
      >
        <div className="w-8 h-8 rounded-full border-2 border-[#5C3A21] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full bg-[#FAF7F2] text-stone-900 flex flex-col items-center justify-start relative overflow-x-hidden pb-12 selection:bg-amber-200 selection:text-amber-950 font-sans"
      suppressHydrationWarning
    >
      {/* Mobile-First Centered Card Shell */}
      <div className="w-full max-w-[420px] bg-[#FAF7F2] relative z-10 flex flex-col items-center sm:my-8 sm:rounded-[38px] sm:shadow-2xl sm:shadow-stone-900/10 sm:border sm:border-[#EDE8E1] overflow-hidden">
        {/* Subtle Botanical Leaf on Card Bottom Left */}
        <BotanicalBranch position="bottom-left" className="w-32 h-44 sm:w-40 sm:h-52" />

        {/* ============================================================== */}
        {/* 1. STOREFRONT COVER PHOTO WITH CURVED WAVE MASK                */}
        {/* ============================================================== */}
        <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-stone-200">
          {/* Subtle Botanical Leaf at Top Left */}
          <BotanicalBranch position="top-left" className="w-24 h-32" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={defaultCoverUrl}
            alt={shop.name}
            className="w-full h-full object-cover"
          />
          {/* Subtle warm gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35 pointer-events-none" />

          {/* Organic Curved Wave Mask at Bottom (Upward Dome Crest) */}
          <CurvedWaveMask />
        </div>

        {/* ============================================================== */}
        {/* 2. FLOATING LOGO (Centered Overlapping Curve)                  */}
        {/* ============================================================== */}
        <div className="relative -mt-14 z-20 flex flex-col items-center">
          <div className="w-24 h-24 rounded-[26px] bg-white border border-[#EDE8E1] p-1.5 shadow-xl shadow-stone-300/60 flex items-center justify-center overflow-hidden">
            {shop.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={shop.logoUrl}
                alt={shop.name}
                className="w-full h-full object-cover rounded-[20px]"
              />
            ) : (
              <div className="w-full h-full bg-[#FAF7F2] rounded-[20px] flex items-center justify-center">
                <CoffeeCupIcon className="w-10 h-10 text-[#5C3A21]" />
              </div>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. SHOP NAME, CATEGORIES & DESCRIPTION (FROM DB)               */}
        {/* ============================================================== */}
        <div className="px-6 text-center mt-3 z-10">
          <h1 className="text-2xl sm:text-[28px] font-black text-stone-900 tracking-tight leading-tight">
            {shop.name}
          </h1>

          {shop.category && (
            <p className="mt-1 text-xs sm:text-sm font-semibold text-[#8C6239] tracking-wide">
              {shop.category}
            </p>
          )}

          {shop.tagline && (
            <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-xs mx-auto leading-relaxed">
              {shop.tagline}
            </p>
          )}
        </div>

        {/* ============================================================== */}
        {/* 4. SOCIAL & REVIEW BUTTONS GRID (Rounded Squares, Max 5 links)  */}
        {/* ============================================================== */}
        <div className="w-full px-5 sm:px-6 mt-6 z-10 space-y-3.5">
          {/* Top Row: up to 3 cards */}
          {firstRowLinks.length > 0 && (
            <div
              className={`grid gap-3.5 ${
                firstRowLinks.length === 1
                  ? 'grid-cols-1 max-w-[130px] mx-auto'
                  : firstRowLinks.length === 2
                  ? 'grid-cols-2 max-w-[270px] mx-auto'
                  : 'grid-cols-3'
              }`}
            >
              {firstRowLinks.map((link: ShopLink) => (
                <a
                  key={link.id}
                  href={link.url}
                  onClick={(e) => handleLinkClick(e, link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white hover:bg-[#FDFCFB] border border-[#EDE8E1] rounded-3xl p-3.5 sm:p-4 flex flex-col items-center justify-center aspect-square shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <LocalBrandIcon type={link.type} className="w-8 h-8 sm:w-9 sm:h-9" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-stone-900 text-center leading-tight">
                    {link.title}
                  </span>
                </a>
              ))}
            </div>
          )}

          {/* Bottom Row: 2 cards centered */}
          {secondRowLinks.length > 0 && (
            <div
              className={`grid gap-3.5 justify-center ${
                secondRowLinks.length === 1
                  ? 'grid-cols-1 max-w-[130px] mx-auto'
                  : 'grid-cols-2 max-w-[240px] sm:max-w-[260px] mx-auto'
              }`}
            >
              {secondRowLinks.map((link: ShopLink) => (
                <a
                  key={link.id}
                  href={link.url}
                  onClick={(e) => handleLinkClick(e, link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white hover:bg-[#FDFCFB] border border-[#EDE8E1] rounded-3xl p-3.5 sm:p-4 flex flex-col items-center justify-center aspect-square shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 min-w-[100px]"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <LocalBrandIcon type={link.type} className="w-8 h-8 sm:w-9 sm:h-9" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-stone-900 text-center leading-tight">
                    {link.title}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* 5. VISIT OUR SHOP PILL BUTTON (CUSTOMIZED FROM DB)             */}
        {/* ============================================================== */}
        <div className="w-full px-6 mt-6 z-10">
          <a
            href={buttonLink}
            onClick={() => trackShopAction(shop.slug, 'main_button')}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: mainButtonBg }}
            className="w-full py-3.5 px-6 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 text-white shadow-lg active:scale-[0.98] hover:brightness-105 transition-all duration-200"
          >
            <MapPin className="w-4 h-4 text-amber-200" />
            <span>{shop.buttonText || 'Visit Our Shop'}</span>
          </a>
        </div>

        {/* ============================================================== */}
        {/* 6. REFERRAL: "OUR OTHER SERVICES" & DEVELOPER CREDITS          */}
        {/* ============================================================== */}
        {shop.showReferral !== false && (
          <div className="w-full px-6 mt-6 z-10 flex flex-col items-center text-center">
            {/* Our Other Services Referral Link */}
            <Link
              href="/services"
              onClick={() => trackShopAction(shop.slug, 'referral')}
              className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-stone-50 border border-[#EDE8E1] text-xs font-semibold text-stone-800 shadow-sm flex items-center justify-between transition group mb-3 hover:border-stone-300 active:scale-[0.99]"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-stone-900">Our Other Services &amp; Digital Solutions</span>
              </div>
              <div className="flex items-center gap-1 text-[#5C3A21] font-bold">
                <span>View</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            {/* Attached Developer Credits */}
            <div className="text-[11px] text-stone-600 font-medium">
              Designed &amp; Developed by{' '}
              <a
                href="https://piyushassudani.in"
                onClick={() => trackShopAction(shop.slug, 'referral')}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#5C3A21] hover:underline"
              >
                Piyush Assudani
              </a>{' '}
              <span className="text-stone-400">(Assudani Developer)</span>
            </div>

            {/* Phone Number, WhatsApp & Website Attached */}
            <div className="mt-1.5 flex items-center justify-center gap-2 sm:gap-2.5 text-[11px] text-stone-500 font-medium flex-wrap">
              <a
                href="tel:+919413879444"
                onClick={() => trackShopAction(shop.slug, 'referral')}
                className="inline-flex items-center gap-1 text-[#5C3A21] hover:underline font-semibold"
              >
                <span>📞 +91 9413879444</span>
              </a>
              <span className="text-stone-300">•</span>
              <a
                href="https://wa.me/919413879444?text=Hello%20Piyush%2C%20I%20saw%20your%20NFC%20project%20and%20want%20to%20connect."
                onClick={() => trackShopAction(shop.slug, 'referral')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline font-semibold"
              >
                WhatsApp
              </a>
              <span className="text-stone-300">•</span>
              <a
                href="https://piyushassudani.in"
                onClick={() => trackShopAction(shop.slug, 'referral')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 hover:text-stone-900 hover:underline font-medium"
              >
                piyushassudani.in
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
