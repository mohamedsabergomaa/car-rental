import { Cairo, Marcellus } from 'next/font/google';
import { getLocaleMeta, DEFAULT_LOCALE } from '@/lib/i18n';
import './globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

const marcellus = Marcellus({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-marcellus',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'LEMOSINE | تأجير السيارات الفاخرة',
    template: '%s | LEMOSINE',
  },
  description: 'ليموزين — تأجير سيارات فاخرة بأسطول مختار من رولز-رويس وفيراري وبورشه ومرسيدس. توصيل إلى أي مكان وحجز فوري عبر واتساب.',
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    siteName: 'LEMOSINE',
    images: [{ url: '/images/cars/hero.jpg', width: 2000, height: 1333, alt: 'LEMOSINE' }],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport = {
  themeColor: '#0a0a0b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const localeMeta = getLocaleMeta(DEFAULT_LOCALE);

  return (
    <html lang={localeMeta.lang} dir={localeMeta.dir} className={`${cairo.variable} ${marcellus.variable}`}>
      <body className="grain font-sans min-h-[100dvh] flex flex-col">{children}</body>
    </html>
  );
}
