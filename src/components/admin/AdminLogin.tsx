'use client';

import React, { useState } from 'react';
import { verifyAdminLoginInDB } from '@/lib/auth';
import { NfcWaveIcon } from '@/components/icons/BrandIcons';
import {
  Lock,
  User,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Eye,
  EyeOff,
} from 'lucide-react';
import Link from 'next/link';

interface AdminLoginProps {
  onSuccess: () => void;
}

export default function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await verifyAdminLoginInDB(username, password);

    if (result.success) {
      onSuccess();
    } else {
      setError(result.error || 'Authentication failed. Please check credentials.');
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-[#FAF7F2] text-stone-900 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans"
      suppressHydrationWarning
    >
      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white border border-[#EDE8E1] rounded-3xl p-8 shadow-xl shadow-stone-200/60 relative z-10">
        {/* Top Branding */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#5C3A21] p-0.5 shadow-lg shadow-[#5C3A21]/20 mb-3 flex items-center justify-center">
            <NfcWaveIcon className="w-8 h-8 text-amber-200" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECE4] border border-[#E5DACD] text-[#633917] text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8C6239]" />
            <span>Secure Management Portal</span>
          </div>

          <h1 className="text-2xl font-black text-stone-900 tracking-tight">
            Admin Sign In
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            TapTap NFC Standee &amp; Shop URL Hub
          </p>
        </div>

        {/* Quick Credentials Info & 1-Click Sign In */}
        <div className="mb-4 p-3 rounded-2xl bg-[#F8F5EE] border border-[#E8DFC8] flex items-center justify-between gap-2">
          <div className="text-[11px] text-stone-700">
            <span className="font-bold text-[#5C3A21]">Admin Credentials:</span>
            <div className="font-mono text-stone-600 mt-0.5">
              User: <span className="font-bold text-stone-900">piyushassudani</span> • Pass: <span className="font-bold text-stone-900">9413879444</span>
            </div>
          </div>
          <button
            type="button"
            onClick={async () => {
              setUsername('piyushassudani');
              setPassword('9413879444');
              setLoading(true);
              setError(null);
              const result = await verifyAdminLoginInDB('piyushassudani', '9413879444');
              if (result.success) {
                onSuccess();
              } else {
                setError(result.error || 'Authentication failed');
                setLoading(false);
              }
            }}
            className="px-3 py-1.5 rounded-xl bg-[#5C3A21] hover:bg-[#472c19] text-white text-xs font-bold transition shadow-xs flex-shrink-0 active:scale-95"
          >
            ⚡ 1-Click Sign In
          </button>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-[#FBF9F5] border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#5C3A21] focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#FBF9F5] border border-stone-200 rounded-xl pl-10 pr-10 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#5C3A21] focus:bg-white transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 transition"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm bg-[#5C3A21] hover:bg-[#472c19] text-white shadow-lg shadow-[#5C3A21]/20 flex items-center justify-center gap-2 transition active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-stone-500 hover:text-stone-800 transition font-medium"
          >
            &larr; Back to Shop Page
          </Link>
        </div>
      </div>
    </div>
  );
}
