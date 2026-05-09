'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Users, MapPin, Trophy, Mail, ChevronRight, X } from 'lucide-react';

export default function AboutSection({ data }: { data?: unknown }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { icon: Calendar, label: 'Years Experience', value: '8+' },
    { icon: Trophy, label: 'Events Organized', value: '500+' },
    { icon: Users, label: 'Happy Clients', value: '300+' },
    { icon: MapPin, label: 'Cities Covered', value: '15+' },
  ];

  const services = [
    'Concert & Live Music Production',
    'Corporate Event Management',
    'Wedding & Private Celebration',
    'Exhibition & Trade Show',
    'Music Festival & Bazaar',
    'Product Launch & Brand Activation',
  ];

  return (
    <section id="about" className="py-24 px-6" style={{ backgroundColor: '#111' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"
                alt="GlamComm Event Production"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(17,17,17,0.7) 0%, transparent 60%)' }}
              />
            </div>

            {/* Decorative frames */}
            <div
              className="absolute -bottom-4 -right-4 w-2/3 h-2/3 rounded-3xl -z-10"
              style={{ border: '1px solid rgba(232,71,10,0.25)' }}
            />
            <div
              className="absolute -top-4 -left-4 w-1/2 h-1/2 rounded-3xl -z-10"
              style={{ border: '1px solid rgba(0,212,232,0.15)' }}
            />

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-6 -right-6 rounded-2xl p-4 shadow-2xl"
              style={{
                background: 'rgba(17,17,17,0.95)',
                border: '1px solid rgba(232,71,10,0.3)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <p
                className="text-3xl font-black leading-none"
                style={{
                  fontFamily: 'var(--font-outfit)',
                  background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                500+
              </p>
              <p className="text-stone-400 text-xs mt-1" style={{ fontFamily: 'var(--font-inter)' }}>
                Events Completed
              </p>
            </motion.div>

            {/* Second floating badge — cyan */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -top-4 -right-4 rounded-2xl p-3 shadow-xl"
              style={{
                background: 'rgba(17,17,17,0.95)',
                border: '1px solid rgba(0,212,232,0.3)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <p
                className="text-xl font-black leading-none"
                style={{
                  fontFamily: 'var(--font-outfit)',
                  color: '#67F3FF',
                }}
              >
                #1
              </p>
              <p className="text-stone-400 text-xs mt-1" style={{ fontFamily: 'var(--font-inter)' }}>
                EO Jakarta
              </p>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs tracking-[0.3em] uppercase mb-3 font-semibold"
              style={{ fontFamily: 'var(--font-outfit)', color: '#E8470A' }}
            >
              Tentang Kami
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Kami adalah{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                GlamComm
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-stone-300 leading-relaxed mb-4"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              GlamComm adalah perusahaan event organizer profesional yang berbasis di Jakarta, Indonesia. Berdiri sejak 2016, kami telah mempercayakan lebih dari 500 event kepada tim kami yang berpengalaman.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-stone-400 leading-relaxed mb-6"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Kami menghadirkan standar produksi kelas dunia — dari konser berskala nasional, gala dinner perusahaan Fortune 500, hingga pernikahan mewah yang membekas seumur hidup.
            </motion.p>

            {/* Italic quote */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-stone-400 leading-relaxed mb-8 italic pl-4"
              style={{
                fontFamily: 'var(--font-inter)',
                borderLeft: '2px solid rgba(232,71,10,0.5)',
              }}
            >
              &ldquo;Setiap event adalah kanvas — dan kami melukisnya dengan passion, presisi, dan kebanggaan.&rdquo;
            </motion.p>

            {/* Services list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8"
            >
              {services.map((s) => (
                <div key={s} className="flex items-center gap-2 text-sm text-stone-400" style={{ fontFamily: 'var(--font-inter)' }}>
                  <ChevronRight size={14} style={{ color: '#E8470A', flexShrink: 0 }} />
                  {s}
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
            >
              {stats.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-xl p-4 text-center"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <Icon size={18} className="mx-auto mb-2" style={{ color: '#E8470A' }} />
                  <p className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-outfit)' }}>
                    {value}
                  </p>
                  <p className="text-stone-500 text-xs mt-1" style={{ fontFamily: 'var(--font-inter)' }}>
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-center gap-3 flex-wrap"
            >
              <a
                href="https://instagram.com/glamcomm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#ccc',
                  fontFamily: 'var(--font-outfit)',
                }}
              >
                <X size={15} /> Instagram
              </a>
              <a
                href="mailto:hello@glamcomm.id"
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-full"
                style={{
                  background: 'rgba(232,71,10,0.1)',
                  border: '1px solid rgba(232,71,10,0.3)',
                  color: '#FF6B35',
                  fontFamily: 'var(--font-outfit)',
                }}
              >
                <Mail size={15} /> Email Kami
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
