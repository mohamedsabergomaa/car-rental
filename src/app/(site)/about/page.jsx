import Image from 'next/image';
import { Diamond, Target, Handshake, SealCheck } from '@phosphor-icons/react/dist/ssr';
import { getDict, DEFAULT_LOCALE } from '@/lib/i18n';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'من نحن',
  description: 'تعرّف على قصة ليموزين، مهمتنا، ولماذا يختارنا العملاء لتجربة قيادة استثنائية.',
  alternates: { canonical: '/about' },
};

const valueIcons = [SealCheck, Handshake, Target];

export default function AboutPage() {
  const dict = getDict(DEFAULT_LOCALE);

  return (
    <>
      <section className="relative pt-36 pb-14 overflow-hidden">
        <div
          className="absolute inset-0 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(201,162,39,0.09),transparent_70%)]"
          aria-hidden="true"
        />
        <div className="container-site relative">
          <Reveal>
            <span className="gold-rule block w-16" aria-hidden="true" />
            <h1 className="mt-4 text-4xl lg:text-5xl font-black tracking-tight">{dict.about.pageTitle}</h1>
            <p className="mt-3 max-w-[55ch] text-cream-dim">{dict.about.pageSubtitle}</p>
          </Reveal>
        </div>
      </section>

      {/* Intro split */}
      <section className="container-site pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/cars/about-1.jpg"
                alt="سيارة ليموزين الرياضية على الطريق"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">{dict.about.introTitle}</h2>
            <p className="mt-5 leading-relaxed text-cream-dim">{dict.about.introText1}</p>
            <p className="mt-4 leading-relaxed text-cream-dim">{dict.about.introText2}</p>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section className="border-y border-white/5 bg-ink-900/50 py-20">
        <div className="container-site grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16 items-center">
          <Reveal className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gold-500/10 border border-gold-500/30">
            <Diamond size={36} className="text-gold-400" aria-hidden="true" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-2xl lg:text-3xl font-extrabold">{dict.about.missionTitle}</h2>
            <p className="mt-3 max-w-[70ch] leading-relaxed text-cream/85 text-lg">{dict.about.missionText}</p>
          </Reveal>
        </div>
      </section>

      {/* Values + reasons */}
      <section className="container-site py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl lg:text-3xl font-extrabold mb-8">{dict.about.valuesTitle}</h2>
            <ul className="space-y-5">
              {dict.about.values.map((v, i) => {
                const Icon = valueIcons[i] || SealCheck;
                return (
                  <Reveal key={v.title} delay={i * 0.08} as="li">
                    <div className="card flex gap-5 p-6">
                      <Icon size={26} className="text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <h3 className="font-bold text-cream">{v.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-cream-dim">{v.text}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl font-extrabold mb-8">{dict.about.reasonsTitle}</h2>
            <ul className="space-y-5">
              {dict.why.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.08} as="li">
                  <div className="card flex gap-5 p-6">
                    <span className="font-display text-2xl text-gold-500/90 leading-none mt-0.5" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-bold text-cream">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-cream-dim">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
