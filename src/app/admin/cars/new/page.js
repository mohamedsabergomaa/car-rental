import { redirect } from 'next/navigation';
import { isValidSession } from '@/lib/auth';
import CarForm from '@/components/admin/CarForm';

export const metadata = {
  title: 'إضافة سيارة',
  robots: { index: false, follow: false },
};

export default async function NewCarPage() {
  if (!(await isValidSession())) redirect('/admin/login');

  return (
    <div>
      <h1 className="text-2xl font-black tracking-tight mb-8">إضافة سيارة جديدة</h1>
      <CarForm />
    </div>
  );
}
