import { MetadataRoute } from 'next';
import { getShops } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://assudanideveloper-nfc.vercel.app';
  const shops = await getShops();

  const shopRoutes: MetadataRoute.Sitemap = shops.map((s) => ({
    url: `${baseUrl}/${s.slug}`,
    lastModified: new Date(s.updatedAt || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...shopRoutes,
  ];
}
