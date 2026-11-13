import { redirect } from 'next/navigation';
import { isValidSession } from '@/lib/auth';
import LoginForm from '@/components/admin/LoginForm';

export const metadata = {
  title: 'تسجيل الدخول',
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isValidSession()) redirect('/admin');

  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-5">
      <LoginForm />
    </div>
  );
}
