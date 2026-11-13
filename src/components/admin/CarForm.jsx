'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { WarningCircle, UploadSimple, Star, Trash, SpinnerGap } from '@phosphor-icons/react/dist/ssr';
import { DEFAULT_LOCALE } from '@/lib/i18n';

const dict = {
  categories: {
    luxury: 'فخامة',
    sedan: 'سيدان تنفيذية',
    sports: 'رياضية',
    exotic: 'خارقة',
    suv: 'دفع رباعي',
    electric: 'كهربائية',
  },
};

export default function CarForm({ car }) {
  const isEdit = Boolean(car);
  const router = useRouter();
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    id: car?.id ?? '',
    name: car?.name ?? '',
    year: car?.year ?? new Date().getFullYear(),
    category: car?.category ?? 'luxury',
    pricePerDay: car?.pricePerDay ?? '',
    passengers: car?.passengers ?? 5,
    transmission: car?.transmission ?? 'auto',
    fuel: car?.fuel ?? 'petrol',
    description: car?.description ?? '',
    featured: car?.featured ?? false,
    images: car?.images ?? [],
  });
  const [errors, setErrors] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  async function uploadFiles(fileList) {
    setError0();
    const files = [...fileList];
    for (const file of files) {
      setUploading(true);
      const fd = new FormData();
      fd.append('file', file);
      try {
        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (res.ok) {
          setForm((f) => ({ ...f, images: [...f.images, data.path] }));
        } else {
          setErrors([data.error || 'تعذر رفع الصورة.']);
        }
      } catch {
        setErrors(['تعذر الاتصال بالخادم عند رفع الصورة.']);
      }
      setUploading(false);
    }

    function setError0() {
      setErrors([]);
    }
  }

  function removeImage(path) {
    setForm((f) => ({ ...f, images: f.images.filter((p) => p !== path) }));
  }

  function makeMain(path) {
    setForm((f) => ({ ...f, images: [path, ...f.images.filter((p) => p !== path)] }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);

    if (!isEdit && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.id)) {
      setErrors(['المعرّف (ID) مطلوب: أحرف إنجليزية صغيرة وأرقام وشرطات فقط، مثال: mercedes-s-class']);
      return;
    }
    if (form.images.length === 0) {
      setErrors(['أضف صورة واحدة على الأقل.']);
      return;
    }

    setSaving(true);
    const payload = {
      ...form,
      year: Number(form.year),
      passengers: Number(form.passengers),
      pricePerDay: form.pricePerDay === '' ? null : Number(form.pricePerDay),
    };
    try {
      const res = await fetch(isEdit ? `/api/admin/cars/${form.id}` : '/api/admin/cars', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push('/admin/cars');
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setErrors(data.errors || [data.error || 'تعذر الحفظ.']);
        setSaving(false);
      }
    } catch {
      setErrors(['تعذر الاتصال بالخادم.']);
      setSaving(false);
    }
  }

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

      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <h2 className="text-sm font-bold text-gold-400 mb-3">بيانات السيارة</h2>
        </div>

        <div>
          <label htmlFor="car-id" className="field-label">المعرّف (ID) — يظهر في رابط الصفحة</label>
          <input
            id="car-id"
            type="text"
            className="field"
            dir="ltr"
            value={form.id}
            onChange={set('id')}
            placeholder="mercedes-s-class"
            maxLength={80}
            disabled={isEdit}
            required
          />
        </div>

        <div>
          <label htmlFor="car-name" className="field-label">اسم السيارة</label>
          <input id="car-name" type="text" className="field" value={form.name} onChange={set('name')} maxLength={100} required />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="car-year" className="field-label">الموديل (سنة)</label>
            <input
              id="car-year"
              type="number"
              className="field"
              dir="ltr"
              min="1990"
              max={new Date().getFullYear() + 2}
              value={form.year}
              onChange={set('year')}
              required
            />
          </div>
          <div>
            <label htmlFor="car-price" className="field-label">السعر اليومي (ر.س — اختياري)</label>
            <input
              id="car-price"
              type="number"
              className="field"
              dir="ltr"
              min="0"
              value={form.pricePerDay}
              onChange={set('pricePerDay')}
              placeholder="—"
            />
          </div>
        </div>

        <div>
          <label htmlFor="car-category" className="field-label">الفئة</label>
          <select id="car-category" className="field" value={form.category} onChange={set('category')}>
            {Object.entries(dict.categories).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-5">
          <div>
            <label htmlFor="car-passengers" className="field-label">الركاب</label>
            <input
              id="car-passengers"
              type="number"
              className="field"
              dir="ltr"
              min="1"
              max="20"
              value={form.passengers}
              onChange={set('passengers')}
              required
            />
          </div>
          <div>
            <label htmlFor="car-transmission" className="field-label">ناقل الحركة</label>
            <select id="car-transmission" className="field" value={form.transmission} onChange={set('transmission')}>
              <option value="auto">أوتوماتيك</option>
              <option value="manual">يدوي</option>
            </select>
          </div>
          <div>
            <label htmlFor="car-fuel" className="field-label">الوقود</label>
            <select id="car-fuel" className="field" value={form.fuel} onChange={set('fuel')}>
              <option value="petrol">بنزين</option>
              <option value="hybrid">هايبرد</option>
              <option value="electric">كهربائي</option>
              <option value="diesel">ديزل</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="car-description" className="field-label">وصف قصير</label>
          <textarea
            id="car-description"
            className="field min-h-[100px] resize-y"
            value={form.description}
            onChange={set('description')}
            maxLength={500}
            placeholder="سطر أو سطران يوضحان مميزات السيارة…"
          />
        </div>

        <div className="md:col-span-2 flex items-center gap-3">
          <input
            id="car-featured"
            type="checkbox"
            className="h-4 w-4 accent-gold-500"
            checked={form.featured}
            onChange={set('featured')}
          />
          <label htmlFor="car-featured" className="text-sm font-semibold text-cream">
            سيارة مميزة — تظهر في قسم «سيارات مميزة» بالصفحة الرئيسية
          </label>
        </div>

        {/* Images */}
        <div className="md:col-span-2">
          <h2 className="text-sm font-bold text-gold-400 mb-3 mt-4">الصور</h2>
          <p className="text-xs text-cream-dim mb-4">
            الصورة الأولى هي الصورة الرئيسية. الصيغ المسموحة: JPG / PNG / WebP — بحد أقصى 4 ميجابايت للصورة.
          </p>

          {form.images.length > 0 && (
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {form.images.map((img, i) => (
                <li key={img} className="relative group overflow-hidden rounded-xl border border-white/10">
                  <div className="relative aspect-[16/10] bg-ink-800">
                    <Image src={img} alt="" fill sizes="25vw" className="object-cover" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1.5 bg-gradient-to-t from-ink-950/90 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => makeMain(img)}
                      disabled={i === 0}
                      aria-label="جعلها الصورة الرئيسية"
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        i === 0 ? 'bg-gold-500 text-ink-950' : 'bg-ink-800/90 text-gold-300 hover:bg-ink-700'
                      }`}
                    >
                      <Star size={14} weight="fill" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(img)}
                      aria-label="حذف الصورة"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-800/90 text-red-300 hover:bg-red-500/20"
                    >
                      <Trash size={14} aria-hidden="true" />
                    </button>
                  </div>
                  {i === 0 && (
                    <span className="absolute top-2 start-2 rounded-full bg-gold-500 px-2 py-0.5 text-[10px] font-bold text-ink-950">
                      رئيسية
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}

          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={(e) => uploadFiles(e.target.files)}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center justify-center gap-2 w-full rounded-xl border border-dashed border-white/15 bg-ink-900 py-6 text-sm text-cream-dim transition-colors hover:border-gold-500/50 hover:text-gold-300"
          >
            {uploading ? (
              <>
                <SpinnerGap size={18} className="animate-spin" aria-hidden="true" />
                جارٍ الرفع…
              </>
            ) : (
              <>
                <UploadSimple size={18} aria-hidden="true" />
                رفع صور
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button type="submit" className="btn btn-gold" disabled={saving || uploading}>
          {saving ? 'جارٍ الحفظ…' : isEdit ? 'حفظ التعديلات' : 'إضافة السيارة'}
        </button>
        <Link href="/admin/cars" className="btn btn-dark">إلغاء</Link>
      </div>
    </form>
  );
}
