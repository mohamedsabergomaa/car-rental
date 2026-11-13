import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, isValidSession } from '@/lib/auth';
import { getCar, saveCar } from '@/lib/store';
import { validateCar } from '@/lib/validation';

export const runtime = 'nodejs';

export async function POST(request) {
  if (!(await isValidSession())) {
    return NextResponse.json({ error: 'غير مصرح.' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'طلب غير صالح.' }, { status: 400 });
  }

  const result = validateCar(body);
  if (!result.ok) return NextResponse.json({ errors: result.errors }, { status: 422 });

  const existing = await getCar(result.car.id);
  if (existing) {
    return NextResponse.json(
      { errors: ['المعرّف (ID) مستخدم بالفعل — اختر معرّفاً آخر.'] },
      { status: 409 }
    );
  }

  try {
    await saveCar(result.car);
  } catch (err) {
    if (err?.message === 'STORAGE_UNAVAILABLE') {
      return NextResponse.json(
        { errors: ['التخزين غير متوفر على هذا الخادم — لا يمكن حفظ التعديلات.'] },
        { status: 503 }
      );
    }
    throw err;
  }
  return NextResponse.json({ ok: true, id: result.car.id }, { status: 201 });
}
