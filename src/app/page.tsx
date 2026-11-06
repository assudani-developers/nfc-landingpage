import { getShops } from '@/lib/db';
import ShopPageClient from '@/components/shop/ShopPageClient';
import { Metadata } from 'next';
import Link from 'next/link';
import { NfcWaveIcon } from '@/components/icons/BrandIcons';
import { PlusCircle, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'TapTap NFC | Smart Shop Card & Review Portal',
  description: 'Instant NFC & QR Code Smart Landing Pages for modern stores and businesses.',
};

export default async function HomePage() {
  const shops = await getShops();

  if (!shops || shops.length === 0) {
    return (
      <div
        className="min-h-screen w-full bg-[#FAF7F2] text-stone-900 flex flex-col items-center justify-center p-6 text-center font-sans"
        suppressHydrationWarning
      >
        <div className="w-full max-w-md bg-white border border-[#EDE8E1] rounded-3xl p-8 shadow-xl shadow-stone-200/60 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-[#5C3A21] flex items-center justify-center mb-4 shadow-md shadow-[#5C3A21]/20">
            <NfcWaveIcon className="w-8 h-8 text-amber-200" />
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F3ECE4] text-[#633917] border border-[#E5DACD] mb-3">
            Admin Panel Ready &amp; Clean
          </span>

          <h1 className="text-2xl font-black text-stone-900 tracking-tight mb-2">
            TapTap NFC Portal
          </h1>

          <p className="text-xs text-stone-600 max-w-xs mb-6 leading-relaxed">
            Your platform is live and clean. No shop cards are configured yet. Log in to the admin panel to add your first client&apos;s shop.
          </p>

          <Link
            href="/admin/piyush"
            className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-[#5C3A21] hover:bg-[#472c19] text-white flex items-center justify-center gap-2 shadow-md shadow-[#5C3A21]/20 transition active:scale-[0.99]"
          >
            <ShieldCheck className="w-4 h-4 text-amber-200" />
            <span>Open Admin Panel (/admin/piyush)</span>
          </Link>
        </div>
      </div>
    );
  }

  const primaryShop = shops[0];
  return <ShopPageClient initialShop={primaryShop} />;
}
