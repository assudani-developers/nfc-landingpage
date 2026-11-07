'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'Kya customer ko koi app download karni padegi?',
    answer:
      'Nahi! 100% zero app needed. Saare modern Android aur iPhone mein NFC built-in hota hai. Customer sirf apna phone standee par touch karega aur turant Google Review window khul jayegi.',
  },
  {
    question: 'Agar kisi purane phone mein NFC na ho toh?',
    answer:
      'Har standee par high-contrast HD QR Code bhi print hota hai. Agar kisi purane phone mein NFC disabled hai, toh wo camera se scan karke bhi 1 second mein review de sakte hain.',
  },
  {
    question: 'Kya baad mein shop ka phone number ya links change kar sakte hain?',
    answer:
      'Ji haan, bilkul! Standee dynamic cloud technology par kaam karta hai. Agar aapka phone number, WhatsApp, Instagram ya address change ho, toh aap hamare Admin Hub se 5 second mein update kar sakte hain bina naya standee khareede.',
  },
  {
    question: 'Kya koi monthly ya annual subscription fee hai?',
    answer:
      'Koi hidden subscription nahi hai! Standee aur custom link one-time cost par aate hain. Lifetime cloud hosting aur dynamic redirect service 100% included hai.',
  },
  {
    question: 'Delivery mein kitna time lagta hai?',
    answer:
      'Order confirm aur aapka shop logo receive hone ke 24-48 hours ke andar standee custom manufacture aur dispatch ho jaata hai. All India express courier delivery 3-5 business days mein deliver hoti hai.',
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full space-y-3 text-left">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={faq.question}
            className="rounded-2xl bg-white border border-[#EDE8E1] overflow-hidden transition shadow-2xs"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-3 hover:bg-stone-50/70 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center text-[#5C3A21] flex-shrink-0">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-[#5C3A21]' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 border-t border-stone-100 bg-[#FAF7F2]/40 leading-relaxed animate-in fade-in duration-200">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

