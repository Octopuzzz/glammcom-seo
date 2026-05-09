'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminAuth } from '@/lib/admin-auth';
import { cmsClient } from '@/lib/api';
import {
  Image, Info, HelpCircle, LayoutDashboard,
  LogOut, ExternalLink, MessageSquare, RefreshCw,
  Star, Database
} from 'lucide-react';

const SECTIONS = [
  { href: '/admin/hero', icon: LayoutDashboard, label: 'Hero', desc: 'Edit headline, background, CTA', table: 'cp_hero' },
  { href: '/admin/portfolio', icon: Image, label: 'Portfolio', desc: 'Manage featured & other artworks', table: 'cp_portfolio' },
  { href: '/admin/about', icon: Info, label: 'About', desc: 'Artist bio, stats, social links', table: 'cp_about' },
  { href: '/admin/faq', icon: HelpCircle, label: 'FAQ', desc: 'Frequently asked questions', table: 'cp_faq' },
  { href: '/admin/inquiries', icon: MessageSquare, label: 'Inquiries', desc: 'Contact form submissions', table: 'cp_inquiries', badge: 'new' },
];

interface TableStat {
  table: string;
  count: number;
  loading: boolean;
  error?: boolean;
}

export default function AdminDashboardPage() {
  const { token, user, logout, loading } = useAdminAuth();
  const router = useRouter();
  const [stats, setStats] = useState<TableStat[]>(
    SECTIONS.map((s) => ({ table: s.table, count: 0, loading: true }))
  );
  const [newInquiries, setNewInquiries] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!loading && !token) router.push('/admin');
  }, [token, loading, router]);

  const fetchStats = async () => {
    if (!token) return;
    setRefreshing(true);

    const results = await Promise.all(
      SECTIONS.map(async (s) => {
        try {
          const items = await cmsClient.search(s.table, { limit: 1000 }, token);
          return { table: s.table, count: Array.isArray(items) ? items.length : 0, loading: false };
        } catch {
          return { table: s.table, count: 0, loading: false, error: true };
        }
      })
    );
    setStats(results);

    // Count new inquiries
    try {
      const inq = await cmsClient.search<{ status: string }>(
        'cp_inquiries',
        { filters: [{ field: 'status', operator: '=', value: 'new' }] },
        token
      );
      setNewInquiries(Array.isArray(inq) ? inq.length : 0);
    } catch { setNewInquiries(0); }

    setRefreshing(false);
  };

  useEffect(() => { fetchStats(); }, [token]);

  const getStat = (table: string) => stats.find((s) => s.table === table);

  if (loading || !token) return null;

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold">
              <span className="gold-shimmer">Irenne</span>
              <span className="text-stone-500 font-light ml-1">Art</span>
              <span className="text-stone-600 font-light ml-3 text-xl">CMS</span>
            </p>
            <p className="text-stone-500 text-sm mt-1 font-[family-name:var(--font-inter)]">
              {user?.email}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase text-stone-400 hover:text-amber-300 border border-stone-800 hover:border-stone-700 rounded-full transition-all font-[family-name:var(--font-inter)]"
            >
              View Site <ExternalLink size={12} />
            </Link>
            <button
              onClick={() => { logout(); router.push('/admin'); }}
              className="flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase text-stone-400 hover:text-red-400 border border-stone-800 hover:border-red-900 rounded-full transition-all font-[family-name:var(--font-inter)]"
            >
              <LogOut size={12} /> Logout
            </button>
          </div>
        </div>

        {/* CMS Overview strip */}
        <div className="glass-card rounded-2xl p-5 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Database size={16} className="text-amber-400" />
              <span className="text-stone-300 text-sm font-semibold font-[family-name:var(--font-inter)]">CMS Overview</span>
            </div>
            <button
              onClick={fetchStats}
              disabled={refreshing}
              className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-amber-300 transition-colors font-[family-name:var(--font-inter)]"
            >
              <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {SECTIONS.map(({ table, label, icon: Icon }) => {
              const stat = getStat(table);
              return (
                <div key={table} className="bg-stone-900/60 rounded-xl p-3 text-center">
                  <Icon size={16} className="text-amber-400 mx-auto mb-1.5" />
                  <p className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-stone-100">
                    {stat?.loading ? '…' : stat?.error ? '—' : stat?.count ?? 0}
                  </p>
                  <p className="text-stone-600 text-xs font-[family-name:var(--font-inter)] mt-0.5 capitalize">{label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Portfolio highlight note */}
        {!getStat('cp_portfolio')?.loading && (getStat('cp_portfolio')?.count ?? 0) > 0 && (
          <div className="flex items-center gap-3 text-xs text-stone-500 font-[family-name:var(--font-inter)] mb-6 px-1">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span>Toggle the ⭐ star on artwork cards in <Link href="/admin/portfolio" className="text-amber-400 hover:underline">Portfolio</Link> to control which appear as &ldquo;Featured&rdquo; vs &ldquo;Other Works&rdquo;</span>
          </div>
        )}

        {/* Section cards */}
        <h2 className="text-stone-400 text-xs tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-inter)]">
          Manage Content
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SECTIONS.map(({ href, icon: Icon, label, desc, table }) => {
            const stat = getStat(table);
            const isInquiries = table === 'cp_inquiries';
            return (
              <Link
                key={href}
                href={href}
                className="group glass-card rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-0.5 relative"
              >
                {isInquiries && newInquiries > 0 && (
                  <span className="absolute top-4 right-4 min-w-[22px] h-[22px] px-1.5 rounded-full bg-amber-300 text-stone-950 text-xs font-bold flex items-center justify-center font-[family-name:var(--font-inter)]">
                    {newInquiries}
                  </span>
                )}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-300/10 group-hover:bg-amber-300/20 flex items-center justify-center transition-colors shrink-0">
                    <Icon size={18} className="text-amber-300" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <p className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-stone-100 group-hover:text-amber-300 transition-colors">
                        {label}
                      </p>
                      {!stat?.loading && !stat?.error && (
                        <span className="text-stone-600 text-xs font-[family-name:var(--font-inter)]">
                          {stat?.count} record{stat?.count !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    <p className="text-stone-500 text-sm mt-0.5 font-[family-name:var(--font-inter)]">{desc}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Tips */}
        <div className="mt-8 glass-card rounded-2xl p-6 border-amber-500/10">
          <p className="text-amber-400 text-xs tracking-widest uppercase mb-3 font-[family-name:var(--font-inter)]">
            Quick Tips
          </p>
          <ul className="text-stone-400 text-sm space-y-2 font-[family-name:var(--font-inter)]">
            <li>• Changes appear on the live site within <strong className="text-stone-300">60 seconds</strong> (ISR revalidation)</li>
            <li>• New contact messages show a badge counter — reply directly via email from the Inquiries page</li>
            <li>• Use <strong className="text-stone-300">order_index</strong> on Portfolio and FAQ to control display order</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
