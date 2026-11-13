import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Plus } from '@phosphor-icons/react/dist/ssr';
import { isValidSession } from '@/lib/auth';
import { getCars } from '@/lib/store';
import CarManager from '@/components/admin/CarManager';

export const metadata = {
  title: 'إدارة السيارات',
  robots: { index: false, follow: false },
};

export default async function AdminCarsPage() {
  if (!(await isValidSession())) redirect('/admin/login');
  const cars = await getCars();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight">إدارة السيارات</h1>
          <p className="mt-1 text-sm text-cream-dim">{cars.length} سيارة في الأسطول</p>
        </div>
        <Link href="/admin/cars/new" className="btn btn-gold !py-2.5 text-sm">
          <Plus size={16} aria-hidden="true" />
          إضافة سيارة
        </Link>
      </div>

      <CarManager initialCars={cars} />
    </div>
  );
}
