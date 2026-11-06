import { getShops } from '@/lib/db';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  GoogleReviewIcon,
  WhatsAppIcon,
  InstagramIcon,
  NfcWaveIcon,
} from '@/components/icons/BrandIcons';
import {
  Phone,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Star,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Globe,
  Layers,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Smart NFC Google Review Cards & Standees | Assudani Group Product',
  description:
    'Grow your store reviews 10x with zero-contact tap cards. An Assudani Group Product by Piyush Assudani (+91 9413879444).',
};

export default async function HomePage() {
  const shops = await getShops();

  return (
    <div
      className="min-h-screen w-full bg-[#FAF7F2] text-stone-900 flex flex-col items-center justify-start relative selection:bg-amber-200 selection:text-amber-950 font-sans"
      suppressHydrationWarning
    >
      {/* Top Navbar */}
      <header className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#5C3A21] flex items-center justify-center shadow-md shadow-[#5C3A21]/20">
            <NfcWaveIcon className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base text-stone-900 tracking-tight">
                TapTap NFC
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F3ECE4] text-[#633917] border border-[#E5DACD]">
                Assudani Group Product
              </span>
            </div>
            <p className="text-[10px] text-stone-500 font-medium">
              Smart Review &amp; Business Standees
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:+919413879444"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-xs font-semibold text-stone-700 shadow-xs transition"
          >
            <Phone className="w-3.5 h-3.5 text-[#5C3A21]" />
            <span>+91 9413879444</span>
          </a>

          <a
            href="https://wa.me/919413879444?text=Hello%20Piyush%2C%20mujhe%20apni%20shop%20ke%20liye%20Smart%20NFC%20Google%20Review%20Card%20order%20karna%20hai."
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition active:scale-95"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>Order Card</span>
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-2xl px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center text-center z-10 space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EDE8E1] shadow-xs text-xs font-semibold text-stone-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Assudani Group Product • By Piyush Assudani</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
            Smart NFC Google Review <br className="hidden sm:inline" />
            Cards &amp; QR Standees
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
            Customer sirf apna phone tap karega aur seedhe aapki shop ka{' '}
            <strong className="text-stone-900 font-bold">5-Star Google Review</strong>{' '}
            page khulega. Na spelling type karne ka jhanjhat, na shop dhoondhne ki tension.
          </p>

          {/* Direct CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto">
            <a
              href="https://wa.me/919413879444?text=Hello%20Piyush%2C%20mujhe%20bhi%20apni%20shop%20ke%20liye%20Smart%20NFC%20Google%20Review%20Card%20order%20karna%20hai."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition active:scale-[0.98]"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Apply / Order on WhatsApp</span>
            </a>

            <a
              href="tel:+919413879444"
              className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-[#5C3A21] hover:bg-[#472c19] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#5C3A21]/20 transition active:scale-[0.98]"
            >
              <Phone className="w-4 h-4 text-amber-200" />
              <span>Call: +91 9413879444</span>
            </a>
          </div>
        </div>

        {/* Live Visual Demo Card (Cafe / Retail Store Mockup) */}
        <div className="w-full max-w-sm bg-white border border-[#EDE8E1] rounded-3xl p-5 shadow-xl shadow-stone-200/60 text-left relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Kaise Kaam Karta Hai?</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              1-Tap Contactless
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#EDE8E1]">
              <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center flex-shrink-0 text-[#5C3A21]">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-stone-900 block">1. Customer Phone Touch Karega</span>
                <span className="text-stone-500 text-[11px]">
                  Kisi bhi smartphone (Android / iPhone) par NFC standee touch karte hi link khulta hai.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#EDE8E1]">
              <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center flex-shrink-0">
                <GoogleReviewIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-stone-900 block">2. Seedhe 5-Star Rating Box</span>
                <span className="text-stone-500 text-[11px]">
                  Customer ke samne seedhe Google Reviews 5-star rate karne ka prompt aa jata hai.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#EDE8E1]">
              <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center flex-shrink-0 text-emerald-600">
                <WhatsAppIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-stone-900 block">3. Saare Links Ek Jagah</span>
                <span className="text-stone-500 text-[11px]">
                  Google Reviews, WhatsApp appointments, Instagram reels aur shop map ek hi page par.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights (Simple & Honest - Zero Fake Claims) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <div className="p-4 rounded-2xl bg-white border border-[#EDE8E1] shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-amber-100/70 text-[#5C3A21] flex items-center justify-center mb-2.5">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-stone-900">
              Zyada Google Reviews &amp; Trust
            </h3>
            <p className="text-[11px] text-stone-500 mt-1 leading-normal">
              Customers review dena chahte hain par search karne mein aalsi hote hain. 1-tap card se review rate badh jaata hai.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#EDE8E1] shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-2.5">
              <Smartphone className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-stone-900">
              No App Required (100% Free for Customer)
            </h3>
            <p className="text-[11px] text-stone-500 mt-1 leading-normal">
              Customer ko koi naya app install nahi karna padta. Saare Android aur iPhone mein NFC built-in hota hai.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#EDE8E1] shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-blue-100/70 text-blue-800 flex items-center justify-center mb-2.5">
              <Globe className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-stone-900">
              Aapka Dedicated Custom URL
            </h3>
            <p className="text-[11px] text-stone-500 mt-1 leading-normal">
              Aapke shop ke naam ka unique link (e.g. <code>/{'{your-shop}'}</code>) jise WhatsApp par bhi share kar sakte hain.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#EDE8E1] shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-purple-100/70 text-purple-800 flex items-center justify-center mb-2.5">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-stone-900">
              Admin se Instant Update
            </h3>
            <p className="text-[11px] text-stone-500 mt-1 leading-normal">
              Phone number ya menu change ho toh standee change nahi karna padega. Database se 1 click mein update ho jayega.
            </p>
          </div>
        </div>

        {/* Active Demo Shops (if any created in admin) */}
        {shops && shops.length > 0 && (
          <div className="w-full p-4 rounded-3xl bg-white border border-[#EDE8E1] shadow-xs text-left">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#5C3A21]" />
                <h3 className="text-xs font-bold text-stone-900">Live Client Shop Demos</h3>
              </div>
              <span className="text-[10px] text-stone-400 font-medium">Click to test card</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {shops.map((s) => (
                <Link
                  key={s.id}
                  href={`/${s.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3ECE4] border border-stone-200 text-xs font-bold text-[#5C3A21] transition group"
                >
                  <span>{s.name}</span>
                  <ExternalLink className="w-3 h-3 text-stone-400 group-hover:text-[#5C3A21]" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Order / Inquiry Card */}
        <div className="w-full bg-gradient-to-br from-[#5C3A21] to-[#432714] text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Order Your Smart NFC Standee</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Apne Business Ke Liye NFC Card Order Karein
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
            Fast setup, custom printed standee with your shop logo &amp; colors. Direct WhatsApp ya phone call par order karein:
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/919413879444?text=Hello%20Piyush%2C%20mujhe%20apni%20shop%20ke%20liye%20Smart%20NFC%20Google%20Review%20Card%20order%20karna%20hai."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Order on WhatsApp: +91 9413879444</span>
            </a>

            <a
              href="tel:+919413879444"
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-white/15 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              <Phone className="w-4 h-4 text-amber-200" />
              <span>Call: +91 9413879444</span>
            </a>
          </div>
        </div>

        {/* Referral & Developer Credit */}
        <div className="w-full pt-4 border-t border-stone-200 flex flex-col items-center text-center space-y-2">
          <Link
            href="/services"
            className="w-full max-w-md py-3 px-4 rounded-2xl bg-white hover:bg-stone-50 border border-[#EDE8E1] text-xs font-semibold text-stone-800 shadow-xs flex items-center justify-between transition group hover:border-stone-300 active:scale-[0.99]"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-stone-900">Our Other Services &amp; Digital Solutions</span>
            </div>
            <div className="flex items-center gap-1 text-[#5C3A21] font-bold">
              <span>View</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          <div className="text-[11px] text-stone-600 font-medium pt-1">
            Designed &amp; Developed by{' '}
            <a
              href="https://piyushassudani.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#5C3A21] hover:underline"
            >
              Piyush Assudani
            </a>{' '}
            <span className="text-stone-400">(Assudani Developer)</span>
          </div>

          <div className="flex items-center justify-center gap-3 text-[11px] text-stone-500 font-medium">
            <a
              href="tel:+919413879444"
              className="inline-flex items-center gap-1 text-[#5C3A21] hover:underline font-semibold"
            >
              <span>📞 +91 9413879444</span>
            </a>
            <span className="text-stone-300">•</span>
            <a
              href="https://wa.me/919413879444?text=Hello%20Piyush%2C%20I%20saw%20your%20NFC%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline font-semibold"
            >
              WhatsApp
            </a>
            <span className="text-stone-300">•</span>
            <a
              href="https://piyushassudani.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-600 hover:text-stone-900 hover:underline"
            >
              piyushassudani.in
            </a>
          </div>

          <div className="pt-2">
            <Link
              href="/admin/piyush"
              className="text-[10px] text-stone-400 hover:text-stone-700 transition font-mono flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3 h-3 text-stone-400" />
              <span>Admin Management Hub</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
