import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, ADMIN_COOKIE_MAX_AGE, checkPassword, createSessionToken, isLoginBlocked, recordLoginAttempt } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';

  if (isLoginBlocked(ip)) {
    return NextResponse.json(
      { error: 'محاولات كثيرة. انتظر 10 دقائق ثم أعد المحاولة.' },
      { status: 429 }
    );
  }

  let password = '';
  try {
    const body = await request.json();
    password = String(body?.password ?? '');
  } catch {
    return NextResponse.json({ error: 'طلب غير صالح.' }, { status: 400 });
  }

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: 'لم يتم ضبط ADMIN_PASSWORD في ملف البيئة.' },
      { status: 500 }
    );
  }

  const ok = checkPassword(password);
  recordLoginAttempt(ip, ok);

  if (!ok) {
    return NextResponse.json({ error: 'كلمة المرور غير صحيحة.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  return response;
}
