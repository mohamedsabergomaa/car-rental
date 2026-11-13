import Link from 'next/link';

export default function AdminNotFound() {
  return (
    <div className="card p-10 text-center">
      <p className="text-lg font-bold">السيارة غير موجودة</p>
      <Link href="/admin/cars" className="btn btn-gold mt-6">العودة لقائمة السيارات</Link>
    </div>
  );
}
