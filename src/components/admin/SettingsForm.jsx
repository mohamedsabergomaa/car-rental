'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WarningCircle, CheckCircle, WhatsappLogo, Phone, MapPin, ImageSquare, TextAa, InstagramLogo, XLogo, SnapchatLogo, TiktokLogo } from '@phosphor-icons/react/dist/ssr';

export default function SettingsForm({ settings }) {
  const router = useRouter();
  const [form, setForm] = useState({
    whatsappNumber: settings.whatsappNumber ?? '',
    phone: settings.phone ?? '',
    address: settings.address ?? '',
    mapsEmbed: settings.mapsEmbed ?? '',
    heroTitle: settings.heroTitle ?? '',
    heroSubtitle: settings.heroSubtitle ?? '',
    instagram: settings.socials?.instagram ?? '',
    twitter: settings.socials?.twitter ?? '',
    snapchat: settings.socials?.snapchat ?? '',
    tiktok: settings.socials?.tiktok ?? '',
  });
  const [errors, setErrors] = useState([]);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setSaved(false);
    setSaving(true);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          whatsappNumber: form.whatsappNumber,
          phone: form.phone,
          address: form.address,
          mapsEmbed: form.mapsEmbed,
          heroTitle: form.heroTitle,
          heroSubtitle: form.heroSubtitle,
          socials: {
            instagram: form.instagram,
            twitter: form.twitter,
            snapchat: form.snapchat,
            tiktok: form.tiktok,
          },
        }),
      });
      if (res.ok) {
        setSaved(true);
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setErrors(data.errors || [data.error || 'تعذر الحفظ.']);
      }
    } catch {
      setErrors(['تعذر الاتصال بالخادم.']);
    }
    setSaving(false);
  }

  const socialFields = [
    { key: 'instagram', label: 'انستقرام', Icon: InstagramLogo, placeholder: 'https://instagram.com/…' },
    { key: 'twitter', label: 'منصة إكس', Icon: XLogo, placeholder: 'https://x.com/…' },
    { key: 'snapchat', label: 'سناب شات', Icon: SnapchatLogo, placeholder: 'https://snapchat.com/add/…' },
    { key: 'tiktok', label: 'تيك توك', Icon: TiktokLogo, placeholder: 'https://tiktok.com/@…' },
  ];

  return (
    <form onSubmit={handleSubmit} noValidate>
      {errors.length > 0 && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4" role="alert">
          <ul className="space-y-1 text-sm text-red-300 list-disc ps-5">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {saved && (
        <p className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-sm text-emerald-300" role="status">
          <CheckCircle size={16} aria-hidden="true" />
          تم حفظ الإعدادات بنجاح.
        </p>
      )}

      <div className="space-y-10">
        {/* Contact */}
        <section className="card p-6">
          <h2 className="flex items-center gap-2 text-sm font-bold text-gold-400 mb-5">
            <WhatsappLogo size={18} aria-hidden="true" />
            التواصل وواتساب
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="st-wa" className="field-label">رقم واتساب (بصيغة دولية بدون +)</label>
              <input
                id="st-wa"
                type="text"
                className="field"
                dir="ltr"
                value={form.whatsappNumber}
                onChange={set('whatsappNumber')}
                placeholder="9665XXXXXXXX"
                required
              />
              <p className="mt-2 text-xs text-cream-dim">
                هذا الرقم يُستخدم في زر واتساب العائم وكل أزرار الحجز في الموقع.
              </p>
            </div>
            <div>
              <label htmlFor="st-phone" className="field-label">رقم الهاتف (للعرض)</label>
              <div className="relative">
                <Phone size={16} className="absolute end-4 top-1/2 -translate-y-1/2 text-cream-dim" aria-hidden="true" />
                <input id="st-phone" type="text" className="field !pe-11" dir="ltr" value={form.phone} onChange={set('phone')} placeholder="+966 5X XXX XXXX" />
              </div>
            </div>
            <div>
              <label htmlFor="st-address" className="field-label">العنوان</label>
              <div className="relative">
                <MapPin size={16} className="absolute end-4 top-1/2 -translate-y-1/2 text-cream-dim" aria-hidden="true" />
                <input id="st-address" type="text" className="field !pe-11" value={form.address} onChange={set('address')} maxLength={200} placeholder="المدينة، الحي، الشارع" />
              </div>
            </div>
            <div>
              <label htmlFor="st-map" className="field-label">رابط تضمين خريطة جوجل</label>
              <div className="relative">
                <ImageSquare size={16} className="absolute end-4 top-1/2 -translate-y-1/2 text-cream-dim" aria-hidden="true" />
                <input
                  id="st-map"
                  type="url"
                  className="field !pe-11"
                  dir="ltr"
                  value={form.mapsEmbed}
                  onChange={set('mapsEmbed')}
                  placeholder="https://www.google.com/maps/embed?pb=…"
                />
              </div>
              <p className="mt-2 text-xs text-cream-dim">
                من خرائط جوجل: شارك ← تضمين خريطة ← انسخ رابط src من الكود.
              </p>
            </div>
          </div>
        </section>

        {/* Hero */}
        <section className="card p-6">
          <h2 className="flex items-center gap-2 text-sm font-bold text-gold-400 mb-5">
            <TextAa size={18} aria-hidden="true" />
            نصوص الواجهة الرئيسية
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="st-hero-title" className="field-label">العنوان الرئيسي</label>
              <input id="st-hero-title" type="text" className="field" value={form.heroTitle} onChange={set('heroTitle')} maxLength={120} />
            </div>
            <div>
              <label htmlFor="st-hero-sub" className="field-label">الوصف تحت العنوان</label>
              <textarea
                id="st-hero-sub"
                className="field min-h-[80px] resize-y"
                value={form.heroSubtitle}
                onChange={set('heroSubtitle')}
                maxLength={200}
              />
            </div>
          </div>
        </section>

        {/* Socials */}
        <section className="card p-6">
          <h2 className="text-sm font-bold text-gold-400 mb-5">حسابات التواصل الاجتماعي</h2>
          <div className="space-y-4">
            {socialFields.map(({ key, label, Icon, placeholder }) => (
              <div key={key} className="relative">
                <label htmlFor={`st-${key}`} className="field-label">{label}</label>
                <Icon size={16} className="absolute end-4 top-[42px] text-cream-dim" aria-hidden="true" />
                <input
                  id={`st-${key}`}
                  type="url"
                  className="field !pe-11"
                  dir="ltr"
                  value={form[key]}
                  onChange={set(key)}
                  placeholder={placeholder}
                />
              </div>
            ))}
            <p className="text-xs text-cream-dim">اتركه فارغاً لإخفاء الحساب من الموقع.</p>
          </div>
        </section>
      </div>

      <button type="submit" className="btn btn-gold mt-8" disabled={saving}>
        {saving ? 'جارٍ الحفظ…' : 'حفظ الإعدادات'}
      </button>
    </form>
  );
}
