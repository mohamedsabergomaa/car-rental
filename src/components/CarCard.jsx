import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, WhatsappLogo, User, GearSix, Drop, CalendarBlank } from '@phosphor-icons/react/dist/ssr';
import { getDict, DEFAULT_LOCALE } from '@/lib/i18n';
import { buildWhatsAppLink } from '@/lib/whatsapp';

// One fleet card. Used on the homepage (featured) and the cars page grid.
export default function CarCard({ car, whatsappNumber, priority = false }) {
  const dict = getDict(DEFAULT_LOCALE);
  const c = dict.carDetails;
  const image = car.images?.[0] || '/images/cars/hero.jpg';

  return (
    <article className="card group overflow-hidden flex flex-col hover:-translate-y-1.5 hover:border-gold-500/40 hover:shadow-2xl hover:shadow-black/50">
      <Link href={`/cars/${car.id}`} className="relative block aspect-[16/10] overflow-hidden" aria-label={car.name}>
        <Image
          src={image}
          alt={car.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" aria-hidden="true" />
        {car.featured && (
          <span className="absolute top-4 start-4 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold text-ink-950">
            {dict.cars.featuredBadge}
          </span>
        )}
        <span className="absolute bottom-4 start-4 rounded-full border border-white/20 bg-ink-950/60 px-3 py-1 text-[11px] font-semibold text-cream backdrop-blur-sm">
          {dict.categories[car.category]}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-cream group-hover:text-gold-300 transition-colors">
            <Link href={`/cars/${car.id}`}>{car.name}</Link>
          </h3>
          <p className="shrink-0 text-sm font-bold text-gold-300" dir="rtl">
            {car.pricePerDay != null ? (
              <>
                {car.pricePerDay.toLocaleString('en-US')}
                <span className="block text-[10px] font-semibold text-cream-dim text-end">{dict.cars.perDay}</span>
              </>
            ) : (
              <span className="text-xs font-semibold">{dict.cars.priceOnRequest}</span>
            )}
          </p>
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-cream-dim">
          <li className="flex items-center gap-1.5"><User size={13} aria-hidden="true" /> {car.passengers} {c.passengers}</li>
          <li className="flex items-center gap-1.5"><GearSix size={13} aria-hidden="true" /> {c.transmissionTypes[car.transmission]}</li>
          <li className="flex items-center gap-1.5"><Drop size={13} aria-hidden="true" /> {c.fuelTypes[car.fuel]}</li>
          <li className="flex items-center gap-1.5"><CalendarBlank size={13} aria-hidden="true" /> {car.year}</li>
        </ul>

        <div className="mt-5 flex flex-col gap-2 pt-1">
          <Link href={`/cars/${car.id}`} className="btn btn-dark !py-2.5 text-sm w-full">
            {dict.cars.viewDetails}
            <ArrowLeft size={15} aria-hidden="true" />
          </Link>
          <a
            href={buildWhatsAppLink(whatsappNumber, dict.whatsapp.car(car.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn !py-2.5 text-sm w-full border border-[#25D366]/50 text-[#4be07e] hover:bg-[#25D366]/10 hover:border-[#25D366]"
          >
            <WhatsappLogo size={16} aria-hidden="true" />
            {dict.cars.bookWhatsapp}
          </a>
        </div>
      </div>
    </article>
  );
}
