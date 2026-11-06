import { getShops } from '@/lib/db';
import ShopPageClient from '@/components/shop/ShopPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Urban Café | TapTap NFC Smart Page',
  description: 'Your neighbourhood café for great coffee, fresh bites and good vibes. Tap to review on Google & connect on WhatsApp.',
};

export default async function HomePage() {
  const shops = await getShops();
  const primaryShop = shops.find((s) => s.slug === 'urban-cafe') || shops[0];

  return <ShopPageClient initialShop={primaryShop} />;
}
