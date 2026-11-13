import { getDict, DEFAULT_LOCALE } from '@/lib/i18n';
import { getCars, getSettings } from '@/lib/store';
import CarsExplorer from '@/components/CarsExplorer';
import Reveal from '@/components/Reveal';

export const revalidate = 0;

export const metadata = {
  title: 'أسطول السيارات',
  description: 'تصفح أسطول ليموزين من السيارات الفاخرة والرياضية والكهربائية مع أسعار يومية واضحة.',
  alternates: { canonical: '/cars' },
};

export default async function CarsPage() {
  const dict = getDict(DEFAULT_LOCALE);
  const [cars, settings] = await Promise.all([getCars(), getSettings()]);

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
            <h1 className="mt-4 text-4xl lg:text-5xl font-black tracking-tight">{dict.cars.pageTitle}</h1>
            <p className="mt-3 max-w-[55ch] text-cream-dim">{dict.cars.pageSubtitle}</p>
          </Reveal>
        </div>
      </section>

      <section className="container-site pb-24">
        <CarsExplorer cars={cars} whatsappNumber={settings.whatsappNumber} />
      </section>
    </>
  );
}
