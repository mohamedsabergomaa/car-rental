// ---------------------------------------------------------------------------
// Edge-safe session verification (Web Crypto) — used by middleware.js only.
// The Node-runtime version lives in auth.js.
// ---------------------------------------------------------------------------
export const ADMIN_COOKIE = 'lemosine_admin';

const encoder = new TextEncoder();

function base64urlToBytes(s) {
  const base64 = s.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

function bytesToBase64url(bytes) {
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function verifySessionTokenEdge(token) {
  if (!token || typeof token !== 'string') return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const secret = process.env.ADMIN_SESSION_SECRET || 'dev-only-insecure-secret';
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const expected = bytesToBase64url(new Uint8Array(sig));

  if (!timingSafeEqual(base64urlToBytes(signature), base64urlToBytes(expected))) return false;
  const expiry = Number(payload);
  return Number.isFinite(expiry) && expiry > Date.now();
}
