'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  message: string;
  event: string;
  avatar: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Budi Santoso',
    role: 'Head of Marketing',
    company: 'Gojek Indonesia',
    message: 'GlamComm berhasil mengeksekusi gala dinner kami dengan sempurna. Setiap detail diperhatikan, dari dekorasi hingga rundown. Klien kami sangat terkesan!',
    event: 'TechSummit Annual Gala 2024',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Sari Dewi',
    role: 'Brand Director',
    company: 'L\'Oreal Indonesia',
    message: 'Tim GlamComm sangat profesional dan kreatif. Peluncuran produk kami melebihi ekspektasi — coverage media luar biasa dan respons audiens sangat positif.',
    event: 'Gloss Beauty Launch Event',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Aria Wijaya',
    role: 'Groom',
    company: '',
    message: 'Pernikahan impian kami menjadi kenyataan berkat GlamComm. Dekorasi memukau, live band fantastis, dan koordinasi tanpa cela sepanjang hari.',
    event: 'Aria & Reza Wedding 2024',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    rating: 5,
  },
  {
    id: 't4',
    name: 'Kevin Tan',
    role: 'Festival Director',
    company: 'DKI Jakarta',
    message: 'GlamComm mengelola 50,000+ pengunjung selama 3 hari tanpa insiden. Manajemen crowd, vendor, dan stage mereka benar-benar kelas dunia.',
    event: 'Street Food Festival 2023',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    rating: 5,
  },
];

export default function TestimonialsSection({ items }: { items?: unknown[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="testimonials" className="py-24 px-6" style={{ backgroundColor: '#111' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] uppercase mb-3 font-semibold"
            style={{ fontFamily: 'var(--font-outfit)', color: '#00D4E8' }}
          >
            Testimoni Klien
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Kata Mereka
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-0.5 w-24 mx-auto mt-6 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #00D4E8, transparent)' }}
          />
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-6 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-5 opacity-20">
                <Quote size={32} style={{ color: '#E8470A' }} />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} size={14} className="fill-current" style={{ color: '#FF6B35' }} />
                ))}
              </div>

              {/* Message */}
              <p className="text-stone-300 leading-relaxed mb-5 text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
                &ldquo;{t.message}&rdquo;
              </p>

              {/* Event badge */}
              <div className="mb-5">
                <span
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(232,71,10,0.1)',
                    border: '1px solid rgba(232,71,10,0.25)',
                    color: '#FF6B35',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  {t.event}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  style={{ border: '2px solid rgba(232,71,10,0.3)' }}
                />
                <div>
                  <p className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-outfit)' }}>
                    {t.name}
                  </p>
                  <p className="text-stone-500 text-xs" style={{ fontFamily: 'var(--font-inter)' }}>
                    {t.role}{t.company ? `, ${t.company}` : ''}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
