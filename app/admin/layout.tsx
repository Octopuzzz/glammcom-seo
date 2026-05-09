import type { Metadata } from 'next';
import { AdminAuthProvider } from '@/lib/admin-auth';

export const metadata: Metadata = {
  title: 'Admin — Irenne Art',
  robots: { index: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-stone-950">{children}</div>
    </AdminAuthProvider>
  );
}
