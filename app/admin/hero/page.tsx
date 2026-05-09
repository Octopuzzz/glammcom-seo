'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/lib/admin-auth';
import { cmsClient } from '@/lib/api';
import type { HeroContent } from '@/lib/types';
import { ArrowLeft, Check } from 'lucide-react';

export default function AdminHeroPage() {
  const { token, loading } = useAdminAuth();
  const router = useRouter();
  const [item, setItem] = useState<HeroContent | null>(null);
  const [form, setForm] = useState<Partial<HeroContent>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !token) router.push('/admin');
  }, [token, loading, router]);

  useEffect(() => {
    if (!token) return;
    cmsClient.search<HeroContent>('cp_hero', {}, token).then((items) => {
      if (items[0]) { setItem(items[0]); setForm(items[0]); }
    });
  }, [token]);

  const set = (field: keyof HeroContent, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true); setError(''); setSaved(false);
    try {
      if (item?.id) {
        await cmsClient.update('cp_hero', item.id, form, token);
      } else {
        await cmsClient.create('cp_hero', form, token);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError('Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !token) return null;

  const fields: { key: keyof HeroContent; label: string; hint?: string }[] = [
    { key: 'headline', label: 'Headline', hint: 'Last word gets gold shimmer' },
    { key: 'subheadline', label: 'Subheadline' },
    { key: 'cta_text', label: 'Button Text' },
    { key: 'cta_url', label: 'Button URL', hint: 'e.g. #portfolio' },
    { key: 'bg_image_url', label: 'Background Image URL' },
    { key: 'artist_image_url', label: 'Artist Photo URL (right side desktop)' },
  ];

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => router.push('/admin/dashboard')} className="text-stone-500 hover:text-amber-300 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-stone-100">Hero Section</h1>
        </div>

        {form.bg_image_url && (
          <div className="relative rounded-2xl overflow-hidden h-32 mb-6">
            <img src={form.bg_image_url} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-stone-950/60 flex items-center px-6">
              <p className="font-[family-name:var(--font-playfair)] text-xl font-bold text-stone-100">{form.headline || 'Headline'}</p>
            </div>
          </div>
        )}

        <div className="glass-card rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map(({ key, label, hint }) => (
              <div key={key}>
                <label className="block text-stone-400 text-xs tracking-widest uppercase mb-1.5 font-[family-name:var(--font-inter)]">
                  {label}
                </label>
                <input
                  type="text"
                  value={(form[key] as string) || ''}
                  onChange={(e) => set(key, e.target.value)}
                  className="w-full px-4 py-3 bg-stone-800/60 border border-stone-700 focus:border-amber-500/60 rounded-xl text-stone-200 focus:outline-none transition-colors font-[family-name:var(--font-inter)] text-sm"
                />
                {hint && <p className="text-stone-600 text-xs mt-1 font-[family-name:var(--font-inter)]">{hint}</p>}
              </div>
            ))}

            {error && (
              <p className="text-red-400 text-sm font-[family-name:var(--font-inter)] bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3.5 bg-amber-300 hover:bg-amber-200 disabled:opacity-50 text-stone-950 font-semibold text-sm tracking-wide rounded-xl transition-all font-[family-name:var(--font-inter)] flex items-center justify-center gap-2"
            >
              {saved ? <><Check size={16} /> Saved!</> : saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
