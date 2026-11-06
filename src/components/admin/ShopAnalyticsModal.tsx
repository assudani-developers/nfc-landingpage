'use client';

import React from 'react';
import { Shop } from '@/types';
import { LocalBrandIcon, NfcWaveIcon } from '@/components/icons/BrandIcons';
import {
  X,
  TrendingUp,
  MousePointerClick,
  Sparkles,
  MapPin,
  RefreshCw,
  ExternalLink,
  Smartphone,
  Share2,
} from 'lucide-react';

interface ShopAnalyticsModalProps {
  shop: Shop;
  onClose: () => void;
  onReset?: () => Promise<void>;
}

export default function ShopAnalyticsModal({
  shop,
  onClose,
  onReset,
}: ShopAnalyticsModalProps) {
  const stats = shop.clickStats || {};

  const googleClicks = stats.google_review || 0;
  const whatsappClicks = stats.whatsapp || 0;
  const instaClicks = stats.instagram || 0;
  const fbClicks = stats.facebook || 0;
  const websiteClicks = stats.website || 0;
  const mainBtnClicks = stats.main_button || 0;
  const referralClicks = shop.referralClicks || stats.referral || 0;

  const totalLinkClicks =
    googleClicks +
    whatsappClicks +
    instaClicks +
    fbClicks +
    websiteClicks +
    mainBtnClicks +
    referralClicks;

  const totalTaps = shop.tapsCount || 0;

  // Breakdown items
  const breakdown = [
    {
      id: 'google_review',
      label: 'Google Reviews (5 Stars)',
      subtitle: 'Taps to leave rating & reviews',
      count: googleClicks,
      color: 'bg-rose-500',
      icon: <LocalBrandIcon type="google_review" className="w-5 h-5 flex-shrink-0" />,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp / Appointment',
      subtitle: 'Booking appointments & chat chats',
      count: whatsappClicks,
      color: 'bg-emerald-500',
      icon: <LocalBrandIcon type="whatsapp" className="w-5 h-5 flex-shrink-0" />,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      subtitle: 'Profile visits & followers',
      count: instaClicks,
      color: 'bg-pink-500',
      icon: <LocalBrandIcon type="instagram" className="w-5 h-5 flex-shrink-0" />,
    },
    {
      id: 'facebook',
      label: 'Facebook',
      subtitle: 'Page visits & community',
      count: fbClicks,
      color: 'bg-blue-600',
      icon: <LocalBrandIcon type="facebook" className="w-5 h-5 flex-shrink-0" />,
    },
    {
      id: 'website',
      label: 'Shop Website / Catalog',
      subtitle: 'Digital menu or official site',
      count: websiteClicks,
      color: 'bg-indigo-500',
      icon: <LocalBrandIcon type="website" className="w-5 h-5 flex-shrink-0" />,
    },
    {
      id: 'main_button',
      label: `${shop.buttonText || 'Visit Our Shop'} (Directions)`,
      subtitle: 'Store location on Google Maps',
      count: mainBtnClicks,
      color: 'bg-amber-600',
      icon: <MapPin className="w-5 h-5 text-amber-700 flex-shrink-0" />,
    },
    {
      id: 'referral',
      label: 'Our Other Services & Solutions (Referral)',
      subtitle: 'Referrals generated for Piyush Assudani',
      count: referralClicks,
      color: 'bg-purple-600',
      icon: <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0" />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto font-sans">
      <div className="bg-white border border-[#EDE8E1] rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl my-8">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#5C3A21] flex items-center justify-center shadow-md shadow-[#5C3A21]/20">
              <TrendingUp className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-stone-900">{shop.name}</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FAF7F2] text-[#5C3A21] border border-stone-200">
                  /{shop.slug}
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Live Visitor Taps, Button Clicks &amp; Referral Analytics
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Main Stat Cards */}
        <div className="grid grid-cols-3 gap-3 my-5">
          <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EDE8E1] text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-stone-500 mb-1">
              <Smartphone className="w-3.5 h-3.5 text-[#5C3A21]" />
              <span>NFC Taps</span>
            </div>
            <div className="text-2xl font-black text-stone-900">{totalTaps}</div>
            <span className="text-[10px] text-stone-400">Total Visits</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EDE8E1] text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-stone-500 mb-1">
              <MousePointerClick className="w-3.5 h-3.5 text-blue-600" />
              <span>Total Clicks</span>
            </div>
            <div className="text-2xl font-black text-blue-700">{totalLinkClicks}</div>
            <span className="text-[10px] text-stone-400">Button Actions</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-purple-800 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Referrals</span>
            </div>
            <div className="text-2xl font-black text-purple-900">{referralClicks}</div>
            <span className="text-[10px] text-purple-600 font-medium">To Piyush Services</span>
          </div>
        </div>

        {/* Breakdown Section: "Kahan Clicks Hue" */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>Clicks Breakdown (Kahan Clicks Hue)</span>
            </h3>
            <span className="text-[11px] font-mono text-stone-500">
              {totalLinkClicks} total actions
            </span>
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {breakdown.map((item) => {
              const percentage =
                totalLinkClicks > 0
                  ? Math.round((item.count / totalLinkClicks) * 100)
                  : 0;

              return (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-[#FBF9F5] border border-stone-200/80 hover:border-stone-300 transition"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {item.icon}
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-stone-900 block truncate">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-stone-500 block truncate">
                          {item.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0 ml-2">
                      <span className="text-sm font-black text-stone-900">
                        {item.count}
                      </span>
                      <span className="text-[10px] text-stone-500 block">
                        {percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-stone-200/70 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
          {onReset && (
            <button
              type="button"
              onClick={async () => {
                if (confirm(`Reset all click and visit analytics for "${shop.name}" back to 0?`)) {
                  await onReset();
                }
              }}
              className="text-stone-400 hover:text-stone-700 text-xs font-medium flex items-center gap-1 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Counters</span>
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <a
              href={`/${shop.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <span>View Live Page</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#5C3A21] hover:bg-[#472c19] text-white text-xs font-bold transition shadow-xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

