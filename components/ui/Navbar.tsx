'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'About Us', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 border-b border-white/5'
          : 'bg-transparent py-5'
      }`}
      style={scrolled ? { backgroundColor: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(16px)' } : {}}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" id="navbar-logo">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src="/glamcomm-logo.svg"
              alt="GlamComm Logo"
              width={40}
              height={40}
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="text-lg font-black tracking-wider uppercase"
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
              className="text-lg font-black tracking-wider uppercase -mt-1"
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
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8" role="navigation">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm text-stone-400 hover:text-white transition-colors duration-300 tracking-widest uppercase font-medium relative group"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #E8470A, #00D4E8)' }}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          id="navbar-cta"
          className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 text-xs tracking-widest uppercase font-bold text-white transition-all duration-300 rounded-full hover:-translate-y-0.5 hover:shadow-lg"
          style={{
            fontFamily: 'var(--font-outfit)',
            background: 'linear-gradient(135deg, #E8470A, #FF6B35)',
            boxShadow: '0 4px 20px rgba(232,71,10,0.35)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(232,71,10,0.55)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(232,71,10,0.35)';
          }}
        >
          Get a Quote
        </a>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-stone-300 hover:text-orange-400 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          id="navbar-mobile-toggle"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div
          className="border-t px-6 py-5 flex flex-col gap-4"
          style={{ backgroundColor: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(16px)', borderColor: 'rgba(232,71,10,0.2)' }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-stone-300 hover:text-white transition-colors text-sm tracking-widest uppercase font-medium"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 text-center px-6 py-3 text-xs tracking-widest uppercase font-bold text-white rounded-full"
            style={{ background: 'linear-gradient(135deg, #E8470A, #FF6B35)' }}
          >
            Get a Quote
          </a>
        </div>
      </div>
    </header>
  );
}
