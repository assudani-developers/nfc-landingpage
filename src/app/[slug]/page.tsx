import { Metadata } from 'next';
import { getShopBySlug, getShops } from '@/lib/db';
import ShopPageClient from '@/components/shop/ShopPageClient';
import Link from 'next/link';
import { NfcWaveIcon } from '@/components/icons/BrandIcons';
import { AlertCircle, ArrowLeft } from 'lucide-react';

interface ShopPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ShopPageProps): Promise<Metadata> {
  const { slug } = await params;
  const shop = await getShopBySlug(slug);

  if (!shop) {
    return {
      title: 'Shop Not Found | TapTap NFC',
      description: 'The requested NFC shop page does not exist or has been moved.',
    };
  }

  return {
    title: `${shop.name} | Official NFC Card & Reviews`,
    description: `${shop.tagline} • Tap or scan to leave a Google review and connect on WhatsApp & Instagram.`,
    openGraph: {
      title: shop.name,
      description: shop.tagline,
      images: [
        {
          url: shop.logoUrl,
          width: 600,
          height: 600,
          alt: shop.name,
        },
      ],
    },
  };
}

export default async function DynamicShopPage({ params }: ShopPageProps) {
  const { slug } = await params;
  const shop = await getShopBySlug(slug);

  if (!shop) {
    return (
      <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-rose-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Shop NFC Card Not Found</h1>
        <p className="text-sm text-slate-400 max-w-sm mb-6">
          No active business is configured at the URL &ldquo;/{slug}&rdquo;. The link may have changed or has not been added in the admin panel yet.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go to TapTap NFC Home</span>
          </Link>
          <Link
            href="/admin/piyush"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition"
          >
            <span>Open Admin Panel</span>
          </Link>
        </div>
      </div>
    );
  }

  return <ShopPageClient initialShop={shop} />;
}

