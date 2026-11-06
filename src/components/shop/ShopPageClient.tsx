'use client';

import React, { useState, useEffect } from 'react';
import { Shop, ShopLink } from '@/types';
import { THEMES } from '@/lib/theme';
import { LocalBrandIcon, NfcWaveIcon } from '@/components/icons/BrandIcons';
import {
  Star,
  CheckCircle2,
  MapPin,
  Share2,
  ExternalLink,
  Sparkles,
  Copy,
  Check,
  PhoneCall,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { trackShopTap } from '@/lib/db';

interface ShopPageClientProps {
  initialShop: Shop;
}

export default function ShopPageClient({ initialShop }: ShopPageClientProps) {
  const [shop] = useState<Shop>(initialShop);
  const [copied, setCopied] = useState(false);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [showShareModal, setShowShareModal] = useState(false);

  const theme = THEMES[shop.theme] || THEMES.gold;

  useEffect(() => {
    // Record view/tap
    trackShopTap(shop.slug);
  }, [shop.slug]);

  // Mandatory Google Review link
  const googleReviewLink = shop.links.find((l) => l.type === 'google_review') || shop.links[0];
  // Other links configured by admin (only configured links show, up to at most 5 total)
  const otherLinks = shop.links.filter((l) => l.id !== googleReviewLink?.id);

  const triggerReviewConfetti = (url: string) => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EA4335', '#4285F4', '#FBBC05', '#34A853', '#A855F7'],
      });
    } catch {
      // ignore
    }
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shop.name,
          text: `Check out ${shop.name} on TapTap NFC!`,
          url: window.location.href,
        });
      } catch {
        setShowShareModal(true);
      }
    } else {
      setShowShareModal(true);
    }
  };

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-b ${theme.bgGradient} flex flex-col items-center justify-start p-4 sm:p-6 transition-colors duration-500`}
      style={{
        backgroundImage: `radial-gradient(circle at 50% 10%, ${theme.glowColor} 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${theme.glowColor} 0%, transparent 60%)`,
      }}
    >
      {/* Top NFC Contactless Pill */}
      <div className="w-full max-w-md flex items-center justify-between mb-4 px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md text-xs font-medium text-slate-300 shadow-lg">
          <NfcWaveIcon className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>NFC Connected</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        </div>

        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition"
          title="Copy Card Link"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>

      {/* Main Glassmorphic Card Container */}
      <div
        className={`w-full max-w-md ${theme.cardBg} border ${theme.cardBorder} rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-300`}
      >
        {/* Decorative Top Accent Glow */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-60"
          style={{ backgroundColor: theme.starColor }}
        />

        {/* Shop Header & Branding */}
        <div className="flex flex-col items-center text-center relative z-10">
          {/* Logo with Glow Ring */}
          <div className="relative mb-4 group">
            <div
              className="absolute -inset-1 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"
              style={{ backgroundColor: theme.starColor }}
            />
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-slate-700 bg-slate-900 shadow-xl flex items-center justify-center">
              {shop.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={shop.logoUrl}
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-white">
                  {shop.name.charAt(0)}
                </span>
              )}
            </div>
            {/* Verified Badge */}
            <div
              className="absolute bottom-0 right-0 rounded-full p-1 bg-slate-900 border border-slate-700 shadow-md"
              title="Verified Official Shop Card"
            >
              <CheckCircle2 className="w-5 h-5 text-amber-400 fill-amber-400/20" />
            </div>
          </div>

          {/* Shop Name */}
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            {shop.name}
          </h1>

          {/* Category Badge */}
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`px-3 py-0.5 text-xs font-semibold rounded-full border ${theme.badge} uppercase tracking-wider`}
            >
              {shop.category}
            </span>
          </div>

          {/* Tagline */}
          <p className="mt-2.5 text-sm text-slate-300 font-normal leading-relaxed max-w-xs">
            {shop.tagline}
          </p>

          {/* Address if present */}
          {shop.address && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="truncate max-w-[260px]">{shop.address}</span>
            </div>
          )}

          {/* Rating Summary Bar */}
          <div className="mt-4 px-4 py-2 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-white text-sm">
                {shop.rating.toFixed(1)}
              </span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-600"></div>
            <span className="text-xs text-slate-300">
              {shop.reviewCount} Happy Customers
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MANDATORY / PRIMARY GOOGLE REVIEWS SECTION                    */}
        {/* ============================================================== */}
        {googleReviewLink && (
          <div className="mt-6 relative z-10">
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-amber-500/30 shadow-lg relative overflow-hidden group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <LocalBrandIcon type="google_review" className="w-7 h-7 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                      Google Reviews
                    </span>
                    <span className="text-sm font-bold text-white">
                      Leave a 5-Star Review
                    </span>
                  </div>
                </div>
                <Sparkles className="w-5 h-5 text-amber-400 animate-spin-slow" />
              </div>

              {/* Interactive Quick Star Rating (Tap 5 stars to immediately review) */}
              <div className="py-2.5 px-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">
                  Select rating:
                </span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(null)}
                      onClick={() => {
                        setSelectedRating(star);
                        triggerReviewConfetti(googleReviewLink.url);
                      }}
                      className="p-1 hover:scale-125 transition-transform duration-150 focus:outline-none"
                      title={`Give ${star} Star${star > 1 ? 's' : ''}`}
                    >
                      <Star
                        className={`w-5 h-5 transition-colors ${
                          (hoveredStar !== null ? star <= hoveredStar : star <= selectedRating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Big Tap to Review Button */}
              <button
                onClick={() => triggerReviewConfetti(googleReviewLink.url)}
                className="mt-3.5 w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.98] transition-all duration-200"
              >
                <LocalBrandIcon type="google_review" className="w-5 h-5" />
                <span>Write Google Review (Tap Here)</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* OTHER CONFIGURED SOCIAL / WEB LINKS (MAX 5 IN TOTAL)           */}
        {/* ONLY configured links are displayed here                       */}
        {/* ============================================================== */}
        {otherLinks.length > 0 && (
          <div className="mt-5 space-y-3 relative z-10">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
              Connect & Follow
            </div>

            {otherLinks.map((link: ShopLink) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full p-3.5 rounded-2xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-500/80 transition-all duration-200 flex items-center justify-between shadow-sm active:scale-[0.99]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <LocalBrandIcon type={link.type} className="w-8 h-8" />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors truncate">
                      {link.title}
                    </div>
                    {link.subtitle && (
                      <div className="text-xs text-slate-400 truncate">
                        {link.subtitle}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-7 h-7 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-slate-700 transition flex-shrink-0 ml-2">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Footer Actions (Quick Save / Share) */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 relative z-10">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 hover:text-white transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share This Place</span>
          </button>

          <span className="text-[11px] text-slate-500 font-mono">
            ID: {shop.slug}
          </span>
        </div>
      </div>

      {/* Subtle Brand Footer */}
      <footer className="mt-6 mb-4 flex flex-col items-center text-center text-xs text-slate-400">
        <div className="flex items-center gap-1.5 font-medium">
          <NfcWaveIcon className="w-3.5 h-3.5 text-amber-400" />
          <span>Powered by TapTap NFC Smart Business Card</span>
        </div>
      </footer>

      {/* Share Modal Dialog */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-sm w-full text-center relative shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Share {shop.name}</h3>
            <p className="text-xs text-slate-400 mb-4">
              Copy this link or scan on any phone to open this shop page.
            </p>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 break-all select-all mb-4">
              {typeof window !== 'undefined' ? window.location.href : `/${shop.slug}`}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 font-medium text-xs hover:bg-slate-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
