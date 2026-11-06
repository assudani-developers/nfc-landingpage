import React from 'react';
import Link from 'next/link';
import { getShops } from '@/lib/db';
import { LocalBrandIcon, NfcWaveIcon, GoogleReviewIcon } from '@/components/icons/BrandIcons';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  ExternalLink,
  Smartphone,
  Layers,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { THEMES } from '@/lib/theme';

export default async function HomePage() {
  const shops = await getShops();

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-black relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Navbar */}
      <header className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 shadow-md shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <NfcWaveIcon className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                TapTap <span className="text-amber-400">NFC</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/piyush"
              className="py-2 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 transition shadow-sm"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Piyush Admin Portal</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-12 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-6 shadow-sm">
          <NfcWaveIcon className="w-4 h-4 text-amber-400" />
          <span>Smart Physical-to-Digital Business Cards & Standees</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Turn Every Shop Visit Into{' '}
          <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
            5-Star Google Reviews
          </span>{' '}
          & Loyal Followers
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Place smart NFC cards or acrylic QR standees at your billing counter. When customers tap, their phone instantly opens your bespoke brand page with direct 5-star Google review triggers, WhatsApp chat, and Instagram links.
        </p>

        {/* CTA Group */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/admin/piyush"
            className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition active:scale-95"
          >
            <Lock className="w-4 h-4" />
            <span>Open Piyush Admin (/admin/piyush)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#live-shops"
            className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition"
          >
            <span>Preview Live Shop Pages</span>
          </a>
        </div>

        {/* Key Feature Badges */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
              <GoogleReviewIcon className="w-4 h-4" />
              <span>Review First</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Mandatory Google Review CTA with 1-tap 5-star confetti trigger.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
              <Layers className="w-4 h-4" />
              <span>1 to 5 Links Limit</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Only configured links show. Maximum 5 links keeps it high converting.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-xs mb-1">
              <Smartphone className="w-4 h-4" />
              <span>Local Brand Logos</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Instagram, WhatsApp, FB & Google SVG icons bundled locally.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Custom Shop URLs</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Every shop gets its unique path: domain.com/shop-name.
            </p>
          </div>
        </div>
      </section>

      {/* Live Active Shops Showcase */}
      <section id="live-shops" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Live NFC Demo Shop Cards
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-lg mx-auto">
            Click on any shop card below to experience the exact customer NFC mobile screen:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shops.map((shop) => {
            const theme = THEMES[shop.theme] || THEMES.gold;
            const googleLink = shop.links.find((l) => l.type === 'google_review');

            return (
              <Link
                key={shop.id}
                href={`/${shop.slug}`}
                className={`group rounded-3xl p-6 ${theme.cardBg} border ${theme.cardBorder} hover:scale-[1.02] transition-all duration-300 shadow-xl flex flex-col justify-between relative overflow-hidden`}
              >
                {/* Glow pill */}
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-40 pointer-events-none"
                  style={{ backgroundColor: theme.starColor }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${theme.badge} uppercase`}>
                      {shop.category}
                    </span>
                    <span className="text-xs font-mono text-amber-400 font-bold">
                      /{shop.slug}
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-900 shadow-md flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={shop.logoUrl}
                        alt={shop.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                        {shop.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-white">
                          {shop.rating.toFixed(1)}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          ({shop.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 mb-4">
                    {shop.tagline}
                  </p>

                  {/* Active Links preview */}
                  <div className="flex items-center gap-1.5 mb-4">
                    {shop.links.map((l) => (
                      <div
                        key={l.id}
                        className="w-7 h-7 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center"
                        title={l.title}
                      >
                        <LocalBrandIcon type={l.type} className="w-4 h-4" />
                      </div>
                    ))}
                    <span className="text-[10px] text-slate-400 ml-1">
                      {shop.links.length} active links
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                  <span>Open NFC Landing Page</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 border-t border-slate-800/80">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Simple 3-Step Setup
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            How The NFC Shop Platform Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-extrabold text-lg mb-3">
              1
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">
              Add Shop in Admin
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Login at <code className="text-amber-300 font-mono">/admin/piyush</code>. Add shop name, logo, custom URL slug, Google Review link, and up to 5 social channels.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-extrabold text-lg mb-3">
              2
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">
              Write NFC or Print QR
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Copy the custom shop URL with 1-click and write to NFC tags with free NFC Tools app, or download print-ready acrylic QR standees.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-extrabold text-lg mb-3">
              3
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">
              Customer Tap & Review
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Customer taps their phone at the counter. The custom page opens in 0.5s with instant 5-star Google Review button & confetti explosion.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-8 px-4 text-center text-xs text-slate-400">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <NfcWaveIcon className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-slate-300">TapTap NFC Platform</span>
            <span>&bull; Built with Next.js &amp; Firebase</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/piyush"
              className="text-amber-400 hover:text-amber-300 transition font-medium"
            >
              Admin Access (/admin/piyush)
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
