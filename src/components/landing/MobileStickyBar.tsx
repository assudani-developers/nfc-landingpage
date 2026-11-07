'use client';

import React, { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';

export default function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 200px
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="sm:hidden fixed bottom-3 inset-x-3 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#1C1611]/95 backdrop-blur-md text-white p-2.5 rounded-2xl border border-white/15 shadow-2xl flex items-center justify-between gap-2">
        <div className="pl-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-black tracking-tight text-white">TapTap Standee</span>
          </div>
          <p className="text-[9px] text-stone-300">Lifetime NFC • Zero Fee</p>
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href="tel:+919413879444"
            className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-amber-200 active:scale-95 transition"
            aria-label="Call Piyush"
          >
            <Phone className="w-4 h-4" />
          </a>

          <a
            href="https://wa.me/919413879444?text=Hello%20Piyush%2C%20mujhe%20apni%20shop%20ke%20liye%20Smart%20NFC%20Google%20Review%20Card%20order%20karna%20hai."
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3.5 rounded-xl bg-[#25D366] text-white text-xs font-black flex items-center gap-1.5 shadow-md active:scale-95 transition"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Order on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

