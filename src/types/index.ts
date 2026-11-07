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

export interface ShopClickStats {
  google_review?: number;
  whatsapp?: number;
  instagram?: number;
  facebook?: number;
  website?: number;
  main_button?: number;
  referral?: number;
  [key: string]: number | undefined;
}

export interface Shop {
  id: string;
  slug: string; // e.g. "urban-cafe"
  name: string;
  category: string; // e.g. "Café • Bakery • Beverages"
  tagline: string; // e.g. "Your neighbourhood café for great coffee, fresh bites and good vibes."
  address?: string;
  coverUrl: string; // storefront photo
  coverFit?: 'cover' | 'contain'; // banner fit style (crop to cover or full banner)
  logoUrl: string; // shop logo
  buttonText: string; // e.g. "Visit Our Shop"
  buttonUrl: string; // Google Maps or website or phone URL
  theme: ShopTheme;
  themeColor?: string; // e.g. "#5C3A21"
  rating: number; // e.g. 4.9
  reviewCount: number; // e.g. 384
  links: ShopLink[]; // min 1 (Google review required), max 5
  showReferral?: boolean; // toggle developer credit & referral
  viewsCount: number;
  tapsCount: number;
  referralClicks?: number; // Total referral clicks for "Our Other Services" from this shop
  clickStats?: ShopClickStats; // Detailed breakdown of where clicks happened
  createdAt: number;
  updatedAt: number;
}

export interface AdminUser {
  username: string;
  role: 'superadmin';
  name: string;
  authenticatedAt: number;
}
