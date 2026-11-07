import { getShops } from '@/lib/db';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  WhatsAppIcon,
  NfcWaveIcon,
} from '@/components/icons/BrandIcons';
import {
  Phone,
  Sparkles,
  Smartphone,
  Star,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Globe,
  Layers,
  Check,
  TrendingUp,
  MapPin,
  Coffee,
  Scissors,
  ShoppingBag,
  Stethoscope,
  Store,
  Shield,
} from 'lucide-react';
import TapSimulator from '@/components/landing/TapSimulator';
import FaqAccordion from '@/components/landing/FaqAccordion';
import MobileStickyBar from '@/components/landing/MobileStickyBar';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Smart NFC Google Review Standees & Tap Cards | TapTap NFC',
  description:
    'Grow your store Google reviews 10x with zero-contact tap standees. Works with iPhone & Android, zero app required. An Assudani Group Product by Piyush Assudani (+91 9413879444).',
};

export default async function HomePage() {
  const shops = await getShops();

  return (
    <div
      className="min-h-screen w-full bg-[#FAF7F2] text-stone-900 flex flex-col items-center justify-start relative selection:bg-amber-200 selection:text-amber-950 font-sans pb-24 sm:pb-16"
      suppressHydrationWarning
    >
      {/* Top Floating Glassmorphism Navbar */}
      <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between z-30 sticky top-0 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-stone-200/60">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-[#5C3A21] flex items-center justify-center shadow-md shadow-[#5C3A21]/20 group-hover:scale-105 transition-transform">
            <NfcWaveIcon className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-black text-sm sm:text-base text-stone-900 tracking-tight">
                TapTap NFC
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F3ECE4] text-[#633917] border border-[#E5DACD]">
                Assudani Group
              </span>
            </div>
            <p className="text-[10px] text-stone-500 font-medium">
              Smart Review &amp; Business Standees
            </p>
          </div>
        </Link>

        {/* Quick Nav & Direct CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:+919413879444"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-xs font-bold text-stone-700 shadow-2xs transition"
          >
            <Phone className="w-3.5 h-3.5 text-[#5C3A21]" />
            <span>+91 9413879444</span>
          </a>

          <a
            href="https://wa.me/919413879444?text=Hello%20Piyush%2C%20mujhe%20apni%20shop%20ke%20liye%20Smart%20NFC%20Google%20Review%20Standee%20order%20karna%20hai."
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#25D366]/20 transition active:scale-95"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Order Standee</span>
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-5xl px-4 sm:px-6 py-6 sm:py-12 flex flex-col items-center text-center z-10 space-y-16 sm:space-y-24">
        {/* ========================================================= */}
        {/* HERO SECTION                                              */}
        {/* ========================================================= */}
        <section className="w-full flex flex-col items-center text-center space-y-6 sm:space-y-8 pt-2 sm:pt-4">
          {/* Top Pill Announcement */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EDE8E1] shadow-xs text-xs font-bold text-stone-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Zero App Needed • 1-Tap Contactless • Works On All Phones</span>
          </div>

          {/* Headline */}
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-stone-900 tracking-tight leading-[1.12]">
              Turn Every Customer Visit Into A{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D97706] via-[#B45309] to-[#5C3A21]">
                5-Star Google Review.
              </span>
            </h1>

            <p className="text-xs sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Customer sirf apna smartphone counter standee par touch karega aur seedhe aapki shop ka{' '}
              <strong className="text-stone-900 font-bold">5-Star Google Review</strong> rating dialog khulega.
              Na koi spelling type karne ka jhanjhat, na shop dhoondhne ka aalas.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto pt-2">
            <a
              href="https://wa.me/919413879444?text=Hello%20Piyush%2C%20mujhe%20bhi%20apni%20shop%20ke%20liye%20Smart%20NFC%20Google%20Review%20Standee%20order%20karna%20hai."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 transition active:scale-[0.98]"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Order Custom Standee on WhatsApp</span>
            </a>

            <a
              href="tel:+919413879444"
              className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-[#5C3A21] hover:bg-[#472c19] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#5C3A21]/25 transition active:scale-[0.98]"
            >
              <Phone className="w-4 h-4 text-amber-200" />
              <span>Call: +91 9413879444</span>
            </a>
          </div>

          {/* Micro Trust Proofs */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-stone-500 font-medium flex-wrap pt-1">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
              <span>iPhone &amp; Android Ready</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
              <span>Zero Monthly Fees</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
              <span>All India Express Delivery</span>
            </span>
          </div>

          {/* HERO VISUAL CENTERPIECE (Photorealistic Acrylic & Gold Standee) */}
          <div className="w-full max-w-3xl pt-4">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-200/60 shadow-2xl shadow-stone-300/60 bg-gradient-to-b from-stone-100 via-white to-amber-50/20 group">
              <Image
                src="/images/hero-standee.webp"
                alt="Smart NFC Google Review Acrylic & Gold Standee on Cafe Counter"
                width={1200}
                height={896}
                priority
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Glassmorphism Floating Overlay Pill */}
              <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 p-3 sm:p-4 rounded-2xl bg-black/60 backdrop-blur-md text-white border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 flex-shrink-0">
                    <NfcWaveIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-white">
                      Crystal Acrylic &amp; Brushed Gold Standee
                    </h4>
                    <p className="text-[10px] sm:text-xs text-stone-300">
                      Dual NFC Chip + HD QR Code • 5-Second Contactless Google Rating
                    </p>
                  </div>
                </div>

                <a
                  href="#simulator"
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white text-stone-900 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-amber-100 transition shadow-sm flex-shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Try Tap Simulator</span>
                </a>
              </div>
            </div>
          </div>

          {/* 4 Core Pillars Grid */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-white border border-[#EDE8E1] shadow-2xs text-left">
              <div className="w-8 h-8 rounded-xl bg-amber-100/70 text-[#5C3A21] flex items-center justify-center mb-2">
                <Zap className="w-4 h-4 text-amber-700" />
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-stone-900">0.5s Fast Read</h3>
              <p className="text-[11px] text-stone-500 mt-0.5">Instant tap response with zero lag.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#EDE8E1] shadow-2xs text-left">
              <div className="w-8 h-8 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-2">
                <Star className="w-4 h-4 fill-emerald-600 text-emerald-600" />
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-stone-900">10x More Reviews</h3>
              <p className="text-[11px] text-stone-500 mt-0.5">Eliminates 99% of customer laziness.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#EDE8E1] shadow-2xs text-left">
              <div className="w-8 h-8 rounded-xl bg-blue-100/70 text-blue-800 flex items-center justify-center mb-2">
                <Smartphone className="w-4 h-4 text-blue-700" />
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-stone-900">Zero App Needed</h3>
              <p className="text-[11px] text-stone-500 mt-0.5">Works natively on iOS &amp; Android.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#EDE8E1] shadow-2xs text-left">
              <div className="w-8 h-8 rounded-xl bg-purple-100/70 text-purple-800 flex items-center justify-center mb-2">
                <Globe className="w-4 h-4 text-purple-700" />
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-stone-900">Dynamic Cloud URL</h3>
              <p className="text-[11px] text-stone-500 mt-0.5">Change phone &amp; links anytime.</p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* INTERACTIVE TAP SIMULATOR SECTION                         */}
        {/* ========================================================= */}
        <section id="simulator" className="w-full flex flex-col items-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-amber-300 text-amber-900 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Try It Yourself Right Now</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Counter Par Customer Ka Experience
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
            Click karke dekhiye ki customer jab apna phone standee par tap karega toh kya hoga:
          </p>

          <div className="w-full pt-4">
            <TapSimulator />
          </div>
        </section>

        {/* ========================================================= */}
        {/* PHYSICAL HARDWARE PRODUCT LINEUP                          */}
        {/* ========================================================= */}
        <section className="w-full flex flex-col items-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-bold">
            <Layers className="w-3.5 h-3.5 text-[#5C3A21]" />
            <span>Custom Hardware Lineup</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Premium Standees &amp; Pocket Cards
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
            High-grade materials, laser-etched precision, built-in NTAG chips aur high-contrast QR code.
          </p>

          {/* Product Lineup Image */}
          <div className="w-full rounded-3xl overflow-hidden border border-[#EDE8E1] shadow-xl bg-white">
            <Image
              src="/images/product-lineup.webp"
              alt="TapTap NFC Standee Product Formats: Walnut Wood, Crystal Acrylic Gold, Matte Black Metal Card"
              width={1376}
              height={768}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* 3 Product Format Descriptions */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 text-left pt-2">
            {/* Format 1: Crystal Acrylic */}
            <div className="p-5 rounded-3xl bg-white border border-[#EDE8E1] shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                    Most Popular
                  </span>
                  <span className="text-xs font-mono font-bold text-stone-400">01</span>
                </div>
                <h3 className="text-base font-extrabold text-stone-900">
                  Crystal Acrylic Counter Standee
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  5mm thick cast acrylic with brushed gold metal base. Official Google 5-star graphic, dual NFC chip inside &amp; HD QR code on back. Ideal for cash counters &amp; billing desks.
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-bold text-stone-800">For: Counters &amp; Receptions</span>
                <a
                  href="https://wa.me/919413879444?text=Hello%20Piyush%2C%20mujhe%20Crystal%20Acrylic%20Standee%20ke%20baare%20mein%20inquire%20karna%20hai."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <span>Inquire</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Format 2: Walnut Wood Block */}
            <div className="p-5 rounded-3xl bg-white border border-[#EDE8E1] shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                    Artisan Wood
                  </span>
                  <span className="text-xs font-mono font-bold text-stone-400">02</span>
                </div>
                <h3 className="text-base font-extrabold text-stone-900">
                  Artisan Walnut Wood Standee
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Solid natural walnut/teak wood block with laser-engraved NFC contactless icon and QR code. Perfect aesthetic for specialty coffee shops, boutique salons &amp; luxury restaurants.
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-bold text-stone-800">For: Cafes &amp; Salons</span>
                <a
                  href="https://wa.me/919413879444?text=Hello%20Piyush%2C%20mujhe%20Walnut%20Wood%20Standee%20ke%20baare%20mein%20inquire%20karna%20hai."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <span>Inquire</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Format 3: Matte Black Metal Card */}
            <div className="p-5 rounded-3xl bg-white border border-[#EDE8E1] shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-stone-900 text-stone-100">
                    Executive
                  </span>
                  <span className="text-xs font-mono font-bold text-stone-400">03</span>
                </div>
                <h3 className="text-base font-extrabold text-stone-900">
                  Matte Black Metal NFC Card
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Ultra-slim matte black stainless steel card with gold smart chip. Keep in your wallet and tap client phones during on-the-go meetings, doctor consultations, or outdoor events.
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-bold text-stone-800">For: Founders &amp; Doctors</span>
                <a
                  href="https://wa.me/919413879444?text=Hello%20Piyush%2C%20mujhe%20Metal%20NFC%20Card%20ke%20baare%20mein%20inquire%20karna%20hai."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <span>Inquire</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* HOW IT SKYROCKETS GOOGLE MAPS RANKING (3-STEP ENGINE)     */}
        {/* ========================================================= */}
        <section className="w-full flex flex-col items-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 text-xs font-bold border border-emerald-200">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
            <span>Local Google Maps SEO Engine</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Google Par Top Ranking Kaisi Milti Hai?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
            Jab customer Google par &ldquo;Best Cafe Near Me&rdquo; ya &ldquo;Top Salon in City&rdquo; search karega, toh Google sabse zyada 5-star reviews wali shop ko pehle dikhata hai.
          </p>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 text-left pt-2">
            <div className="p-6 rounded-3xl bg-white border border-[#EDE8E1] shadow-2xs space-y-3 relative overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-[#5C3A21] font-black text-base">
                1
              </div>
              <h3 className="text-base font-bold text-stone-900">Customer 1-Tap Karega</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Billing ke time customer sirf apna phone standee par touch karega. Zero app, zero search, zero delay.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#EDE8E1] shadow-2xs space-y-3 relative overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 font-black text-base">
                2
              </div>
              <h3 className="text-base font-bold text-stone-900">Direct 5-Star Rating Khulegi</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Phone screen par seedhe 5-star rating window pop up ho jaayegi. Customer 5 second mein review submit kar deta hai.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#EDE8E1] shadow-2xs space-y-3 relative overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-base">
                3
              </div>
              <h3 className="text-base font-bold text-stone-900">Google Maps Par #1 Rank</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Har din 10-20 naye verified reviews aane se aapka business local area mein Google Maps par top par aa jata hai.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* OLD WAY VS TAPTAP NFC COMPARISON                          */}
        {/* ========================================================= */}
        <section className="w-full flex flex-col items-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Purana Tareeqa vs TapTap NFC Standee
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {/* The Old Way */}
            <div className="p-6 rounded-3xl bg-red-50/50 border border-red-200/80 space-y-3">
              <div className="flex items-center gap-2 text-red-700 font-black text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span>Purana Tareeqa (95% Customers Drop Off)</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Aap customer ko bolte hain: &ldquo;Sir please Google par hamara naam search karke review de dijiye.&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Customer spelling galat type karta hai ya aalsi ho kar phone band kar deta hai.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Din bhar mein 50 customers aate hain par review sirf 0 ya 1 milta hai.</span>
                </li>
              </ul>
            </div>

            {/* TapTap NFC Way */}
            <div className="p-6 rounded-3xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-black text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>TapTap NFC Tareeqa (80%+ Review Conversion)</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3] flex-shrink-0 mt-0.5" />
                  <span>Aap sirf bolte hain: &ldquo;Sir apna phone yahan touch kar dijiye.&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3] flex-shrink-0 mt-0.5" />
                  <span>0.5 second mein customer ke phone par 5-Star dialog open ho jata hai.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3] flex-shrink-0 mt-0.5" />
                  <span>Roz 15-25 naye 5-star reviews guaranteed aate hain.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* INDUSTRY VERTICALS (WHO IS THIS FOR?)                     */}
        {/* ========================================================= */}
        <section className="w-full flex flex-col items-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-bold">
            <Store className="w-3.5 h-3.5 text-[#5C3A21]" />
            <span>Built For Every Offline Business</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Har Category Ke Business Ke Liye Perfect
          </h2>

          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-white border border-[#EDE8E1] shadow-2xs space-y-2">
              <div className="w-10 h-10 mx-auto rounded-xl bg-amber-100 flex items-center justify-center text-amber-900">
                <Coffee className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-stone-900">Cafes &amp; Food</h4>
              <p className="text-[10px] text-stone-500">Tables &amp; bill folders par rakhein</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#EDE8E1] shadow-2xs space-y-2">
              <div className="w-10 h-10 mx-auto rounded-xl bg-purple-100 flex items-center justify-center text-purple-900">
                <Scissors className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-stone-900">Salons &amp; Spas</h4>
              <p className="text-[10px] text-stone-500">Styling mirror &amp; billing counter</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#EDE8E1] shadow-2xs space-y-2">
              <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-900">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-stone-900">Doctors &amp; Clinics</h4>
              <p className="text-[10px] text-stone-500">Patient waiting desk &amp; pharmacy</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#EDE8E1] shadow-2xs space-y-2">
              <div className="w-10 h-10 mx-auto rounded-xl bg-blue-100 flex items-center justify-center text-blue-900">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-stone-900">Retail Boutiques</h4>
              <p className="text-[10px] text-stone-500">UPI QR ke bagal mein rakhein</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#EDE8E1] shadow-2xs space-y-2 col-span-2 sm:col-span-1">
              <div className="w-10 h-10 mx-auto rounded-xl bg-rose-100 flex items-center justify-center text-rose-900">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-stone-900">Hotels &amp; Gyms</h4>
              <p className="text-[10px] text-stone-500">Reception &amp; checkout counters</p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* STAND-OUT PACKAGES & PRICING                              */}
        {/* ========================================================= */}
        <section className="w-full flex flex-col items-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Transparent Pricing • One-Time Cost</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Choose Your Standee Package
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
            Zero monthly charges. Free custom logo printing, lifetime cloud URL &amp; all-India delivery.
          </p>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 text-left max-w-3xl pt-2">
            {/* Package 1: Single Standee */}
            <div className="p-6 rounded-3xl bg-white border border-[#EDE8E1] shadow-xs space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Starter Pack
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700">
                    1 Standee
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-stone-900">Counter Standee</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Best for single billing counters, clinics &amp; boutique stores.
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-stone-700 pt-2 border-t border-stone-100">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>1x Crystal Acrylic &amp; Gold Standee</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Custom Shop Logo &amp; QR Code Printed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Dedicated Unique URL (<code>/your-shop</code>)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Admin Panel Access for Live Updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Express Delivery Across India</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <a
                  href="https://wa.me/919413879444?text=Hello%20Piyush%2C%20mujhe%20Starter%20Pack%20(Single%20Counter%20Standee)%20order%20karna%20hai."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Order Starter Pack on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Package 2: Pro Store Combo */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-amber-50/80 via-white to-amber-50/40 border-2 border-amber-300 shadow-xl space-y-5 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#5C3A21] text-amber-200 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-xs">
                Best Value Combo
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    Pro Store Combo
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-stone-900">
                    Counter Standee + Pocket Metal Card
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Counter par standee aur pocket mein metal card on-the-go client meetings ke liye.
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-stone-700 pt-2 border-t border-amber-200/60">
                  <li className="flex items-center gap-2 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    <span><strong>1x Crystal Acrylic Standee</strong> for store counter</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    <span><strong>1x Matte Black Metal Card</strong> with gold chip</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Custom Shop Branding &amp; High-Res QR</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Lifetime Cloud Hosting &amp; Dynamic Links</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Priority Dispatch within 24 Hours</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-amber-200/60">
                <a
                  href="https://wa.me/919413879444?text=Hello%20Piyush%2C%20mujhe%20Pro%20Store%20Combo%20(Standee%20%2B%20Metal%20Card)%20order%20karna%20hai."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/20 transition active:scale-95"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Order Pro Combo on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* LIVE CLIENT SHOP DEMOS (IF ANY CREATED)                   */}
        {/* ========================================================= */}
        {shops && shops.length > 0 && (
          <section className="w-full p-5 sm:p-6 rounded-3xl bg-white border border-[#EDE8E1] shadow-xs text-left max-w-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center text-[#5C3A21]">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-stone-900">
                    Live Client Shop Profiles
                  </h3>
                  <p className="text-[10px] text-stone-500">
                    Test the exact mobile-first card interface delivered to customers.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Active
              </span>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {shops.map((s) => (
                <Link
                  key={s.id}
                  href={`/${s.slug}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F3ECE4] border border-stone-200 text-xs font-bold text-[#5C3A21] transition group shadow-2xs"
                >
                  <span>{s.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#5C3A21]" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* FAQ ACCORDION                                             */}
        {/* ========================================================= */}
        <section className="w-full flex flex-col items-center space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-bold">
            <Shield className="w-3.5 h-3.5 text-[#5C3A21]" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Aapke Sawal, Hamare Jawab
          </h2>

          <div className="w-full pt-1">
            <FaqAccordion />
          </div>
        </section>

        {/* ========================================================= */}
        {/* FINAL ORDER CTA BANNER                                    */}
        {/* ========================================================= */}
        <section className="w-full max-w-3xl bg-gradient-to-br from-[#5C3A21] via-[#4A2B14] to-[#361E0E] text-white rounded-3xl p-7 sm:p-10 shadow-2xl text-center space-y-5 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready To Skyrocket Your Reviews?</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Apni Shop Ke Liye Custom NFC Standee Aaj Hi Banwayein
          </h2>

          <p className="text-xs sm:text-sm text-stone-200 max-w-md mx-auto leading-relaxed">
            Fast setup, customized logo printing, zero recurring charges. Seedhe WhatsApp par message karke apna standee book karein:
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/919413879444?text=Hello%20Piyush%2C%20mujhe%20apni%20shop%20ke%20liye%20Smart%20NFC%20Google%20Review%20Standee%20order%20karna%20hai."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3.5 px-7 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/30 transition active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Order on WhatsApp: +91 9413879444</span>
            </a>

            <a
              href="tel:+919413879444"
              className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-white/15 hover:bg-white/20 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition"
            >
              <Phone className="w-4 h-4 text-amber-200" />
              <span>Call Piyush Assudani</span>
            </a>
          </div>
        </section>

        {/* ========================================================= */}
        {/* ATTACHED DEVELOPER CREDIT & SERVICES CARD                 */}
        {/* ========================================================= */}
        <section className="w-full max-w-md pt-2 border-t border-stone-200">
          <div className="w-full rounded-2xl bg-white border border-[#EDE8E1] shadow-xs overflow-hidden transition group hover:border-stone-300">
            {/* Top: Our Other Services Clickable Link */}
            <Link
              href="/services"
              className="w-full py-3 px-4 bg-white hover:bg-stone-50/90 flex items-center justify-between transition group-hover:bg-[#FAF7F2]/60"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-xs text-stone-900">
                  Our Other Services &amp; Digital Solutions
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#5C3A21] font-bold text-xs">
                <span>View</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            {/* Bottom: Attached Developer Credits & Phone */}
            <div className="px-4 py-2.5 bg-[#FAF7F2] border-t border-[#EDE8E1] text-center flex flex-col items-center gap-1">
              <div className="text-[11px] text-stone-600 font-medium">
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

              <div className="flex items-center justify-center gap-2.5 text-[11px] text-stone-500 font-medium flex-wrap">
                <a
                  href="tel:+919413879444"
                  className="inline-flex items-center gap-1 text-[#5C3A21] hover:underline font-semibold"
                >
                  <span>📞 +91 9413879444</span>
                </a>
                <span className="text-stone-300">•</span>
                <a
                  href="https://wa.me/919413879444?text=Hello%20Piyush%2C%20I%20saw%20your%20TapTap%20NFC%20project."
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
            </div>
          </div>

          <div className="pt-3 text-center">
            <Link
              href="/admin/piyush"
              className="text-[10px] text-stone-400 hover:text-stone-700 transition font-mono inline-flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3 h-3 text-stone-400" />
              <span>Admin Management Hub</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Floating Sticky Mobile Bottom Conversion Bar */}
      <MobileStickyBar />
    </div>
  );
}
