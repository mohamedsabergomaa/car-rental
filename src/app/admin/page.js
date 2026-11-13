import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CaretLeft, Star, Car, SquaresFour } from '@phosphor-icons/react/dist/ssr';
import { isValidSession } from '@/lib/auth';
import { getCars } from '@/lib/store';
import { getDict, DEFAULT_LOCALE } from '@/lib/i18n';

export const metadata = {
  title: 'نظرة عامة',
  robots: { index: false, follow: false },
};

export default async function AdminDashboard() {
  if (!(await isValidSession())) redirect('/admin/login');

  const cars = await getCars();
  const dict = getDict(DEFAULT_LOCALE);

  const stats = [
    { label: 'إجمالي السيارات', value: cars.length, Icon: Car },
    { label: 'سيارات مميزة', value: cars.filter((c) => c.featured).length, Icon: Star },
    { label: 'الفئات', value: new Set(cars.map((c) => c.category)).size, Icon: SquaresFour },
  ];

  const recent = [...cars].slice(-5).reverse();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight">نظرة عامة</h1>
          <p className="mt-1 text-sm text-cream-dim">إدارة أسطول السيارات ومعلومات التواصل للموقع</p>
        </div>
        <Link href="/admin/cars/new" className="btn btn-gold !py-2.5 text-sm">
          إضافة سيارة
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-10">
        {stats.map(({ label, value, Icon }) => (
          <div key={label} className="card p-6 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-500/25">
              <Icon size={22} className="text-gold-400" aria-hidden="true" />
            </span>
            <div>
              <p className="text-2xl font-black text-cream">{value}</p>
              <p className="text-xs text-cream-dim">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
          <h2 className="font-bold">أحدث السيارات المضافة</h2>
          <Link href="/admin/cars" className="text-sm text-gold-300 hover:text-gold-200 flex items-center gap-1">
            كل السيارات
            <CaretLeft size={14} aria-hidden="true" />
          </Link>
        </div>
        <ul>
          {recent.map((car) => (
            <li key={car.id} className="flex items-center gap-4 border-b border-white/5 last:border-0 px-6 py-3.5">
              <span className="font-bold text-cream text-sm">{car.name}</span>
              <span className="text-xs text-cream-dim">{dict.categories[car.category]}</span>
              {car.featured && (
                <span className="rounded-full bg-gold-500/15 border border-gold-500/30 px-2.5 py-0.5 text-[10px] font-bold text-gold-300">
                  مميزة
                </span>
              )}
              <Link
                href={`/admin/cars/${car.id}`}
                className="ms-auto text-xs text-cream-dim hover:text-gold-300 transition-colors"
              >
                تعديل
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
