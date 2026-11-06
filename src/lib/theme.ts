import { ShopTheme } from '@/types';

export interface ThemeConfig {
  name: string;
  bgPage: string;
  cardBg: string;
  cardBorder: string;
  primaryButton: string;
  primaryButtonText: string;
  accentText: string;
  badge: string;
  starColor: string;
}

export const THEMES: Record<ShopTheme, ThemeConfig> = {
  warm_cafe: {
    name: 'Warm Café Latte',
    bgPage: 'bg-[#F9F6F0]',
    cardBg: 'bg-white',
    cardBorder: 'border-[#EDE8E1]',
    primaryButton: 'bg-[#5C3A21] hover:bg-[#4A2E19] text-white shadow-md shadow-[#5C3A21]/20',
    primaryButtonText: 'text-white',
    accentText: 'text-[#5C3A21]',
    badge: 'bg-[#F3ECE4] text-[#633917] border-[#E5DACD]',
    starColor: '#D97706',
  },
  gold: {
    name: 'Caramel Amber',
    bgPage: 'bg-[#FDFBF7]',
    cardBg: 'bg-white',
    cardBorder: 'border-[#EFE7D8]',
    primaryButton: 'bg-[#854D0E] hover:bg-[#713F12] text-white shadow-md shadow-[#854D0E]/20',
    primaryButtonText: 'text-white',
    accentText: 'text-[#854D0E]',
    badge: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
    starColor: '#D97706',
  },
  emerald: {
    name: 'Forest Matcha',
    bgPage: 'bg-[#F6FAF7]',
    cardBg: 'bg-white',
    cardBorder: 'border-[#E2EDE6]',
    primaryButton: 'bg-[#1E4D36] hover:bg-[#163B29] text-white shadow-md shadow-[#1E4D36]/20',
    primaryButtonText: 'text-white',
    accentText: 'text-[#1E4D36]',
    badge: 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]',
    starColor: '#059669',
  },
  sunset: {
    name: 'Terracotta Coral',
    bgPage: 'bg-[#FCF7F6]',
    cardBg: 'bg-white',
    cardBorder: 'border-[#F3E7E5]',
    primaryButton: 'bg-[#9F3A29] hover:bg-[#852E20] text-white shadow-md shadow-[#9F3A29]/20',
    primaryButtonText: 'text-white',
    accentText: 'text-[#9F3A29]',
    badge: 'bg-[#FFF1F2] text-[#9F1239] border-[#FECDD3]',
    starColor: '#E11D48',
  },
  sage: {
    name: 'Artisan Sage',
    bgPage: 'bg-[#F7F9F7]',
    cardBg: 'bg-white',
    cardBorder: 'border-[#E3E9E3]',
    primaryButton: 'bg-[#3A5340] hover:bg-[#2B3F30] text-white shadow-md shadow-[#3A5340]/20',
    primaryButtonText: 'text-white',
    accentText: 'text-[#3A5340]',
    badge: 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]',
    starColor: '#16A34A',
  },
  classic: {
    name: 'Modern Charcoal',
    bgPage: 'bg-[#F8F9FA]',
    cardBg: 'bg-white',
    cardBorder: 'border-[#E5E7EB]',
    primaryButton: 'bg-[#18181B] hover:bg-[#27272A] text-white shadow-md shadow-black/15',
    primaryButtonText: 'text-white',
    accentText: 'text-[#18181B]',
    badge: 'bg-[#F4F4F5] text-[#27272A] border-[#E4E4E7]',
    starColor: '#EAB308',
  },
};
