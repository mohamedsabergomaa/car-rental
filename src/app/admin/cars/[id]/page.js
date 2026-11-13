import { redirect } from 'next/navigation';
import { isValidSession } from '@/lib/auth';
import { getCar } from '@/lib/store';
import CarForm from '@/components/admin/CarForm';
import AdminNotFound from './not-found';

export const metadata = {
  title: 'تعديل سيارة',
  robots: { index: false, follow: false },
};

export default async function EditCarPage({ params }) {
  if (!(await isValidSession())) redirect('/admin/login');

  const { id } = await params;
  const car = getCar(id);
  if (!car) return <AdminNotFound />;

  return (
    <div>
      <h1 className="text-2xl font-black tracking-tight mb-2">تعديل: {car.name}</h1>
      <p className="text-sm text-cream-dim mb-8" dir="ltr">
        /cars/{car.id}
      </p>
      <CarForm car={car} />
    </div>
  );
}
