'use client';

import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  id?: string;
  type?: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  type = 'success',
  message,
  onClose,
  duration = 3200,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgStyles = {
    success: 'bg-emerald-900/90 text-white border-emerald-700 shadow-emerald-950/20',
    error: 'bg-rose-900/90 text-white border-rose-700 shadow-rose-950/20',
    info: 'bg-stone-900/90 text-white border-stone-700 shadow-stone-950/20',
  }[type];

  const icon = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-300 flex-shrink-0" />,
    info: <Info className="w-4 h-4 text-amber-300 flex-shrink-0" />,
  }[type];

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div
        className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border backdrop-blur-md shadow-xl text-xs font-semibold ${bgStyles}`}
      >
        {icon}
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
