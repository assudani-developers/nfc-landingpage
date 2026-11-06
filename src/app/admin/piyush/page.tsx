'use client';

import React, { useState, useEffect } from 'react';
import { checkIsAdminAuthenticated } from '@/lib/auth';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { RefreshCw } from 'lucide-react';

export default function PiyushAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authStatus = checkIsAdminAuthenticated();
    setIsAuthenticated(authStatus);
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center text-slate-400">
        <RefreshCw className="w-8 h-8 animate-spin text-amber-400" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
}
