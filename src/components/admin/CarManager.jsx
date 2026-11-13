'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PencilSimple, Trash, Star, WarningCircle } from '@phosphor-icons/react/dist/ssr';
import { getDict, DEFAULT_LOCALE } from '@/lib/i18n';

const dict = getDict(DEFAULT_LOCALE);

export default function CarManager({ initialCars }) {
  const router = useRouter();
  const [cars, setCars] = useState(initialCars);
  const [confirmId, setConfirmId] = useState(null);
  const [error, setError] = useState('');

  async function toggleFeatured(car) {
    const next = { ...car, featured: !car.featured };
    const res = await fetch(`/api/admin/cars/${car.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(next),
    });
    if (res.ok) {
      setCars((prev) => prev.map((c) => (c.id === car.id ? next : c)));
      router.refresh();
    } else {
      setError('تعذر تحديث حالة التميّز.');
    }
  }

  async function remove(id) {
    const res = await fetch(`/api/admin/cars/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setCars((prev) => prev.filter((c) => c.id !== id));
      setConfirmId(null);
      router.refresh();
    } else {
      setConfirmId(null);
      setError('تعذر حذف السيارة.');
    }
  }

  return (
    <div>
      {error && (
        <p className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300" role="alert">
          <WarningCircle size={16} aria-hidden="true" />
          {error}
        </p>
      )}

      <div className="card divide-y divide-white/5">
        {cars.length === 0 && (
          <p className="p-10 text-center text-cream-dim">لا توجد سيارات — أضف أول سيارة من الزر أعلاه.</p>
        )}
        {cars.map((car) => (
          <div key={car.id} className="flex flex-wrap items-center gap-4 p-4">
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10">
              <Image src={car.images[0] || '/images/cars/hero.jpg'} alt="" fill sizes="96px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-cream truncate">{car.name}</p>
              <p className="text-xs text-cream-dim mt-0.5" dir="ltr">
                {car.id} · {car.year} · {dict.categories[car.category]}
              </p>
            </div>
            <p className="text-sm text-gold-300 font-bold shrink-0" dir="ltr">
              {car.pricePerDay != null ? `${car.pricePerDay.toLocaleString('en-US')} ر.س` : '—'}
            </p>

            <div className="flex items-center gap-2 ms-auto">
              <button
                type="button"
                onClick={() => toggleFeatured(car)}
                aria-pressed={car.featured}
                aria-label={car.featured ? `إلغاء تمييز ${car.name}` : `تمييز ${car.name}`}
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                  car.featured
                    ? 'border-gold-500 bg-gold-500/15 text-gold-300'
                    : 'border-white/10 text-cream-dim hover:border-gold-500/50 hover:text-gold-300'
                }`}
              >
                <Star size={16} weight={car.featured ? 'fill' : 'regular'} aria-hidden="true" />
              </button>
              <Link
                href={`/admin/cars/${car.id}`}
                aria-label={`تعديل ${car.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-cream-dim transition-colors hover:border-gold-500/50 hover:text-gold-300"
              >
                <PencilSimple size={16} aria-hidden="true" />
              </Link>
              {confirmId === car.id ? (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => remove(car.id)}
                    className="rounded-full bg-red-500/90 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-500"
                  >
                    تأكيد الحذف
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmId(null)}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-cream-dim"
                  >
                    إلغاء
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmId(car.id)}
                  aria-label={`حذف ${car.name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-cream-dim transition-colors hover:border-red-400/50 hover:text-red-300"
                >
                  <Trash size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
