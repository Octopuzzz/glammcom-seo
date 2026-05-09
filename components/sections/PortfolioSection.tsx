'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  category: string;
  location?: string;
  year: string;
  image_url: string;
  description: string;
  client?: string;
}

interface PortfolioSectionProps {
  items?: EventItem[];
}

const FILTER_TABS = ['All', 'Concert', 'Corporate', 'Wedding', 'Festival', 'Launch'];

const FALLBACK_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Soundwave Jakarta 2024',
    category: 'Concert',
    location: 'GBK, Jakarta',
    year: '2024',
    image_url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
    description: 'Multi-stage outdoor concert with 15,000+ attendees featuring top Indonesian artists.',
    client: 'Universal Music ID',
  },
  {
    id: '2',
    title: 'TechSummit Annual Gala',
    category: 'Corporate',
    location: 'The Ritz-Carlton, Jakarta',
    year: '2024',
    image_url: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&q=80',
    description: 'Exclusive gala dinner for 500 C-suite executives with live performance and award ceremony.',
    client: 'Gojek Indonesia',
  },
  {
    id: '3',
    title: 'Aria & Reza Wedding',
    category: 'Wedding',
    location: 'Mulia Hotel, Jakarta',
    year: '2024',
    image_url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
    description: 'Luxury wedding reception for 800 guests with live orchestra and video mapping on stage.',
  },
  {
    id: '4',
    title: 'Street Food Festival',
    category: 'Festival',
    location: 'Senayan, Jakarta',
    year: '2023',
    image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    description: '3-day food & music festival with 120 vendors, 5 stages, and 50,000+ total visitors.',
    client: 'DKI Jakarta',
  },
  {
    id: '5',
    title: 'Nexus Phone Launch',
    category: 'Launch',
    location: 'Hall D, JIExpo',
    year: '2023',
    image_url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    description: 'Cinematic product reveal with 360° LED stage and live media streaming to 100K viewers.',
    client: 'Samsung Indonesia',
  },
  {
    id: '6',
    title: 'Harmony Music Night',
    category: 'Concert',
    location: 'Tennis Indoor Senayan',
    year: '2023',
    image_url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    description: 'Intimate concert for 3,000 fans with premium production and meet-and-greet package.',
  },
  {
    id: '7',
    title: 'Mandiri Annual Meeting',
    category: 'Corporate',
    location: 'Bali Nusa Dua Convention',
    year: '2023',
    image_url: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80',
    description: 'National annual meeting for 1,200 branch managers with team building and gala night.',
    client: 'Bank Mandiri',
  },
  {
    id: '8',
    title: 'Indie Craft Bazaar',
    category: 'Festival',
    location: 'Kasablanka Mall, Jakarta',
    year: '2023',
    image_url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    description: 'Weekend bazaar with 80 indie brands, acoustic stage, and interactive workshops.',
  },
  {
    id: '9',
    title: 'Gloss Beauty Launch',
    category: 'Launch',
    location: 'Grand Hyatt Jakarta',
    year: '2022',
    image_url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    description: 'Beauty brand activation with influencer invites, live demo stations, and press coverage.',
    client: 'L\'Oreal Indonesia',
  },
];

function EventCard({ item, index }: { item: EventItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer"
      id={`portfolio-card-${item.id}`}
    >
      {/* Image */}
      <img
        src={item.image_url}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-500"
        style={{ background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.3) 60%, transparent 100%)' }}
      />

      {/* Category badge */}
      <div className="absolute top-4 left-4">
        <span
          className="px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full text-white"
          style={{ background: 'rgba(232,71,10,0.85)', backdropFilter: 'blur(8px)' }}
        >
          {item.category}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-stone-400 text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'var(--font-inter)' }}>
          {item.location ? `${item.location} · ` : ''}{item.year}
        </p>
        <h3 className="text-white text-xl font-black mb-2" style={{ fontFamily: 'var(--font-outfit)' }}>
          {item.title}
        </h3>
        <p className="text-stone-400 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2" style={{ fontFamily: 'var(--font-inter)' }}>
          {item.description}
        </p>
        {item.client && (
          <div className="flex items-center justify-between mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span
              className="text-xs font-semibold px-2 py-1 rounded-full"
              style={{ background: 'rgba(0,212,232,0.15)', color: '#67F3FF', border: '1px solid rgba(0,212,232,0.3)' }}
            >
              Client: {item.client}
            </span>
            <ExternalLink size={14} style={{ color: '#FF6B35' }} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function PortfolioSection({ items }: PortfolioSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('All');

  const source = (items && items.length > 0 ? items : FALLBACK_EVENTS) as EventItem[];
  const displayed = activeFilter === 'All'
    ? source
    : source.filter((e) => e.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 px-6" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] uppercase mb-3 font-semibold"
            style={{ fontFamily: 'var(--font-outfit)', color: '#00D4E8' }}
          >
            Karya Kami
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Portfolio Event
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-stone-400 max-w-xl mx-auto mb-8"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Ratusan momen bersejarah yang telah kami hadirkan bersama klien terbaik Indonesia.
          </motion.p>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                id={`portfolio-filter-${tab.toLowerCase()}`}
                onClick={() => setActiveFilter(tab)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-outfit)',
                  background: activeFilter === tab ? 'linear-gradient(135deg, #E8470A, #FF6B35)' : 'rgba(255,255,255,0.05)',
                  color: activeFilter === tab ? '#fff' : '#888',
                  border: activeFilter === tab ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: activeFilter === tab ? '0 4px 20px rgba(232,71,10,0.35)' : 'none',
                }}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map((item, i) => (
            <EventCard key={item.id} item={item as EventItem} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-14"
        >
          <a
            href="#contact"
            id="portfolio-cta"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded-full hover:-translate-y-1"
            style={{
              fontFamily: 'var(--font-outfit)',
              border: '1px solid rgba(0,212,232,0.4)',
              color: '#67F3FF',
              background: 'rgba(0,212,232,0.05)',
            }}
          >
            Jadikan Event Anda Berikutnya
          </a>
        </motion.div>
      </div>
    </section>
  );
}
