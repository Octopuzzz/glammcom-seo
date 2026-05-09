'use client';

import { useState, FormEvent, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, CheckCircle, AlertCircle, Loader2, Phone, MapPin, MessageSquare } from 'lucide-react';

type Status = 'idle' | 'sending' | 'success' | 'error';

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const CONTACT_INFO = [
  {
    icon: Phone,
    label: 'Telepon / WhatsApp',
    value: '+62 812 3456 7890',
    href: 'tel:+6281234567890',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@glamcomm.id',
    href: 'mailto:hello@glamcomm.id',
  },
  {
    icon: MapPin,
    label: 'Kantor',
    value: 'Jl. Sudirman No. 21, Jakarta Pusat',
    href: '#',
  },
];

const EVENT_TYPES = [
  'Concert & Live Music',
  'Corporate Event',
  'Wedding & Private',
  'Exhibition & Pameran',
  'Festival & Bazaar',
  'Product Launch',
  'Lainnya',
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    event_type: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong.');
      setStatus('success');
      setForm({ name: '', email: '', phone: '', event_type: '', subject: '', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: '#e5e5e5',
    fontSize: '14px',
    fontFamily: 'var(--font-inter)',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: '#0d0d0d' }}>
      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(232,71,10,0.08) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,212,232,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] uppercase mb-3 font-semibold"
            style={{ fontFamily: 'var(--font-outfit)', color: '#E8470A' }}
          >
            Hubungi Kami
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Mari Diskusikan Event Anda
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-0.5 w-24 mx-auto mt-2 mb-4 rounded-full"
            style={{ background: 'linear-gradient(90deg, #E8470A, #00D4E8)' }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-stone-400 max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Ceritakan visi Anda, dan tim kami akan mewujudkannya. Konsultasi gratis, tanpa komitmen.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 group"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(232,71,10,0.15)', border: '1px solid rgba(232,71,10,0.3)' }}
                >
                  <Icon size={18} style={{ color: '#FF6B35' }} />
                </div>
                <div>
                  <p className="text-stone-500 text-xs mb-1 uppercase tracking-wider" style={{ fontFamily: 'var(--font-inter)' }}>{label}</p>
                  <p className="text-white text-sm font-semibold group-hover:text-orange-400 transition-colors" style={{ fontFamily: 'var(--font-outfit)' }}>{value}</p>
                </div>
              </a>
            ))}

            {/* WhatsApp direct */}
            <a
              href="https://wa.me/6281234567890?text=Halo%20GlamComm%2C%20saya%20ingin%20konsultasi%20event"
              target="_blank"
              rel="noopener noreferrer"
              id="contact-whatsapp"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl font-bold text-white transition-all duration-300 hover:-translate-y-1"
              style={{
                fontFamily: 'var(--font-outfit)',
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                boxShadow: '0 8px 30px rgba(37,211,102,0.25)',
              }}
            >
              <WhatsAppIcon size={20} />
              Chat via WhatsApp
            </a>
          </motion.div>

          {/* Right: Form (2 cols wide) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-2 rounded-3xl p-8"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {status === 'success' ? (
              <div className="text-center py-16">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }}
                >
                  <CheckCircle size={32} style={{ color: '#22c55e' }} />
                </div>
                <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'var(--font-outfit)' }}>
                  Pesan Terkirim!
                </h3>
                <p className="text-stone-400 mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
                  Terima kasih! Tim GlamComm akan menghubungi Anda dalam 1×24 jam.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-sm underline underline-offset-4 transition-colors"
                  style={{ color: '#FF6B35', fontFamily: 'var(--font-inter)' }}
                >
                  Kirim pesan lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-500 text-xs tracking-widest uppercase mb-1.5" style={{ fontFamily: 'var(--font-inter)' }}>
                      Nama <span style={{ color: '#E8470A' }}>*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={set('name')}
                      placeholder="Nama lengkap Anda"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(232,71,10,0.5)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>
                  <div>
                    <label className="block text-stone-500 text-xs tracking-widest uppercase mb-1.5" style={{ fontFamily: 'var(--font-inter)' }}>
                      Email <span style={{ color: '#E8470A' }}>*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={set('email')}
                      placeholder="email@anda.com"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(232,71,10,0.5)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-500 text-xs tracking-widest uppercase mb-1.5" style={{ fontFamily: 'var(--font-inter)' }}>
                      No. WhatsApp
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={set('phone')}
                      placeholder="+62 8xx xxxx xxxx"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(232,71,10,0.5)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>
                  <div>
                    <label className="block text-stone-500 text-xs tracking-widest uppercase mb-1.5" style={{ fontFamily: 'var(--font-inter)' }}>
                      Tipe Event
                    </label>
                    <select
                      id="contact-event-type"
                      value={form.event_type}
                      onChange={set('event_type')}
                      style={{ ...inputStyle, appearance: 'none' }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(232,71,10,0.5)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    >
                      <option value="" style={{ background: '#111' }}>Pilih tipe event…</option>
                      {EVENT_TYPES.map((t) => (
                        <option key={t} value={t} style={{ background: '#111' }}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-500 text-xs tracking-widest uppercase mb-1.5" style={{ fontFamily: 'var(--font-inter)' }}>
                    Subjek
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={form.subject}
                    onChange={set('subject')}
                    placeholder="Ringkasan kebutuhan event Anda"
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(232,71,10,0.5)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                  />
                </div>

                <div>
                  <label className="block text-stone-500 text-xs tracking-widest uppercase mb-1.5" style={{ fontFamily: 'var(--font-inter)' }}>
                    Pesan <span style={{ color: '#E8470A' }}>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={set('message')}
                    placeholder="Ceritakan detail event Anda: tanggal, lokasi, jumlah tamu, budget estimasi…"
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(232,71,10,0.5)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                  />
                </div>

                {status === 'error' && (
                  <div
                    className="flex items-center gap-2 text-sm px-4 py-3 rounded-xl"
                    style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontFamily: 'var(--font-inter)' }}
                  >
                    <AlertCircle size={16} className="shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#666', fontFamily: 'var(--font-inter)' }}>
                    <MessageSquare size={14} style={{ color: '#FF6B35' }} />
                    Atau{' '}
                    <a href="mailto:hello@glamcomm.id" style={{ color: '#FF6B35' }} className="hover:underline">
                      hello@glamcomm.id
                    </a>
                  </div>
                  <button
                    type="submit"
                    id="contact-submit"
                    disabled={status === 'sending'}
                    className="flex items-center gap-2 px-8 py-3.5 font-bold text-sm tracking-widest uppercase text-white transition-all duration-300 rounded-full hover:-translate-y-0.5 disabled:opacity-50"
                    style={{
                      fontFamily: 'var(--font-outfit)',
                      background: 'linear-gradient(135deg, #E8470A, #FF6B35)',
                      boxShadow: '0 6px 24px rgba(232,71,10,0.4)',
                    }}
                  >
                    {status === 'sending' ? (
                      <><Loader2 size={16} className="animate-spin" /> Mengirim…</>
                    ) : (
                      <><Send size={16} /> Kirim Pesan</>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
