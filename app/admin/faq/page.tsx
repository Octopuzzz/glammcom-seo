'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/lib/admin-auth';
import { cmsClient } from '@/lib/api';
import type { FaqItem } from '@/lib/types';
import { Plus, Pencil, Trash2, ArrowLeft, X, Check, GripVertical } from 'lucide-react';

const EMPTY = { question: '', answer: '', order_index: 0 };

export default function AdminFaqPage() {
  const { token, loading } = useAdminAuth();
  const router = useRouter();
  const [items, setItems] = useState<FaqItem[]>([]);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !token) router.push('/admin');
  }, [token, loading, router]);

  const fetchItems = async () => {
    if (!token) return;
    setFetching(true);
    const data = await cmsClient.search<FaqItem>('cp_faq', { orderBy: { field: 'order_index', sort: 'asc' } }, token);
    setItems(data);
    setFetching(false);
  };

  useEffect(() => { fetchItems(); }, [token]);

  const openNew = () => { setForm({ ...EMPTY, order_index: items.length + 1 }); setEditId(null); setShowForm(true); setError(''); };
  const openEdit = (item: FaqItem) => { setForm({ question: item.question, answer: item.answer, order_index: item.order_index }); setEditId(item.id); setShowForm(true); setError(''); };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true); setError('');
    try {
      if (editId) {
        await cmsClient.update('cp_faq', editId, form, token);
      } else {
        await cmsClient.create('cp_faq', form, token);
      }
      setShowForm(false);
      fetchItems();
    } catch {
      setError('Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm('Delete this FAQ item?')) return;
    await cmsClient.remove('cp_faq', id, token);
    fetchItems();
  };

  if (loading || !token) return null;

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/admin/dashboard')} className="text-stone-500 hover:text-amber-300 transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-stone-100">FAQ</h1>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-5 py-2.5 bg-amber-300 hover:bg-amber-200 text-stone-950 text-sm font-semibold tracking-wide rounded-full transition-all font-[family-name:var(--font-inter)]">
            <Plus size={16} /> Add Question
          </button>
        </div>

        {fetching ? (
          <div className="text-center py-20 text-stone-500 font-[family-name:var(--font-inter)]">Loading...</div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="glass-card rounded-2xl p-5 flex items-start gap-4">
                <GripVertical size={16} className="text-stone-700 mt-1 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-[family-name:var(--font-playfair)] font-semibold text-stone-100">{item.question}</p>
                  <p className="text-stone-500 text-sm mt-1 font-[family-name:var(--font-inter)] line-clamp-2">{item.answer}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => openEdit(item)} className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400 hover:text-stone-200 transition-colors">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-red-900/50 flex items-center justify-center text-stone-400 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div className="text-center py-20 text-stone-500 font-[family-name:var(--font-inter)]">
                No FAQ items yet. <button onClick={openNew} className="text-amber-400 hover:text-amber-300 transition-colors">Add the first one</button>
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 w-full max-w-lg shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-stone-100">
                  {editId ? 'Edit Question' : 'New Question'}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-stone-500 hover:text-stone-300 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-stone-400 text-xs tracking-widest uppercase mb-1.5 font-[family-name:var(--font-inter)]">Question</label>
                  <input
                    type="text"
                    required
                    value={form.question}
                    onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
                    className="w-full px-4 py-3 bg-stone-800/60 border border-stone-700 focus:border-amber-500/60 rounded-xl text-stone-200 focus:outline-none transition-colors font-[family-name:var(--font-inter)] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 text-xs tracking-widest uppercase mb-1.5 font-[family-name:var(--font-inter)]">Answer</label>
                  <textarea
                    rows={4}
                    required
                    value={form.answer}
                    onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
                    className="w-full px-4 py-3 bg-stone-800/60 border border-stone-700 focus:border-amber-500/60 rounded-xl text-stone-200 focus:outline-none transition-colors font-[family-name:var(--font-inter)] text-sm resize-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 text-xs tracking-widest uppercase mb-1.5 font-[family-name:var(--font-inter)]">Order</label>
                  <input
                    type="number"
                    value={form.order_index}
                    onChange={(e) => setForm((f) => ({ ...f, order_index: Number(e.target.value) }))}
                    className="w-full px-4 py-3 bg-stone-800/60 border border-stone-700 focus:border-amber-500/60 rounded-xl text-stone-200 focus:outline-none transition-colors font-[family-name:var(--font-inter)] text-sm"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm font-[family-name:var(--font-inter)] bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">{error}</p>
                )}

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 border border-stone-700 text-stone-400 hover:text-stone-200 rounded-xl text-sm transition-colors font-[family-name:var(--font-inter)]">Cancel</button>
                  <button type="submit" disabled={saving} className="flex-1 py-3 bg-amber-300 hover:bg-amber-200 disabled:opacity-50 text-stone-950 font-semibold text-sm rounded-xl transition-all font-[family-name:var(--font-inter)] flex items-center justify-center gap-2">
                    {saving ? 'Saving...' : <><Check size={16} /> Save</>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
