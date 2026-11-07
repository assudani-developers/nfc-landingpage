'use client';

import React, { useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Shop } from '@/types';
import {
  X,
  Copy,
  Check,
  Download,
  Share2,
  QrCode,
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import confetti from 'canvas-confetti';

interface ShareProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  shop: Shop;
}

export default function ShareProfileModal({
  isOpen,
  onClose,
  shop,
}: ShareProfileModalProps) {
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const origin =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://assudanideveloper-nfc.vercel.app';
  const fullShopUrl = `${origin}/${shop.slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullShopUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = fullShopUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${shop.name} | Smart NFC Card`,
          text: `Check out ${shop.name}'s digital NFC business card & Google reviews:`,
          url: fullShopUrl,
        });
      } catch {
        // User cancelled or share blocked
      }
    } else {
      handleCopyLink();
    }
  };

  const handleDownloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;

    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.65 },
        colors: ['#EA4335', '#4285F4', '#FBBC05', '#34A853'],
      });
    } catch {}

    const pngUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = `${shop.slug}-taptap-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `Check out ${shop.name} on TapTap NFC: ${fullShopUrl}`
  )}`;

  const canNativeShare = typeof navigator !== 'undefined' && Boolean(navigator.share);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      {/* Click outside backdrop to close */}
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        role="button"
        tabIndex={0}
        aria-label="Close modal overlay"
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
        }}
      />

      {/* Main Bottom Sheet / Centered Card */}
      <div className="w-full max-w-sm sm:max-w-md bg-[#FAF7F2] rounded-t-[32px] sm:rounded-[32px] shadow-2xl border border-stone-200 flex flex-col max-h-[92vh] overflow-hidden animate-in slide-in-from-bottom duration-300">
        
        {/* Mobile Drag Indicator Bar */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center">
          <div className="w-12 h-1.5 rounded-full bg-stone-300" />
        </div>

        {/* Modal Header */}
        <div className="p-4 sm:p-5 pb-3 border-b border-stone-200 bg-white flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF7F2] border border-[#EDE8E1] flex items-center justify-center text-[#5C3A21] shadow-2xs flex-shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-stone-900 leading-tight">
                Share Business Card &amp; QR
              </h3>
              <p className="text-[11px] text-stone-500 mt-0.5 truncate max-w-[200px]">
                {shop.name}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 flex items-center justify-center transition flex-shrink-0 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: QR Code & Sharing Options */}
        <div className="p-5 sm:p-6 flex flex-col items-center space-y-4 overflow-y-auto">
          {/* QR Code Presentation Box */}
          <div
            ref={qrRef}
            className="p-4 rounded-3xl bg-white border-2 border-stone-200/80 shadow-md flex flex-col items-center relative group"
          >
            <QRCodeCanvas
              value={fullShopUrl}
              size={180}
              level="H"
              marginSize={1}
              fgColor="#1C1611"
              bgColor="#FFFFFF"
            />
            <span className="text-[10px] font-bold text-stone-400 mt-2 tracking-wider uppercase">
              Scan with any camera
            </span>
          </div>

          {/* URL Pill with 1-Click Copy */}
          <div className="w-full flex items-center gap-2 p-1.5 pl-3 rounded-2xl bg-white border border-[#EDE8E1] shadow-2xs">
            <span className="text-xs text-stone-600 font-mono truncate flex-1 select-all">
              {fullShopUrl}
            </span>
            <button
              type="button"
              onClick={handleCopyLink}
              className={`py-1.5 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#5C3A21] hover:bg-[#472c19] text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

          {/* Action Buttons Grid */}
          <div className="w-full grid grid-cols-2 gap-2.5 pt-1">
            {/* Share on WhatsApp */}
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-black flex items-center justify-center gap-2 shadow-xs transition active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            {/* Download QR Image */}
            <button
              type="button"
              onClick={handleDownloadQR}
              className="py-3 px-3.5 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#5C3A21]" />
              <span>Download QR</span>
            </button>
          </div>

          {/* Native System Share Sheet (if supported on mobile) */}
          {canNativeShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-full py-3 px-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-amber-200" />
              <span>Share via System...</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

