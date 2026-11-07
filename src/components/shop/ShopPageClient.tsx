'use client';

import React, { useState, useEffect } from 'react';
import { Shop, ShopLink } from '@/types';
import { LocalBrandIcon, NfcWaveIcon, GoogleReviewIcon } from '@/components/icons/BrandIcons';
import {
  CurvedWaveMask,
  CoffeeCupIcon,
} from '@/components/decorations/LightDecorations';
import {
  MapPin,
  ChevronRight,
  Star,
  ShieldCheck,
  UserPlus,
  Share2,
  Check,
  ArrowUpRight,
  Sparkles,
  Navigation,
  Copy,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { trackShopAction, getLocalShops } from '@/lib/db';
import { useIsClient } from '@/lib/useIsClient';
import ShopLoader from '@/components/shop/ShopLoader';
import GoogleReviewPromptModal from '@/components/shop/GoogleReviewPromptModal';
import ShareProfileModal from '@/components/shop/ShareProfileModal';
import { downloadShopVCard } from '@/lib/vcard';
import Link from 'next/link';

function getLinkTheme(type: string) {
  switch (type) {
    case 'whatsapp':
      return {
        badgeBg: 'bg-emerald-100/80 text-emerald-800',
        hoverBorder: 'hover:border-emerald-300',
        hoverBg: 'hover:bg-emerald-50/40',
        defaultSubtitle: 'Chat & Inquiries',
      };
    case 'instagram':
      return {
        badgeBg: 'bg-pink-100/80 text-pink-800',
        hoverBorder: 'hover:border-pink-300',
        hoverBg: 'hover:bg-pink-50/40',
        defaultSubtitle: 'Follow & Reels',
      };
    case 'facebook':
      return {
        badgeBg: 'bg-blue-100/80 text-blue-800',
        hoverBorder: 'hover:border-blue-300',
        hoverBg: 'hover:bg-blue-50/40',
        defaultSubtitle: 'Official Page',
      };
    case 'website':
      return {
        badgeBg: 'bg-sky-100/80 text-sky-800',
        hoverBorder: 'hover:border-sky-300',
        hoverBg: 'hover:bg-sky-50/40',
        defaultSubtitle: 'Visit Website',
      };
    default:
      return {
        badgeBg: 'bg-stone-100 text-stone-800',
        hoverBorder: 'hover:border-stone-300',
        hoverBg: 'hover:bg-stone-50/50',
        defaultSubtitle: 'Open Link',
      };
  }
}

interface ShopPageClientProps {
  initialShop: Shop;
}

export default function ShopPageClient({ initialShop }: ShopPageClientProps) {
  const [shop, setShop] = useState<Shop>(initialShop);
  const mounted = useIsClient();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isContactSaved, setIsContactSaved] = useState<boolean>(false);
  const [isAddressCopied, setIsAddressCopied] = useState<boolean>(false);

  // Download native vCard (.vcf)
  const handleSaveContact = () => {
    downloadShopVCard(shop);
    setIsContactSaved(true);
    trackShopAction(shop.slug, 'save_contact');
    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.5 },
        colors: ['#25D366', '#5C3A21', '#D4AF37'],
      });
    } catch {}
    setTimeout(() => setIsContactSaved(false), 2500);
  };

  // Copy shop address to clipboard with feedback
  const handleCopyAddress = () => {
    if (!shop.address) return;
    navigator.clipboard.writeText(shop.address);
    setIsAddressCopied(true);
    try {
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.7 },
        colors: ['#5C3A21', '#D4AF37'],
      });
    } catch {}
    setTimeout(() => setIsAddressCopied(false), 2000);
  };

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

              {/* Top-Left Ambient Pill */}
              <div className="absolute top-3.5 left-3.5 z-20 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Smart NFC Profile</span>
              </div>

              {/* Top-Right Floating Share Button on Banner */}
              <button
                type="button"
                onClick={() => setIsShareModalOpen(true)}
                className="absolute top-3.5 right-3.5 z-20 p-2.5 rounded-full bg-black/45 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-md transition active:scale-95 cursor-pointer"
                aria-label="Share card"
                title="Share & QR"
              >
                <Share2 className="w-4 h-4" />
              </button>

              {/* Organic Curved Wave Mask at Bottom (Upward Dome Crest) */}
              <CurvedWaveMask />
            </div>

            {/* Floating Logo (Centered Overlapping Curve) */}
            <div className="relative -mt-12 sm:-mt-14 md:-mt-16 z-20 flex flex-col items-center">
              <div className="relative group">
                <div className="w-22 h-22 sm:w-26 sm:h-26 md:w-28 md:h-28 rounded-[24px] sm:rounded-[28px] bg-white border-2 border-white ring-4 ring-[#FAF7F2] p-1.5 shadow-xl shadow-stone-900/15 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
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
                <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-md border border-stone-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                </div>
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

            {/* Top-Right Share Button */}
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="absolute top-3.5 right-3.5 z-20 p-2.5 rounded-full bg-white hover:bg-stone-100 text-stone-700 border border-stone-200/80 shadow-2xs transition active:scale-95 cursor-pointer"
              aria-label="Share card"
              title="Share card & QR"
            >
              <Share2 className="w-4 h-4" />
            </button>

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

          {/* Quick Utility Action Bar: Save Contact & Share Profile */}
          <div className="mt-3.5 flex items-center justify-center gap-2.5 px-4 w-full max-w-xs mx-auto">
            <button
              type="button"
              onClick={handleSaveContact}
              className={`flex-1 py-2 px-3.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all duration-200 active:scale-95 cursor-pointer ${
                isContactSaved
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'bg-white hover:bg-stone-50 border-[#EDE8E1] hover:border-stone-300 text-stone-800'
              }`}
            >
              {isContactSaved ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5 text-[#5C3A21]" />
                  <span>Save Contact</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="flex-1 py-2 px-3.5 rounded-2xl bg-white hover:bg-stone-50 border border-[#EDE8E1] hover:border-stone-300 text-stone-800 text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs hover:shadow-xs transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#5C3A21]" />
              <span>Share &amp; QR</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. SOCIAL & REVIEW BUTTONS (PRIMARY GOOGLE REVIEW + CHANNELS)   */}
        {/* ============================================================== */}
        <div className="w-full px-4 sm:px-8 md:px-10 mt-5 sm:mt-6 z-10 flex flex-col items-center">
          {/* PRIMARY GOOGLE REVIEW HERO CARD (GOLDEN SHIMMER LUXURY) */}
          {googleReviewLink && (
            <div className="max-w-xl mx-auto w-full">
              <div className="relative group/review p-[1.5px] rounded-3xl bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-sm hover:shadow-xl hover:shadow-amber-500/15 transition-all duration-300">
                <a
                  href={googleReviewLink.url}
                  onClick={(e) => handleLinkClick(e, googleReviewLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white hover:bg-gradient-to-b hover:from-white hover:to-amber-50/40 rounded-[22px] p-3.5 sm:p-4 md:p-5 flex items-center justify-between transition-all duration-200 active:scale-[0.99] relative overflow-hidden"
                >
                  {/* Subtle Shimmer Sheen Sweep on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/25 to-transparent -translate-x-full group-hover/review:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 rounded-2xl bg-amber-50/80 border border-amber-200/70 flex items-center justify-center flex-shrink-0 group-hover/review:scale-105 transition-transform shadow-2xs">
                      <GoogleReviewIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <div className="text-left min-w-0">
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        <span className="font-extrabold text-xs sm:text-base md:text-lg text-stone-900 group-hover/review:text-[#5C3A21] transition-colors truncate max-w-[140px] sm:max-w-xs">
                          {googleReviewLink.title || 'Google Reviews'}
                        </span>
                        <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-amber-100/80 text-amber-950 text-[10px] sm:text-xs font-black border border-amber-300/80 inline-flex items-center gap-1 shadow-2xs">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>5.0</span>
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-amber-800/90 font-semibold mt-0.5 flex items-center gap-1 truncate max-w-[180px] sm:max-w-xs">
                        <Sparkles className="w-3 h-3 text-amber-500 flex-shrink-0" />
                        <span>10 ready-made 5★ templates</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#5C3A21] to-[#7B4F2C] text-white text-xs sm:text-sm font-bold shadow-md shadow-stone-900/10 group-hover/review:brightness-110 transition-all flex-shrink-0 ml-2">
                    <span>Rate 5★</span>
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/review:translate-x-0.5 transition-transform" />
                  </div>
                </a>
              </div>
            </div>
          )}

          {/* ADDITIONAL SOCIAL / CONTACT LINKS (BENTO TILES) */}
          {otherLinks.length > 0 && (
            <div className="max-w-xl mx-auto w-full mt-3">
              <div
                className={`grid gap-2.5 ${
                  otherLinks.length === 1
                    ? 'grid-cols-1'
                    : otherLinks.length === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-2'
                }`}
              >
                {otherLinks.map((link: ShopLink, index: number) => {
                  const theme = getLinkTheme(link.type);
                  const isSingleOrLastWide =
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
                      className={`group bg-white hover:bg-stone-50/70 border border-[#EDE8E1] ${theme.hoverBorder} ${theme.hoverBg} rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-200 active:scale-[0.98] min-w-0 ${
                        isSingleOrLastWide ? 'col-span-2 sm:col-span-1' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FAF7F2] border border-[#EDE8E1] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <LocalBrandIcon
                            type={link.type}
                            className="w-5 h-5 sm:w-6 sm:h-6"
                          />
                        </div>
                        <div className="w-7 h-7 rounded-full bg-stone-100 group-hover:bg-stone-200/80 flex items-center justify-center text-stone-500 group-hover:text-stone-800 transition-colors">
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>

                      <div className="mt-3 text-left min-w-0">
                        <h3 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-[#5C3A21] transition-colors truncate">
                          {link.title}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-stone-500 font-medium truncate mt-0.5">
                          {link.subtitle || theme.defaultSubtitle}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* 4. INTERACTIVE DIRECTIONS & LOCATION CARD (#5)                  */}
        {/* ============================================================== */}
        {showMainButton && (
          <div className="w-full px-4 sm:px-8 md:px-10 mt-4 sm:mt-5 z-10 flex justify-center">
            <div className="w-full max-w-xl bg-white border border-[#EDE8E1] rounded-3xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center flex-shrink-0 text-[#8C6239]">
                  <MapPin className="w-5 h-5 text-[#5C3A21]" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#8C6239] uppercase tracking-wider">
                      Shop Location
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] text-stone-400 font-medium">Live Maps</span>
                  </div>
                  {shop.address && (
                    <p className="text-xs sm:text-sm font-semibold text-stone-800 mt-1 leading-snug break-words">
                      {shop.address}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center gap-2">
                <a
                  href={buttonLink}
                  onClick={() => trackShopAction(shop.slug, 'main_button')}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: mainButtonBg }}
                  className="flex-1 py-2.5 sm:py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 text-white shadow-sm hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span className="truncate">{shop.buttonText || 'Get Live Directions'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                {shop.address && (
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="py-2.5 sm:py-3 px-3.5 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 font-bold text-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer flex-shrink-0"
                    title="Copy address"
                  >
                    {isAddressCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
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

      {/* 7. SHARE PROFILE & QR CODE MODAL */}
      <ShareProfileModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shop={shop}
      />
    </div>
  );
}
