import { getDict, DEFAULT_LOCALE } from '@/lib/i18n';

// Single brand strip (the one marquee allowed on the homepage).
export default function BrandMarquee() {
  const dict = getDict(DEFAULT_LOCALE);
  const items = [...dict.marquee.items, ...dict.marquee.items];

  return (
    <section aria-label="ماركات السيارات" className="border-y border-white/5 bg-ink-900/60 py-5 overflow-hidden">
      <div className="marquee-track">
        {items.map((brand, i) => (
          <span key={i} className="flex items-center gap-8 px-4 text-sm font-semibold tracking-wide text-cream-dim/80 whitespace-nowrap">
            {brand}
            <span className="h-1 w-1 rounded-full bg-gold-500/70" aria-hidden="true" />
          </span>
        ))}
      </div>
    </section>
  );
}
