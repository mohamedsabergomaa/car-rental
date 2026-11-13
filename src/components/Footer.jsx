import Link from 'next/link';
import { InstagramLogo, XLogo, TiktokLogo, SnapchatLogo, MapPin, Phone, Clock } from '@phosphor-icons/react/dist/ssr';
import { getDict, DEFAULT_LOCALE } from '@/lib/i18n';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export default function Footer({ settings, bookLink }) {
  const dict = getDict(DEFAULT_LOCALE);
  const year = new Date().getFullYear();

  const socials = [
    { key: 'instagram', url: settings.socials?.instagram, label: 'انستقرام', Icon: InstagramLogo },
    { key: 'twitter', url: settings.socials?.twitter, label: 'منصة إكس', Icon: XLogo },
    { key: 'snapchat', url: settings.socials?.snapchat, label: 'سناب شات', Icon: SnapchatLogo },
    { key: 'tiktok', url: settings.socials?.tiktok, label: 'تيك توك', Icon: TiktokLogo },
  ].filter((s) => s.url);

  return (
    <footer className="border-t border-white/5 bg-ink-900 mt-24">
      <div className="container-site py-16 grid gap-12 md:grid-cols-3">
        {/* Brand */}
        <div>
          <Link href="/" className="font-display text-2xl tracking-[0.3em] text-cream">
            LEMO<span className="text-gradient-gold">SINE</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-cream-dim max-w-[32ch]">{dict.footer.aboutText}</p>
          {socials.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-bold text-cream-dim mb-3">{dict.footer.followUs}</h3>
              <ul className="flex gap-3">
                {socials.map(({ key, url, label, Icon }) => (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cream-dim transition-colors hover:border-gold-500 hover:text-gold-300"
                    >
                      <Icon size={18} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Quick links */}
        <nav aria-label="روابط سريعة">
          <h3 className="text-sm font-bold text-gold-400 mb-4">{dict.footer.linksTitle}</h3>
          <ul className="space-y-3 text-sm">
            {[
              { href: '/', label: dict.nav.home },
              { href: '/cars', label: dict.nav.cars },
              { href: '/about', label: dict.nav.about },
              { href: '/contact', label: dict.nav.contact },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-cream-dim transition-colors hover:text-gold-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold text-gold-400 mb-4">{dict.footer.contactTitle}</h3>
          <ul className="space-y-3 text-sm text-cream-dim">
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-gold-400 shrink-0" aria-hidden="true" />
              <span dir="ltr">{settings.phone || '—'}</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-gold-400 shrink-0" aria-hidden="true" />
              <span>{settings.address || dict.contact.addressPlaceholder}</span>
            </li>
            <li className="flex items-center gap-3">
              <Clock size={16} className="text-gold-400 shrink-0" aria-hidden="true" />
              <span>24/7</span>
            </li>
          </ul>
          <a href={bookLink} target="_blank" rel="noopener noreferrer" className="btn btn-gold !py-2.5 !px-5 text-sm mt-5">
            {dict.nav.bookNow}
          </a>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream-dim/70">
          <p>© {year} LEMOSINE — {dict.footer.rights}</p>
          <Link href="/admin" className="transition-colors hover:text-gold-400">
            {dict.footer.adminLink}
          </Link>
        </div>
      </div>
    </footer>
  );
}
