import { Quotes } from '@phosphor-icons/react/dist/ssr';
import { getDict, DEFAULT_LOCALE } from '@/lib/i18n';
import Reveal from './Reveal';

// Customer testimonials. Currently SAMPLE content (marked on-screen) until
// real reviews are provided — see README.
export default function Testimonials() {
  const dict = getDict(DEFAULT_LOCALE);

  return (
    <section className="container-site py-24" aria-labelledby="testimonials-title">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="gold-rule block w-16" aria-hidden="true" />
          <h2 id="testimonials-title" className="mt-4 text-3xl lg:text-4xl font-extrabold tracking-tight">
            {dict.sections.testimonialsTitle}
          </h2>
        </div>
        <p className="rounded-full border border-white/10 bg-ink-800 px-4 py-1.5 text-xs text-cream-dim">
          {dict.sections.testimonialsNote}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {dict.testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <figure className="card h-full flex flex-col p-7">
              <Quotes size={28} className="text-gold-500/80 mb-5" aria-hidden="true" />
              <blockquote className="text-cream/90 leading-relaxed flex-1">“{t.quote}”</blockquote>
              <figcaption className="mt-6 pt-5 border-t border-white/5">
                <span className="block font-bold text-cream">{t.name}</span>
                <span className="text-xs text-cream-dim">{t.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
