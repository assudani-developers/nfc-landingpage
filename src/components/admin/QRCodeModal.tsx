'use client';

import React, { useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Shop } from '@/types';
import {
  X,
  Download,
  Copy,
  Check,
  ExternalLink,
  MapPin,
} from 'lucide-react';
import { NfcWaveIcon, GoogleReviewIcon } from '@/components/icons/BrandIcons';
import { CurvedWaveMask } from '@/components/decorations/LightDecorations';

interface QRCodeModalProps {
  shop: Shop;
  onClose: () => void;
}

export default function QRCodeModal({ shop, onClose }: QRCodeModalProps) {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const fullShopUrl = `${baseUrl}/${shop.slug}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(fullShopUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadQR = () => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (!canvas) return;

    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${shop.slug}-nfc-qr-standee.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-[#EDE8E1] rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECE4] border border-[#E5DACD] text-[#633917] text-xs font-semibold mb-2">
            <NfcWaveIcon className="w-4 h-4 text-[#8C6239]" />
            <span>NFC &amp; QR Standee Generator</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
            {shop.name}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Write this URL into your NFC tag or print this QR standee for the billing counter.
          </p>
        </div>

        {/* Standee Physical Card Preview (Print-Ready Light Design) */}
        <div
          id="printable-standee"
          className="rounded-2xl p-6 border-2 border-stone-200 bg-[#FAF7F2] flex flex-col items-center text-center shadow-inner relative overflow-hidden"
        >
          {/* Top Standee Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-[#5C3A21] flex items-center justify-center">
              <NfcWaveIcon className="w-4 h-4 text-amber-200" />
            </div>
            <span className="text-xs font-black tracking-widest uppercase text-stone-800">
              TAP NFC OR SCAN QR
            </span>
          </div>

          {/* Shop Mini Logo & Name */}
          <div className="mb-3 flex flex-col items-center">
            {shop.logoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={shop.logoUrl}
                alt={shop.name}
                className="w-12 h-12 rounded-2xl object-cover border border-stone-200 shadow-sm mb-1.5"
              />
            )}
            <h3 className="text-base font-extrabold text-stone-900 tracking-tight">
              {shop.name}
            </h3>
            <span className="text-[11px] text-stone-500 font-medium">
              {shop.category}
            </span>
          </div>

          {/* High-Resolution QR Canvas */}
          <div
            ref={canvasRef}
            className="p-4 rounded-2xl bg-white border border-stone-200 shadow-md flex items-center justify-center my-2"
          >
            <QRCodeCanvas
              value={fullShopUrl}
              size={180}
              level="H"
              marginSize={2}
              fgColor="#1c1917"
              bgColor="#ffffff"
            />
          </div>

          {/* Call to action on standee */}
          <div className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3ECE4] border border-[#E5DACD] text-[#633917] text-xs font-bold">
            <GoogleReviewIcon className="w-4 h-4" />
            <span>Leave a 5-Star Google Review</span>
          </div>

          <div className="mt-2 text-[10px] text-stone-500 font-mono">
            {fullShopUrl}
          </div>
        </div>

        {/* Custom URL Display for Admin */}
        <div className="mt-5 p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#EDE8E1] flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-stone-600">
            <span className="font-semibold text-stone-800">Shop NFC Destination URL:</span>
            <span className="font-mono text-[#5C3A21] font-bold">/{shop.slug}</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={fullShopUrl}
              className="flex-1 bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono text-stone-800 select-all outline-none focus:border-[#5C3A21]"
            />
            <button
              onClick={handleCopyUrl}
              className="py-2 px-3.5 rounded-xl bg-[#5C3A21] hover:bg-[#472c19] text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="text-[11px] text-stone-500">
            💡 <strong>How to write to NFC tag:</strong> Open the free &ldquo;NFC Tools&rdquo; mobile app, tap &ldquo;Write&rdquo; &rarr; &ldquo;Add a record&rdquo; &rarr; &ldquo;URL&rdquo;, paste this link, and hold phone over your NFC tag.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          <button
            onClick={downloadQR}
            className="flex-1 py-3 px-4 rounded-xl bg-[#5C3A21] hover:bg-[#472c19] text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-[#5C3A21]/20"
          >
            <Download className="w-4 h-4" />
            <span>Download Standee QR Image</span>
          </button>

          <a
            href={`/${shop.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Preview Page</span>
          </a>
        </div>
      </div>
    </div>
  );
}
