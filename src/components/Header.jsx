'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { List, X } from '@phosphor-icons/react/dist/ssr';
import { getDict, DEFAULT_LOCALE } from '@/lib/i18n';

export default function Header({ bookLink }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const dict = getDict(DEFAULT_LOCALE);

  if (pathname?.startsWith('/admin')) return null;

  const links = [
    { href: '/', label: dict.nav.home },
    { href: '/cars', label: dict.nav.cars },
    { href: '/about', label: dict.nav.about },
    { href: '/contact', label: dict.nav.contact },
  ];

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-[72px] bg-ink-950/75 backdrop-blur-md border-b border-white/5">
      <div className="container-site h-full flex items-center justify-between gap-6">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-display text-xl lg:text-2xl tracking-[0.3em] text-cream hover:text-gold-300 transition-colors shrink-0"
          aria-label="LEMOSINE — الرئيسية"
          onClick={() => setOpen(false)}
        >
          LEMO<span className="text-gradient-gold">SINE</span>
        </Link>

        {/* Desktop nav — single line */}
        <nav className="hidden md:flex items-center gap-8" aria-label="التنقل الرئيسي">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-semibold transition-colors hover:text-gold-300 ${
                isActive(l.href) ? 'text-gold-400' : 'text-cream/80'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a href={bookLink} target="_blank" rel="noopener noreferrer" className="btn btn-gold !py-2.5 !px-5 text-sm">
            {dict.nav.bookNow}
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-cream p-2 -me-2"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
        >
          {open ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="القائمة المتنقلة"
          className="md:hidden absolute top-[72px] inset-x-0 bg-ink-950/95 backdrop-blur-md border-b border-white/5 shadow-2xl shadow-black/40"
        >
          <div className="container-site py-6 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`py-3 text-base font-semibold border-b border-white/5 transition-colors ${
                  isActive(l.href) ? 'text-gold-400' : 'text-cream/85'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={bookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold mt-4"
              onClick={() => setOpen(false)}
            >
              {dict.nav.bookNow}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
