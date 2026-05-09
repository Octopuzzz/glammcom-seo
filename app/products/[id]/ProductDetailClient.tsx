'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Users, Clock, ChevronRight, MessageSquare } from 'lucide-react';
import type { Product } from '@/lib/products-data';

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const waMsg = encodeURIComponent(`Halo GlamComm, saya tertarik dengan layanan *${product.name}*. Boleh saya mendapatkan penawaran?`);

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.5) 50%, transparent 100%)' }} />

        {/* Back button */}
        <div className="absolute top-24 left-6">
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', fontFamily: 'var(--font-outfit)' }}
          >
            <ArrowLeft size={14} /> Kembali
          </Link>
        </div>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-24 right-6">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full text-white" style={{ background: 'linear-gradient(135deg, #E8470A, #FF6B35)' }}>
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 -mt-16 pb-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Main content */}
          <div className="lg:col-span-2">
            {/* Category breadcrumb */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-4 text-xs" style={{ color: '#E8470A', fontFamily: 'var(--font-outfit)' }}>
              <Link href="/#products" className="hover:underline">Layanan</Link>
              <ChevronRight size={12} />
              <span>{product.categoryLabel}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {product.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-stone-300 text-lg leading-relaxed mb-8"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {product.longDescription}
            </motion.p>

            {/* What's included */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-10">
              <h2 className="text-xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>Yang Termasuk</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((f) => (
                  <div key={f} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <CheckCircle size={16} style={{ color: '#E8470A', flexShrink: 0, marginTop: 2 }} />
                    <span className="text-stone-300 text-sm" style={{ fontFamily: 'var(--font-inter)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Process */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h2 className="text-xl font-black text-white mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>Proses Kerja Kami</h2>
              <div className="relative">
                {/* vertical line */}
                <div className="absolute left-5 top-0 bottom-0 w-px" style={{ background: 'rgba(232,71,10,0.2)' }} />
                <div className="space-y-6">
                  {product.process.map((p, i) => (
                    <div key={p.step} className="flex items-start gap-4 pl-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black text-white z-10" style={{ background: 'linear-gradient(135deg, #E8470A, #FF6B35)', fontFamily: 'var(--font-outfit)' }}>
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-outfit)' }}>{p.step}</p>
                        <p className="text-stone-400 text-sm mt-0.5" style={{ fontFamily: 'var(--font-inter)' }}>{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Sticky CTA card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="lg:sticky lg:top-28 self-start"
          >
            <div className="rounded-2xl p-6" style={{ background: '#111', border: '1px solid rgba(232,71,10,0.2)' }}>
              <p className="text-xs uppercase tracking-widest mb-4 font-semibold" style={{ color: '#E8470A', fontFamily: 'var(--font-outfit)' }}>Informasi Layanan</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Users size={16} style={{ color: '#E8470A', flexShrink: 0 }} />
                  <div>
                    <p className="text-stone-500 text-xs" style={{ fontFamily: 'var(--font-inter)' }}>Kapasitas</p>
                    <p className="text-white font-semibold text-sm" style={{ fontFamily: 'var(--font-outfit)' }}>{product.minPax}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} style={{ color: '#E8470A', flexShrink: 0 }} />
                  <div>
                    <p className="text-stone-500 text-xs" style={{ fontFamily: 'var(--font-inter)' }}>Durasi</p>
                    <p className="text-white font-semibold text-sm" style={{ fontFamily: 'var(--font-outfit)' }}>{product.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare size={16} style={{ color: '#E8470A', flexShrink: 0 }} />
                  <div>
                    <p className="text-stone-500 text-xs" style={{ fontFamily: 'var(--font-inter)' }}>Harga</p>
                    <p className="text-white font-semibold text-sm" style={{ fontFamily: 'var(--font-outfit)' }}>Penawaran custom</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={`https://wa.me/6281234567890?text=${waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', fontFamily: 'var(--font-outfit)', boxShadow: '0 4px 20px rgba(37,211,102,0.3)' }}
                >
                  <WhatsAppIcon size={16} /> Chat WhatsApp
                </a>
                <Link
                  href="/#contact"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #E8470A, #FF6B35)', color: '#fff', fontFamily: 'var(--font-outfit)', boxShadow: '0 4px 20px rgba(232,71,10,0.35)' }}
                >
                  Minta Penawaran
                </Link>
                <Link
                  href="/#products"
                  className="flex items-center justify-center w-full py-3 rounded-xl font-semibold text-sm transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#888', fontFamily: 'var(--font-outfit)' }}
                >
                  Lihat Layanan Lain
                </Link>
              </div>

              <p className="text-stone-600 text-xs text-center mt-4" style={{ fontFamily: 'var(--font-inter)' }}>
                Konsultasi gratis · Tanpa komitmen
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
