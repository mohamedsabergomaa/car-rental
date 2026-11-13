// ---------------------------------------------------------------------------
// Serves images uploaded to Cloudflare R2 at /api/media/uploads/<name>.
// Local uploads (public/uploads) are static files and never hit this route.
// ---------------------------------------------------------------------------
import { NextResponse } from 'next/server';
import { getCfEnv } from '@/lib/cf-env';

export const runtime = 'nodejs';

export async function GET(_request, { params }) {
  const { key } = await params;
  const r2 = (await getCfEnv())?.LEMOSINE_UPLOADS;
  if (!r2) return new NextResponse(null, { status: 404 });

  const object = await r2.get(key.join('/'));
  if (!object) return new NextResponse(null, { status: 404 });

  const headers = new Headers();
  headers.set('Content-Type', object.httpMetadata?.contentType || 'application/octet-stream');
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('Content-Length', String(object.size));
  return new NextResponse(object.body, { status: 200, headers });
}
