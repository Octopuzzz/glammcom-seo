'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import type { FaqItem } from '@/lib/types';

interface FaqSectionProps {
  items: FaqItem[];
}

const FALLBACK: FaqItem[] = [
  { id: '1', question: 'Berapa jauh sebelumnya kami harus memesan?', answer: 'Kami merekomendasikan pemesanan minimal 3 bulan sebelum tanggal event, terutama untuk event berskala besar seperti concert atau wedding. Namun kami juga menerima project dengan tenggat lebih pendek — hubungi kami dan kami akan usahakan.', order_index: 1 },
  { id: '2', question: 'Apakah GlamComm menyediakan venue?', answer: 'Kami dapat membantu scouting dan rekomendasi venue sesuai kebutuhan event Anda, baik indoor maupun outdoor. Kami memiliki jaringan luas dengan berbagai venue premium di Jakarta dan kota-kota besar Indonesia.', order_index: 2 },
  { id: '3', question: 'Bagaimana sistem pembayaran dan paket harga?', answer: 'Setiap event dikustomisasi sesuai kebutuhan, sehingga harga bersifat quotation. Umumnya kami meminta DP 30–50% untuk memulai. Silakan hubungi tim kami untuk mendapatkan penawaran gratis dan transparan.', order_index: 3 },
  { id: '4', question: 'Apakah GlamComm melayani event di luar Jakarta?', answer: 'Ya! Kami telah mengeksekusi event di 15+ kota di Indonesia termasuk Bali, Surabaya, Bandung, Yogyakarta, dan Medan. Tim kami siap bergerak ke mana pun dibutuhkan.', order_index: 4 },
  { id: '5', question: 'Apa yang membedakan GlamComm dari EO lain?', answer: 'GlamComm unggul dalam produksi teknis: sound system, lighting rig, LED wall, dan stage design. Kami tidak hanya mengorganisir — kami menciptakan pengalaman. Setiap detail dikerjakan dengan standar produksi internasional.', order_index: 5 },
];

function FaqItemCard({ item, isOpen, onToggle, index }: { item: FaqItem; isOpen: boolean; onToggle: () => void; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="overflow-hidden rounded-2xl transition-all duration-300"
      style={{
        border: isOpen ? '1px solid rgba(232,71,10,0.4)' : '1px solid rgba(255,255,255,0.07)',
        background: isOpen ? 'rgba(232,71,10,0.05)' : 'rgba(255,255,255,0.02)',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left group"
        id={`faq-toggle-${item.id}`}
      >
        <span
          className="text-lg font-bold transition-colors duration-300 pr-4"
          style={{
            fontFamily: 'var(--font-outfit)',
            color: isOpen ? '#FF6B35' : '#e5e5e5',
          }}
        >
          {item.question}
        </span>
        <div
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen ? 'linear-gradient(135deg, #E8470A, #FF6B35)' : 'rgba(255,255,255,0.08)',
            color: isOpen ? '#fff' : '#888',
          }}
        >
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <p className="px-6 pb-6 text-stone-400 leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection({ items }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const displayed = items.length > 0 ? items : FALLBACK;

  return (
    <section id="faq" className="py-24 px-6" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] uppercase mb-3 font-semibold"
            style={{ fontFamily: 'var(--font-outfit)', color: '#E8470A' }}
          >
            Pertanyaan Umum
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            FAQ
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-0.5 w-24 mx-auto mt-6 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #E8470A, transparent)' }}
          />
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {displayed
            .sort((a, b) => a.order_index - b.order_index)
            .map((item, i) => (
              <FaqItemCard
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                index={i}
              />
            ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-stone-500 text-sm mt-10"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          Masih ada pertanyaan?{' '}
          <a
            href="mailto:hello@glamcomm.id"
            className="underline underline-offset-4 transition-colors"
            style={{ color: '#FF6B35' }}
          >
            Hubungi kami
          </a>
        </motion.p>
      </div>
    </section>
  );
}
