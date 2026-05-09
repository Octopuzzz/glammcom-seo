'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'About Us', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES_LINKS = [
  'Concert & Live Music',
  'Corporate Event',
  'Wedding & Private',
  'Exhibition',
  'Festival & Bazaar',
  'Product Launch',
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#080808', borderTop: '1px solid rgba(232,71,10,0.15)' }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex-shrink-0">
                <Image
                  src="/glamcomm-logo.svg"
                  alt="GlamComm"
                  width={40}
                  height={40}
                />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-base font-black tracking-wider uppercase"
                  style={{
                    fontFamily: 'var(--font-outfit)',
                    background: 'linear-gradient(90deg, #FF6B35, #FFB347)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  GLAM
                </span>
                <span
                  className="text-base font-black tracking-wider uppercase -mt-1"
                  style={{
                    fontFamily: 'var(--font-outfit)',
                    background: 'linear-gradient(90deg, #FF6B35, #FFB347)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  COMM
                </span>
              </div>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
              Premier Event Organizer di Jakarta. Menghadirkan pengalaman tak terlupakan sejak 2016.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/glamcomm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram GlamComm"
                className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#888' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(232,71,10,0.15)';
                  (e.currentTarget as HTMLElement).style.color = '#FF6B35';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,71,10,0.3)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                  (e.currentTarget as HTMLElement).style.color = '#888';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp GlamComm"
                className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#888' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.1)';
                  (e.currentTarget as HTMLElement).style.color = '#25D366';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,211,102,0.3)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                  (e.currentTarget as HTMLElement).style.color = '#888';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <WhatsAppIcon size={16} />
              </a>
              <a
                href="mailto:hello@glamcomm.id"
                aria-label="Email GlamComm"
                className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#888' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,232,0.1)';
                  (e.currentTarget as HTMLElement).style.color = '#00D4E8';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,232,0.3)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                  (e.currentTarget as HTMLElement).style.color = '#888';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-outfit)' }}>
              Menu
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-stone-500 hover:text-white text-sm transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-outfit)' }}>
              Layanan
            </h4>
            <ul className="space-y-2.5">
              {SERVICES_LINKS.map((s) => (
                <li key={s}>
                  <a
                    href="#products"
                    className="text-stone-500 hover:text-white text-sm transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-outfit)' }}>
              Kontak
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={15} style={{ color: '#E8470A', flexShrink: 0, marginTop: 2 }} />
                <span className="text-stone-500 text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
                  Jl. Sudirman No. 21, Jakarta Pusat, DKI Jakarta 10270
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} style={{ color: '#E8470A', flexShrink: 0 }} />
                <a href="tel:+6281234567890" className="text-stone-500 hover:text-white text-sm transition-colors" style={{ fontFamily: 'var(--font-inter)' }}>
                  +62 812 3456 7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} style={{ color: '#E8470A', flexShrink: 0 }} />
                <a href="mailto:hello@glamcomm.id" className="text-stone-500 hover:text-white text-sm transition-colors" style={{ fontFamily: 'var(--font-inter)' }}>
                  hello@glamcomm.id
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="py-5 px-6"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-stone-600 text-xs" style={{ fontFamily: 'var(--font-inter)' }} suppressHydrationWarning>
            © {new Date().getFullYear()} GlamComm. All rights reserved.
          </p>
          <Link
            href="/admin"
            className="text-stone-800 hover:text-stone-600 transition-colors text-xs tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
