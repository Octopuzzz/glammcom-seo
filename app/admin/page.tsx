'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/lib/admin-auth';
import { Eye, EyeOff, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/admin/dashboard');
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/20 via-stone-950 to-stone-950" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold">
            <span className="gold-shimmer">Irenne</span>
            <span className="text-stone-500 font-light ml-1">Art</span>
          </p>
          <p className="text-stone-500 text-sm mt-2 font-[family-name:var(--font-inter)] tracking-widest uppercase">
            Admin Panel
          </p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-300/10 flex items-center justify-center">
              <Lock size={16} className="text-amber-300" />
            </div>
            <div>
              <h1 className="text-stone-100 font-semibold font-[family-name:var(--font-inter)]">Sign In</h1>
              <p className="text-stone-500 text-xs font-[family-name:var(--font-inter)]">Manage your content</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-stone-400 text-xs tracking-widest uppercase mb-2 font-[family-name:var(--font-inter)]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
                className="w-full px-4 py-3 bg-stone-900/60 border border-stone-800 focus:border-amber-500/60 rounded-xl text-stone-200 placeholder-stone-600 focus:outline-none transition-colors font-[family-name:var(--font-inter)] text-sm"
              />
            </div>

            <div>
              <label className="block text-stone-400 text-xs tracking-widest uppercase mb-2 font-[family-name:var(--font-inter)]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-stone-900/60 border border-stone-800 focus:border-amber-500/60 rounded-xl text-stone-200 placeholder-stone-600 focus:outline-none transition-colors font-[family-name:var(--font-inter)] text-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm font-[family-name:var(--font-inter)] bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-amber-300 hover:bg-amber-200 disabled:opacity-50 text-stone-950 font-semibold text-sm tracking-widest uppercase rounded-xl transition-all duration-300 font-[family-name:var(--font-inter)] mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
