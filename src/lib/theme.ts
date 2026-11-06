import { ShopTheme } from '@/types';

export interface ThemeConfig {
  name: string;
  badge: string;
  bgGradient: string;
  cardBg: string;
  cardBorder: string;
  glowColor: string;
  accentColor: string;
  accentText: string;
  primaryButton: string;
  starColor: string;
}

export const THEMES: Record<ShopTheme, ThemeConfig> = {
  gold: {
    name: 'Royal Gold',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    bgGradient: 'from-amber-950/40 via-slate-950 to-black',
    cardBg: 'bg-gradient-to-b from-slate-900/90 to-slate-950/95',
    cardBorder: 'border-amber-500/30 hover:border-amber-400/60',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    accentColor: 'from-amber-400 via-amber-500 to-yellow-600',
    accentText: 'text-amber-400',
    primaryButton: 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-yellow-500 shadow-amber-500/25',
    starColor: '#F59E0B',
  },
  emerald: {
    name: 'Imperial Emerald',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    bgGradient: 'from-emerald-950/40 via-slate-950 to-black',
    cardBg: 'bg-gradient-to-b from-slate-900/90 to-slate-950/95',
    cardBorder: 'border-emerald-500/30 hover:border-emerald-400/60',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    accentColor: 'from-emerald-400 via-teal-400 to-green-500',
    accentText: 'text-emerald-400',
    primaryButton: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 hover:from-emerald-400 hover:to-teal-400 shadow-emerald-500/25',
    starColor: '#10B981',
  },
  cyber: {
    name: 'Cyber Violet',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    bgGradient: 'from-purple-950/40 via-slate-950 to-black',
    cardBg: 'bg-gradient-to-b from-slate-900/90 to-slate-950/95',
    cardBorder: 'border-purple-500/30 hover:border-purple-400/60',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    accentColor: 'from-purple-400 via-fuchsia-400 to-pink-500',
    accentText: 'text-purple-400',
    primaryButton: 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-600 text-white hover:from-purple-400 hover:to-pink-500 shadow-purple-500/25',
    starColor: '#A855F7',
  },
  sunset: {
    name: 'Sunset Coral',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    bgGradient: 'from-rose-950/40 via-slate-950 to-black',
    cardBg: 'bg-gradient-to-b from-slate-900/90 to-slate-950/95',
    cardBorder: 'border-rose-500/30 hover:border-rose-400/60',
    glowColor: 'rgba(244, 63, 94, 0.25)',
    accentColor: 'from-rose-400 via-orange-400 to-amber-500',
    accentText: 'text-rose-400',
    primaryButton: 'bg-gradient-to-r from-rose-500 via-orange-500 to-amber-600 text-white hover:from-rose-400 hover:to-amber-500 shadow-rose-500/25',
    starColor: '#F43F5E',
  },
  neon: {
    name: 'Electric Neon',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    bgGradient: 'from-cyan-950/40 via-slate-950 to-black',
    cardBg: 'bg-gradient-to-b from-slate-900/90 to-slate-950/95',
    cardBorder: 'border-cyan-500/30 hover:border-cyan-400/60',
    glowColor: 'rgba(6, 182, 212, 0.25)',
    accentColor: 'from-cyan-400 via-sky-400 to-blue-500',
    accentText: 'text-cyan-400',
    primaryButton: 'bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 text-slate-950 hover:from-cyan-300 hover:to-sky-400 shadow-cyan-500/25',
    starColor: '#06B6D4',
  },
  obsidian: {
    name: 'Midnight Chrome',
    badge: 'bg-slate-700/30 text-slate-200 border-slate-600/40',
    bgGradient: 'from-slate-900 via-slate-950 to-black',
    cardBg: 'bg-gradient-to-b from-slate-900/90 to-slate-950/95',
    cardBorder: 'border-slate-700 hover:border-slate-500',
    glowColor: 'rgba(148, 163, 184, 0.2)',
    accentColor: 'from-slate-200 via-zinc-300 to-slate-400',
    accentText: 'text-slate-200',
    primaryButton: 'bg-gradient-to-r from-slate-100 to-slate-300 text-slate-950 hover:from-white hover:to-slate-200 shadow-white/20',
    starColor: '#E2E8F0',
  },
};
