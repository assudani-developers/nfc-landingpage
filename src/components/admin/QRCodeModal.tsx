'use client';

import React, { useRef, useState } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { Shop } from '@/types';
import { THEMES } from '@/lib/theme';
import {
  X,
  Download,
  Copy,
  Check,
  Printer,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { NfcWaveIcon, GoogleReviewIcon } from '@/components/icons/BrandIcons';

interface QRCodeModalProps {
  shop: Shop;
  onClose: () => void;
}

export default function QRCodeModal({ shop, onClose }: QRCodeModalProps) {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://taptap-nfc.com';
  const fullShopUrl = `${baseUrl}/${shop.slug}`;
  const theme = THEMES[shop.theme] || THEMES.gold;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(fullShopUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadQR = () => {
    // Find canvas rendered inside canvasRef
    const canvas = canvasRef.current?.querySelector('canvas');
    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${shop.slug}-nfc-qr-standee.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <NfcWaveIcon className="w-4 h-4 text-amber-400" />
            <span>NFC & QR Standee Generator</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {shop.name}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Write this URL into your NFC tags or print this QR standee for the counter.
          </p>
        </div>

        {/* Standee Physical Card Preview (Print-Ready) */}
        <div
          id="printable-standee"
          className="rounded-2xl p-6 border-2 border-slate-700 bg-gradient-to-b from-slate-950 to-slate-900 flex flex-col items-center text-center shadow-inner relative overflow-hidden"
        >
          {/* Top Standee Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center">
              <NfcWaveIcon className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-xs font-bold tracking-widest uppercase text-slate-300">
              TAP NFC OR SCAN QR
            </span>
          </div>

          {/* Shop Mini Logo & Name */}
          <div className="mb-4 flex flex-col items-center">
            {shop.logoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={shop.logoUrl}
                alt={shop.name}
                className="w-12 h-12 rounded-full object-cover border border-slate-700 shadow-md mb-1.5"
              />
            )}
            <h3 className="text-base font-extrabold text-white tracking-tight">
              {shop.name}
            </h3>
            <span className="text-[11px] text-slate-400">
              {shop.category}
            </span>
          </div>

          {/* High-Resolution QR Canvas */}
          <div
            ref={canvasRef}
            className="p-4 rounded-2xl bg-white shadow-2xl flex items-center justify-center my-2"
          >
            <QRCodeCanvas
              value={fullShopUrl}
              size={180}
              level="H"
              marginSize={2}
              fgColor="#0f172a"
              bgColor="#ffffff"
            />
          </div>

          {/* Call to action on standee */}
          <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
            <GoogleReviewIcon className="w-4 h-4" />
            <span>Leave a 5-Star Google Review</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>

          <div className="mt-2 text-[10px] text-slate-500 font-mono">
            {fullShopUrl}
          </div>
        </div>

        {/* Custom URL Display for Admin */}
        <div className="mt-5 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Shop NFC Destination URL:</span>
            <span className="font-mono text-amber-400">Slug: /{shop.slug}</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={fullShopUrl}
              className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 select-all outline-none focus:border-amber-500"
            />
            <button
              onClick={handleCopyUrl}
              className="py-2 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition active:scale-95"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            💡 <strong>How to write to NFC tag:</strong> Open the free &ldquo;NFC Tools&rdquo; app on your phone, choose &ldquo;Write&rdquo; &rarr; &ldquo;Add a record&rdquo; &rarr; &ldquo;URL&rdquo;, paste this link, and hold your phone over the NFC card/sticker.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          <button
            onClick={downloadQR}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20"
          >
            <Download className="w-4 h-4" />
            <span>Download High-Res QR</span>
          </button>

          <a
            href={`/${shop.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Preview Page</span>
          </a>
        </div>
      </div>
    </div>
  );
}
