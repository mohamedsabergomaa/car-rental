import { NextResponse } from 'next/server';
import { isValidSession } from '@/lib/auth';
import { deleteCar, getCar, saveCar } from '@/lib/store';
import { validateCar } from '@/lib/validation';

export const runtime = 'nodejs';

async function guard() {
  if (!(await isValidSession())) {
    return NextResponse.json({ error: 'غير مصرح.' }, { status: 401 });
  }
  return null;
}

export async function PUT(request, { params }) {
  const denied = await guard();
  if (denied) return denied;

  const { id } = await params;
  const existing = getCar(id);
  if (!existing) return NextResponse.json({ error: 'السيارة غير موجودة.' }, { status: 404 });

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'طلب غير صالح.' }, { status: 400 });
  }

  const result = validateCar({ ...body, id }); // id cannot be changed while editing
  if (!result.ok) return NextResponse.json({ errors: result.errors }, { status: 422 });

  saveCar(result.car);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request, { params }) {
  const denied = await guard();
  if (denied) return denied;

  const { id } = await params;
  const deleted = deleteCar(id);
  if (!deleted) return NextResponse.json({ error: 'السيارة غير موجودة.' }, { status: 404 });

  return NextResponse.json({ ok: true });
}
