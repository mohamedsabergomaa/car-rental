import Link from 'next/link';
import { getDict, DEFAULT_LOCALE } from '@/lib/i18n';

export default function NotFound() {
  const dict = getDict(DEFAULT_LOCALE);
  return (
    <section className="container-site flex min-h-[70dvh] flex-col items-center justify-center text-center py-24">
      <p className="font-display text-7xl text-gradient-gold" aria-hidden="true">404</p>
      <h1 className="mt-4 text-2xl font-extrabold">{dict.notFound.title}</h1>
      <p className="mt-2 text-cream-dim max-w-[40ch]">{dict.notFound.text}</p>
      <Link href="/" className="btn btn-gold mt-8">{dict.notFound.back}</Link>
    </section>
  );
}
