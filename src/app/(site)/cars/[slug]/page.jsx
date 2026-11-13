import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  WhatsappLogo, Phone, User, GearSix, Drop, CalendarBlank, Armchair, ArrowLeft,
} from '@phosphor-icons/react/dist/ssr';
import { getDict, DEFAULT_LOCALE } from '@/lib/i18n';
import { getCar, getCars, getSettings } from '@/lib/store';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import Gallery from '@/components/Gallery';
import CarCard from '@/components/CarCard';
import Reveal from '@/components/Reveal';

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const car = await getCar((await params).slug);
  if (!car) return { title: 'السيارة غير موجودة' };
  return {
    title: car.name,
    description: car.description || `استأجر ${car.name} موديل ${car.year} من ليموزين — حجز فوري عبر واتساب.`,
    alternates: { canonical: `/cars/${car.id}` },
    openGraph: { images: [{ url: car.images[0] }] },
  };
}

export default async function CarDetailsPage({ params }) {
  const { slug } = await params;
  const dict = getDict(DEFAULT_LOCALE);
  const car = await getCar(slug);
  if (!car) notFound();

  const [settings, allCars] = await Promise.all([getSettings(), getCars()]);
  const related = allCars.filter((c) => c.id !== car.id && c.category === car.category).slice(0, 3);

  const specs = [
    { Icon: User, label: dict.carDetails.passengers, value: `${car.passengers}` },
    { Icon: GearSix, label: dict.carDetails.transmission, value: dict.carDetails.transmissionTypes[car.transmission] },
    { Icon: Drop, label: dict.carDetails.fuel, value: dict.carDetails.fuelTypes[car.fuel] },
    { Icon: CalendarBlank, label: dict.carDetails.year, value: `${car.year}` },
    { Icon: Armchair, label: dict.carDetails.category, value: dict.categories[car.category] },
  ];

  const bookLink = buildWhatsAppLink(settings.whatsappNumber, dict.whatsapp.car(car.name));

  return (
    <>
      <section className="pt-32 pb-24">
        <div className="container-site">
          {/* Breadcrumb */}
          <nav aria-label="مسار التنقل" className="mb-8 text-sm text-cream-dim">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-gold-300 transition-colors">{dict.nav.home}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/cars" className="hover:text-gold-300 transition-colors">{dict.nav.cars}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-gold-300">{car.name}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14 items-start">
            {/* Gallery */}
            <Reveal>
              <Gallery images={car.images} alt={car.name} />
            </Reveal>

            {/* Summary + booking panel */}
            <Reveal delay={0.1} className="lg:sticky lg:top-24">
              <span className="rounded-full border border-gold-500/40 px-3 py-1 text-xs font-bold text-gold-300">
                {dict.categories[car.category]}
              </span>
              <h1 className="mt-4 text-3xl lg:text-4xl font-black tracking-tight">{car.name}</h1>

              <p className="mt-5 text-cream-dim leading-relaxed">{car.description}</p>

              {/* Specs */}
              <h2 className="mt-8 mb-4 text-sm font-bold text-gold-400">{dict.carDetails.specsTitle}</h2>
              <ul className="grid grid-cols-2 gap-3">
                {specs.map(({ Icon, label, value }) => (
                  <li key={label} className="card flex items-center gap-3 p-3.5">
                    <Icon size={20} className="text-gold-400 shrink-0" aria-hidden="true" />
                    <div>
                      <span className="block text-[11px] text-cream-dim">{label}</span>
                      <span className="text-sm font-bold text-cream">{value}</span>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Price + CTAs */}
              <div className="card mt-8 p-6 bg-gradient-to-br from-ink-900 to-ink-800">
                <p className="text-cream-dim text-sm">السعر اليومي</p>
                <p className="mt-1 text-3xl font-black text-gold-300">
                  {car.pricePerDay != null ? (
                    <>
                      {car.pricePerDay.toLocaleString('en-US')}
                      <span className="ms-2 text-sm font-semibold text-cream-dim">{dict.cars.perDay}</span>
                    </>
                  ) : (
                    <span className="text-xl">{dict.cars.priceOnRequest}</span>
                  )}
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <a href={bookLink} target="_blank" rel="noopener noreferrer" className="btn btn-gold w-full">
                    <WhatsappLogo size={18} aria-hidden="true" />
                    {dict.cars.bookWhatsapp}
                  </a>
                  {settings.phone && (
                    <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="btn btn-dark w-full">
                      <Phone size={16} aria-hidden="true" />
                      {dict.carDetails.callUs}
                      <span dir="ltr" className="text-cream-dim text-xs">{settings.phone}</span>
                    </a>
                  )}
                </div>
                <p className="mt-4 text-center text-xs text-cream-dim">{dict.carDetails.bookingText}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related cars */}
      {related.length > 0 && (
        <section className="container-site pb-24" aria-labelledby="related-title">
          <div className="mb-10">
            <span className="gold-rule block w-16" aria-hidden="true" />
            <h2 id="related-title" className="mt-4 text-2xl lg:text-3xl font-extrabold tracking-tight">
              {dict.cars.relatedTitle}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((c) => (
              <CarCard key={c.id} car={c} whatsappNumber={settings.whatsappNumber} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/cars" className="btn btn-dark">
              {dict.sections.viewAll}
              <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
