'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/lib/admin-auth';
import { cmsClient } from '@/lib/api';
import type { Inquiry } from '@/lib/types';
import { ArrowLeft, Mail, Clock, CheckCheck, MessageSquare, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STATUS_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
  new: { label: 'New', color: 'text-amber-300 bg-amber-300/10 border-amber-500/30', dot: 'bg-amber-400' },
  read: { label: 'Read', color: 'text-stone-400 bg-stone-800/60 border-stone-700', dot: 'bg-stone-500' },
  replied: { label: 'Replied', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-500/30', dot: 'bg-emerald-400' },
};

function InquiryCard({ item, token, onRefresh }: { item: Inquiry; token: string; onRefresh: (silent?: boolean) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [updating, setUpdating] = useState(false);
  const cfg = STATUS_CONFIG[item.status] || STATUS_CONFIG['new'];

  const markAs = async (status: string) => {
    setUpdating(true);
    await cmsClient.update('cp_inquiries', item.id, { status }, token);
    setUpdating(false);
    onRefresh(true);
  };

  const del = async () => {
    if (!confirm('Delete this inquiry?')) return;
    await cmsClient.remove('cp_inquiries', item.id, token);
    onRefresh(true);
  };

  return (
    <div className={`glass-card rounded-2xl overflow-hidden transition-colors duration-300 ${item.status === 'new' ? 'border-amber-500/20' : ''}`}>
      {/* Header row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-4 p-5 text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center shrink-0 mt-0.5">
          <MessageSquare size={16} className="text-stone-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-[family-name:var(--font-inter)] font-semibold text-stone-100">{item.name}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full border font-[family-name:var(--font-inter)] flex items-center gap-1.5 ${cfg.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-stone-400 text-sm font-[family-name:var(--font-inter)]">{item.email}</span>
            {item.subject && item.subject !== '(No subject)' && (
              <>
                <span className="text-stone-700">·</span>
                <span className="text-stone-500 text-sm font-[family-name:var(--font-inter)] truncate">{item.subject}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-stone-600 text-xs font-[family-name:var(--font-inter)] hidden sm:block">
            {item.created_at ? new Date(item.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : ''}
          </span>
          {expanded ? <ChevronUp size={16} className="text-stone-500" /> : <ChevronDown size={16} className="text-stone-500" />}
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-stone-800/60 px-5 pb-5">
              <p className="text-stone-300 font-[family-name:var(--font-inter)] mt-4 leading-relaxed whitespace-pre-wrap text-sm">
                {item.message}
              </p>

              <div className="flex items-center gap-2 mt-5 flex-wrap">
                <a
                  href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(item.subject || 'Your message')}`}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-300/10 hover:bg-amber-300/20 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide rounded-full transition-all font-[family-name:var(--font-inter)] cursor-pointer"
                >
                  <Mail size={12} /> Reply via Email
                </a>
                {item.status !== 'read' && (
                  <button
                    onClick={() => markAs('read')}
                    disabled={updating}
                    className="flex items-center gap-1.5 px-4 py-2 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 text-xs font-semibold tracking-wide rounded-full transition-all font-[family-name:var(--font-inter)] cursor-pointer disabled:opacity-50"
                  >
                    <Clock size={12} /> Mark as Read
                  </button>
                )}
                {item.status !== 'replied' && (
                  <button
                    onClick={() => markAs('replied')}
                    disabled={updating}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide rounded-full transition-all font-[family-name:var(--font-inter)] cursor-pointer disabled:opacity-50"
                  >
                    <CheckCheck size={12} /> Mark as Replied
                  </button>
                )}
                <button
                  onClick={del}
                  className="ml-auto flex items-center gap-1.5 px-3 py-2 bg-stone-800 hover:bg-red-900/40 border border-stone-700 hover:border-red-900 text-stone-500 hover:text-red-400 text-xs rounded-full transition-all font-[family-name:var(--font-inter)] cursor-pointer"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminInquiriesPage() {
  const { token, loading } = useAdminAuth();
  const router = useRouter();
  const [items, setItems] = useState<Inquiry[]>([]);
  const [fetching, setFetching] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');

  useEffect(() => {
    if (!loading && !token) router.push('/admin');
  }, [token, loading, router]);

  const fetchItems = async (silent = false) => {
    if (!token) return;
    if (!silent) setFetching(true);
    const data = await cmsClient.search<Inquiry>(
      'cp_inquiries',
      { orderBy: { field: 'created_at', sort: 'desc' }, limit: 50 },
      token
    );
    setItems(data);
    if (!silent) setFetching(false);
  };

  useEffect(() => { fetchItems(); }, [token]);

  const filtered = filter === 'all' ? items : items.filter((i) => i.status === filter);
  const counts = { new: items.filter((i) => i.status === 'new').length, read: items.filter((i) => i.status === 'read').length, replied: items.filter((i) => i.status === 'replied').length };

  if (loading || !token) return null;

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/admin/dashboard')} className="text-stone-500 hover:text-amber-300 transition-colors cursor-pointer">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-stone-100">Inquiries</h1>
              <p className="text-stone-500 text-sm font-[family-name:var(--font-inter)]">Contact form submissions</p>
            </div>
          </div>
          {counts.new > 0 && (
            <span className="px-3 py-1 bg-amber-300/10 border border-amber-500/30 text-amber-300 text-sm font-semibold rounded-full font-[family-name:var(--font-inter)]">
              {counts.new} new
            </span>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['all', 'new', 'read', 'replied'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`cursor-pointer px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all font-[family-name:var(--font-inter)] ${
                filter === f
                  ? 'bg-amber-300 text-stone-950'
                  : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
              }`}
            >
              {f === 'all' ? `All (${items.length})` : `${f} (${counts[f]})`}
            </button>
          ))}
        </div>

        {/* List */}
        {fetching && items.length === 0 ? (
          <div className="text-center py-20 text-stone-500 font-[family-name:var(--font-inter)]">Loading…</div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <MessageSquare size={32} className="text-stone-700 mx-auto mb-3" />
            <p className="text-stone-500 font-[family-name:var(--font-inter)]">
              {filter === 'all' ? 'No inquiries yet.' : `No ${filter} inquiries.`}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, height: 0, overflow: 'hidden' }}
                  transition={{ duration: 0.3 }}
                >
                  <InquiryCard item={item} token={token} onRefresh={() => fetchItems(true)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
