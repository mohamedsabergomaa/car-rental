import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, SealCheck, Truck, Receipt, Headset, Phone } from '@phosphor-icons/react/dist/ssr';
import { getDict, DEFAULT_LOCALE } from '@/lib/i18n';
import { getCars, getSettings } from '@/lib/store';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import SectionHeader from '@/components/SectionHeader';
import CarCard from '@/components/CarCard';
import Reveal from '@/components/Reveal';
import BrandMarquee from '@/components/BrandMarquee';
import Testimonials from '@/components/Testimonials';

export const revalidate = 0;

export const metadata = {
  title: 'تأجير السيارات الفاخرة',
  description: 'ليموزين — تأجير سيارات فاخرة بأسطول مختار من رولز-رويس وفيراري وبورشه ومرسيدس. توصيل إلى أي مكان وحجز فوري عبر واتساب.',
  alternates: { canonical: '/' },
};

const whyIcons = { 0: SealCheck, 1: Truck, 2: Receipt, 3: Headset };

export default async function HomePage() {
  const dict = getDict(DEFAULT_LOCALE);
  const settings = await getSettings();
  const cars = await getCars();
  const featured = [...cars.filter((c) => c.featured), ...cars.filter((c) => !c.featured)].slice(0, 3);
  const bookLink = buildWhatsAppLink(settings.whatsappNumber, dict.whatsapp.general);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    name: 'LEMOSINE',
    description: dict.seo.homeDescription,
    telephone: settings.phone || undefined,
    url: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* — Hero — */}
      <section className="relative min-h-[100dvh] flex items-end overflow-hidden">
        <Image
          src="/images/cars/hero.jpg"
          alt="سيارة فاخرة تتحرك على الطريق"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/30" aria-hidden="true" />

        <div className="container-site relative pb-24 lg:pb-32 pt-24">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-gold-500/40 bg-ink-950/50 px-4 py-2 text-xs font-bold tracking-widest text-gold-300 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden="true" />
              {dict.hero.badge}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-5xl md:text-7xl font-black leading-[1.05] tracking-tight max-w-[12ch]">
              {settings.heroTitle || dict.hero.title}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-[48ch] text-base md:text-lg leading-relaxed text-cream/75">
              {settings.heroSubtitle || dict.hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href={bookLink} target="_blank" rel="noopener noreferrer" className="btn btn-gold text-base">
                {dict.hero.ctaPrimary}
              </a>
              <Link href="/cars" className="btn btn-ghost text-base">
                {dict.hero.ctaSecondary}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <BrandMarquee />

      {/* — Featured cars — */}
      <section className="container-site py-24 lg:py-28" aria-labelledby="featured-title">
        <SectionHeader id="featured-title" title={dict.sections.featuredTitle} subtitle={dict.sections.featuredSubtitle} />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((car, i) => (
            <Reveal key={car.id} delay={i * 0.08}>
              <CarCard car={car} whatsappNumber={settings.whatsappNumber} priority={i === 0} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link href="/cars" className="btn btn-dark">
            {dict.sections.viewAll}
            <ArrowLeft size={16} aria-hidden="true" />
          </Link>
        </Reveal>
      </section>

      {/* — Why choose us (bento with visual variation) — */}
      <section className="border-y border-white/5 bg-ink-900/50 py-24 lg:py-28" aria-labelledby="why-title">
        <div className="container-site">
          <SectionHeader id="why-title" title={dict.sections.whyTitle} subtitle={dict.sections.whySubtitle} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <Reveal className="relative md:col-span-2 lg:row-span-2 min-h-[280px] lg:min-h-[460px] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/cars/cta-bg.jpg"
                alt="سيارة رياضية ليلاً"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 to-transparent" aria-hidden="true" />
              <p className="absolute bottom-6 start-6 end-6 font-display text-2xl tracking-[0.2em] text-cream">
                LEMOSINE
              </p>
            </Reveal>

            {dict.why.map((item, i) => {
              const Icon = whyIcons[i];
              return (
                <Reveal key={item.title} delay={0.08 * (i + 1)}>
                  <div className={`card h-full p-7 ${i === 1 ? 'bg-gradient-to-br from-ink-800 to-gold-700/20 border-gold-500/25' : ''}`}>
                    <Icon size={30} className="text-gold-400" aria-hidden="true" />
                    <h3 className="mt-4 text-lg font-bold text-cream">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream-dim">{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* — Company intro — */}
      <section className="container-site py-24 lg:py-28" aria-labelledby="intro-title">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/cars/about-1.jpg"
                alt="سيارة رياضية فاخرة في طريق حرجي"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <span className="gold-rule block w-16" aria-hidden="true" />
            <h2 id="intro-title" className="mt-4 text-3xl lg:text-4xl font-extrabold tracking-tight">
              {dict.sections.introTitle}
            </h2>
            <p className="mt-5 leading-relaxed text-cream-dim max-w-[60ch]">{dict.sections.introText}</p>
            <Link href="/about" className="btn btn-ghost mt-8">
              {dict.sections.introCta}
              <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Testimonials />

      {/* — Contact CTA — */}
      <section className="container-site pb-4" aria-labelledby="cta-title">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-gold-500/25">
            <Image
              src="/images/cars/cta-bg.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-ink-950/80" aria-hidden="true" />
            <div className="relative px-6 py-20 lg:py-24 text-center">
              <h2 id="cta-title" className="text-3xl lg:text-5xl font-extrabold tracking-tight max-w-[22ch] mx-auto">
                {dict.sections.ctaTitle}
              </h2>
              <p className="mt-4 text-cream-dim max-w-[52ch] mx-auto">{dict.sections.ctaText}</p>
              <div className="mt-9 flex flex-wrap justify-center items-center gap-4">
                <a href={bookLink} target="_blank" rel="noopener noreferrer" className="btn btn-gold text-base">
                  {dict.sections.ctaButton}
                </a>
                {settings.phone && (
                  <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="btn btn-ghost text-base">
                    <Phone size={16} aria-hidden="true" />
                    <span dir="ltr">{settings.phone}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
