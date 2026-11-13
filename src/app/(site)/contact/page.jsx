import { WhatsappLogo, Phone, MapPin } from '@phosphor-icons/react/dist/ssr';
import { getDict, DEFAULT_LOCALE } from '@/lib/i18n';
import { getSettings } from '@/lib/store';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';

export const revalidate = 0;

export const metadata = {
  title: 'تواصل معنا',
  description: 'تواصل مع ليموزين عبر واتساب أو الهاتف لحجز سيارتك الفاخرة.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage() {
  const dict = getDict(DEFAULT_LOCALE);
  const settings = await getSettings();
  const bookLink = buildWhatsAppLink(settings.whatsappNumber, dict.whatsapp.general);

  const socials = [
    { key: 'instagram', url: settings.socials?.instagram, label: 'انستقرام' },
    { key: 'twitter', url: settings.socials?.twitter, label: 'منصة إكس' },
    { key: 'snapchat', url: settings.socials?.snapchat, label: 'سناب شات' },
    { key: 'tiktok', url: settings.socials?.tiktok, label: 'تيك توك' },
  ].filter((s) => s.url);

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
            <h1 className="mt-4 text-4xl lg:text-5xl font-black tracking-tight">{dict.contact.pageTitle}</h1>
            <p className="mt-3 max-w-[55ch] text-cream-dim">{dict.contact.pageSubtitle}</p>
          </Reveal>
        </div>
      </section>

      <section className="container-site pb-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 items-start">
          {/* Contact channels */}
          <Reveal className="space-y-5">
            <a
              href={bookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="card flex items-center gap-5 p-6 hover:border-[#25D366]/50 transition-colors group"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#4be07e]">
                <WhatsappLogo size={24} aria-hidden="true" />
              </span>
              <div>
                <span className="block text-xs text-cream-dim">{dict.contact.whatsapp}</span>
                <span dir="ltr" className="block font-bold text-cream group-hover:text-[#4be07e] transition-colors">
                  {settings.whatsappNumber ? `+${settings.whatsappNumber}` : '—'}
                </span>
              </div>
            </a>

            {settings.phone && (
              <a
                href={`tel:${settings.phone.replace(/\s/g, '')}`}
                className="card flex items-center gap-5 p-6 hover:border-gold-500/50 transition-colors group"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
                  <Phone size={22} aria-hidden="true" />
                </span>
                <div>
                  <span className="block text-xs text-cream-dim">{dict.contact.phone}</span>
                  <span dir="ltr" className="block font-bold text-cream group-hover:text-gold-300 transition-colors">
                    {settings.phone}
                  </span>
                </div>
              </a>
            )}

            <div className="card flex items-center gap-5 p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink-700 text-gold-400">
                <MapPin size={22} aria-hidden="true" />
              </span>
              <div>
                <span className="block text-xs text-cream-dim">{dict.contact.address}</span>
                <span className="block font-bold text-cream">{settings.address || dict.contact.addressPlaceholder}</span>
              </div>
            </div>

            {socials.length > 0 && (
              <div className="card p-6">
                <h2 className="text-sm font-bold text-gold-400 mb-4">{dict.contact.socials}</h2>
                <ul className="flex flex-wrap gap-3">
                  {socials.map((s) => (
                    <li key={s.key}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/10 bg-ink-800 px-4 py-2 text-sm text-cream-dim transition-colors hover:border-gold-500/50 hover:text-gold-300"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>

          {/* Form */}
          <Reveal delay={0.12}>
            <ContactForm whatsappNumber={settings.whatsappNumber} />
          </Reveal>
        </div>

        {/* Map */}
        <Reveal className="mt-14">
          <h2 className="text-xl font-bold mb-5">{dict.contact.mapsTitle}</h2>
          {settings.mapsEmbed ? (
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <iframe
                src={settings.mapsEmbed}
                title={dict.contact.mapsTitle}
                className="w-full h-[380px] grayscale-[35%] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="card flex h-[280px] flex-col items-center justify-center text-center">
              <MapPin size={36} className="text-gold-500/60 mb-4" aria-hidden="true" />
              <p className="text-cream-dim">{dict.contact.mapsPlaceholder}</p>
            </div>
          )}
        </Reveal>
      </section>
    </>
  );
}
