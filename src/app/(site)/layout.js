import { getDict, DEFAULT_LOCALE } from '@/lib/i18n';
import { getSettings } from '@/lib/store';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

// Public site layout: header + content + footer + floating WhatsApp button.
// (Admin routes live outside this group and get their own chrome.)
export default async function SiteLayout({ children }) {
  const dict = getDict(DEFAULT_LOCALE);
  const settings = await getSettings();
  const bookLink = buildWhatsAppLink(settings.whatsappNumber, dict.whatsapp.general);

  return (
    <>
      <Header bookLink={bookLink} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} bookLink={bookLink} />
      <WhatsAppFloat href={bookLink} />
    </>
  );
}
