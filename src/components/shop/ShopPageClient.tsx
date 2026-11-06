'use client';

import React, { useState, useEffect } from 'react';
import { Shop, ShopLink } from '@/types';
import { THEMES } from '@/lib/theme';
import { LocalBrandIcon } from '@/components/icons/BrandIcons';
import {
  BotanicalLeavesCorner,
  CurvedWaveMask,
  CoffeeCupIcon,
} from '@/components/decorations/LightDecorations';
import {
  MapPin,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { trackShopTap } from '@/lib/db';
import Link from 'next/link';

interface ShopPageClientProps {
  initialShop: Shop;
}

export default function ShopPageClient({ initialShop }: ShopPageClientProps) {
  const [shop] = useState<Shop>(initialShop);
  const theme = THEMES[shop.theme] || THEMES.warm_cafe;

  useEffect(() => {
    trackShopTap(shop.slug);
  }, [shop.slug]);

  // Handle Google Review click with confetti celebration
  const handleReviewClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#EA4335', '#4285F4', '#FBBC05', '#34A853', '#5C3A21'],
      });
    } catch {
      // ignore
    }
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 350);
  };

  // Group links: first 3 links for top row, remaining 2 for bottom row (max 5 links)
  const firstRowLinks = shop.links.slice(0, 3);
  const secondRowLinks = shop.links.slice(3, 5);

  const defaultCoverUrl = shop.coverUrl || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&auto=format&fit=crop&q=80';
  const visitUrl = shop.mapUrl || (shop.address ? `https://maps.google.com/?q=${encodeURIComponent(shop.name + ' ' + shop.address)}` : 'https://maps.google.com');

  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] text-stone-900 flex flex-col items-center justify-start relative overflow-x-hidden pb-12 selection:bg-amber-200 selection:text-amber-950 font-sans">
      {/* Decorative Botanical Leaves in Bottom Left Corner */}
      <div className="fixed bottom-0 left-0 pointer-events-none z-0">
        <BotanicalLeavesCorner className="w-36 h-36 sm:w-52 sm:h-52" />
      </div>

      {/* Mobile-First Centered Card Shell */}
      <div className="w-full max-w-md bg-[#FAF7F2] relative z-10 flex flex-col items-center">
        {/* ============================================================== */}
        {/* 1. STOREFRONT COVER PHOTO WITH CURVED WAVE MASK                */}
        {/* ============================================================== */}
        <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-stone-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={defaultCoverUrl}
            alt={shop.name}
            className="w-full h-full object-cover"
          />
          {/* Subtle warm gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />

          {/* Curved Wave Mask at Bottom of Cover */}
          <CurvedWaveMask />
        </div>

        {/* ============================================================== */}
        {/* 2. FLOATING LOGO (Centered Overlapping Curve)                  */}
        {/* ============================================================== */}
        <div className="relative -mt-14 z-20 flex flex-col items-center">
          <div className="w-24 h-24 rounded-3xl bg-white border border-[#EDE8E1] p-1.5 shadow-xl shadow-stone-300/60 flex items-center justify-center overflow-hidden">
            {shop.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={shop.logoUrl}
                alt={shop.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <div className="w-full h-full bg-[#FAF7F2] rounded-2xl flex items-center justify-center">
                <CoffeeCupIcon className="w-10 h-10 text-[#5C3A21]" />
              </div>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. SHOP NAME, CATEGORIES & DESCRIPTION                         */}
        {/* ============================================================== */}
        <div className="px-6 text-center mt-3 z-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] tracking-tight">
            {shop.name}
          </h1>

          <p className="mt-1 text-xs sm:text-sm font-medium text-[#78716C] tracking-wide">
            {shop.category}
          </p>

          <p className="mt-2 text-xs sm:text-sm text-[#44403C] max-w-xs mx-auto leading-relaxed">
            {shop.tagline}
          </p>
        </div>

        {/* ============================================================== */}
        {/* 4. SOCIAL & REVIEW BUTTONS GRID (Rounded Squares, Max 5 links)  */}
        {/* ============================================================== */}
        <div className="w-full px-5 sm:px-6 mt-6 z-10 space-y-3.5">
          {/* Top Row: up to 3 cards */}
          {firstRowLinks.length > 0 && (
            <div className={`grid gap-3 ${
              firstRowLinks.length === 1
                ? 'grid-cols-1 max-w-[140px] mx-auto'
                : firstRowLinks.length === 2
                ? 'grid-cols-2 max-w-[280px] mx-auto'
                : 'grid-cols-3'
            }`}>
              {firstRowLinks.map((link: ShopLink) => {
                const isGoogle = link.type === 'google_review';

                return (
                  <a
                    key={link.id}
                    href={link.url}
                    onClick={isGoogle ? (e) => handleReviewClick(e, link.url) : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white hover:bg-[#FDFCFB] border border-[#EDE8E1] rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 flex flex-col items-center justify-center aspect-square shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <LocalBrandIcon type={link.type} className="w-8 h-8 sm:w-9 sm:h-9" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-[#1C1917] text-center leading-tight">
                      {link.title}
                    </span>
                  </a>
                );
              })}
            </div>
          )}

          {/* Bottom Row: 2 cards centered */}
          {secondRowLinks.length > 0 && (
            <div className={`grid gap-3 justify-center ${
              secondRowLinks.length === 1
                ? 'grid-cols-1 max-w-[140px] mx-auto'
                : 'grid-cols-2 max-w-[240px] sm:max-w-[260px] mx-auto'
            }`}>
              {secondRowLinks.map((link: ShopLink) => {
                const isGoogle = link.type === 'google_review';

                return (
                  <a
                    key={link.id}
                    href={link.url}
                    onClick={isGoogle ? (e) => handleReviewClick(e, link.url) : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white hover:bg-[#FDFCFB] border border-[#EDE8E1] rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 flex flex-col items-center justify-center aspect-square shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 min-w-[100px]"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <LocalBrandIcon type={link.type} className="w-8 h-8 sm:w-9 sm:h-9" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-[#1C1917] text-center leading-tight">
                      {link.title}
                    </span>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* 5. VISIT OUR SHOP PILL BUTTON                                  */}
        {/* ============================================================== */}
        <div className="w-full px-6 mt-6 z-10">
          <a
            href={visitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 bg-[#5C3A21] hover:bg-[#4A2E19] text-white shadow-lg shadow-[#5C3A21]/20 active:scale-[0.98] transition-all duration-200"
          >
            <MapPin className="w-4 h-4 text-amber-200" />
            <span>{shop.visitButtonText || 'Visit Our Shop'}</span>
          </a>
        </div>

        {/* ============================================================== */}
        {/* 6. REFERRAL: "OUR OTHER SERVICES" BUTTON & DEVELOPER CREDIT    */}
        {/* ============================================================== */}
        <div className="w-full px-6 mt-6 z-10 flex flex-col items-center text-center">
          {/* Our Other Services Referral Link */}
          <Link
            href="/services"
            className="w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-stone-50 border border-[#EDE8E1] text-xs font-semibold text-stone-700 hover:text-stone-900 shadow-sm flex items-center justify-between transition group mb-4"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Our Other Services &amp; Digital Solutions</span>
            </div>
            <div className="flex items-center gap-1 text-[#5C3A21] font-bold">
              <span>View</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* Designed & Developed by Piyush Assudani */}
          <div className="text-[11px] text-stone-500 font-medium">
            Designed &amp; Developed by{' '}
            <a
              href="https://piyushassudani.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#5C3A21] hover:underline"
            >
              Piyush Assudani
            </a>{' '}
            (Assudani Developer)
          </div>

          <div className="mt-1 flex items-center gap-1 text-[10px] text-stone-400">
            <a
              href="https://piyushassudani.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-600 transition"
            >
              piyushassudani.in
            </a>
            <span>•</span>
            <Link href="/admin/piyush" className="hover:text-stone-600 transition">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
