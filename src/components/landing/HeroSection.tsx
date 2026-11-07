'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Phone,
  Sparkles,
  Star,
  Check,
  Zap,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { WhatsAppIcon, NfcWaveIcon, GoogleReviewIcon } from '@/components/icons/BrandIcons';

export default function HeroSection() {
  const [isTapped, setIsTapped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedStars, setSelectedStars] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSimulateTap = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([30, 40, 50]);
      } catch {}
    }

    setTimeout(() => {
      setIsTapped(true);
      setIsAnimating(false);
    }, 500);
  };

  const handleReset = () => {
    setIsTapped(false);
    setSubmitted(false);
    setSelectedStars(5);
  };

  return (
    <section className="w-full relative pt-2 sm:pt-6 pb-8 sm:pb-12 overflow-hidden">
      {/* Ambient Warm Golden Luxury Lighting Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] sm:w-[900px] sm:h-[450px] bg-gradient-to-tr from-amber-300/20 via-amber-100/30 to-orange-100/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: HERO HEADLINE, VALUE PROPOSITION & CTAS      */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5 sm:space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EDE8E1] shadow-xs text-xs font-bold text-stone-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>India&apos;s #1 Smart NFC Google Review Standee</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.12]">
              Turn Every Customer Walk-In Into A{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#5C3A21]">
                5-Star Google Review.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-stone-600 max-w-xl leading-relaxed">
              Customer billing ke time sirf apna phone counter standee par touch karega aur seedhe aapki shop ka{' '}
              <strong className="text-stone-900 font-bold">5-Star Google Review</strong> rating dialog khul jayega. 
              Zero typing, zero spelling mistakes, 10x review growth.
            </p>

            {/* High-Converting CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-1">
              <a
                href="https://wa.me/919413879444?text=Hello%20Piyush%2C%20mujhe%20apni%20shop%20ke%20liye%20Smart%20NFC%20Google%20Review%20Standee%20order%20karna%20hai."
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/30 transition transform active:scale-95 group"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Order Standee on WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="tel:+919413879444"
                className="py-3.5 px-6 rounded-2xl bg-[#5C3A21] hover:bg-[#472c19] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#5C3A21]/20 transition transform active:scale-95"
              >
                <Phone className="w-4 h-4 text-amber-200" />
                <span>Call: +91 9413879444</span>
              </a>
            </div>

            {/* Key Value Micro-Proofs */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-lg pt-2 border-t border-stone-200/80">
              <div className="p-2.5 rounded-xl bg-white border border-[#EDE8E1] shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-black text-stone-900">
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>0.5s Tap</span>
                </div>
                <p className="text-[10px] text-stone-500 mt-0.5">Instant contactless</p>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#EDE8E1] shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-black text-stone-900">
                  <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                  <span>Zero App</span>
                </div>
                <p className="text-[10px] text-stone-500 mt-0.5">iOS &amp; Android ready</p>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#EDE8E1] shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-black text-stone-900">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Lifetime</span>
                </div>
                <p className="text-[10px] text-stone-500 mt-0.5">Zero monthly fees</p>
              </div>
            </div>

            {/* Social Proof Strip */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-1.5">
                {['#D97706', '#25D366', '#4285F4', '#5C3A21'].map((c, i) => (
                  <div
                    key={i}
                    style={{ backgroundColor: c }}
                    className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-black text-white"
                  >
                    ★
                  </div>
                ))}
              </div>
              <div className="text-xs text-stone-600">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="font-extrabold text-stone-900 ml-1">4.9/5</span>
                </div>
                <p className="text-[11px] text-stone-500 font-medium">
                  Trusted by cafes, salons, clinics &amp; stores
                </p>
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: HIGH-IMPACT PRODUCT SHOWCASE & LIVE TAP     */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full relative">
              
              {/* Product Frame Card */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-300/80 shadow-2xl shadow-stone-300/70 bg-gradient-to-b from-stone-50 via-white to-amber-50/30 group">
                
                {/* Acrylic Reflection Gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/40 pointer-events-none z-10" />

                {/* The Photorealistic Standee Image */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/hero-standee.webp"
                    alt="Smart NFC Google Review Crystal Acrylic & Gold Standee"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Floating Top Badge: Acrylic & Gold */}
                <div className="absolute top-3 left-3 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-200 border border-white/20 text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Crystal Acrylic &amp; Gold</span>
                  </span>
                </div>

                {/* Bottom Interactive Tap Banner */}
                <div className="p-4 bg-gradient-to-t from-stone-900 via-stone-900/90 to-stone-900/80 backdrop-blur-md text-white border-t border-white/15 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      {isAnimating && (
                        <div className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-75" />
                      )}
                      <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-sm relative z-10">
                        <NfcWaveIcon className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white">Live NFC Tap Demo</h4>
                      <p className="text-[10px] text-stone-300">Touch to test customer experience</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSimulateTap}
                    disabled={isAnimating}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition cursor-pointer flex-shrink-0"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>{isAnimating ? 'Tapping...' : 'Test Tap'}</span>
                  </button>
                </div>
              </div>

              {/* Interactive Popup Modal when tapped right in the hero */}
              {isTapped && (
                <div className="mt-3 p-4 rounded-2xl bg-white border-2 border-amber-300 shadow-xl text-left animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100 mb-3">
                    <div className="flex items-center gap-2">
                      <GoogleReviewIcon className="w-4 h-4" />
                      <span className="text-xs font-bold text-stone-900">
                        Google Review Window (Simulated 0.4s)
                      </span>
                    </div>
                    <button
                      onClick={handleReset}
                      className="text-[10px] font-bold text-stone-500 hover:text-stone-900 flex items-center gap-1 bg-stone-100 px-2 py-0.5 rounded-md"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>

                  {!submitted ? (
                    <div className="space-y-3">
                      <p className="text-xs text-stone-600 font-medium">
                        Customer ke phone par aisa 5-star rating window khulta hai:
                      </p>

                      <div className="flex items-center justify-center gap-2 py-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSelectedStars(s)}
                            className="p-1 hover:scale-125 transition-transform cursor-pointer"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                s <= selectedStars
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-stone-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSubmitted(true)}
                        className="w-full py-2.5 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Submit 5-Star Rating ({selectedStars} Stars)</span>
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                      <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-bold text-xs">
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Review Published on Google Maps!</span>
                      </div>
                      <p className="text-[10px] text-emerald-700">
                        Customer didn&apos;t have to search. 1-tap fast conversion.
                      </p>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

