'use client';

import React, { useState, useEffect } from 'react';
import { checkIsAdminAuthenticated } from '@/lib/auth';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { RefreshCw } from 'lucide-react';

export default function AdminHubClient() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    setIsAuthenticated(checkIsAdminAuthenticated());
  }, []);

  if (!mounted) {
    return (
      <div
        className="min-h-screen w-full bg-[#FAF7F2] flex items-center justify-center text-stone-400"
        suppressHydrationWarning
      >
        <RefreshCw className="w-8 h-8 animate-spin text-[#5C3A21]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
}

