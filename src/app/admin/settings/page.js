import { redirect } from 'next/navigation';
import { isValidSession } from '@/lib/auth';
import { getSettings } from '@/lib/store';
import SettingsForm from '@/components/admin/SettingsForm';

export const metadata = {
  title: 'الإعدادات',
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  if (!(await isValidSession())) redirect('/admin/login');
  const settings = await getSettings();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-black tracking-tight mb-1">الإعدادات</h1>
      <p className="text-sm text-cream-dim mb-8">
        معلومات التواصل، حسابات التواصل الاجتماعي، ونصوص الواجهة الرئيسية — تظهر مباشرة في الموقع بعد الحفظ.
      </p>
      <SettingsForm settings={settings} />
    </div>
  );
}
