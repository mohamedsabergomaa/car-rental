'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LockKey } from '@phosphor-icons/react/dist/ssr';

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!password) return setError('الرجاء إدخال كلمة المرور.');
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'فشل تسجيل الدخول.');
        setLoading(false);
      }
    } catch {
      setError('تعذر الاتصال بالخادم.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card w-full max-w-sm p-8" noValidate>
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/10 border border-gold-500/30">
        <LockKey size={26} className="text-gold-400" aria-hidden="true" />
      </div>
      <h1 className="text-center text-xl font-bold">لوحة تحكم LEMOSINE</h1>
      <p className="mt-2 text-center text-sm text-cream-dim">أدخل كلمة مرور الإدارة للمتابعة</p>

      <div className="mt-7">
        <label htmlFor="admin-password" className="field-label">كلمة المرور</label>
        <input
          id="admin-password"
          type="password"
          className="field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          autoFocus
          required
        />
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-gold mt-6 w-full" disabled={loading}>
        {loading ? 'جارٍ التحقق…' : 'تسجيل الدخول'}
      </button>
    </form>
  );
}
