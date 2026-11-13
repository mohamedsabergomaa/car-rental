import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, verifySessionTokenEdge } from '@/lib/auth-edge';

// Cheap edge check for /admin pages: bounce to login when no valid session
// cookie is present. (Full verification also happens server-side in every
// admin page and API route.)
export async function middleware(request) {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!(await verifySessionTokenEdge(token))) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    url.search = '';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/((?!login).*)'],
};
