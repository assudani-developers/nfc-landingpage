'use client';

import dynamic from 'next/dynamic';
import { RefreshCw } from 'lucide-react';

const AdminHubClient = dynamic(
  () => import('@/components/admin/AdminHubClient'),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-screen w-full bg-[#FAF7F2] flex items-center justify-center text-stone-400"
        suppressHydrationWarning
      >
        <RefreshCw className="w-8 h-8 animate-spin text-[#5C3A21]" />
      </div>
    ),
  }
);

export default function PiyushAdminPage() {
  return <AdminHubClient />;
}
