'use client';

import React, { useState } from 'react';
import { Shop, ShopLink, LinkType, ShopTheme } from '@/types';
import { THEMES } from '@/lib/theme';
import { LocalBrandIcon, NfcWaveIcon } from '@/components/icons/BrandIcons';
import {
  X,
  Plus,
  Trash2,
  Save,
  Sparkles,
  Link as LinkIcon,
  AlertCircle,
  Image as ImageIcon,
  Check,
} from 'lucide-react';

interface ShopEditModalProps {
  initialShop?: Shop | null;
  onSave: (shop: Shop) => Promise<void>;
  onClose: () => void;
}

const PRESET_LOGOS = [
  { label: 'Artisan Cafe', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&auto=format&fit=crop&q=80' },
  { label: 'Luxury Salon', url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&auto=format&fit=crop&q=80' },
  { label: 'Fine Jewellery', url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&auto=format&fit=crop&q=80' },
  { label: 'Boutique Fashion', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&auto=format&fit=crop&q=80' },
  { label: 'Dental & Health', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=300&auto=format&fit=crop&q=80' },
  { label: 'Restaurant & Bar', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&auto=format&fit=crop&q=80' },
];

export default function ShopEditModal({
  initialShop,
  onSave,
  onClose,
}: ShopEditModalProps) {
  const isEditing = Boolean(initialShop?.id);

  const [name, setName] = useState(initialShop?.name || '');
  const [slug, setSlug] = useState(initialShop?.slug || '');
  const [tagline, setTagline] = useState(initialShop?.tagline || '');
  const [category, setCategory] = useState(initialShop?.category || 'Retail Store');
  const [address, setAddress] = useState(initialShop?.address || '');
  const [logoUrl, setLogoUrl] = useState(initialShop?.logoUrl || PRESET_LOGOS[0].url);
  const [theme, setTheme] = useState<ShopTheme>(initialShop?.theme || 'gold');
  const [rating, setRating] = useState<number>(initialShop?.rating || 4.9);
  const [reviewCount, setReviewCount] = useState<number>(initialShop?.reviewCount || 150);

  // Manage Links: Google Review is mandatory (Link 1). Total links <= 5.
  const defaultGoogleReviewLink: ShopLink = {
    id: `link-review-${Date.now()}`,
    type: 'google_review',
    title: 'Review Us on Google',
    subtitle: '⭐ Tap 5 Stars & Leave Feedback',
    url: 'https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4',
    featured: true,
  };

  const initialLinks = initialShop?.links && initialShop.links.length > 0
    ? initialShop.links
    : [defaultGoogleReviewLink];

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

  // Add a new link (max 5 links)
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
        title = 'Follow on Instagram';
        subtitle = '@yourstore • Daily updates & reels';
        url = 'https://instagram.com/yourhandle';
        break;
      case 'whatsapp':
        title = 'Chat on WhatsApp';
        subtitle = 'Instant support & inquiries';
        url = 'https://wa.me/919876543210?text=Hello';
        break;
      case 'facebook':
        title = 'Follow on Facebook';
        subtitle = 'Join our community page';
        url = 'https://facebook.com/yourpage';
        break;
      case 'website':
        title = 'Visit Official Website';
        subtitle = 'Catalog, orders & more';
        url = 'https://example.com';
        break;
      case 'google_review':
        title = 'Review Us on Google';
        subtitle = '⭐ Tap to rate 5 stars';
        url = 'https://search.google.com/local/writereview';
        break;
    }

    const newLink: ShopLink = {
      id: `link-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
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

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Shop Name is required.');
      return;
    }
    if (!slug.trim()) {
      setError('Shop URL Slug is required.');
      return;
    }

    const googleReview = links.find((l) => l.type === 'google_review');
    if (!googleReview || !googleReview.url.trim()) {
      setError('A valid Google Review URL is required (mandatory link).');
      return;
    }

    if (links.length > 5) {
      setError('A maximum of 5 links are allowed.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const shopToSave: Shop = {
        id: initialShop?.id || `shop-${Date.now()}`,
        name: name.trim(),
        slug: slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/^-+|-+$/g, ''),
        tagline: tagline.trim() || 'Welcome to our store',
        category: category.trim() || 'Store',
        address: address.trim(),
        logoUrl: logoUrl.trim() || PRESET_LOGOS[0].url,
        theme,
        rating: Number(rating) || 4.9,
        reviewCount: Number(reviewCount) || 120,
        links,
        viewsCount: initialShop?.viewsCount || 0,
        tapsCount: initialShop?.tapsCount || 0,
        createdAt: initialShop?.createdAt || Date.now(),
        updatedAt: Date.now(),
      };

      await onSave(shopToSave);
      onClose();
    } catch (err: unknown) {
      setError((err as Error)?.message || 'Failed to save shop');
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableTypesToAdd: LinkType[] = (['instagram', 'whatsapp', 'facebook', 'website'] as LinkType[]).filter(
    (type) => !links.some((l) => l.type === type)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <NfcWaveIcon className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {isEditing ? `Edit Shop: ${initialShop?.name}` : 'Add New NFC Shop Card'}
              </h2>
              <p className="text-xs text-slate-400">
                Setup shop branding, custom URL, and links (Google Review + max 5 links).
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Section 1: Basic Info & Custom URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Shop Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Royal Cafe & Roastery"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Custom URL Slug * (Unique NFC Link)
              </label>
              <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl overflow-hidden focus-within:border-amber-500 transition">
                <span className="px-3 text-xs text-slate-500 bg-slate-900/50 border-r border-slate-800 py-2.5">
                  /
                </span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                  placeholder="royal-cafe"
                  className="w-full bg-transparent px-3 py-2 text-sm text-amber-400 font-mono placeholder-slate-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Category / Business Type
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Restaurant, Salon, Jewellers, Retail"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Tagline / Pitch
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Artisanal Brews & Good Vibes"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Address / Store Location (Optional)
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Shop 12, Ground Floor, Phoenix Marketcity"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>
          </div>

          {/* Section 2: Logo Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
              <span>Shop Logo</span>
              <span className="text-[11px] text-slate-400">Pick preset or upload custom image</span>
            </label>

            {/* Presets Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
              {PRESET_LOGOS.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setLogoUrl(preset.url)}
                  className={`p-1.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                    logoUrl === preset.url
                      ? 'border-amber-400 bg-amber-500/10'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preset.url}
                    alt={preset.label}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-[10px] text-slate-300 truncate w-full text-center">
                    {preset.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Custom Logo URL / Upload */}
            <div className="flex gap-2">
              <input
                type="text"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="Or paste direct image URL (https://...)"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs text-slate-200 cursor-pointer flex items-center gap-1.5 transition">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCustomImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Section 3: Visual Theme Palette */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Card Color Theme
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {(Object.keys(THEMES) as ShopTheme[]).map((tKey) => {
                const t = THEMES[tKey];
                const isSelected = theme === tKey;
                return (
                  <button
                    type="button"
                    key={tKey}
                    onClick={() => setTheme(tKey)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-left transition ${
                      isSelected
                        ? 'border-white bg-slate-800 shadow-md ring-1 ring-white/50'
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: t.starColor }}
                      />
                      <span className="text-xs font-medium text-slate-200">
                        {t.name}
                      </span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Rating & Review stats */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Rating (e.g. 4.9)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Review Count (e.g. 240)
              </label>
              <input
                type="number"
                min="0"
                value={reviewCount}
                onChange={(e) => setReviewCount(parseInt(e.target.value, 10))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* ============================================================== */}
          {/* Section 5: Configured Links (Rule: Google Review 1 min, max 5) */}
          {/* ============================================================== */}
          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-amber-400" />
                  <span>Configured Links</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    links.length >= 5 ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {links.length} / 5 Links Active
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
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
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 font-medium flex items-center gap-1.5 transition capitalize"
                    >
                      <Plus className="w-3 h-3 text-amber-400" />
                      <span>{type.replace('_', ' ')}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* List of active links */}
            <div className="space-y-3">
              {links.map((link, idx) => {
                const isGoogleReview = link.type === 'google_review';

                return (
                  <div
                    key={link.id}
                    className={`p-3.5 rounded-2xl border transition ${
                      isGoogleReview
                        ? 'bg-amber-950/20 border-amber-500/30'
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <LocalBrandIcon type={link.type} className="w-5 h-5 flex-shrink-0" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          {link.type.replace('_', ' ')} {isGoogleReview && '(Mandatory 1st Link)'}
                        </span>
                      </div>

                      {!isGoogleReview && (
                        <button
                          type="button"
                          onClick={() => handleRemoveLink(link.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                          title="Remove Link"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-0.5">
                          Button Title
                        </label>
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e) => handleUpdateLink(link.id, { title: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-0.5">
                          Subtitle / Note
                        </label>
                        <input
                          type="text"
                          value={link.subtitle || ''}
                          onChange={(e) => handleUpdateLink(link.id, { subtitle: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[10px] text-slate-400 block mb-0.5">
                          Destination URL {isGoogleReview && '(Your Google Business Review Link)'}
                        </label>
                        <input
                          type="url"
                          required
                          value={link.url}
                          onChange={(e) => handleUpdateLink(link.id, { url: e.target.value })}
                          placeholder={isGoogleReview ? 'https://search.google.com/local/writereview?placeid=...' : 'https://...'}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-amber-500/20 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'Saving...' : isEditing ? 'Update Shop Card' : 'Create Shop Card'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
