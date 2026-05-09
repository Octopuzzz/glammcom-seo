'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/lib/admin-auth';
import { cmsClient } from '@/lib/api';
import type { PortfolioItem } from '@/lib/types';
import { Plus, Pencil, Trash2, Star, StarOff, ArrowLeft, X, Check } from 'lucide-react';

const EMPTY: Omit<PortfolioItem, 'id' | 'created_at'> = {
  title: '', description: '', image_url: '', category: '', medium: '', year: '', price: '', is_highlighted: false, order_index: 0,
};

export default function AdminPortfolioPage() {
  const { token, loading } = useAdminAuth();
  const router = useRouter();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState<Omit<PortfolioItem, 'id' | 'created_at'>>(EMPTY);
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
    const data = await cmsClient.search<PortfolioItem>('cp_portfolio', { orderBy: { field: 'order_index', sort: 'asc' } }, token);
    setItems(data);
    setFetching(false);
  };

  useEffect(() => { fetchItems(); }, [token]);

  const openNew = () => { setForm(EMPTY); setEditId(null); setShowForm(true); setError(''); };
  const openEdit = (item: PortfolioItem) => { setForm({ title: item.title, description: item.description, image_url: item.image_url, category: item.category, medium: item.medium, year: item.year, price: item.price, is_highlighted: item.is_highlighted, order_index: item.order_index }); setEditId(item.id); setShowForm(true); setError(''); };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    setError('');
    try {
      if (editId) {
        await cmsClient.update('cp_portfolio', editId, form, token);
      } else {
        await cmsClient.create('cp_portfolio', form, token);
      }
      setShowForm(false);
      fetchItems();
    } catch {
      setError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm('Delete this artwork?')) return;
    await cmsClient.remove('cp_portfolio', id, token);
    fetchItems();
  };

  const toggleHighlight = async (item: PortfolioItem) => {
    if (!token) return;
    await cmsClient.update('cp_portfolio', item.id, { is_highlighted: !item.is_highlighted }, token);
    fetchItems();
  };

  if (loading || !token) return null;

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/admin/dashboard')} className="text-stone-500 hover:text-amber-300 transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-stone-100">Portfolio</h1>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-5 py-2.5 bg-amber-300 hover:bg-amber-200 text-stone-950 text-sm font-semibold tracking-wide rounded-full transition-all font-[family-name:var(--font-inter)]">
            <Plus size={16} /> Add Artwork
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-6 text-xs text-stone-500 font-[family-name:var(--font-inter)]">
          <span className="flex items-center gap-1"><Star size={12} className="text-amber-400 fill-amber-400" /> Featured (Portfolio section)</span>
          <span className="flex items-center gap-1"><StarOff size={12} /> Other Works section</span>
        </div>

        {/* Table */}
        {fetching ? (
          <div className="text-center py-20 text-stone-500 font-[family-name:var(--font-inter)]">Loading...</div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="glass-card rounded-2xl p-4 flex items-center gap-4">
                <img src={item.image_url} alt={item.title} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-[family-name:var(--font-playfair)] font-semibold text-stone-100 truncate">{item.title}</p>
                    {item.is_highlighted && <Star size={12} className="text-amber-400 fill-amber-400 shrink-0" />}
                  </div>
                  <p className="text-stone-500 text-xs mt-0.5 font-[family-name:var(--font-inter)]">{item.category} · {item.medium} · {item.year}</p>
                  <p className="text-amber-400 text-xs font-[family-name:var(--font-inter)]">{item.price}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => toggleHighlight(item)} title="Toggle featured" className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${item.is_highlighted ? 'bg-amber-300/20 text-amber-300' : 'bg-stone-800 text-stone-500 hover:text-amber-300'}`}>
                    {item.is_highlighted ? <Star size={14} className="fill-amber-400" /> : <StarOff size={14} />}
                  </button>
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
                No artworks yet. <button onClick={openNew} className="text-amber-400 hover:text-amber-300 transition-colors">Add the first one</button>
              </div>
            )}
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-stone-100">
                  {editId ? 'Edit Artwork' : 'New Artwork'}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-stone-500 hover:text-stone-300 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name: 'title', label: 'Title', required: true },
                  { name: 'category', label: 'Category (e.g. Painting)' },
                  { name: 'medium', label: 'Medium (e.g. Oil on Canvas)' },
                  { name: 'year', label: 'Year' },
                  { name: 'price', label: 'Price (e.g. IDR 4.500.000)' },
                  { name: 'image_url', label: 'Image URL' },
                ].map(({ name, label, required }) => (
                  <div key={name}>
                    <label className="block text-stone-400 text-xs tracking-widest uppercase mb-1.5 font-[family-name:var(--font-inter)]">{label}</label>
                    <input
                      type="text"
                      required={required}
                      value={(form as Record<string, unknown>)[name] as string}
                      onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
                      className="w-full px-4 py-3 bg-stone-800/60 border border-stone-700 focus:border-amber-500/60 rounded-xl text-stone-200 focus:outline-none transition-colors font-[family-name:var(--font-inter)] text-sm"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-stone-400 text-xs tracking-widest uppercase mb-1.5 font-[family-name:var(--font-inter)]">Description</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    className="w-full px-4 py-3 bg-stone-800/60 border border-stone-700 focus:border-amber-500/60 rounded-xl text-stone-200 focus:outline-none transition-colors font-[family-name:var(--font-inter)] text-sm resize-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 text-xs tracking-widest uppercase mb-1.5 font-[family-name:var(--font-inter)]">Order Index</label>
                  <input
                    type="number"
                    value={form.order_index}
                    onChange={(e) => setForm((f) => ({ ...f, order_index: Number(e.target.value) }))}
                    className="w-full px-4 py-3 bg-stone-800/60 border border-stone-700 focus:border-amber-500/60 rounded-xl text-stone-200 focus:outline-none transition-colors font-[family-name:var(--font-inter)] text-sm"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, is_highlighted: !f.is_highlighted }))}
                    className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${form.is_highlighted ? 'bg-amber-400' : 'bg-stone-700'}`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${form.is_highlighted ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                  <span className="text-stone-300 text-sm font-[family-name:var(--font-inter)]">
                    Featured (appears in Portfolio section)
                  </span>
                </div>

                {error && (
                  <p className="text-red-400 text-sm font-[family-name:var(--font-inter)] bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
                    {error}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 border border-stone-700 text-stone-400 hover:text-stone-200 rounded-xl text-sm transition-colors font-[family-name:var(--font-inter)]">
                    Cancel
                  </button>
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
