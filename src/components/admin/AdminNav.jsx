'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SignOut } from '@phosphor-icons/react/dist/ssr';

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') return null;

  const links = [
    { href: '/admin', label: 'نظرة عامة' },
    { href: '/admin/cars', label: 'السيارات' },
    { href: '/admin/settings', label: 'الإعدادات' },
  ];

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <nav className="flex items-center gap-1 sm:gap-2" aria-label="تنقل لوحة التحكم">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={`rounded-full px-3 sm:px-4 py-2 text-sm font-semibold transition-colors ${
            pathname === l.href ? 'bg-gold-500 text-ink-950' : 'text-cream-dim hover:text-gold-300'
          }`}
        >
          {l.label}
        </Link>
      ))}
      <button
        type="button"
        onClick={logout}
        className="ms-2 flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-2 text-xs text-cream-dim transition-colors hover:border-red-400/50 hover:text-red-300"
      >
        <SignOut size={14} aria-hidden="true" />
        <span className="hidden sm:inline">خروج</span>
      </button>
    </nav>
  );
}
