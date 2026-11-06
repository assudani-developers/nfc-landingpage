import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Globe,
  ExternalLink,
  Code2,
  Smartphone,
  Layers,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  Zap,
} from 'lucide-react';
import { WhatsAppIcon, NfcWaveIcon } from '@/components/icons/BrandIcons';
import { BotanicalLeavesCorner } from '@/components/decorations/LightDecorations';

export const metadata = {
  title: 'Our Other Services | Piyush Assudani - Software & Web Developer',
  description: 'Smart NFC Solutions, Custom Web Apps, Mobile Apps & Business Software by Piyush Assudani (Assudani Developer).',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] text-stone-900 flex flex-col items-center justify-start p-4 sm:p-6 relative overflow-hidden">
      {/* Background Subtle Leaf */}
      <div className="fixed bottom-0 left-0 pointer-events-none z-0">
        <BotanicalLeavesCorner className="w-48 h-48 sm:w-64 sm:h-64" />
      </div>

      {/* Top Back Navigation */}
      <div className="w-full max-w-md flex items-center justify-between mb-4 z-10 px-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-stone-200 text-xs font-semibold text-stone-700 hover:text-stone-950 hover:bg-white shadow-sm transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shop</span>
        </Link>

        <a
          href="https://piyushassudani.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5C3A21] text-white text-xs font-bold hover:bg-[#472c19] shadow-sm transition"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>piyushassudani.in</span>
          <ExternalLink className="w-3 h-3 opacity-80" />
        </a>
      </div>

      {/* Main Developer Profile Card */}
      <div className="w-full max-w-md bg-white border border-[#EDE8E1] rounded-3xl p-6 sm:p-8 shadow-xl shadow-stone-200/60 relative z-10">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          {/* Avatar / Monogram */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#5C3A21] to-[#8C6239] p-1 shadow-lg shadow-[#5C3A21]/20">
              <div className="w-full h-full bg-[#FAF7F2] rounded-[20px] flex items-center justify-center">
                <span className="text-3xl font-black text-[#5C3A21] tracking-tighter">
                  PA
                </span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-md">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F3ECE4] text-[#633917] border border-[#E5DACD] mb-2 uppercase tracking-wider">
            Assudani Developer
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Piyush Assudani
          </h1>

          <p className="mt-1 text-sm font-semibold text-[#8C6239]">
            Web, Mobile App &amp; Software Developer
          </p>

          <p className="mt-2 text-xs text-stone-600 max-w-xs leading-relaxed">
            Crafting premium digital experiences, high-converting smart NFC business solutions, and scalable custom web applications.
          </p>

          {/* Official Website Highlight Box */}
          <a
            href="https://piyushassudani.in"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full p-3.5 rounded-2xl bg-[#F9F6F0] hover:bg-[#F3ECE4] border border-[#E5DACD] flex items-center justify-between group transition shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#5C3A21]">
                <Globe className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-stone-500 font-medium block">
                  Official Portfolio Website
                </span>
                <span className="text-sm font-bold text-[#5C3A21] group-hover:underline">
                  piyushassudani.in
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[#8C6239] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Services Showcase */}
        <div className="mt-6 pt-5 border-t border-stone-100">
          <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 px-1">
            Our Core Services &amp; Solutions
          </h2>

          <div className="space-y-2.5">
            {/* Service 1 */}
            <div className="p-3 rounded-2xl bg-[#FBF9F5] border border-stone-100 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-100/70 text-amber-800 flex-shrink-0">
                <NfcWaveIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-stone-900">
                  Smart NFC Cards &amp; QR Standees
                </h3>
                <p className="text-[11px] text-stone-600 mt-0.5 leading-normal">
                  Turn store visits into 5-star Google reviews, WhatsApp chats, and Instagram followers with zero-contact tap cards.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="p-3 rounded-2xl bg-[#FBF9F5] border border-stone-100 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-100/70 text-blue-800 flex-shrink-0">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-stone-900">
                  Custom Web Applications &amp; Portals
                </h3>
                <p className="text-[11px] text-stone-600 mt-0.5 leading-normal">
                  High performance Next.js, React, full-stack database web apps, admin dashboards, and client portals.
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="p-3 rounded-2xl bg-[#FBF9F5] border border-stone-100 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-100/70 text-emerald-800 flex-shrink-0">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-stone-900">
                  Mobile App Development
                </h3>
                <p className="text-[11px] text-stone-600 mt-0.5 leading-normal">
                  Bespoke iOS and Android mobile applications built for seamless performance and user retention.
                </p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="p-3 rounded-2xl bg-[#FBF9F5] border border-stone-100 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-purple-100/70 text-purple-800 flex-shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-stone-900">
                  Business Software &amp; Automation
                </h3>
                <p className="text-[11px] text-stone-600 mt-0.5 leading-normal">
                  CRM integrations, billing tools, automated workflows, and digital operations tailored to your business.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTAs */}
        <div className="mt-6 pt-5 border-t border-stone-100 space-y-2.5">
          <a
            href="https://wa.me/919999888877?text=Hello%20Piyush%2C%20I%20saw%20your%20NFC%20project%20and%20want%20to%20order%20an%20NFC%20smart%20card%20for%20my%20business"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99]"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Order NFC Smart Card on WhatsApp</span>
          </a>

          <a
            href="https://piyushassudani.in"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-[#5C3A21] hover:bg-[#472c19] text-white flex items-center justify-center gap-2 shadow-sm transition"
          >
            <Globe className="w-4 h-4" />
            <span>Visit piyushassudani.in Website</span>
          </a>
        </div>
      </div>

      {/* Footer Signature */}
      <footer className="mt-6 mb-4 text-center text-xs text-stone-500 font-medium z-10">
        Designed &amp; Developed by{' '}
        <span className="font-bold text-stone-800">Piyush Assudani</span> • Assudani Developer
      </footer>
    </div>
  );
}
