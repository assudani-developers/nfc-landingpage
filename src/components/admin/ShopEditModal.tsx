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
  Link as LinkIcon,
  AlertCircle,
  Image as ImageIcon,
  Check,
  MapPin,
  Palette,
  Eye,
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

const COLOR_PRESETS = [
  { name: 'Warm Cafe', color: '#5C3A21' },
  { name: 'Caramel Amber', color: '#854D0E' },
  { name: 'Forest Matcha', color: '#1E4D36' },
  { name: 'Terracotta', color: '#9F3A29' },
  { name: 'Modern Charcoal', color: '#18181B' },
  { name: 'Royal Indigo', color: '#1E3A8A' },
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
  const [category, setCategory] = useState(initialShop?.category || 'Café • Bakery • Beverages');
  const [address, setAddress] = useState(initialShop?.address || '');
  const [buttonText, setButtonText] = useState(initialShop?.buttonText || 'Visit Our Shop');
  const [buttonUrl, setButtonUrl] = useState(initialShop?.buttonUrl || '');
  const [themeColor, setThemeColor] = useState(initialShop?.themeColor || '#5C3A21');
  const [showReferral, setShowReferral] = useState(initialShop?.showReferral !== false);
  const [coverUrl, setCoverUrl] = useState(initialShop?.coverUrl || PRESET_COVERS[0].url);
  const [logoUrl, setLogoUrl] = useState(initialShop?.logoUrl || PRESET_LOGOS[0].url);
  const [theme, setTheme] = useState<ShopTheme>(initialShop?.theme || 'warm_cafe');

  // Manage Links: Google Review is mandatory (Link 1). Total links <= 5.
  const defaultGoogleReviewLink: ShopLink = {
    id: `link-review-${Date.now()}`,
    type: 'google_review',
    title: 'Google Reviews',
    subtitle: '⭐ Tap to rate 5 stars',
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
        subtitle = '@yourstore • Daily reels';
        url = 'https://instagram.com';
        break;
      case 'facebook':
        title = 'Facebook';
        subtitle = 'Community updates';
        url = 'https://facebook.com';
        break;
      case 'whatsapp':
        title = 'WhatsApp';
        subtitle = 'Chat & reservations';
        url = 'https://wa.me/919876543210';
        break;
      case 'website':
        title = 'Website';
        subtitle = 'Official site & catalog';
        url = 'https://example.com';
        break;
      case 'google_review':
        title = 'Google Reviews';
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

  const handleCustomLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleCustomCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCoverUrl(event.target.result as string);
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
        buttonText: buttonText.trim() || 'Visit Our Shop',
        buttonUrl: buttonUrl.trim() || `https://maps.google.com/?q=${encodeURIComponent(name)}`,
        themeColor: themeColor || '#5C3A21',
        coverUrl: coverUrl.trim() || PRESET_COVERS[0].url,
        logoUrl: logoUrl.trim() || PRESET_LOGOS[0].url,
        theme,
        rating: initialShop?.rating || 4.9,
        reviewCount: initialShop?.reviewCount || 150,
        showReferral,
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

  const availableTypesToAdd: LinkType[] = (['instagram', 'facebook', 'whatsapp', 'website'] as LinkType[]).filter(
    (type) => !links.some((l) => l.type === type)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-[#EDE8E1] rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#5C3A21] flex items-center justify-center shadow-md shadow-[#5C3A21]/20">
              <NfcWaveIcon className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-900">
                {isEditing ? `Edit Shop: ${initialShop?.name}` : 'Add New NFC Shop Card'}
              </h2>
              <p className="text-xs text-stone-500">
                Everything is customized from database: Banner, logo, buttons, colors &amp; links.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Section 1: Basic Info & Custom URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Shop Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. The Urban Café"
                className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#5C3A21] focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Custom URL Slug * (Unique NFC Link)
              </label>
              <div className="flex items-center bg-[#FAF7F2] border border-stone-200 rounded-xl overflow-hidden focus-within:border-[#5C3A21] focus-within:bg-white transition">
                <span className="px-3 text-xs text-stone-500 bg-stone-100 border-r border-stone-200 py-2.5 font-medium">
                  /
                </span>
                <input
                  type="text"
                  required
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
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Your neighbourhood café for great coffee & good vibes."
                className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#5C3A21] focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Bottom Main Button Text
              </label>
              <input
                type="text"
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
                  onClick={() => setThemeColor(preset.color)}
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

          {/* Section 3: Storefront Cover Photo */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2 flex items-center justify-between">
              <span>Storefront Cover Photo (Wave Banner)</span>
              <span className="text-[11px] text-stone-500">Pick preset or upload storefront photo</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
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

            <div className="flex gap-2">
              <input
                type="text"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                placeholder="Or paste direct image URL (https://...)"
                className="flex-1 bg-[#FAF7F2] border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#5C3A21]"
              />
              <label className="px-3 py-2 bg-stone-100 hover:bg-stone-200 rounded-xl text-xs text-stone-700 font-medium cursor-pointer flex items-center gap-1.5 transition">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCustomCoverUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Section 4: Logo Selection */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2 flex items-center justify-between">
              <span>Shop Logo</span>
              <span className="text-[11px] text-stone-500">Pick preset or upload custom logo</span>
            </label>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
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

            <div className="flex gap-2">
              <input
                type="text"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="Or paste direct image URL (https://...)"
                className="flex-1 bg-[#FAF7F2] border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#5C3A21]"
              />
              <label className="px-3 py-2 bg-stone-100 hover:bg-stone-200 rounded-xl text-xs text-stone-700 font-medium cursor-pointer flex items-center gap-1.5 transition">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCustomLogoUpload}
                  className="hidden"
                />
              </label>
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
                          value={link.subtitle || ''}
                          onChange={(e) => handleUpdateLink(link.id, { subtitle: e.target.value })}
                          className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-[#5C3A21]"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[10px] text-stone-500 block mb-0.5 font-medium">
                          Destination Link URL
                        </label>
                        <input
                          type="url"
                          required
                          value={link.url}
                          onChange={(e) => handleUpdateLink(link.id, { url: e.target.value })}
                          placeholder={isGoogleReview ? 'https://search.google.com/local/writereview?placeid=...' : 'https://...'}
                          className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 font-mono focus:outline-none focus:border-[#5C3A21]"
                        />
                      </div>
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

          {/* Form Actions */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2.5 px-5 rounded-xl bg-[#5C3A21] hover:bg-[#472c19] text-white font-bold text-xs flex items-center gap-2 transition shadow-md shadow-[#5C3A21]/20 disabled:opacity-50"
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
