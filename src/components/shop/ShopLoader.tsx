'use client';

import React from 'react';
import { CoffeeCupIcon } from '@/components/decorations/LightDecorations';
import { NfcWaveIcon } from '@/components/icons/BrandIcons';

interface ShopLoaderProps {
  logoUrl?: string;
  name?: string;
  themeColor?: string;
}

export default function ShopLoader({
  logoUrl,
  name,
  themeColor = '#5C3A21',
}: ShopLoaderProps) {
  const brandInitials = name?.trim() ? name.trim().slice(0, 2).toUpperCase() : 'NFC';

  return (
    <div
      className="min-h-dvh min-h-[100dvh] w-full bg-[#FAF7F2] text-stone-900 flex flex-col items-center justify-center p-6 relative overflow-hidden select-none"
      suppressHydrationWarning
    >
      {/* Ambient background glow in shop's theme color */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: themeColor }}
      />

      {/* Main Loader Container: Spinner Ring Around Company Logo */}
      <div className="relative flex flex-col items-center z-10 space-y-4">
        {/* Ring + Logo Centerpiece */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
          {/* Static Soft Background Track */}
          <div className="absolute inset-0 rounded-full border-[3px] border-stone-200/80" />

          {/* Animated Clean Spinner Ring */}
          <div
            className="absolute inset-0 rounded-full border-[3px] border-transparent animate-spin"
            style={{
              borderTopColor: themeColor,
              borderRightColor: themeColor,
            }}
          />

          {/* Center Company Logo Box */}
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-white border border-[#EDE8E1] p-1.5 shadow-md flex items-center justify-center overflow-hidden z-10">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt={name || 'Company Logo'}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : name ? (
              <div
                className="w-full h-full rounded-xl flex items-center justify-center font-black text-lg text-white shadow-inner"
                style={{ backgroundColor: themeColor }}
              >
                {brandInitials}
              </div>
            ) : (
              <div className="w-full h-full rounded-xl bg-[#FAF7F2] flex items-center justify-center text-[#5C3A21]">
                <CoffeeCupIcon className="w-8 h-8" />
              </div>
            )}
          </div>
        </div>

        {/* Company Name & Loading Indicator */}
        <div className="text-center space-y-1">
          {name && (
            <h2 className="text-sm sm:text-base font-black text-stone-900 tracking-tight max-w-[240px] truncate">
              {name}
            </h2>
          )}
          <div className="flex items-center justify-center gap-1.5 text-xs text-stone-400 font-medium">
            <NfcWaveIcon className="w-3.5 h-3.5 text-[#5C3A21] animate-pulse" />
            <span>NFC Card Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

