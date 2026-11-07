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
  Star,
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
      className="min-h-screen w-full bg-[#FAF7F2] sm:bg-[#F2ECE5] text-stone-900 flex flex-col items-center justify-start sm:justify-center relative overflow-x-hidden selection:bg-amber-200 selection:text-amber-950 font-sans p-0 sm:py-8 sm:px-4"
      suppressHydrationWarning
    >
      {/* Desktop Ambient Glow */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full bg-gradient-to-tr from-amber-100/50 via-stone-200/40 to-transparent blur-3xl opacity-70" />
      </div>

      {/* Main Centered Responsive Card Shell */}
      <div className="w-full max-w-[440px] sm:max-w-[480px] md:max-w-[500px] bg-[#FAF7F2] relative z-10 flex flex-col items-center sm:my-4 sm:rounded-[40px] sm:shadow-2xl sm:shadow-stone-900/10 sm:border sm:border-[#EDE8E1] overflow-hidden pb-8 sm:pb-9">
        {/* Subtle Botanical Leaf on Card Bottom Left */}
        <BotanicalBranch position="bottom-left" className="w-32 h-44 sm:w-40 sm:h-52 opacity-25" />

        {/* ============================================================== */}
        {/* 1. STOREFRONT COVER PHOTO WITH CURVED WAVE MASK                */}
        {/* ============================================================== */}
        <div className="relative w-full h-52 sm:h-60 md:h-64 overflow-hidden bg-stone-900/5">
          {/* Subtle Botanical Leaf at Top Left */}
          <BotanicalBranch position="top-left" className="w-24 h-32 opacity-35" />

          {/* Ambient Blurred Backdrop so letterboxing / widescreen banners look complete */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={defaultCoverUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none"
          />

          {/* Main Cover Banner */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={defaultCoverUrl}
            alt={shop.name}
            className={`relative w-full h-full object-center transition-all duration-300 ${
              shop.coverFit === 'contain'
                ? 'object-contain py-2'
                : 'object-cover'
            }`}
          />

          {/* Subtle warm gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35 pointer-events-none" />

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
        {/* 3. SHOP NAME, CATEGORIES, RATING & DESCRIPTION                 */}
        {/* ============================================================== */}
        <div className="px-6 text-center mt-3.5 z-10">
          <h1 className="text-2xl sm:text-[28px] font-black text-stone-900 tracking-tight leading-tight">
            {shop.name}
          </h1>

          <div className="mt-1.5 flex items-center justify-center gap-2 flex-wrap">
            {shop.category && (
              <span className="text-xs sm:text-sm font-semibold text-[#8C6239] tracking-wide">
                {shop.category}
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-[11px] font-bold">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{shop.rating || 4.9}</span>
              <span className="text-stone-400 font-normal">({shop.reviewCount || 150}+)</span>
            </span>
          </div>

          {shop.tagline && (
            <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
              {shop.tagline}
            </p>
          )}
        </div>

        {/* ============================================================== */}
        {/* 4. SOCIAL & REVIEW BUTTONS (RESPONSIVE GRID & HERO ACTION)      */}
        {/* ============================================================== */}
        <div className="w-full px-5 sm:px-6 mt-6 z-10">
          {/* CASE 1: ONLY 1 LINK CONFIGURED (HERO ACTION REVIEW CARD) */}
          {shop.links.length === 1 && (
            <a
              href={shop.links[0].url}
              onClick={(e) => handleLinkClick(e, shop.links[0])}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full bg-white hover:bg-[#FDFCFB] border border-[#EDE8E1] hover:border-[#5C3A21]/50 rounded-3xl p-4 sm:p-4.5 flex items-center justify-between shadow-xs hover:shadow-md transition-all duration-200 active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#FAF7F2] border border-[#EDE8E1] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                  <LocalBrandIcon type={shop.links[0].type} className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>
                <div className="text-left min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-sm sm:text-base text-stone-900 group-hover:text-[#5C3A21] transition-colors truncate">
                      {shop.links[0].title}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200/60">
                      ★ 5.0 Rating
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5 font-medium truncate">
                    {shop.links[0].subtitle || 'Tap to leave a 5-star review'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#5C3A21] group-hover:bg-[#472c19] text-white text-xs font-bold shadow-xs transition flex-shrink-0 ml-2">
                <span>Rate Us</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          )}

          {/* CASE 2: 2 TO 5 LINKS (SMART BALANCED GRID) */}
          {shop.links.length > 1 && (
            <div className="space-y-3.5">
              {/* Top Row */}
              <div
                className={`grid gap-3.5 ${
                  shop.links.length === 2
                    ? 'grid-cols-2 max-w-[340px] sm:max-w-[360px] mx-auto'
                    : shop.links.length === 4
                    ? 'grid-cols-2 max-w-[340px] sm:max-w-[360px] mx-auto'
                    : 'grid-cols-3'
                }`}
              >
                {(shop.links.length === 4 ? shop.links.slice(0, 2) : firstRowLinks).map((link: ShopLink) => (
                  <a
                    key={link.id}
                    href={link.url}
                    onClick={(e) => handleLinkClick(e, link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white hover:bg-[#FDFCFB] border border-[#EDE8E1] rounded-3xl p-3.5 sm:p-4 flex flex-col items-center justify-center aspect-square shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <LocalBrandIcon type={link.type} className="w-8 h-8 sm:w-9 sm:h-9" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-stone-900 text-center leading-tight truncate w-full">
                      {link.title}
                    </span>
                  </a>
                ))}
              </div>

              {/* Bottom Row */}
              {shop.links.length === 4 ? (
                <div className="grid gap-3.5 grid-cols-2 max-w-[340px] sm:max-w-[360px] mx-auto">
                  {shop.links.slice(2, 4).map((link: ShopLink) => (
                    <a
                      key={link.id}
                      href={link.url}
                      onClick={(e) => handleLinkClick(e, link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white hover:bg-[#FDFCFB] border border-[#EDE8E1] rounded-3xl p-3.5 sm:p-4 flex flex-col items-center justify-center aspect-square shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
                    >
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <LocalBrandIcon type={link.type} className="w-8 h-8 sm:w-9 sm:h-9" />
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold text-stone-900 text-center leading-tight truncate w-full">
                        {link.title}
                      </span>
                    </a>
                  ))}
                </div>
              ) : (
                secondRowLinks.length > 0 && (
                  <div className="grid gap-3.5 justify-center grid-cols-2 max-w-[240px] sm:max-w-[260px] mx-auto">
                    {secondRowLinks.map((link: ShopLink) => (
                      <a
                        key={link.id}
                        href={link.url}
                        onClick={(e) => handleLinkClick(e, link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white hover:bg-[#FDFCFB] border border-[#EDE8E1] rounded-3xl p-3.5 sm:p-4 flex flex-col items-center justify-center aspect-square shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 min-w-[100px]"
                      >
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                          <LocalBrandIcon type={link.type} className="w-8 h-8 sm:w-9 sm:h-9" />
                        </div>
                        <span className="text-[11px] sm:text-xs font-bold text-stone-900 text-center leading-tight truncate w-full">
                          {link.title}
                        </span>
                      </a>
                    ))}
                  </div>
                )
              )}
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
        {/* 6. REFERRAL: ATTACHED "OUR OTHER SERVICES" & DEVELOPER CREDITS   */}
        {/* ============================================================== */}
        {shop.showReferral !== false && (
          <div className="w-full px-5 sm:px-6 mt-6 z-10 flex flex-col items-center">
            <div className="w-full rounded-2xl bg-white border border-[#EDE8E1] shadow-xs overflow-hidden transition group hover:border-stone-300">
              {/* Top: Our Other Services Clickable Link */}
              <Link
                href="/services"
                onClick={() => trackShopAction(shop.slug, 'referral')}
                className="w-full py-3 px-4 bg-white hover:bg-stone-50/90 flex items-center justify-between transition group-hover:bg-[#FAF7F2]/60"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-xs text-stone-900">
                    Our Other Services &amp; Digital Solutions
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[#5C3A21] font-bold text-xs">
                  <span>View</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>

              {/* Bottom: Attached Developer Credits & Phone */}
              <div className="px-4 py-2.5 bg-[#FAF7F2] border-t border-[#EDE8E1] text-center flex flex-col items-center gap-1">
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

                <div className="flex items-center justify-center gap-2.5 text-[11px] text-stone-500 font-medium flex-wrap">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
