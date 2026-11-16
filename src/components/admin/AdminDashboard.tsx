'use client';

import React, { useState, useEffect } from 'react';
import { Shop } from '@/types';
import { getShops, saveShop, deleteShop, clearAllShops, resetShopAnalytics } from '@/lib/db';
import { isFirebaseConfigured, firebaseConfig } from '@/lib/firebase';
import { logoutAdmin, updateAdminCredentialsInDB, getOrInitAdminCredentials } from '@/lib/auth';
import { LocalBrandIcon, NfcWaveIcon } from '@/components/icons/BrandIcons';
import QRCodeModal from './QRCodeModal';
import ShopEditModal from './ShopEditModal';
import ShopAnalyticsModal from './ShopAnalyticsModal';
import Toast from '@/components/ui/Toast';
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
  RefreshCw,
  CheckCircle2,
  Layers,
  Globe,
  Key,
  Save,
  X,
  TrendingUp,
  Eye,
  EyeOff,
  Menu,
  MoreVertical,
} from 'lucide-react';
import Link from 'next/link';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals state
  const [editingShop, setEditingShop] = useState<Shop | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [qrShop, setQrShop] = useState<Shop | null>(null);
  const [analyticsShop, setAnalyticsShop] = useState<Shop | null>(null);
  const [showFirebaseInfo, setShowFirebaseInfo] = useState(false);
  const [showCredsModal, setShowCredsModal] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [showCredPass, setShowCredPass] = useState(false);
  const [savingCreds, setSavingCreds] = useState(false);
  const [credsSavedNotice, setCredsSavedNotice] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ type, message });
  };

  useEffect(() => {
    getOrInitAdminCredentials().then((creds) => {
      setAdminUser(creds.username);
      setAdminPass(creds.password);
    });
  }, []);

  const handleUpdateCreds = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingCreds(true);
    await updateAdminCredentialsInDB(adminUser, adminPass);
    setSavingCreds(false);
    setCredsSavedNotice(true);
    showToast('Admin credentials saved to database!');
    setTimeout(() => {
      setCredsSavedNotice(false);
      setShowCredsModal(false);
    }, 1500);
  };

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

  const loadShops = async () => {
    try {
      setLoading(true);
      const data = await getShops();
      setShops(data);
    } catch (err) {
      console.error('Failed to load shops:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    getShops()
      .then((data) => {
        if (active) {
          setShops(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          console.error('Failed to load shops:', err);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const handleSaveShop = async (shopToSave: Shop) => {
    try {
      await saveShop(shopToSave);
      await loadShops();
      setEditingShop(null);
      setIsCreatingNew(false);
      showToast(`"${shopToSave.name}" saved successfully!`);
    } catch (err: unknown) {
      showToast((err as Error)?.message || 'Failed to save shop', 'error');
    }
  };

  const handleDeleteShop = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteShop(id);
        await loadShops();
        showToast(`"${name}" deleted successfully.`, 'info');
      } catch (err: unknown) {
        showToast((err as Error)?.message || 'Failed to delete shop', 'error');
      }
    }
  };

  const handleClearAll = async () => {
    if (confirm('Are you sure you want to completely empty the admin panel? All shops will be deleted.')) {
      try {
        await clearAllShops();
        await loadShops();
        showToast('All shops deleted. Admin panel is clean.', 'info');
      } catch (err: unknown) {
        showToast((err as Error)?.message || 'Failed to clear shops', 'error');
      }
    }
  };

  const handleResetShopStats = async (id: string) => {
    try {
      await resetShopAnalytics(id);
      await loadShops();
      const updated = await getShops();
      const current = updated.find((s) => s.id === id);
      if (current) {
        setAnalyticsShop(current);
      }
      showToast('Click counters reset to zero.', 'info');
    } catch {
      showToast('Failed to reset counters', 'error');
    }
  };

  const handleCopyShopUrl = (slug: string, id: string) => {
    const fullUrl = `${baseUrl}/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    showToast(`URL copied: /${slug}`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredShops = shops.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalTaps = shops.reduce((acc, s) => acc + (s.tapsCount || 0), 0);
  const totalReferrals = shops.reduce((acc, s) => acc + (s.referralClicks || 0), 0);
  const totalActionClicks = shops.reduce((acc, s) => {
    const stats = s.clickStats || {};
    const sum = Object.values(stats).reduce((a: number, b) => a + (Number(b) || 0), 0);
    return acc + sum;
  }, 0);

  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] text-stone-900 flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 border-b border-[#EDE8E1] backdrop-blur-md px-3.5 sm:px-8 py-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#5C3A21] flex items-center justify-center shadow-md shadow-[#5C3A21]/20 flex-shrink-0">
              <NfcWaveIcon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-base font-bold text-stone-900 tracking-tight truncate">
                  <span className="sm:hidden">Admin Hub</span>
                  <span className="hidden sm:inline">Piyush Admin Hub</span>
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#F3ECE4] text-[#633917] border border-[#E5DACD] shrink-0">
                  /piyush
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden md:block">
                NFC Shop Cards, QR Standees &amp; Link Manager
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Website */}
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold hidden sm:flex items-center gap-1.5 transition"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Open Shop Page</span>
            </Link>

            {/* Firebase Status Badge */}
            <button
              onClick={() => setShowFirebaseInfo(!showFirebaseInfo)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold hidden sm:flex items-center gap-1.5 transition ${
                isFirebaseConfigured
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-amber-700" />
              <span>
                {isFirebaseConfigured ? 'Firebase: Connected' : 'Firebase: Local Active'}
              </span>
            </button>

            {/* Admin Credentials in DB (Desktop) */}
            <button
              onClick={() => setShowCredsModal(true)}
              className="px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold hidden sm:flex items-center gap-1.5 transition shadow-xs"
              title="Manage Admin Login in Database"
            >
              <Key className="w-3.5 h-3.5 text-[#5C3A21]" />
              <span>DB Login Info</span>
            </button>

            {/* Clear All Shops Button (Desktop) */}
            {shops.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold hidden sm:flex items-center gap-1.5 transition"
                title="Delete all demo shops to make panel completely empty"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Empty Panel</span>
              </button>
            )}

            {/* Primary Add Shop Button */}
            <button
              onClick={() => setIsCreatingNew(true)}
              className="px-3.5 py-2 sm:py-1.5 rounded-xl bg-[#5C3A21] hover:bg-[#472c19] text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm active:scale-95 min-h-[38px] sm:min-h-0"
            >
              <Plus className="w-4 h-4 text-amber-200" />
              <span>Add Shop</span>
            </button>

            {/* Desktop Logout Button */}
            <button
              onClick={() => {
                logoutAdmin();
                onLogout();
              }}
              className="p-2 rounded-xl bg-stone-100 hover:bg-rose-50 hover:text-rose-700 text-stone-500 transition hidden sm:flex items-center justify-center"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>

            {/* Mobile Actions Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`sm:hidden p-2 rounded-xl border text-stone-700 transition flex items-center justify-center min-w-[38px] min-h-[38px] active:scale-95 ${
                mobileMenuOpen
                  ? 'bg-[#5C3A21] text-white border-[#5C3A21]'
                  : 'bg-stone-100 border-stone-200 hover:bg-stone-200'
              }`}
              title="Admin Menu"
              aria-label="Toggle admin actions menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-white" /> : <MoreVertical className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Quick Actions Slide-Down Tray */}
        {mobileMenuOpen && (
          <div className="sm:hidden pt-3 mt-3 border-t border-stone-200 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EDE8E1]">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-800">
                <Database className="w-3.5 h-3.5 text-[#5C3A21]" />
                <span>DB: {isFirebaseConfigured ? 'Firebase Connected' : 'Local Storage Mode'}</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowFirebaseInfo(!showFirebaseInfo);
                }}
                className="text-[11px] font-bold text-[#5C3A21] underline"
              >
                {showFirebaseInfo ? 'Hide Info' : 'View Info'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowCredsModal(true);
                }}
                className="py-2.5 px-3 rounded-xl bg-white border border-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
              >
                <Key className="w-3.5 h-3.5 text-[#5C3A21]" />
                <span>DB Login Credentials</span>
              </button>

              <Link
                href="/"
                target="_blank"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl bg-white border border-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
              >
                <Globe className="w-3.5 h-3.5 text-stone-600" />
                <span>View Live Site</span>
              </Link>
            </div>

            <div className="flex items-center gap-2 pt-1">
              {shops.length > 0 && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleClearAll();
                  }}
                  className="flex-1 py-2 px-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Empty All Shops</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logoutAdmin();
                  onLogout();
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-stone-100 text-stone-700 hover:bg-rose-50 hover:text-rose-700 text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3.5 sm:p-8 space-y-4 sm:space-y-6 pb-24 sm:pb-8">
        {/* Firebase Info Banner */}
        {showFirebaseInfo && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EDE8E1] shadow-lg relative animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-5 h-5 text-[#5C3A21]" />
                <h3 className="text-sm font-bold text-stone-900">
                  Firebase Database Status &amp; Configuration
                </h3>
              </div>
              <button
                onClick={() => setShowFirebaseInfo(false)}
                className="text-stone-400 hover:text-stone-700 text-xs font-semibold p-1"
              >
                Dismiss
              </button>
            </div>

            <p className="text-xs text-stone-600 mb-3">
              {isFirebaseConfigured
                ? `Connected to Firebase Project: "${firebaseConfig.projectId}". All shops and card taps sync live with Firestore.`
                : `Currently running on LocalStorage & In-Memory Store with automatic fallback. To connect live Firestore, add your keys in .env.local:`}
            </p>

            {!isFirebaseConfigured && (
              <pre className="p-3 rounded-xl bg-[#F9F6F0] border border-[#E5DACD] text-[11px] font-mono text-[#633917] overflow-x-auto mb-3">
{`NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id`}
              </pre>
            )}

            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              <button
                onClick={handleClearAll}
                className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-1.5 border border-rose-200 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Empty All Shops</span>
              </button>
              <button
                onClick={loadShops}
                className="px-3 py-1.5 rounded-lg bg-[#F3ECE4] hover:bg-[#EAE0D5] text-[#633917] text-xs font-semibold flex items-center gap-1.5 border border-[#E5DACD] transition"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Refresh Data</span>
              </button>
            </div>
          </div>
        )}

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#EDE8E1] shadow-xs">
            <span className="text-[11px] sm:text-xs text-stone-500 block mb-0.5 sm:mb-1">Active Shops</span>
            <div className="text-xl sm:text-2xl font-black text-stone-900">{shops.length}</div>
            <span className="text-[10px] sm:text-[11px] text-[#8C6239] font-medium block truncate">With unique URLs</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#EDE8E1] shadow-xs">
            <span className="text-[11px] sm:text-xs text-stone-500 block mb-0.5 sm:mb-1">NFC Card Taps</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-700">{totalTaps}</div>
            <span className="text-[10px] sm:text-[11px] text-stone-500 block truncate">Contactless visits</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#EDE8E1] shadow-xs">
            <span className="text-[11px] sm:text-xs text-stone-500 block mb-0.5 sm:mb-1">Button Clicks</span>
            <div className="text-xl sm:text-2xl font-black text-blue-700">{totalActionClicks}</div>
            <span className="text-[10px] sm:text-[11px] text-stone-500 block truncate">Reviews, WhatsApp, etc.</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-purple-50 border border-purple-200 shadow-xs">
            <span className="text-[11px] sm:text-xs text-purple-700 block mb-0.5 sm:mb-1 font-bold">Referral Clicks</span>
            <div className="text-xl sm:text-2xl font-black text-purple-900">{totalReferrals}</div>
            <span className="text-[10px] sm:text-[11px] text-purple-700 font-semibold block truncate">Piyush Assudani</span>
          </div>
        </div>

        {/* Shops Directory Header & Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 pt-1 sm:pt-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#5C3A21]" />
                <span>Configured NFC Shops</span>
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-[#FAF7F2] text-[#5C3A21] border border-stone-200">
                {filteredShops.length} of {shops.length}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
              Each shop gets its own distinct URL to program onto NFC tags or print onto standees.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shops or slugs..."
              className="w-full bg-white border border-[#EDE8E1] rounded-xl pl-9 pr-8 py-2.5 sm:py-2 text-base sm:text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#5C3A21] shadow-xs transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Shops Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-stone-400">
            <RefreshCw className="w-8 h-8 animate-spin text-[#5C3A21] mb-2" />
            <p className="text-xs">Loading shop directory...</p>
          </div>
        ) : filteredShops.length === 0 ? (
          <div className="py-14 sm:py-20 text-center rounded-2xl sm:rounded-3xl border-2 border-dashed border-[#EDE8E1] bg-white p-6 sm:p-8 max-w-lg mx-auto shadow-sm">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-[#FAF7F2] border border-[#E5DACD] flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <NfcWaveIcon className="w-7 h-7 sm:w-8 sm:h-8 text-[#5C3A21]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-1">
              {searchQuery ? 'No matching shops found' : 'Admin Panel is Clean & Empty'}
            </h3>
            <p className="text-xs text-stone-500 mb-5 max-w-xs mx-auto leading-relaxed">
              {searchQuery
                ? 'Try a different search keyword.'
                : 'Zero demo shops. Ready to add your clients! Click the button below to create your first NFC shop card.'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setIsCreatingNew(true)}
                className="py-3 px-5 rounded-xl bg-[#5C3A21] hover:bg-[#472c19] text-white font-bold text-xs sm:text-sm flex items-center gap-2 mx-auto transition shadow-md shadow-[#5C3A21]/20 active:scale-95"
              >
                <Plus className="w-4 h-4 text-amber-200" />
                <span>Add First Shop Card</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredShops.map((shop) => {
              const isCopied = copiedId === shop.id;

              return (
                <div
                  key={shop.id}
                  className="bg-white border border-[#EDE8E1] rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-md group"
                >
                  <div>
                    {/* Top Shop Bar */}
                    <div className="flex items-start justify-between gap-2.5 mb-2.5 sm:mb-3">
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-1">
                        {/* Logo */}
                        <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl overflow-hidden border border-stone-200 bg-[#FAF7F2] flex-shrink-0 shadow-2xs">
                          {shop.logoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={shop.logoUrl}
                              alt={shop.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="w-full h-full flex items-center justify-center font-bold text-[#5C3A21] text-base sm:text-lg">
                              {shop.name.charAt(0)}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-sm sm:text-base font-bold text-stone-900 tracking-tight truncate group-hover:text-[#5C3A21] transition-colors">
                            {shop.name}
                          </h3>
                          <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
                            <span className="text-[10px] sm:text-[11px] text-stone-500 truncate max-w-[120px] sm:max-w-none">
                              {shop.category}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-stone-300 shrink-0"></span>
                            <span className="text-[10px] sm:text-[11px] font-bold text-amber-700 shrink-0">
                              ⭐ {shop.rating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F3ECE4] text-[#633917] border border-[#E5DACD] shrink-0">
                        {shop.theme}
                      </span>
                    </div>

                    {/* Tagline */}
                    <p className="text-xs text-stone-600 line-clamp-2 mb-3">
                      {shop.tagline}
                    </p>

                    {/* LIVE CLICKS & REFERRAL STATS PILL */}
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-2 rounded-xl sm:rounded-2xl bg-[#FAF7F2] border border-[#EDE8E1] mb-3 text-center">
                      <div>
                        <span className="text-[9px] text-stone-500 font-bold block uppercase tracking-wider">
                          Visits
                        </span>
                        <span className="text-xs font-black text-stone-900">
                          {shop.tapsCount || 0}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-blue-600 font-bold block uppercase tracking-wider">
                          Clicks
                        </span>
                        <span className="text-xs font-black text-blue-700">
                          {Object.values(shop.clickStats || {}).reduce(
                            (a: number, b) => a + (Number(b) || 0),
                            0
                          )}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-purple-700 font-bold block uppercase tracking-wider">
                          Referrals
                        </span>
                        <span className="text-xs font-black text-purple-800">
                          {shop.referralClicks || 0}
                        </span>
                      </div>
                    </div>

                    {/* CUSTOM URL DISPLAY BOX */}
                    <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-[#FAF7F2] border border-[#EDE8E1] mb-3.5 flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] sm:text-[10px] text-stone-500 uppercase font-mono block">
                          NFC Destination URL:
                        </span>
                        <span className="text-xs font-mono font-bold text-[#5C3A21] truncate block">
                          /{shop.slug}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopyShopUrl(shop.slug, shop.id)}
                        className="py-1.5 px-2.5 sm:px-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 hover:text-stone-950 text-xs font-semibold flex items-center gap-1 transition shrink-0 shadow-2xs min-h-[34px]"
                        title="Copy full URL for NFC tag"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-stone-500" />
                            <span>Copy URL</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Active Configured Links Badges (1 min, 5 max) */}
                    <div className="mb-3.5 sm:mb-4">
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-stone-500 mb-1.5">
                        <span className="font-semibold text-stone-700">Active Links ({shop.links.length}/5):</span>
                        <span className="text-stone-400">Only configured show</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {shop.links.map((link) => (
                          <div
                            key={link.id}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white border border-stone-200 text-[10px] sm:text-[11px] text-stone-700 font-medium shadow-2xs"
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
                  {/* Mobile Actions Layout */}
                  <div className="sm:hidden pt-3 border-t border-stone-100 flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setAnalyticsShop(shop)}
                        className="py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold flex items-center justify-center gap-1.5 transition min-h-[40px] active:scale-98"
                      >
                        <TrendingUp className="w-3.5 h-3.5 text-purple-700" />
                        <span>Analytics</span>
                      </button>

                      <button
                        onClick={() => setQrShop(shop)}
                        className="py-2 px-3 rounded-xl bg-[#F3ECE4] hover:bg-[#EAE0D5] border border-[#E5DACD] text-[#633917] text-xs font-bold flex items-center justify-center gap-1.5 transition min-h-[40px] active:scale-98"
                      >
                        <QrCode className="w-3.5 h-3.5 text-[#8C6239]" />
                        <span>QR Standee</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`/${shop.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition min-h-[38px] active:scale-98"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Page</span>
                      </a>

                      <button
                        onClick={() => setEditingShop(shop)}
                        className="flex-1 py-2 px-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition min-h-[38px] active:scale-98"
                      >
                        <Edit className="w-3.5 h-3.5 text-stone-600" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteShop(shop.id, shop.name)}
                        className="py-2 px-3 rounded-xl bg-stone-100 hover:bg-rose-50 text-stone-500 hover:text-rose-700 text-xs font-semibold flex items-center justify-center gap-1 transition min-h-[38px] active:scale-98"
                        title="Delete Shop"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Desktop Actions Layout */}
                  <div className="hidden sm:flex pt-3 border-t border-stone-100 items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {/* Analytics Button */}
                      <button
                        onClick={() => setAnalyticsShop(shop)}
                        className="py-1.5 px-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold flex items-center gap-1.5 transition"
                        title="View Detailed Click & Referral Breakdown"
                      >
                        <TrendingUp className="w-3.5 h-3.5 text-purple-700" />
                        <span>Analytics</span>
                      </button>

                      {/* Standee QR Modal Button */}
                      <button
                        onClick={() => setQrShop(shop)}
                        className="py-1.5 px-2.5 rounded-xl bg-[#F3ECE4] hover:bg-[#EAE0D5] border border-[#E5DACD] text-[#633917] text-xs font-bold flex items-center gap-1.5 transition"
                        title="Generate QR code and printable standee"
                      >
                        <QrCode className="w-3.5 h-3.5 text-[#8C6239]" />
                        <span>QR</span>
                      </button>

                      {/* Open Customer Shop Page */}
                      <a
                        href={`/${shop.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
                        title="Open NFC Landing Page in new tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Edit Shop */}
                      <button
                        onClick={() => setEditingShop(shop)}
                        className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
                        title="Edit Shop Details & Links"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Shop */}
                      <button
                        onClick={() => handleDeleteShop(shop.id, shop.name)}
                        className="p-2 rounded-xl bg-stone-100 hover:bg-rose-50 text-stone-500 hover:text-rose-700 transition"
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

      {/* Analytics Breakdown Modal */}
      {analyticsShop && (
        <ShopAnalyticsModal
          shop={analyticsShop}
          onClose={() => setAnalyticsShop(null)}
          onReset={() => handleResetShopStats(analyticsShop.id)}
        />
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

      {/* Admin DB Credentials Modal */}
      {showCredsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-[#EDE8E1] rounded-2xl sm:rounded-3xl max-w-md w-full p-4 sm:p-7 shadow-2xl relative my-auto max-h-[96dvh] overflow-y-auto">
            <button
              onClick={() => setShowCredsModal(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 transition min-w-[36px] min-h-[36px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4 pr-8 sm:pr-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#5C3A21] flex items-center justify-center text-white shrink-0">
                <Key className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-stone-900">
                  Firestore DB Admin Credentials
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-500">
                  Collection: <code className="font-mono text-[#5C3A21]">admin_settings</code>
                </p>
              </div>
            </div>

            {credsSavedNotice && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Credentials saved directly to Firestore Database!</span>
              </div>
            )}

            <form
              onSubmit={handleUpdateCreds}
              className="space-y-4"
              autoComplete="off"
              data-lpignore="true"
            >
              <div style={{ display: 'none' }} aria-hidden="true">
                <input type="text" name="chrome_absorb_user" tabIndex={-1} autoComplete="off" />
                <input type="password" name="chrome_absorb_pass" tabIndex={-1} autoComplete="new-password" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Database Username
                </label>
                <input
                  type="text"
                  required
                  name="firestore_admin_username_field"
                  autoComplete="off"
                  data-lpignore="true"
                  data-1p-ignore="true"
                  data-form-type="other"
                  value={adminUser}
                  onChange={(e) => setAdminUser(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-stone-900 font-mono focus:outline-none focus:border-[#5C3A21]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Database Password / PIN
                </label>
                <div className="relative">
                  <input
                    type={showCredPass ? 'text' : 'password'}
                    required
                    name="firestore_admin_pin_field"
                    autoComplete="off"
                    data-lpignore="true"
                    data-1p-ignore="true"
                    data-form-type="other"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl pl-3.5 pr-11 py-2.5 text-base sm:text-sm text-stone-900 font-mono focus:outline-none focus:border-[#5C3A21]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCredPass(!showCredPass)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-700 transition"
                    title={showCredPass ? 'Hide password' : 'Show password'}
                  >
                    {showCredPass ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCredsModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold min-h-[42px]"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={savingCreds}
                  className="px-4 py-2.5 rounded-xl bg-[#5C3A21] hover:bg-[#472c19] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm disabled:opacity-50 min-h-[42px]"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingCreds ? 'Updating DB...' : 'Save to Firestore'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button for Mobile: Quick Add Shop */}
      <button
        onClick={() => setIsCreatingNew(true)}
        className="sm:hidden fixed bottom-5 right-5 z-40 bg-[#5C3A21] hover:bg-[#472c19] text-white py-3 px-4 rounded-full shadow-xl shadow-[#5C3A21]/30 flex items-center gap-2 font-bold text-xs active:scale-95 transition"
        title="Add New Shop Card"
      >
        <Plus className="w-4 h-4 text-amber-200" />
        <span>Add Shop</span>
      </button>
      {/* Floating Action Toast Notification */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
