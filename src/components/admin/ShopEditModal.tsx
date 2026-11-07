'use client';

import React, { useState } from 'react';
import { Shop, ShopLink, LinkType, ShopTheme } from '@/types';
import { LocalBrandIcon, NfcWaveIcon } from '@/components/icons/BrandIcons';
import { compressAndConvertToBase64 } from '@/lib/imageUtils';
import {
  X,
  Plus,
  Trash2,
  Save,
  Link as LinkIcon,
  AlertCircle,
  Palette,
  Upload,
  Camera,
  ImageIcon,
} from 'lucide-react';

interface ShopEditModalProps {
  initialShop?: Shop | null;
  onSave: (shop: Shop) => Promise<void>;
  onClose: () => void;
}

const PRESET_LOGOS = [
  { label: 'Artisan Cafe', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&auto=format&fit=crop&q=80' },
  { label: 'Luxury Salon', url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&auto=format&fit=crop&q=80' },
  { label: 'Fine Jewellery', url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&auto=format&fit=crop&q=80' },
  { label: 'Boutique Store', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&auto=format&fit=crop&q=80' },
  { label: 'Bakery & Sweets', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80' },
  { label: 'Dental Clinic', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=300&auto=format&fit=crop&q=80' },
];

const PRESET_COVERS = [
  { label: 'Urban Cafe Storefront', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&auto=format&fit=crop&q=80' },
  { label: 'Luxury Salon Studio', url: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=900&auto=format&fit=crop&q=80' },
  { label: 'Jewellers Showroom', url: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=900&auto=format&fit=crop&q=80' },
  { label: 'Boutique Fashion Front', url: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=900&auto=format&fit=crop&q=80' },
];

const COLOR_PRESETS: { name: string; color: string; theme: ShopTheme }[] = [
  { name: 'Warm Cafe', color: '#5C3A21', theme: 'warm_cafe' },
  { name: 'Caramel Amber', color: '#854D0E', theme: 'gold' },
  { name: 'Forest Matcha', color: '#1E4D36', theme: 'emerald' },
  { name: 'Terracotta', color: '#9F3A29', theme: 'sunset' },
  { name: 'Modern Charcoal', color: '#18181B', theme: 'classic' },
  { name: 'Royal Indigo', color: '#1E3A8A', theme: 'classic' },
];

// Helper functions for clean Indian 10-digit WhatsApp phone numbers
function extractCleanIndianPhone(input: string): string {
  let digits = input.replace(/\D/g, '');
  // If user pasted, typed extra country code, or had multiplied prefixes, take last 10 digits
  if (digits.length > 10) {
    digits = digits.slice(-10);
  }
  return digits;
}

function parseWhatsAppUrl(url: string) {
  try {
    if (!url) return { phone: '', msg: '' };
    const raw = url.replace(/^(https?:\/\/)?(wa\.me\/|api\.whatsapp\.com\/send\?phone=)/i, '');
    const [numPart, query] = raw.split('?');
    let phone = numPart ? numPart.replace(/\D/g, '') : '';
    // Strip country code 91 or take last 10 digits
    if (phone.length > 10) {
      phone = phone.slice(-10);
    }
    let msg = '';
    if (query) {
      const searchParams = new URLSearchParams(query);
      msg = searchParams.get('text') || '';
    }
    return { phone, msg };
  } catch {
    return { phone: '', msg: '' };
  }
}

function buildWhatsAppUrl(phone: string, msg?: string) {
  const cleanPhone = extractCleanIndianPhone(phone);
  if (!cleanPhone) return 'https://wa.me/';
  const fullPhone = `91${cleanPhone}`;
  if (msg && msg.trim()) {
    return `https://wa.me/${fullPhone}?text=${encodeURIComponent(msg.trim())}`;
  }
  return `https://wa.me/${fullPhone}`;
}

const DEFAULT_GOOGLE_REVIEW_LINK: ShopLink = {
  id: 'link-review-default',
  type: 'google_review',
  title: 'Google Reviews',
  subtitle: '⭐ Tap to rate 5 stars',
  url: '',
  featured: true,
};

let uniqueLinkSequence = 0;
function getNextLinkId(type: string): string {
  uniqueLinkSequence += 1;
  return `link-${type}-${uniqueLinkSequence}`;
}

export default function ShopEditModal({
  initialShop,
  onSave,
  onClose,
}: ShopEditModalProps) {
  const isEditing = Boolean(initialShop?.id);

  const [name, setName] = useState(initialShop?.name || '');
  const [slug, setSlug] = useState(initialShop?.slug || '');
  const [tagline, setTagline] = useState(initialShop?.tagline || '');
  const [category, setCategory] = useState(initialShop?.category || '');
  const [address, setAddress] = useState(initialShop?.address || '');
  const [buttonText, setButtonText] = useState(initialShop?.buttonText || 'Visit Our Shop');
  const [buttonUrl, setButtonUrl] = useState(initialShop?.buttonUrl || '');
  const [themeColor, setThemeColor] = useState(initialShop?.themeColor || '#5C3A21');
  const [showReferral, setShowReferral] = useState(initialShop?.showReferral !== false);
  const [coverUrl, setCoverUrl] = useState(initialShop?.coverUrl || '');
  const [coverFit, setCoverFit] = useState<'cover' | 'contain'>(initialShop?.coverFit || 'cover');
  const [coverPositionY, setCoverPositionY] = useState<number>(initialShop?.coverPositionY ?? 50);
  const [coverPositionX, setCoverPositionX] = useState<number>(initialShop?.coverPositionX ?? 50);
  const [coverScale, setCoverScale] = useState<number>(initialShop?.coverScale ?? 100);
  const [logoUrl, setLogoUrl] = useState(initialShop?.logoUrl || '');
  const [theme, setTheme] = useState<ShopTheme>(initialShop?.theme || 'warm_cafe');

  const initialLinks = initialShop?.links && initialShop.links.length > 0
    ? initialShop.links
    : [DEFAULT_GOOGLE_REVIEW_LINK];

  const [links, setLinks] = useState<ShopLink[]>(initialLinks);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-slugify on name change if creating new
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditing) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generatedSlug);
    }
  };

  const handleAddLink = (type: LinkType) => {
    if (links.length >= 5) {
      setError('Maximum 5 links allowed per shop card.');
      return;
    }
    setError(null);

    let title = 'Visit Us';
    let subtitle = '';
    let url = 'https://';

    switch (type) {
      case 'instagram':
        title = 'Instagram';
        subtitle = 'Follow us on Instagram';
        url = '';
        break;
      case 'facebook':
        title = 'Facebook';
        subtitle = 'Follow our official page';
        url = '';
        break;
      case 'whatsapp':
        title = 'WhatsApp';
        subtitle = 'Book appointment & inquiries';
        url = 'https://wa.me/';
        break;
      case 'website':
        title = 'Website';
        subtitle = 'Official site & catalog';
        url = '';
        break;
      case 'google_review':
        title = 'Google Reviews';
        subtitle = '⭐ Tap to rate 5 stars';
        url = '';
        break;
    }

    const newLink: ShopLink = {
      id: getNextLinkId(type),
      type,
      title,
      subtitle,
      url,
    };

    setLinks([...links, newLink]);
  };

  const handleUpdateLink = (id: string, updates: Partial<ShopLink>) => {
    setLinks(links.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  };

  const handleRemoveLink = (id: string) => {
    const target = links.find((l) => l.id === id);
    if (target?.type === 'google_review' && links.filter((l) => l.type === 'google_review').length === 1) {
      setError('Google Review link is mandatory (at least 1 review link required).');
      return;
    }
    setError(null);
    setLinks(links.filter((l) => l.id !== id));
  };

  const handleCustomLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64Data = await compressAndConvertToBase64(file, 400, 400, 0.85);
        setLogoUrl(base64Data);
      } catch (err) {
        console.error('Failed to compress logo:', err);
      }
    }
  };

  const handleCustomCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64Data = await compressAndConvertToBase64(file, 1000, 600, 0.82);
        setCoverUrl(base64Data);
      } catch (err) {
        console.error('Failed to compress cover:', err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your Shop Name at the top.');
      const nameEl = document.getElementById('biz_shop_name');
      if (nameEl) {
        nameEl.focus();
        nameEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    let finalSlug = slug.trim();
    if (!finalSlug) {
      finalSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '-')
        .replace(/^-+|-+$/g, '') || 'shop';
      setSlug(finalSlug);
    }

    setIsSubmitting(true);
    setError(null);

    // Normalize and clean all links
    const cleanedLinks: ShopLink[] = [];
    for (const link of links) {
      let finalUrl = (link.url || '').trim();

      if (link.type === 'whatsapp') {
        const parsed = parseWhatsAppUrl(finalUrl);
        if (!parsed.phone) {
          continue; // skip if phone wasn't filled
        }
        finalUrl = buildWhatsAppUrl(parsed.phone, parsed.msg);
      } else if (link.type === 'google_review') {
        if (!finalUrl || finalUrl === 'https://...' || finalUrl === 'https://') {
          // Auto-generate Google Search Review URL
          finalUrl = `https://www.google.com/search?q=${encodeURIComponent(name.trim() + ' reviews')}`;
        } else if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
          finalUrl = `https://${finalUrl}`;
        }
      } else {
        // Social / Website links
        if (!finalUrl || finalUrl === 'https://' || finalUrl === 'https://...') {
          continue; // skip empty links
        }
        if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
          finalUrl = `https://${finalUrl}`;
        }
      }

      cleanedLinks.push({
        ...link,
        url: finalUrl,
      });
    }

    // Ensure at least one review or primary link exists
    if (cleanedLinks.length === 0) {
      cleanedLinks.push({
        id: 'link-review-default',
        type: 'google_review',
        title: 'Google Reviews',
        subtitle: '⭐ Tap to rate 5 stars',
        url: `https://www.google.com/search?q=${encodeURIComponent(name.trim() + ' reviews')}`,
        featured: true,
      });
    }

    try {
      const shopToSave: Shop = {
        id: initialShop?.id || `shop-${Date.now()}`,
        name: name.trim(),
        slug: finalSlug.toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/^-+|-+$/g, ''),
        tagline: tagline.trim() || 'Welcome to our store',
        category: category.trim() || 'Store',
        address: address.trim(),
        buttonText: buttonText.trim() || 'Visit Our Shop',
        buttonUrl: buttonUrl.trim() || `https://maps.google.com/?q=${encodeURIComponent(name)}`,
        themeColor: themeColor || '#5C3A21',
        coverUrl: coverUrl.trim() || PRESET_COVERS[0].url,
        coverFit,
        coverPositionY,
        coverPositionX,
        coverScale,
        logoUrl: logoUrl.trim() || PRESET_LOGOS[0].url,
        theme,
        rating: initialShop?.rating || 4.9,
        reviewCount: initialShop?.reviewCount || 150,
        showReferral,
        links: cleanedLinks,
        viewsCount: initialShop?.viewsCount || 0,
        tapsCount: initialShop?.tapsCount || 0,
        createdAt: initialShop?.createdAt || Date.now(),
        updatedAt: Date.now(),
      };

      await onSave(shopToSave);
      onClose();
    } catch (err: unknown) {
      setError((err as Error)?.message || 'Failed to save shop card. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableTypesToAdd: LinkType[] = (['instagram', 'facebook', 'whatsapp', 'website'] as LinkType[]).filter(
    (type) => !links.some((l) => l.type === type)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-[#EDE8E1] rounded-[28px] sm:rounded-[32px] max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden animate-in fade-in duration-150"
        autoComplete="off"
        noValidate
        data-lpignore="true"
      >
        {/* Pinned Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5 border-b border-stone-200 bg-white z-20 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#5C3A21] flex items-center justify-center shadow-md shadow-[#5C3A21]/20 flex-shrink-0">
              <NfcWaveIcon className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                {isEditing ? `Edit Shop: ${initialShop?.name}` : 'Add New NFC Shop Card'}
              </h2>
              <p className="text-[11px] sm:text-xs text-stone-500">
                Configure storefront banner, logo, business details &amp; smart review links.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition active:scale-95"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 sm:px-8 sm:py-6 space-y-6">
          {/* Honeypot fields to absorb browser password managers */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <input type="text" name="chrome_prevent_autofill_username" tabIndex={-1} autoComplete="off" />
            <input type="password" name="chrome_prevent_autofill_password" tabIndex={-1} autoComplete="new-password" />
          </div>

          {/* Top Error Alert if any */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              <span className="font-semibold">{error}</span>
            </div>
          )}

          {/* Section 1: Basic Info & Custom URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center justify-between">
                <span>Shop Name *</span>
                <span className="text-[10px] text-stone-400 font-normal">Business or Brand Name</span>
              </label>
              <input
                id="biz_shop_name"
                type="text"
                name="biz_shop_name"
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
                data-form-type="other"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. The Urban Café or Assudani Stores"
                className={`w-full bg-[#FAF7F2] border rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none transition ${
                  error && !name.trim()
                    ? 'border-rose-500 ring-2 ring-rose-200 bg-rose-50/30'
                    : 'border-stone-200 focus:border-[#5C3A21] focus:bg-white'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center justify-between">
                <span>Custom URL Slug *</span>
                <span className="text-[10px] text-stone-400 font-normal">Unique NFC Link</span>
              </label>
              <div className="flex items-center bg-[#FAF7F2] border border-stone-200 rounded-xl overflow-hidden focus-within:border-[#5C3A21] focus-within:bg-white transition">
                <span className="px-3 text-xs text-stone-500 bg-stone-100 border-r border-stone-200 py-2.5 font-medium">
                  /
                </span>
                <input
                  type="text"
                  name="biz_shop_slug"
                  autoComplete="off"
                  data-lpignore="true"
                  data-1p-ignore="true"
                  data-form-type="other"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                  placeholder="urban-cafe"
                  className="w-full bg-transparent px-3 py-2 text-sm text-[#5C3A21] font-mono font-bold placeholder-stone-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Category / Subtitle
              </label>
              <input
                type="text"
                name="biz_shop_category"
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
                data-form-type="other"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Café • Bakery • Beverages"
                className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#5C3A21] focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Tagline / Description
              </label>
              <input
                type="text"
                name="biz_shop_tagline"
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
                data-form-type="other"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Your neighbourhood café for great coffee & good vibes."
                className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#5C3A21] focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Store Location / Address (Optional)
              </label>
              <input
                type="text"
                name="biz_shop_address"
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
                data-form-type="other"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Main Market, City"
                className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#5C3A21] focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Bottom Main Button Text
              </label>
              <input
                type="text"
                name="biz_shop_button_text"
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
                data-form-type="other"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                placeholder="e.g. Visit Our Shop"
                className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#5C3A21] focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Main Button Link URL (Google Maps / Contact)
              </label>
              <input
                type="url"
                name="biz_shop_button_url"
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
                data-form-type="other"
                value={buttonUrl}
                onChange={(e) => setButtonUrl(e.target.value)}
                placeholder="https://maps.google.com/?q=..."
                className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#5C3A21] focus:bg-white transition font-mono"
              />
            </div>
          </div>

          {/* Section 2: Theme Color Palette */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#5C3A21]" />
                <span>Theme &amp; Button Color</span>
              </span>
              <span className="text-[11px] font-mono text-stone-500">{themeColor}</span>
            </label>

            <div className="flex items-center gap-2 flex-wrap mb-2">
              {COLOR_PRESETS.map((preset) => (
                <button
                  type="button"
                  key={preset.color}
                  onClick={() => {
                    setThemeColor(preset.color);
                    setTheme(preset.theme);
                  }}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition ${
                    themeColor === preset.color
                      ? 'border-stone-800 bg-white ring-1 ring-stone-800'
                      : 'border-stone-200 bg-[#FAF7F2] hover:bg-stone-100'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-xs"
                    style={{ backgroundColor: preset.color }}
                  />
                  <span>{preset.name}</span>
                </button>
              ))}

              <div className="flex items-center gap-1.5 ml-auto">
                <span className="text-xs text-stone-500">Custom:</span>
                <input
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-stone-200 p-0.5 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Storefront Cover Photo (Gallery Upload + Presets) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-[#5C3A21]" />
                <span>Storefront Cover Photo (Wave Banner)</span>
              </label>
              <span className="text-[11px] text-stone-500 font-medium">Direct Gallery Upload or Presets</span>
            </div>

            {/* Direct Gallery Upload Trigger Card */}
            <div className="p-3.5 rounded-2xl border-2 border-dashed border-[#5C3A21]/30 hover:border-[#5C3A21] bg-[#FAF7F2] hover:bg-[#F3ECE4] transition group flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#5C3A21] shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Upload className="w-5 h-5 text-[#5C3A21]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900">
                      Upload Cover Photo from Gallery / Device
                    </span>
                    {coverUrl.startsWith('data:image') && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Custom Upload Active ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Select photo from phone camera, gallery or PC • Auto-compressed for Firestore DB
                  </p>
                </div>
              </div>

              <label className="px-4 py-2 bg-[#5C3A21] hover:bg-[#472c19] text-white text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition shadow-sm active:scale-95 flex-shrink-0">
                <Upload className="w-3.5 h-3.5 text-amber-200" />
                <span>Choose from Gallery</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCustomCoverUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Presets Grid */}
            <div>
              <span className="text-[11px] font-semibold text-stone-500 block mb-1.5">
                Or select from curated storefront covers:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESET_COVERS.map((preset, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setCoverUrl(preset.url)}
                    className={`p-1.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                      coverUrl === preset.url
                        ? 'border-[#5C3A21] bg-[#F3ECE4] ring-1 ring-[#5C3A21]'
                        : 'border-stone-200 bg-[#FAF7F2] hover:border-stone-300'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-full h-14 rounded-lg object-cover"
                    />
                    <span className="text-[10px] text-stone-700 truncate w-full text-center font-medium">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Banner Live Preview & Adjustment Panel */}
            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DACD] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <span>🎨 Banner Live Framing &amp; Position Adjustment</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setCoverPositionY(50);
                    setCoverPositionX(50);
                    setCoverScale(100);
                    setCoverFit('cover');
                  }}
                  className="text-[10px] text-stone-500 hover:text-stone-900 underline font-medium"
                >
                  Reset Framing
                </button>
              </div>

              {/* Live Wave Preview Box */}
              <div className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden bg-stone-900/10 border border-stone-200 shadow-inner">
                {/* Ambient backdrop */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverUrl || PRESET_COVERS[0].url}
                  alt="Backdrop"
                  className="absolute inset-0 w-full h-full object-cover blur-md opacity-35 scale-110 pointer-events-none"
                />

                {/* Live Adjusted Cover */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverUrl || PRESET_COVERS[0].url}
                  alt="Banner preview"
                  style={{
                    objectPosition: `${coverPositionX}% ${coverPositionY}%`,
                    transform: coverScale !== 100 ? `scale(${coverScale / 100})` : undefined,
                  }}
                  className={`relative w-full h-full transition-all duration-150 ${
                    coverFit === 'contain' ? 'object-contain py-2' : 'object-cover'
                  }`}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35 pointer-events-none" />

                {/* Curved wave mask preview at bottom */}
                <div className="absolute -bottom-0.5 left-0 right-0 w-full pointer-events-none z-10 leading-none">
                  <svg viewBox="0 0 500 45" preserveAspectRatio="none" className="block w-full h-7">
                    <path d="M0,45 C140,4 360,4 500,45 L500,45 L0,45 Z" fill="#FAF7F2" />
                  </svg>
                </div>

                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold backdrop-blur-xs z-20">
                  Live Preview with Wave Mask
                </span>
              </div>

              {/* Banner Display Style Toggle */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200 text-xs">
                <span className="font-bold text-stone-800 text-[11px]">Display Mode:</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCoverFit('cover')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition ${
                      coverFit === 'cover'
                        ? 'bg-[#5C3A21] text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    🖼️ Fill (Cover)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoverFit('contain')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition ${
                      coverFit === 'contain'
                        ? 'bg-[#5C3A21] text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                    title="Shows entire banner without cutting any text"
                  >
                    📏 Fit (Full Banner)
                  </button>
                </div>
              </div>

              {/* Vertical Position Slider (Y-Axis) */}
              <div className="p-2.5 rounded-xl bg-white border border-stone-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                  <span>↕️ Vertical Position (Move Up / Down):</span>
                  <span className="font-mono text-stone-900 font-bold">{coverPositionY}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={coverPositionY}
                  onChange={(e) => setCoverPositionY(Number(e.target.value))}
                  className="w-full accent-[#5C3A21] cursor-pointer"
                />
                <div className="flex items-center justify-between pt-0.5">
                  <button
                    type="button"
                    onClick={() => setCoverPositionY(0)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700"
                  >
                    ⬆️ Top (0%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoverPositionY(50)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700"
                  >
                    🎯 Center (50%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoverPositionY(100)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700"
                  >
                    ⬇️ Bottom (100%)
                  </button>
                </div>
              </div>

              {/* Horizontal Position Slider (X-Axis) */}
              <div className="p-2.5 rounded-xl bg-white border border-stone-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                  <span>↔️ Horizontal Position (Move Left / Right):</span>
                  <span className="font-mono text-stone-900 font-bold">{coverPositionX}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={coverPositionX}
                  onChange={(e) => setCoverPositionX(Number(e.target.value))}
                  className="w-full accent-[#5C3A21] cursor-pointer"
                />
                <div className="flex items-center justify-between pt-0.5">
                  <button
                    type="button"
                    onClick={() => setCoverPositionX(0)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700"
                  >
                    ⬅️ Left (0%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoverPositionX(50)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700"
                  >
                    🎯 Center (50%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoverPositionX(100)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700"
                  >
                    ➡️ Right (100%)
                  </button>
                </div>
              </div>

              {/* Zoom / Scale Slider */}
              <div className="p-2.5 rounded-xl bg-white border border-stone-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                  <span>🔍 Zoom / Scale:</span>
                  <span className="font-mono text-stone-900 font-bold">{coverScale}%</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={180}
                  value={coverScale}
                  onChange={(e) => setCoverScale(Number(e.target.value))}
                  className="w-full accent-[#5C3A21] cursor-pointer"
                />
                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-[10px] text-stone-400">100% (Fit)</span>
                  <button
                    type="button"
                    onClick={() => setCoverScale(100)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700"
                  >
                    Reset Zoom (100%)
                  </button>
                  <span className="text-[10px] text-stone-400">180% (Zoomed)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Shop Logo (Gallery Upload + Presets) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#5C3A21]" />
                <span>Shop Logo / Profile Photo</span>
              </label>
              <span className="text-[11px] text-stone-500 font-medium">Direct Gallery Upload or Presets</span>
            </div>

            {/* Direct Gallery Upload Trigger Card */}
            <div className="p-3.5 rounded-2xl border-2 border-dashed border-[#5C3A21]/30 hover:border-[#5C3A21] bg-[#FAF7F2] hover:bg-[#F3ECE4] transition group flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#5C3A21] shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
                  {logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Upload className="w-5 h-5 text-[#5C3A21]" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900">
                      Upload Logo from Gallery / Device
                    </span>
                    {logoUrl.startsWith('data:image') && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Custom Logo Active ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Pick your brand logo or photo from phone/gallery • Auto-optimized for DB
                  </p>
                </div>
              </div>

              <label className="px-4 py-2 bg-[#5C3A21] hover:bg-[#472c19] text-white text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition shadow-sm active:scale-95 flex-shrink-0">
                <Upload className="w-3.5 h-3.5 text-amber-200" />
                <span>Choose Logo from Gallery</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCustomLogoUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Presets Grid */}
            <div>
              <span className="text-[11px] font-semibold text-stone-500 block mb-1.5">
                Or select from curated sample logos:
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {PRESET_LOGOS.map((preset, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setLogoUrl(preset.url)}
                    className={`p-1.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                      logoUrl === preset.url
                        ? 'border-[#5C3A21] bg-[#F3ECE4] ring-1 ring-[#5C3A21]'
                        : 'border-stone-200 bg-[#FAF7F2] hover:border-stone-300'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <span className="text-[10px] text-stone-700 truncate w-full text-center">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Configured Links (Rule: Google Review 1 min, max 5) */}
          <div className="pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-[#5C3A21]" />
                  <span>Configured Links Grid</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    links.length >= 5 ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-700'
                  }`}>
                    {links.length} / 5 Links Active
                  </span>
                </h3>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Google Review is mandatory. Only added links will show on the shop page.
                </p>
              </div>

              {/* Add Link Dropdown / Buttons */}
              {links.length < 5 && availableTypesToAdd.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {availableTypesToAdd.map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => handleAddLink(type)}
                      className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-stone-100 border border-stone-300 text-xs text-stone-800 font-semibold flex items-center gap-1.5 transition capitalize shadow-xs"
                    >
                      <Plus className="w-3 h-3 text-[#5C3A21]" />
                      <span>{type}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* List of active links */}
            <div className="space-y-2.5">
              {links.map((link) => {
                const isGoogleReview = link.type === 'google_review';

                return (
                  <div
                    key={link.id}
                    className={`p-3.5 rounded-2xl border transition ${
                      isGoogleReview
                        ? 'bg-[#FDFBF7] border-amber-300/80 shadow-xs'
                        : 'bg-[#FAF7F2] border-stone-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <LocalBrandIcon type={link.type} className="w-5 h-5 flex-shrink-0" />
                        <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                          {link.type.replace('_', ' ')} {isGoogleReview && '(Mandatory 1st Link)'}
                        </span>
                      </div>

                      {!isGoogleReview && (
                        <button
                          type="button"
                          onClick={() => handleRemoveLink(link.id)}
                          className="p-1 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Remove Link"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-stone-500 block mb-0.5 font-medium">
                          Card Label (e.g. Google Reviews, Instagram, WhatsApp)
                        </label>
                        <input
                          type="text"
                          name={`link_title_${link.id}`}
                          autoComplete="off"
                          data-lpignore="true"
                          data-1p-ignore="true"
                          data-form-type="other"
                          value={link.title}
                          onChange={(e) => handleUpdateLink(link.id, { title: e.target.value })}
                          className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-[#5C3A21]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-stone-500 block mb-0.5 font-medium">
                          Subtitle / Handle
                        </label>
                        <input
                          type="text"
                          name={`link_subtitle_${link.id}`}
                          autoComplete="off"
                          data-lpignore="true"
                          data-1p-ignore="true"
                          data-form-type="other"
                          value={link.subtitle || ''}
                          onChange={(e) => handleUpdateLink(link.id, { subtitle: e.target.value })}
                          className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-[#5C3A21]"
                        />
                      </div>
                      {link.type === 'whatsapp' ? (
                        <div className="sm:col-span-2 space-y-2">
                          <div>
                            <label className="text-[10px] text-stone-700 block mb-0.5 font-bold flex items-center justify-between">
                              <span>WhatsApp Phone Number (For Appointments &amp; Orders) *</span>
                              <span className="text-emerald-700 font-semibold text-[10px]">10-Digit Mobile Number</span>
                            </label>
                            <div className="flex items-center bg-white border border-stone-200 rounded-lg overflow-hidden focus-within:border-[#5C3A21]">
                              <span className="px-2.5 py-1.5 bg-stone-100 border-r border-stone-200 text-xs font-bold text-stone-700 select-none">
                                🇮🇳 +91
                              </span>
                              <input
                                type="tel"
                                maxLength={10}
                                required
                                name={`link_wp_phone_${link.id}`}
                                autoComplete="off"
                                data-lpignore="true"
                                data-1p-ignore="true"
                                data-form-type="other"
                                value={parseWhatsAppUrl(link.url).phone}
                                onChange={(e) => {
                                  const currentMsg = parseWhatsAppUrl(link.url).msg;
                                  const cleanTyped = extractCleanIndianPhone(e.target.value);
                                  handleUpdateLink(link.id, { url: buildWhatsAppUrl(cleanTyped, currentMsg) });
                                }}
                                placeholder="Enter 10-digit number (e.g. 9413879444)"
                                className="w-full px-2.5 py-1.5 text-xs text-stone-900 font-mono font-bold focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] text-stone-500 block mb-0.5 font-medium">
                              Pre-filled Customer Message (Optional)
                            </label>
                            <input
                              type="text"
                              name={`link_wp_msg_${link.id}`}
                              autoComplete="off"
                              data-lpignore="true"
                              data-1p-ignore="true"
                              data-form-type="other"
                              value={parseWhatsAppUrl(link.url).msg}
                              onChange={(e) => {
                                const currentPhone = parseWhatsAppUrl(link.url).phone;
                                handleUpdateLink(link.id, { url: buildWhatsAppUrl(currentPhone, e.target.value) });
                              }}
                              placeholder="e.g. Hello, I want to book an appointment with your shop."
                              className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-[#5C3A21]"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="sm:col-span-2">
                          <label className="text-[10px] text-stone-500 block mb-0.5 font-medium">
                            Destination Link URL {isGoogleReview && '(Auto-generated if empty)'}
                          </label>
                          <input
                            type="text"
                            name={`link_url_${link.id}`}
                            autoComplete="off"
                            data-lpignore="true"
                            data-1p-ignore="true"
                            data-form-type="other"
                            value={link.url}
                            onChange={(e) => handleUpdateLink(link.id, { url: e.target.value })}
                            onBlur={(e) => {
                              const val = e.target.value.trim();
                              if (val && !val.startsWith('http://') && !val.startsWith('https://')) {
                                handleUpdateLink(link.id, { url: `https://${val}` });
                              }
                            }}
                            placeholder={isGoogleReview ? 'Google Review link or Place ID (optional)' : 'e.g. assudanigroup.online or https://...'}
                            className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 font-mono focus:outline-none focus:border-[#5C3A21]"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 6: Toggle Referral & Developer Credits */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-stone-800 block">
                Show &ldquo;Our Other Services&rdquo; &amp; Developer Credit
              </span>
              <span className="text-[11px] text-stone-500">
                Piyush Assudani portfolio &amp; web dev services referral at the bottom of the card.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowReferral(!showReferral)}
              className={`w-12 h-6 rounded-full p-1 transition duration-200 ease-in-out ${
                showReferral ? 'bg-[#5C3A21]' : 'bg-stone-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition duration-200 ease-in-out transform ${
                  showReferral ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Pinned Sticky Footer (Always in view, never cut off) */}
        <div className="px-6 py-4 sm:px-8 sm:py-4 border-t border-stone-200 bg-[#FAF7F2] flex flex-col sm:flex-row items-center justify-between gap-3 z-20 flex-shrink-0">
          {error ? (
            <div className="text-rose-700 text-xs font-semibold flex items-center gap-1.5 w-full sm:w-auto">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          ) : (
            <span className="text-[11px] text-stone-500 hidden sm:inline">
              Settings sync live to your NFC smart card &amp; review standee
            </span>
          )}

          <div className="flex items-center gap-2.5 ml-auto w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 font-semibold text-xs transition active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2.5 px-5 rounded-xl bg-[#5C3A21] hover:bg-[#472c19] text-white font-bold text-xs flex items-center gap-2 transition shadow-md shadow-[#5C3A21]/20 disabled:opacity-50 active:scale-95"
            >
              <Save className="w-4 h-4 text-amber-200" />
              <span>{isSubmitting ? 'Saving...' : isEditing ? 'Update Shop Card' : 'Create Shop Card'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
