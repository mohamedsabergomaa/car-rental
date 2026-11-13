import { NextResponse } from 'next/server';
import { isValidSession } from '@/lib/auth';
import { getSettings, saveSettings } from '@/lib/store';
import { validateSettings } from '@/lib/validation';

export const runtime = 'nodejs';

export async function PUT(request) {
  if (!(await isValidSession())) {
    return NextResponse.json({ error: 'غير مصرح.' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'طلب غير صالح.' }, { status: 400 });
  }

  const result = validateSettings(body);
  if (!result.ok) return NextResponse.json({ errors: result.errors }, { status: 422 });

  saveSettings({ ...getSettings(), ...result.settings });
  return NextResponse.json({ ok: true });
}
