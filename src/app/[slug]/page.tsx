import { Metadata } from 'next';
import { getShopBySlug } from '@/lib/db';
import DynamicShopClientView from './DynamicShopClientView';

export const dynamic = 'force-dynamic';

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
      title: 'Shop | TapTap NFC',
      description: 'Tap or scan to leave a Google review and connect with this store.',
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

  return <DynamicShopClientView slug={slug} serverShop={shop} />;
}
