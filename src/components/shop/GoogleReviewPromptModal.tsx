'use client';

import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Star,
  ExternalLink,
  Edit3,
  Sparkles,
} from 'lucide-react';
import { GoogleReviewIcon } from '@/components/icons/BrandIcons';
import confetti from 'canvas-confetti';

interface GoogleReviewPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewUrl: string;
  shopName: string;
}

interface ReviewTemplate {
  id: number;
  tag: string;
  text: string;
}

export default function GoogleReviewPromptModal({
  isOpen,
  onClose,
  reviewUrl,
  shopName,
}: GoogleReviewPromptModalProps) {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  if (!isOpen) return null;

  // 10 high-converting 5-star pre-written review templates
  const templates: ReviewTemplate[] = [
    {
      id: 1,
      tag: '⭐ Customer Favorite',
      text: `Outstanding experience at ${shopName}! The staff was incredibly polite and helpful. Everything was top-notch. Highly recommended to everyone!`,
    },
    {
      id: 2,
      tag: '⚡ Quick & Professional',
      text: `Super quick, hassle-free and professional service. They truly care about their customers. 5 stars all the way!`,
    },
    {
      id: 3,
      tag: '✨ Premium Quality',
      text: `Top-notch quality and fantastic service! Exceeded all my expectations. Will definitely be visiting ${shopName} again soon.`,
    },
    {
      id: 4,
      tag: '🌟 Great Ambience & Team',
      text: `Loved the customer support, ambience and attention to detail. One of the best places in town. 10/10 recommendation!`,
    },
    {
      id: 5,
      tag: '💎 Trustworthy & Genuine',
      text: `Very genuine, reliable and honest business. Super transparent and great customer dealing. Completely satisfied!`,
    },
    {
      id: 6,
      tag: '👍 Best Value',
      text: `Great pricing and premium quality! The experience was smooth from start to finish. Highly satisfied with ${shopName}.`,
    },
    {
      id: 7,
      tag: '🤝 Super Friendly Staff',
      text: `The team here is extremely courteous, helpful and cooperative. Such a refreshing customer experience!`,
    },
    {
      id: 8,
      tag: '🎯 100% Recommended',
      text: `A delightful visit! Everything was clean, well-managed and top-tier. I will gladly recommend ${shopName} to all my friends and family.`,
    },
    {
      id: 9,
      tag: '🚀 Fast & Reliable',
      text: `Best-in-class customer service. They resolved all questions so fast and politely. Truly impressive service!`,
    },
    {
      id: 10,
      tag: '🏆 Exceptional Experience',
      text: `Absolutely 5 stars! Exceptional service and genuine care for customers. Loved everything about this place!`,
    },
  ];

  const handleSelectAndCopy = async (template: ReviewTemplate) => {
    setCopiedId(template.id);

    // 1. Copy text to clipboard
    try {
      await navigator.clipboard.writeText(template.text);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = template.text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    // 2. Confetti celebration
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#EA4335', '#4285F4', '#FBBC05', '#34A853', '#5C3A21'],
      });
    } catch {}

    // 3. Open Google review URL after brief feedback
    setTimeout(() => {
      window.open(reviewUrl, '_blank', 'noopener,noreferrer');
      onClose();
      setCopiedId(null);
    }, 450);
  };

  const handleDirectOpen = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#EA4335', '#4285F4', '#FBBC05', '#34A853'],
      });
    } catch {}

    window.open(reviewUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

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

      {/* Main Bottom Sheet / Centered Modal */}
      <div className="w-full max-w-lg bg-[#FAF7F2] rounded-t-[32px] sm:rounded-[32px] shadow-2xl border border-stone-200 flex flex-col max-h-[90vh] sm:max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-300">
        
        {/* Mobile Drag Indicator Bar */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center">
          <div className="w-12 h-1.5 rounded-full bg-stone-300" />
        </div>

        {/* Modal Header */}
        <div className="p-4 sm:p-5 pb-3 border-b border-stone-200 bg-white flex items-start justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#FAF7F2] border border-[#EDE8E1] flex items-center justify-center shadow-xs flex-shrink-0">
              <GoogleReviewIcon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-black text-base sm:text-lg text-stone-900 leading-tight">
                  Choose a 5-Star Review
                </h3>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black border border-amber-300">
                  <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                  <span>5.0</span>
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Tap any pre-written review to <strong>copy &amp; open Google</strong>!
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

        {/* Notice Banner */}
        <div className="px-4 sm:px-5 py-2.5 bg-amber-50/80 border-b border-amber-200/60 flex items-center gap-2 text-xs text-amber-950 font-medium">
          <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            Clicking a card <strong>copies the review text</strong> and opens Google Review page directly so you can just paste!
          </span>
        </div>

        {/* Scrollable Prompts List (Top Section) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5">
          {templates.map((tpl) => {
            const isCopied = copiedId === tpl.id;
            return (
              <div
                key={tpl.id}
                onClick={() => handleSelectAndCopy(tpl)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleSelectAndCopy(tpl);
                }}
                className={`p-3.5 sm:p-4 rounded-2xl bg-white border transition-all duration-200 cursor-pointer select-none text-left relative group ${
                  isCopied
                    ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-400/40'
                    : 'border-[#EDE8E1] hover:border-amber-300 hover:shadow-md'
                }`}
              >
                {/* Header inside review card: Tag & Stars */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                    {tpl.tag}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                  &ldquo;{tpl.text}&rdquo;
                </p>

                {/* Bottom Action inside card: Copy & Paste on Google */}
                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-stone-400 group-hover:text-amber-800 transition-colors">
                    {isCopied ? 'Copied to clipboard!' : '1-Tap Copy & Open Google'}
                  </span>

                  <button
                    type="button"
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                      isCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#5C3A21] group-hover:bg-[#472c19] text-white shadow-xs'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Copied! Opening...</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-amber-200" />
                        <span>Copy &amp; Paste</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Bottom Sticky Section: "Write Yourself" */}
        <div className="p-3.5 sm:p-4 bg-white border-t border-stone-200 flex-shrink-0 flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2 w-full justify-center text-xs text-stone-500 font-medium">
            <span className="h-px bg-stone-200 flex-1" />
            <span>or write your own</span>
            <span className="h-px bg-stone-200 flex-1" />
          </div>

          <button
            type="button"
            onClick={handleDirectOpen}
            className="w-full py-3 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-stone-300/80 transition active:scale-95 cursor-pointer"
          >
            <Edit3 className="w-4 h-4 text-[#5C3A21]" />
            <span>Write Your Own Review on Google</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </button>
        </div>

      </div>
    </div>
  );
}

