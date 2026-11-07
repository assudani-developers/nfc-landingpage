'use client';

import React, { useState, useEffect } from 'react';
import { Shop, ShopLink } from '@/types';
import { LocalBrandIcon, NfcWaveIcon } from '@/components/icons/BrandIcons';
import {
  CurvedWaveMask,
  CoffeeCupIcon,
} from '@/components/decorations/LightDecorations';
import {
  MapPin,
  ChevronRight,
  Star,
  ShieldCheck,
} from 'lucide-react';
import { trackShopAction, getLocalShops } from '@/lib/db';
import { useIsClient } from '@/lib/useIsClient';
import ShopLoader from '@/components/shop/ShopLoader';
import GoogleReviewPromptModal from '@/components/shop/GoogleReviewPromptModal';
import Link from 'next/link';

interface ShopPageClientProps {
  initialShop: Shop;
}

export default function ShopPageClient({ initialShop }: ShopPageClientProps) {
  const [shop, setShop] = useState<Shop>(initialShop);
  const mounted = useIsClient();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  // Smooth splash timing so the branded logo loader appears before opening
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

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

  // Handle any link click with tracking
  const handleLinkClick = (e: React.MouseEvent, link: ShopLink) => {
    trackShopAction(shop.slug, link.type);

    // When Google Review is clicked, open the 10 Pre-written Prompts modal
    if (link.type === 'google_review') {
      e.preventDefault();
      setIsReviewModalOpen(true);
      return;
    }
  };

  const hasCover = shop.hasCover !== false && Boolean(shop.coverUrl);
  const buttonLink =
    shop.buttonUrl ||
    (shop.address
      ? `https://maps.google.com/?q=${encodeURIComponent(shop.name + ' ' + shop.address)}`
      : 'https://maps.google.com');
  const mainButtonBg = shop.themeColor || '#5C3A21';

  // Determine if the main action button should show
  const showMainButton = Boolean(
    shop.buttonText?.trim() || shop.buttonUrl?.trim() || shop.address?.trim()
  );

  const googleReviewLink =
    shop.links.find((l) => l.type === 'google_review') ||
    (shop.links[0]?.type === 'google_review' ? shop.links[0] : null);
  const otherLinks = googleReviewLink
    ? shop.links.filter((l) => l.id !== googleReviewLink.id)
    : shop.links;

  if (!mounted || !isReady) {
    return (
      <ShopLoader
        logoUrl={shop.logoUrl}
        name={shop.name}
        themeColor={shop.themeColor}
      />
    );
  }

  return (
    <div
      className="min-h-dvh min-h-[100dvh] w-full bg-[#FAF7F2] sm:bg-[#F0EAE1] text-stone-900 flex flex-col items-center justify-start sm:justify-center relative overflow-x-hidden selection:bg-amber-200 selection:text-amber-950 font-sans p-0 sm:py-8 sm:px-4 animate-in fade-in duration-300"
      suppressHydrationWarning
    >
      {/* Desktop Ambient Luxury Atmosphere */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] rounded-full bg-gradient-to-tr from-amber-100/60 via-stone-200/50 to-transparent blur-3xl opacity-80" />
      </div>

      {/* Main Centered Responsive Card Shell */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl bg-[#FAF7F2] relative z-10 flex flex-col items-center sm:my-auto sm:rounded-[44px] sm:shadow-2xl sm:shadow-stone-900/12 sm:border sm:border-[#EDE8E1] overflow-hidden">
        
        {/* ============================================================== */}
        {/* 1. HEADER SECTION: COVER BANNER OR CLEAN MINIMALIST AVATAR     */}
        {/* ============================================================== */}
        {hasCover ? (
          <>
            {/* Storefront Cover Banner with Wave Mask */}
            <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden bg-stone-900/5 flex-shrink-0">
              {/* Ambient Blurred Backdrop */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shop.coverUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none"
              />

              {/* Main Cover Banner */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shop.coverUrl}
                alt={shop.name}
                style={{
                  objectPosition: `${shop.coverPositionX ?? 50}% ${shop.coverPositionY ?? 50}%`,
                  transform:
                    shop.coverScale && shop.coverScale !== 100
                      ? `scale(${shop.coverScale / 100})`
                      : undefined,
                }}
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

            {/* Floating Logo (Centered Overlapping Curve) */}
            <div className="relative -mt-12 sm:-mt-14 md:-mt-16 z-20 flex flex-col items-center">
              <div className="w-22 h-22 sm:w-26 sm:h-26 md:w-28 md:h-28 rounded-[24px] sm:rounded-[28px] bg-white border-2 border-[#EDE8E1] p-1.5 shadow-xl shadow-stone-300/60 flex items-center justify-center overflow-hidden">
                {shop.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={shop.logoUrl}
                    alt={shop.name}
                    className="w-full h-full object-cover rounded-[18px] sm:rounded-[22px]"
                  />
                ) : (
                  <div className="w-full h-full bg-[#FAF7F2] rounded-[18px] sm:rounded-[22px] flex items-center justify-center">
                    <CoffeeCupIcon className="w-10 h-10 sm:w-12 sm:h-12 text-[#5C3A21]" />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Clean Minimalist Header (Without Banner) */
          <div className="w-full relative pt-8 sm:pt-10 pb-2 px-6 flex flex-col items-center overflow-hidden">
            {/* Ambient subtle radial glow in shop's theme color */}
            <div
              className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: shop.themeColor || '#5C3A21' }}
            />

            {/* Top Verified NFC Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EDE8E1] text-[10px] sm:text-xs font-bold text-stone-600 shadow-2xs mb-3">
              <NfcWaveIcon className="w-3.5 h-3.5 text-[#5C3A21]" />
              <span>Official Smart NFC Profile</span>
            </div>

            {/* Centered Large Featured Logo / Monogram */}
            <div className="relative group">
              <div className="w-22 h-22 sm:w-26 sm:h-26 md:w-28 md:h-28 rounded-[26px] sm:rounded-[30px] bg-white border-2 border-[#EDE8E1] p-1.5 shadow-xl shadow-stone-300/40 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
                {shop.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={shop.logoUrl}
                    alt={shop.name}
                    className="w-full h-full object-cover rounded-[20px] sm:rounded-[24px]"
                  />
                ) : (
                  <div
                    className="w-full h-full rounded-[20px] sm:rounded-[24px] flex items-center justify-center font-black text-2xl sm:text-3xl text-white shadow-inner"
                    style={{ backgroundColor: shop.themeColor || '#5C3A21' }}
                  >
                    {shop.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-md border border-stone-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 fill-emerald-100" />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 2. SHOP NAME, CATEGORIES, RATING & DESCRIPTION                 */}
        {/* ============================================================== */}
        <div className={`w-full px-5 sm:px-6 text-center z-10 ${hasCover ? 'mt-2.5 sm:mt-3' : 'mt-3 sm:mt-4'}`}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 tracking-tight leading-tight break-words max-w-full">
            {shop.name}
          </h1>

          {/* Line 1: Full Category Badge (Without Truncation) */}
          {shop.category && (
            <div className="mt-2 flex justify-center">
              <span className="text-xs font-bold text-[#8C6239] tracking-wide px-3.5 py-1 rounded-full bg-[#F3ECE4] border border-[#E5DACD] max-w-full break-words text-center leading-relaxed">
                {shop.category}
              </span>
            </div>
          )}

          {/* Line 2: 5-Star Rating Badge (Next Line) */}
          <div className="mt-2 flex justify-center">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/90 text-amber-950 text-xs font-bold shadow-2xs">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{shop.rating || 4.9}</span>
              <span className="text-stone-400 font-normal">({shop.reviewCount || 150}+ Reviews)</span>
            </span>
          </div>

          {shop.tagline && (
            <p className="mt-2.5 text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed break-words px-3">
              {shop.tagline}
            </p>
          )}
        </div>

        {/* ============================================================== */}
        {/* 3. SOCIAL & REVIEW BUTTONS (PRIMARY GOOGLE REVIEW + CHANNELS)   */}
        {/* ============================================================== */}
        <div className="w-full px-4 sm:px-8 md:px-10 mt-5 sm:mt-6 z-10 flex flex-col items-center">
          {/* PRIMARY GOOGLE REVIEW HERO CARD */}
          {googleReviewLink && (
            <div className="max-w-xl mx-auto w-full">
              <a
                href={googleReviewLink.url}
                onClick={(e) => handleLinkClick(e, googleReviewLink)}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full bg-white hover:bg-[#FDFCFB] border-2 border-amber-300/90 hover:border-amber-400 rounded-3xl p-3.5 sm:p-4 md:p-5 flex items-center justify-between shadow-xs hover:shadow-md transition-all duration-200 active:scale-[0.99] relative overflow-hidden"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-[#FAF7F2] border border-[#EDE8E1] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                    <LocalBrandIcon
                      type={googleReviewLink.type}
                      className="w-7 h-7 sm:w-9 sm:h-9"
                    />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <span className="font-extrabold text-xs sm:text-base md:text-lg text-stone-900 group-hover:text-[#5C3A21] transition-colors truncate max-w-[140px] sm:max-w-xs">
                        {googleReviewLink.title}
                      </span>
                      <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-950 text-[10px] sm:text-xs font-black border border-amber-300/80 inline-flex items-center gap-1 shadow-2xs">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>5.0 Rating</span>
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-sm text-stone-500 mt-0.5 font-medium truncate max-w-[160px] sm:max-w-xs">
                      {googleReviewLink.subtitle || 'Tap to leave a 5-star review'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#5C3A21] group-hover:bg-[#472c19] text-white text-xs sm:text-sm font-bold shadow-xs transition flex-shrink-0 ml-2">
                  <span>Rate Us</span>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            </div>
          )}

          {/* ADDITIONAL SOCIAL / CONTACT LINKS (IF CONFIGURED) */}
          {otherLinks.length > 0 && (
            <div className="max-w-xl mx-auto w-full mt-2.5 sm:mt-3">
              <div
                className={`grid gap-2 sm:gap-2.5 ${
                  otherLinks.length === 1
                    ? 'grid-cols-1'
                    : otherLinks.length === 2
                    ? 'grid-cols-2'
                    : otherLinks.length === 3
                    ? 'grid-cols-2 sm:grid-cols-3'
                    : otherLinks.length === 4
                    ? 'grid-cols-2 sm:grid-cols-4'
                    : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                }`}
              >
                {otherLinks.map((link: ShopLink, index: number) => {
                  const isLastOdd =
                    otherLinks.length % 2 === 1 &&
                    index === otherLinks.length - 1 &&
                    otherLinks.length !== 1;
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      onClick={(e) => handleLinkClick(e, link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group bg-white hover:bg-[#FDFCFB] border border-[#EDE8E1] hover:border-stone-300 rounded-2xl py-2.5 px-3 sm:py-3 sm:px-4 flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs transition-all duration-200 active:scale-95 min-w-0 ${
                        isLastOdd ? 'col-span-2 sm:col-span-1' : ''
                      }`}
                    >
                      <LocalBrandIcon
                        type={link.type}
                        className="w-5 h-5 sm:w-5 sm:h-5 flex-shrink-0 group-hover:scale-110 transition-transform"
                      />
                      <span className="text-xs sm:text-sm font-bold text-stone-800 truncate">
                        {link.title}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* 4. VISIT OUR SHOP PILL BUTTON (OPTIONAL / CUSTOM FROM DB)       */}
        {/* ============================================================== */}
        {showMainButton && (
          <div className="w-full px-4 sm:px-8 md:px-10 mt-4 sm:mt-5 z-10 flex justify-center">
            <a
              href={buttonLink}
              onClick={() => trackShopAction(shop.slug, 'main_button')}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: mainButtonBg }}
              className="w-full max-w-xl py-3.5 sm:py-4 px-6 rounded-full font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 text-white shadow-lg active:scale-[0.98] hover:brightness-105 transition-all duration-200 truncate"
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200 flex-shrink-0" />
              <span className="truncate max-w-[260px] sm:max-w-md">
                {shop.buttonText || 'Visit Our Shop'}
              </span>
            </a>
          </div>
        )}

        {/* ============================================================== */}
        {/* 5. REFERRAL: SUBTLE DEVELOPER FOOTER ATTRIBUTION                */}
        {/* ============================================================== */}
        {shop.showReferral !== false && (
          <footer className="w-full px-5 sm:px-8 md:px-10 mt-6 sm:mt-8 pb-8 sm:pb-9 z-10 flex flex-col items-center text-center">
            {/* Subtle, understated link to Digital Solutions */}
            <Link
              href="/services"
              onClick={() => trackShopAction(shop.slug, 'referral')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200/50 hover:bg-stone-200/80 text-stone-500 hover:text-stone-800 text-[11px] font-semibold transition active:scale-95 mb-2"
            >
              <span>Digital Solutions &amp; Smart NFC Cards</span>
              <ChevronRight className="w-3 h-3 text-stone-400" />
            </Link>

            {/* Quiet, classy developer attribution */}
            <div className="text-[11px] text-stone-400 font-medium flex items-center justify-center gap-2 flex-wrap">
              <span>
                Crafted by{' '}
                <a
                  href="https://piyushassudani.in"
                  onClick={() => trackShopAction(shop.slug, 'referral')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-stone-600 hover:text-stone-800 hover:underline"
                >
                  Piyush Assudani
                </a>
              </span>
              <span className="text-stone-300">•</span>
              <a
                href="tel:+919413879444"
                onClick={() => trackShopAction(shop.slug, 'referral')}
                className="text-stone-500 hover:text-stone-700 hover:underline"
              >
                +91 9413879444
              </a>
              <span className="text-stone-300">•</span>
              <a
                href="https://wa.me/919413879444?text=Hello%20Piyush%2C%20I%20saw%20your%20NFC%20project%20and%20want%20to%20connect."
                onClick={() => trackShopAction(shop.slug, 'referral')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-emerald-700 font-medium hover:underline"
              >
                WhatsApp
              </a>
              <span className="text-stone-300">•</span>
              <a
                href="https://piyushassudani.in"
                onClick={() => trackShopAction(shop.slug, 'referral')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-stone-800 hover:underline"
              >
                Portfolio
              </a>
            </div>
          </footer>
        )}
      </div>

      {/* 6. GOOGLE REVIEW PROMPTS BOTTOM SHEET MODAL (10 PRE-WRITTEN REVIEWS) */}
      {googleReviewLink && (
        <GoogleReviewPromptModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          reviewUrl={googleReviewLink.url}
          shopName={shop.name}
        />
      )}
    </div>
  );
}
