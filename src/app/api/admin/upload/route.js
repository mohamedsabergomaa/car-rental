import { NextResponse } from 'next/server';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs/promises';
import { isValidSession } from '@/lib/auth';
import { getCfEnv } from '@/lib/cf-env';

export const runtime = 'nodejs';

const ALLOWED_TYPES = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' };
const MAX_SIZE = 4 * 1024 * 1024; // 4 MB

export async function POST(request) {
  if (!(await isValidSession())) {
    return NextResponse.json({ error: 'غير مصرح.' }, { status: 401 });
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'طلب غير صالح.' }, { status: 400 });
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'لم يتم إرسال ملف.' }, { status: 400 });
  }
  if (!ALLOWED_TYPES[file.type]) {
    return NextResponse.json({ error: 'صيغة غير مدعومة (المسموح: JPG, PNG, WebP).' }, { status: 415 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'حجم الملف يتجاوز 4 ميجابايت.' }, { status: 413 });
  }

  const ext = ALLOWED_TYPES[file.type];
  const name = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${ext}`;

  // Cloudflare R2 ( Workers deployment ) — images are served via /api/media/<key>
  const r2 = (await getCfEnv())?.LEMOSINE_UPLOADS;
  if (r2) {
    const key = `uploads/${name}`;
    try {
      await r2.put(key, await file.arrayBuffer(), {
        httpMetadata: { contentType: file.type },
      });
      return NextResponse.json({ ok: true, path: `/api/media/${key}` }, { status: 201 });
    } catch {
      return NextResponse.json(
        { error: 'تعذّر رفع الصورة إلى التخزين السحابي.' },
        { status: 503 }
      );
    }
  }

  // Local / VPS fallback — write into public/uploads
  try {
    const dir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
    return NextResponse.json({ ok: true, path: `/uploads/${name}` }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'التخزين غير متوفر على هذا الخادم — لا يمكن رفع الصور.' },
      { status: 503 }
    );
  }
}
