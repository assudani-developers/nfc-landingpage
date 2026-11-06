export type LinkType = 'google_review' | 'instagram' | 'whatsapp' | 'facebook' | 'website';

export interface ShopLink {
  id: string;
  type: LinkType;
  title: string;
  url: string;
  subtitle?: string;
  featured?: boolean;
}

export type ShopTheme = 'warm_cafe' | 'gold' | 'emerald' | 'sunset' | 'sage' | 'classic';

export interface Shop {
  id: string;
  slug: string; // e.g. "urban-cafe"
  name: string;
  tagline: string;
  category: string; // e.g. "Café • Bakery • Beverages"
  address?: string;
  description?: string;
  logoUrl: string;
  coverUrl?: string; // storefront header image
  mapUrl?: string; // Google Maps visit location link
  visitButtonText?: string; // e.g. "Visit Our Shop"
  theme: ShopTheme;
  rating: number; // e.g. 4.9
  reviewCount: number; // e.g. 248
  links: ShopLink[]; // min 1 (Google review required), max 5
  viewsCount: number;
  tapsCount: number;
  createdAt: number;
  updatedAt: number;
}

export interface AdminUser {
  username: string;
  role: 'superadmin';
  name: string;
  authenticatedAt: number;
}
