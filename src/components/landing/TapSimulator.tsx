'use client';

import React, { useState } from 'react';
import {
  Star,
  CheckCircle2,
  Smartphone,
  ArrowRight,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { GoogleReviewIcon, NfcWaveIcon } from '@/components/icons/BrandIcons';

export default function TapSimulator() {
  const [isTapped, setIsTapped] = useState(false);
  const [selectedStars, setSelectedStars] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSimulateTap = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Haptic feedback on supported mobile devices
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([30, 40, 50]);
      } catch {}
    }

    setTimeout(() => {
      setIsTapped(true);
      setIsAnimating(false);
    }, 600);
  };

  const handleReset = () => {
    setIsTapped(false);
    setSubmitted(false);
    setSelectedStars(5);
  };

  const handleSubmitReview = () => {
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl bg-white border border-[#EDE8E1] p-5 sm:p-7 shadow-xl shadow-stone-200/50 relative overflow-hidden">
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-100/80 text-[#5C3A21] flex items-center justify-center">
            <Zap className="w-4 h-4 text-amber-700" />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-stone-700">
            Live 1-Tap Experience Simulator
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Interactive Demo
        </span>
      </div>

      {!isTapped ? (
        /* Standee Preview & Tap Trigger */
        <div className="flex flex-col items-center text-center space-y-5">
          <p className="text-xs sm:text-sm text-stone-600 max-w-sm">
            Dekhiye aapke customer ko counter par kaisa experience milega. Neeche button dabayein:
          </p>

          {/* Virtual Standee Visual */}
          <div
            onClick={handleSimulateTap}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleSimulateTap();
            }}
            className={`w-64 sm:w-72 rounded-2xl bg-gradient-to-b from-stone-50 via-white to-amber-50/40 border-2 border-amber-200/70 p-5 shadow-2xl relative cursor-pointer select-none transition-all duration-300 transform ${
              isAnimating ? 'scale-95 shadow-amber-300/60 ring-4 ring-amber-400/40' : 'hover:-translate-y-1 hover:shadow-amber-200/60'
            }`}
          >
            {/* Acrylic Glass Reflection Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/80 to-transparent pointer-events-none rounded-tr-2xl" />

            {/* Standee Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  TapTap Standee
                </span>
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                Gold Edition
              </span>
            </div>

            {/* Google Review Prompt on Standee */}
            <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-center mb-3">
              <GoogleReviewIcon className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-black text-stone-900">Review Us On Google</h4>
              <div className="flex items-center justify-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-[10px] text-stone-500 font-medium">5.0 Star Rated Store</p>
            </div>

            {/* Contactless Tap Zone */}
            <div className="mt-4 pt-3 border-t border-dashed border-stone-200 flex flex-col items-center">
              <div className="relative">
                {isAnimating && (
                  <div className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-75" />
                )}
                <div className="w-10 h-10 rounded-full bg-[#5C3A21] text-amber-200 flex items-center justify-center shadow-md relative z-10">
                  <NfcWaveIcon className="w-5 h-5" />
                </div>
              </div>
              <span className="text-[11px] font-bold text-stone-800 mt-2">
                Tap Phone Anywhere Here
              </span>
              <span className="text-[9px] text-stone-400 font-mono">
                No App • Instant Read
              </span>
            </div>
          </div>

          {/* Interactive Trigger Button */}
          <button
            onClick={handleSimulateTap}
            disabled={isAnimating}
            className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-[#5C3A21] hover:bg-[#472c19] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#5C3A21]/25 transition active:scale-95 cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-amber-300" />
            <span>{isAnimating ? 'Reading NFC...' : 'Click Here To Simulate Phone Tap'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-200" />
          </button>
        </div>
      ) : (
        /* Instant Google Review Screen (Simulated Result) */
        <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300 text-left">
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white border border-amber-200 flex items-center justify-center shadow-xs">
                <GoogleReviewIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-amber-900 block">
                  NFC Read Success (0.4s)
                </span>
                <span className="text-[10px] text-amber-700">
                  Direct Google Review Prompt Opened
                </span>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="text-[11px] font-bold text-stone-600 hover:text-stone-900 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-stone-200 shadow-2xs transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Tap Again</span>
            </button>
          </div>

          {!submitted ? (
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-stone-200 flex items-center justify-center font-bold text-lg text-[#5C3A21]">
                  ☕
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-stone-900">
                    The Artisan Cafe &amp; Roastery
                  </h4>
                  <p className="text-xs text-stone-500">Posting publicly on Google Maps</p>
                </div>
              </div>

              {/* Star Rating Select */}
              <div className="pt-2 text-center space-y-2">
                <p className="text-xs font-bold text-stone-700">Select rating:</p>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSelectedStars(star)}
                      className="p-1 hover:scale-125 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 sm:w-8 sm:h-8 ${
                          star <= selectedStars
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-[11px] font-bold text-amber-700">
                  {selectedStars === 5
                    ? '⭐⭐⭐⭐⭐ Excellent! 100% Recommended'
                    : `${selectedStars} Stars`}
                </p>
              </div>

              {/* Fake Review Input Field */}
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-500 italic">
                &ldquo;Amazing service and ambience! Highly recommend everyone to visit.&rdquo;
              </div>

              <div className="pt-1 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSubmitReview}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition active:scale-95 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit 5-Star Review to Google</span>
                </button>
              </div>
            </div>
          ) : (
            /* Review Done Confirmation */
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-base text-emerald-950">
                5-Star Review Live on Google Maps!
              </h4>
              <p className="text-xs text-emerald-800 max-w-sm mx-auto leading-relaxed">
                Just 4 seconds! Customer did not have to search, spelling mismatch ka zero risk, aur aapki store rating turant climb ho gayi.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition"
                >
                  Try Another Tap Demo
                </button>
              </div>
            </div>
          )}

          {/* Value Prop Under Demo */}
          <div className="grid grid-cols-2 gap-2 text-center pt-2">
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-xs font-bold text-stone-900 block">Zero Friction</span>
              <span className="text-[10px] text-stone-500">Customer taps &amp; rates immediately</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-xs font-bold text-stone-900 block">Maps SEO Boost</span>
              <span className="text-[10px] text-stone-500">Rank #1 in &ldquo;Near Me&rdquo; searches</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
