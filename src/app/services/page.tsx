import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Globe,
  ExternalLink,
  Code2,
  Smartphone,
  CheckCircle2,
  Phone,
  Zap,
  Sparkles,
  ShoppingBag,
  Palette,
  ChevronRight,
} from 'lucide-react';
import { WhatsAppIcon, NfcWaveIcon } from '@/components/icons/BrandIcons';
import { BotanicalBranch } from '@/components/decorations/LightDecorations';

export const metadata = {
  title: 'Our Other Services & Digital Solutions | Piyush Assudani - Software & Web Developer',
  description:
    'Smart NFC Solutions, Custom Web Apps, Mobile Apps & Business Software by Piyush Assudani (Assudani Developer). Connect at +91 9413879444.',
};

export default function ServicesPage() {
  return (
    <div
      className="min-h-screen w-full bg-[#FAF7F2] text-stone-900 flex flex-col items-center justify-start p-4 sm:p-8 relative selection:bg-amber-200 selection:text-amber-950 font-sans"
      suppressHydrationWarning
    >
      {/* Decorative Botanical Leaf Accents */}
      <BotanicalBranch position="bottom-left" className="w-48 h-64 opacity-25 hidden sm:block" />

      {/* Top Navbar */}
      <header className="w-full max-w-4xl flex items-center justify-between mb-6 z-10 px-1 sm:px-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#EDE8E1] text-xs font-bold text-stone-700 hover:text-stone-950 hover:bg-stone-50 shadow-xs transition active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-[#5C3A21]" />
          <span>Back to Home</span>
        </Link>

        <a
          href="https://piyushassudani.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#5C3A21] hover:bg-[#472c19] text-white text-xs font-bold shadow-md shadow-[#5C3A21]/20 transition active:scale-95"
        >
          <Globe className="w-4 h-4 text-amber-200" />
          <span>piyushassudani.in</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </a>
      </header>

      {/* Main Wide Container */}
      <main className="w-full max-w-4xl bg-white border border-[#EDE8E1] rounded-[36px] p-6 sm:p-10 shadow-2xl shadow-stone-300/40 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: DEVELOPER PROFILE & DIRECT CONNECT           */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left border-b lg:border-b-0 lg:border-r border-stone-100 pb-8 lg:pb-0 lg:pr-8">
            {/* Monogram Avatar */}
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#5C3A21] via-[#7B4D2B] to-[#A36C40] p-1.5 shadow-xl shadow-[#5C3A21]/25">
                <div className="w-full h-full bg-[#FAF7F2] rounded-[22px] flex items-center justify-center">
                  <span className="text-3xl font-black text-[#5C3A21] tracking-tighter">
                    PA
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-md">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F3ECE4] text-[#633917] border border-[#E5DACD] mb-2 uppercase tracking-wider">
              <span>Assudani Developer</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Piyush Assudani
            </h1>

            <p className="mt-1 text-sm font-bold text-[#8C6239]">
              Web, Mobile App &amp; Software Developer
            </p>

            <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm">
              Creating custom high-converting smart NFC systems, modern full-stack SaaS portals, mobile applications, and enterprise automation software for retail stores &amp; fast-growing brands.
            </p>

            {/* Official Website Highlight Box */}
            <a
              href="https://piyushassudani.in"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 w-full p-3.5 rounded-2xl bg-[#F9F6F0] hover:bg-[#F3ECE4] border border-[#E5DACD] flex items-center justify-between group transition shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#5C3A21] shadow-2xs">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-stone-500 font-medium block">
                    Official Portfolio Website
                  </span>
                  <span className="text-sm font-black text-[#5C3A21] group-hover:underline">
                    piyushassudani.in
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#8C6239] group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Direct Connect Action Buttons */}
            <div className="w-full mt-5 space-y-2.5">
              <a
                href="https://wa.me/919413879444?text=Hello%20Piyush%2C%20I%20saw%20your%20NFC%20project%20and%20want%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/20 transition active:scale-[0.98]"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 9413879444)</span>
              </a>

              <a
                href="tel:+919413879444"
                className="w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm bg-stone-900 hover:bg-stone-800 text-white flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Call: +91 9413879444</span>
              </a>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: CORE SERVICES GRID & DIGITAL SOLUTIONS      */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-1">
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Our Capabilities</span>
                </span>
                <h2 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight mt-0.5">
                  Core Services &amp; Digital Solutions
                </h2>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Available for Projects
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Service 1: NFC */}
              <div className="p-4 rounded-2xl bg-[#FBF9F5] hover:bg-[#F8F5EE] border border-[#EDE8E1] transition group">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-[#5C3A21] flex items-center justify-center mb-2.5 shadow-2xs">
                  <NfcWaveIcon className="w-5 h-5 text-[#5C3A21]" />
                </div>
                <h3 className="text-sm font-bold text-stone-900 group-hover:text-[#5C3A21] transition-colors">
                  Smart NFC Review Cards
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Zero-contact tap standees &amp; cards for retail stores to generate instant 5-star Google reviews.
                </p>
              </div>

              {/* Service 2: Custom Web Apps */}
              <div className="p-4 rounded-2xl bg-[#FBF9F5] hover:bg-[#F8F5EE] border border-[#EDE8E1] transition group">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2.5 shadow-2xs">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-stone-900 group-hover:text-blue-700 transition-colors">
                  Full-Stack Web Applications
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Next.js, React, Node.js portals, admin management hubs, database backends &amp; custom SaaS.
                </p>
              </div>

              {/* Service 3: Mobile Apps */}
              <div className="p-4 rounded-2xl bg-[#FBF9F5] hover:bg-[#F8F5EE] border border-[#EDE8E1] transition group">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2.5 shadow-2xs">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                  Mobile App Development
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Cross-platform Android &amp; iOS mobile applications built for high speed, offline sync, and user retention.
                </p>
              </div>

              {/* Service 4: Business Automation */}
              <div className="p-4 rounded-2xl bg-[#FBF9F5] hover:bg-[#F8F5EE] border border-[#EDE8E1] transition group">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-2.5 shadow-2xs">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-stone-900 group-hover:text-purple-700 transition-colors">
                  Business Software &amp; Automation
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Custom billing software, WhatsApp CRM automations, lead management, and digital business tools.
                </p>
              </div>

              {/* Service 5: E-commerce */}
              <div className="p-4 rounded-2xl bg-[#FBF9F5] hover:bg-[#F8F5EE] border border-[#EDE8E1] transition group">
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-2.5 shadow-2xs">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-stone-900 group-hover:text-rose-700 transition-colors">
                  E-Commerce &amp; Digital Catalogs
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Fast storefronts, payment gateways, product menus, and direct WhatsApp order pipelines.
                </p>
              </div>

              {/* Service 6: Brand & UI Design */}
              <div className="p-4 rounded-2xl bg-[#FBF9F5] hover:bg-[#F8F5EE] border border-[#EDE8E1] transition group">
                <div className="w-9 h-9 rounded-xl bg-stone-200 text-stone-800 flex items-center justify-center mb-2.5 shadow-2xs">
                  <Palette className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-stone-900 group-hover:text-[#5C3A21] transition-colors">
                  UI/UX &amp; Brand Identities
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Warm, intuitive visual designs, custom logos, print-ready standees, and responsive design systems.
                </p>
              </div>
            </div>

            {/* Bottom Project Banner */}
            <div className="mt-2 p-4 rounded-2xl bg-[#F3ECE4] border border-[#E5DACD] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold text-stone-900 block">
                  Have a project or business requirement?
                </span>
                <span className="text-[11px] text-stone-600">
                  Let&apos;s build something high-impact for your business.
                </span>
              </div>
              <a
                href="https://wa.me/919413879444?text=Hello%20Piyush%2C%20mujhe%20apne%20business%20ke%20liye%20software%20%2F%20website%20discuss%20karna%20hai."
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 rounded-xl bg-[#5C3A21] hover:bg-[#472c19] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition active:scale-95 flex-shrink-0"
              >
                <span>Get Started</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 mb-4 text-center text-xs text-stone-500 font-medium z-10">
        Designed &amp; Developed by{' '}
        <a
          href="https://piyushassudani.in"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-[#5C3A21] hover:underline"
        >
          Piyush Assudani
        </a>{' '}
        • Assudani Developer •{' '}
        <a href="tel:+919413879444" className="hover:underline">
          +91 9413879444
        </a>
      </footer>
    </div>
  );
}
