'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/products-data';

const CATEGORIES = [
  { id: 'all', label: 'Semua Layanan' },
  { id: 'concert', label: 'Concert & Live Music' },
  { id: 'corporate', label: 'Corporate Event' },
  { id: 'wedding', label: 'Wedding & Private' },
  { id: 'exhibition', label: 'Exhibition & Pameran' },
  { id: 'festival', label: 'Festival & Bazaar' },
  { id: 'launch', label: 'Product Launch' },
];

function ProductCard({ product, index }: { product: typeof PRODUCTS[number]; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group relative rounded-2xl overflow-hidden"
      style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)' }}
      id={`product-card-${product.id}`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17,17,17,0.9) 0%, transparent 60%)' }} />
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full text-white" style={{ background: 'linear-gradient(135deg, #E8470A, #FF6B35)' }}>
              {product.badge}
            </span>
          </div>
        )}
        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1 text-xs font-semibold rounded-full" style={{ background: 'rgba(0,212,232,0.15)', border: '1px solid rgba(0,212,232,0.3)', color: '#67F3FF' }}>
            {product.minPax}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-400 transition-colors" style={{ fontFamily: 'var(--font-outfit)' }}>
          {product.name}
        </h3>
        <p className="text-stone-400 text-sm leading-relaxed mb-4 line-clamp-2" style={{ fontFamily: 'var(--font-inter)' }}>
          {product.description}
        </p>

        {/* Top 3 features */}
        <ul className="space-y-1.5 mb-5">
          {product.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs text-stone-400" style={{ fontFamily: 'var(--font-inter)' }}>
              <CheckCircle size={12} style={{ color: '#E8470A', flexShrink: 0 }} />
              {f}
            </li>
          ))}
          {product.features.length > 3 && (
            <li className="text-xs text-stone-600" style={{ fontFamily: 'var(--font-inter)' }}>
              +{product.features.length - 3} fitur lainnya
            </li>
          )}
        </ul>

        {/* CTA row */}
        <div className="flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#ccc', fontFamily: 'var(--font-outfit)' }}
          >
            Detail
          </Link>
          <Link
            href="/#contact"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group/btn"
            style={{ background: 'rgba(232,71,10,0.1)', border: '1px solid rgba(232,71,10,0.25)', color: '#FF6B35', fontFamily: 'var(--font-outfit)' }}
          >
            Penawaran <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const filtered = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-24 px-6" style={{ backgroundColor: '#0d0d0d' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-xs tracking-[0.3em] uppercase mb-3 font-semibold"
            style={{ fontFamily: 'var(--font-outfit)', color: '#E8470A' }}
          >
            Katalog Layanan
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Layanan Kami
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
            className="text-stone-400 max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Dari konser besar hingga acara private — kami siap mewujudkan setiap momen menjadi tak terlupakan.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ delay: 0.3 }}
            className="h-0.5 w-24 mx-auto mt-6 rounded-full"
            style={{ background: 'linear-gradient(90deg, #E8470A, #00D4E8)' }}
          />
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category Sidebar */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="rounded-2xl p-4 lg:sticky lg:top-24" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-xs text-stone-500 uppercase tracking-wider mb-3 px-2 font-semibold" style={{ fontFamily: 'var(--font-outfit)' }}>Kategori</p>
              <ul className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      id={`category-filter-${cat.id}`}
                      onClick={() => setActiveCategory(cat.id)}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2"
                      style={{
                        fontFamily: 'var(--font-outfit)',
                        background: activeCategory === cat.id ? 'rgba(232,71,10,0.15)' : 'transparent',
                        color: activeCategory === cat.id ? '#FF6B35' : '#888',
                        borderLeft: activeCategory === cat.id ? '2px solid #E8470A' : '2px solid transparent',
                      }}
                    >
                      {activeCategory === cat.id && (
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#E8470A' }} />
                      )}
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-xs text-stone-600 px-2" style={{ fontFamily: 'var(--font-inter)' }}>
                  Menampilkan <span className="text-orange-400 font-semibold">{filtered.length}</span> layanan
                </p>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-stone-500 text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
                {filtered.length} layanan ditemukan
              </p>
            </div>
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
