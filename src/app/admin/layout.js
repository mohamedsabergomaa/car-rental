import Link from 'next/link';
import { getDict, DEFAULT_LOCALE } from '@/lib/i18n';
import AdminNav from '@/components/admin/AdminNav';

export const metadata = {
  title: 'لوحة التحكم',
  robots: { index: false, follow: false },
};

// Admin chrome. Route protection itself happens in middleware.js plus a
// server-side session check on every admin page (defense in depth).
export default function AdminLayout({ children }) {
  const dict = getDict(DEFAULT_LOCALE);

  return (
    <div className="min-h-[100dvh] bg-ink-950">
      <header className="border-b border-white/5 bg-ink-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between gap-4">
          <Link href="/admin" className="font-display text-lg tracking-[0.25em] text-cream">
            LEMO<span className="text-gradient-gold">SINE</span>
            <span className="ms-3 align-middle text-[10px] font-sans tracking-widest text-cream-dim">ADMIN</span>
          </Link>
          <AdminNav />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>
      <footer className="border-t border-white/5 py-6 text-center text-xs text-cream-dim/60">
        LEMOSINE Admin — {dict.footer.rights} © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
