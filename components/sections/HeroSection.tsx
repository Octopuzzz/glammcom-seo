'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Star, Users, Calendar, MapPin } from 'lucide-react';

export default function HeroSection({ data }: { data?: unknown }) {
  const stats = [
    { icon: Calendar, value: '500+', label: 'Events Done' },
    { icon: Users, value: '200K+', label: 'Audience Reached' },
    { icon: MapPin, value: '15+', label: 'Cities Covered' },
    { icon: Star, value: '98%', label: 'Client Satisfaction' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background — dark stage atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1920&q=80)`,
        }}
      />
      {/* Overlays for depth */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.75) 50%, rgba(10,10,10,0.6) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, transparent 40%)' }} />
      {/* Orange glow left */}
      <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(232,71,10,0.25) 0%, transparent 70%)' }} />
      {/* Cyan glow right */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,212,232,0.15) 0%, transparent 70%)' }} />

      {/* Globe logo floating decoration */}
      <motion.div
        className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:block opacity-20 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {/* Large decorative globe lines */}
        <svg width="400" height="400" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="90" stroke="#E8470A" strokeWidth="1" opacity="0.8"/>
          <ellipse cx="100" cy="100" rx="90" ry="28" stroke="#E8470A" strokeWidth="1" opacity="0.6"/>
          <ellipse cx="100" cy="100" rx="90" ry="58" stroke="#E8470A" strokeWidth="1" opacity="0.5"/>
          <line x1="10" y1="100" x2="190" y2="100" stroke="#E8470A" strokeWidth="1" opacity="0.5"/>
          <ellipse cx="100" cy="100" rx="28" ry="90" stroke="#E8470A" strokeWidth="1" opacity="0.6"/>
          <ellipse cx="100" cy="100" rx="60" ry="90" stroke="#E8470A" strokeWidth="1" opacity="0.5"/>
          <line x1="100" y1="10" x2="100" y2="190" stroke="#E8470A" strokeWidth="1" opacity="0.5"/>
          <line x1="22" y1="45" x2="178" y2="155" stroke="#00D4E8" strokeWidth="0.8" opacity="0.4"/>
          <line x1="22" y1="155" x2="178" y2="45" stroke="#00D4E8" strokeWidth="0.8" opacity="0.4"/>
        </svg>
      </motion.div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border text-xs tracking-[0.25em] uppercase font-semibold"
            style={{
              fontFamily: 'var(--font-outfit)',
              borderColor: 'rgba(232,71,10,0.4)',
              background: 'rgba(232,71,10,0.1)',
              color: '#FF6B35',
            }}
          >
            <Star size={12} className="fill-current" />
            Premier Event Organizer · Jakarta, Indonesia
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] text-white mb-6"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            We Create{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FF6B35, #FFB347, #E8470A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Unforgettable
            </span>
            <br />
            Experiences
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-stone-400 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            From grand concerts to intimate corporate gatherings — GlamComm brings your vision to life with precision, creativity, and world-class production.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#products"
              id="hero-cta-primary"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 rounded-full hover:-translate-y-1"
              style={{
                fontFamily: 'var(--font-outfit)',
                background: 'linear-gradient(135deg, #E8470A, #FF6B35)',
                boxShadow: '0 8px 30px rgba(232,71,10,0.4)',
              }}
            >
              Explore Our Services
            </a>
            <a
              href="#portfolio"
              id="hero-cta-secondary"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border text-stone-300 hover:text-white text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded-full hover:-translate-y-1"
              style={{
                fontFamily: 'var(--font-outfit)',
                borderColor: 'rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              View Portfolio
            </a>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 + i * 0.1 }}
              className="flex flex-col items-center p-5 rounded-2xl text-center"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Icon size={20} className="mb-2" style={{ color: '#E8470A' }} />
              <p
                className="text-3xl font-black text-white mb-1"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {value}
              </p>
              <p className="text-stone-500 text-xs tracking-wider uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-stone-600 text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-inter)' }}>Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown size={16} className="text-stone-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
