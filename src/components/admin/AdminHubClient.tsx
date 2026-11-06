'use client';

import React, { useState } from 'react';
import { checkIsAdminAuthenticated } from '@/lib/auth';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { RefreshCw } from 'lucide-react';
import { useIsClient } from '@/lib/useIsClient';

export default function AdminHubClient() {
  const isClient = useIsClient();
  const [sessionAuth, setSessionAuth] = useState(false);

  if (!isClient) {
    return (
      <div
        className="min-h-screen w-full bg-[#FAF7F2] flex items-center justify-center text-stone-400"
        suppressHydrationWarning
      >
        <RefreshCw className="w-8 h-8 animate-spin text-[#5C3A21]" />
      </div>
    );
  }

  const isAuth = sessionAuth || checkIsAdminAuthenticated();

  if (!isAuth) {
    return <AdminLogin onSuccess={() => setSessionAuth(true)} />;
  }

  return <AdminDashboard onLogout={() => setSessionAuth(false)} />;
}

