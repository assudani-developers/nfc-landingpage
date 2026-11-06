'use client';

import React, { useState, useEffect } from 'react';
import { Shop } from '@/types';
import { getShops, saveShop, deleteShop, resetToDemoShops } from '@/lib/db';
import { isFirebaseConfigured, firebaseConfig } from '@/lib/firebase';
import { logoutAdmin } from '@/lib/auth';
import { LocalBrandIcon, NfcWaveIcon } from '@/components/icons/BrandIcons';
import { THEMES } from '@/lib/theme';
import QRCodeModal from './QRCodeModal';
import ShopEditModal from './ShopEditModal';
import {
  Plus,
  QrCode,
  ExternalLink,
  Edit,
  Trash2,
  Copy,
  Check,
  Search,
  LogOut,
  Database,
  BarChart3,
  Sparkles,
  HelpCircle,
  RefreshCw,
  CheckCircle2,
  Shield,
  Layers,
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modals state
  const [editingShop, setEditingShop] = useState<Shop | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [qrShop, setQrShop] = useState<Shop | null>(null);
  const [showFirebaseInfo, setShowFirebaseInfo] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

  const loadShops = async () => {
    setLoading(true);
    try {
      const data = await getShops();
      setShops(data);
    } catch (err) {
      console.error('Failed to load shops:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShops();
  }, []);

  const handleSaveShop = async (shopToSave: Shop) => {
    await saveShop(shopToSave);
    await loadShops();
    setEditingShop(null);
    setIsCreatingNew(false);
  };

  const handleDeleteShop = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      await deleteShop(id);
      await loadShops();
    }
  };

  const handleResetData = async () => {
    if (confirm('Reset all shops to standard sample shops?')) {
      await resetToDemoShops();
      await loadShops();
    }
  };

  const handleCopyShopUrl = (slug: string, id: string) => {
    const fullUrl = `${baseUrl}/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredShops = shops.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalTaps = shops.reduce((acc, s) => acc + (s.tapsCount || 0), 0);
  const totalViews = shops.reduce((acc, s) => acc + (s.viewsCount || 0), 0);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 shadow-md shadow-amber-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <NfcWaveIcon className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white tracking-tight">
                Piyush Admin Hub
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                /admin/piyush
              </span>
            </div>
            <p className="text-xs text-slate-400">
              NFC Tags, QR Standees & Shop URL Manager
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Firebase Status Badge */}
          <button
            onClick={() => setShowFirebaseInfo(!showFirebaseInfo)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
              isFirebaseConfigured
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isFirebaseConfigured ? 'Firebase: Connected' : 'Firebase: Local Storage Active'}
            </span>
            <span className="sm:hidden">
              {isFirebaseConfigured ? 'Firebase' : 'Local DB'}
            </span>
          </button>

          {/* Add Shop Button */}
          <button
            onClick={() => setIsCreatingNew(true)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow-lg shadow-amber-500/20 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add New Shop</span>
            <span className="sm:hidden">Add</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={() => {
              logoutAdmin();
              onLogout();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-300 text-slate-400 transition"
            title="Log Out of Piyush Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        {/* Firebase Config Drawer / Banner */}
        {showFirebaseInfo && (
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-xl relative animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  Firebase Firestore Database Status
                </h3>
              </div>
              <button
                onClick={() => setShowFirebaseInfo(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                Dismiss
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-3">
              {isFirebaseConfigured
                ? `Connected to Firebase Project: "${firebaseConfig.projectId}". All shops and taps sync to live Firestore.`
                : `Currently using LocalStorage & In-Memory Store with automatic fallback. To connect live Firebase, add your credentials in .env.local file:`}
            </p>

            {!isFirebaseConfigured && (
              <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-amber-300 overflow-x-auto mb-3">
{`NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id`}
              </pre>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={handleResetData}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Demo Shops</span>
              </button>
              <button
                onClick={loadShops}
                className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs flex items-center gap-1.5 border border-amber-500/30 transition"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Refresh Data</span>
              </button>
            </div>
          </div>
        )}

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
            <span className="text-xs text-slate-400 block mb-1">Total Shops</span>
            <div className="text-2xl font-black text-white">{shops.length}</div>
            <span className="text-[11px] text-amber-400">All with unique URLs</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
            <span className="text-xs text-slate-400 block mb-1">Total NFC Card Taps</span>
            <div className="text-2xl font-black text-emerald-400">{totalTaps}</div>
            <span className="text-[11px] text-slate-400">Physical contactless visits</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
            <span className="text-xs text-slate-400 block mb-1">Total Page Views</span>
            <div className="text-2xl font-black text-sky-400">{totalViews}</div>
            <span className="text-[11px] text-slate-400">QR scans & link clicks</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
            <span className="text-xs text-slate-400 block mb-1">Review Enforcement</span>
            <div className="text-2xl font-black text-amber-300">100%</div>
            <span className="text-[11px] text-amber-400/80">Google Review mandatory</span>
          </div>
        </div>

        {/* Shops Directory Header & Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <span>Configured NFC Shops & Standees</span>
            </h2>
            <p className="text-xs text-slate-400">
              Each shop has its own dedicated URL to write to NFC cards or generate QR standees.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shops or slugs..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
            />
          </div>
        </div>

        {/* Shops Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <RefreshCw className="w-8 h-8 animate-spin text-amber-400 mb-2" />
            <p className="text-xs">Loading shop directory...</p>
          </div>
        ) : filteredShops.length === 0 ? (
          <div className="py-16 text-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/40 p-8">
            <NfcWaveIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No Shops Found</h3>
            <p className="text-xs text-slate-400 mb-4">
              {searchQuery ? 'No shops match your search.' : 'Get started by adding your first NFC shop!'}
            </p>
            <button
              onClick={() => setIsCreatingNew(true)}
              className="py-2 px-4 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition"
            >
              Add First Shop
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredShops.map((shop) => {
              const theme = THEMES[shop.theme] || THEMES.gold;
              const fullShopUrl = `${baseUrl}/${shop.slug}`;
              const isCopied = copiedId === shop.id;

              return (
                <div
                  key={shop.id}
                  className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 flex flex-col justify-between transition-all duration-200 shadow-lg hover:shadow-xl group"
                >
                  <div>
                    {/* Top Shop Bar */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Logo */}
                        <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 flex-shrink-0 shadow-md">
                          {shop.logoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={shop.logoUrl}
                              alt={shop.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="w-full h-full flex items-center justify-center font-bold text-white text-lg">
                              {shop.name.charAt(0)}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-white tracking-tight truncate group-hover:text-amber-300 transition-colors">
                            {shop.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] text-slate-400 truncate">
                              {shop.category}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                            <span className="text-[11px] font-semibold text-amber-400">
                              ⭐ {shop.rating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Theme Pill */}
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm"
                        style={{ backgroundColor: theme.starColor }}
                        title={`Theme: ${theme.name}`}
                      />
                    </div>

                    {/* Tagline */}
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3.5">
                      {shop.tagline}
                    </p>

                    {/* ============================================================== */}
                    {/* CUSTOM URL DISPLAY BOX (Admin requirement)                     */}
                    {/* ============================================================== */}
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 mb-3.5 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[10px] text-slate-500 uppercase font-mono block">
                          NFC Tag Destination:
                        </span>
                        <span className="text-xs font-mono font-semibold text-amber-300 truncate block">
                          /{shop.slug}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopyShopUrl(shop.slug, shop.id)}
                        className="py-1 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1 transition flex-shrink-0"
                        title="Copy full URL for NFC tag"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy URL</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Active Configured Links Badges (1 min, 5 max) */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                        <span className="font-semibold">Active Links ({shop.links.length}/5):</span>
                        <span className="text-slate-500">Only configured show</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {shop.links.map((link) => (
                          <div
                            key={link.id}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300"
                            title={`${link.title}: ${link.url}`}
                          >
                            <LocalBrandIcon type={link.type} className="w-3.5 h-3.5" />
                            <span className="capitalize">{link.type.replace('_', ' ')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {/* Standee QR Modal Button */}
                      <button
                        onClick={() => setQrShop(shop)}
                        className="py-1.5 px-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition"
                        title="Generate QR code and printable standee"
                      >
                        <QrCode className="w-3.5 h-3.5 text-amber-400" />
                        <span>QR Standee</span>
                      </button>

                      {/* Open Customer Shop Page */}
                      <a
                        href={`/${shop.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                        title="Open NFC Landing Page in new tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Edit Shop */}
                      <button
                        onClick={() => setEditingShop(shop)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                        title="Edit Shop Details & Links"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Shop */}
                      <button
                        onClick={() => handleDeleteShop(shop.id, shop.name)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition"
                        title="Delete Shop"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* QR Code Standee Modal */}
      {qrShop && (
        <QRCodeModal shop={qrShop} onClose={() => setQrShop(null)} />
      )}

      {/* Edit Shop Modal */}
      {editingShop && (
        <ShopEditModal
          initialShop={editingShop}
          onSave={handleSaveShop}
          onClose={() => setEditingShop(null)}
        />
      )}

      {/* Create New Shop Modal */}
      {isCreatingNew && (
        <ShopEditModal
          initialShop={null}
          onSave={handleSaveShop}
          onClose={() => setIsCreatingNew(false)}
        />
      )}
    </div>
  );
}
