// ---------------------------------------------------------------------------
// LEMOSINE — admin auth
// Password + session secret live ONLY in environment variables (.env).
// Sessions are HMAC-signed tokens stored in an httpOnly cookie.
// ---------------------------------------------------------------------------
import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'lemosine_admin';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || 'dev-only-insecure-secret';
}

function sign(payload) {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

export function createSessionToken() {
  const payload = String(Date.now() + SESSION_TTL_MS);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  const expiry = Number(payload);
  return Number.isFinite(expiry) && expiry > Date.now();
}

export function checkPassword(password) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false; // refuse login when no password is configured
  const a = Buffer.from(String(password || ''));
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export const ADMIN_COOKIE = COOKIE_NAME;
export const ADMIN_COOKIE_MAX_AGE = SESSION_TTL_MS / 1000;

export async function isValidSession() {
  const store = await cookies();
  return verifySessionToken(store.get(COOKIE_NAME)?.value);
}

// Simple in-memory rate limit for login attempts (per server process).
const attempts = new Map();
export function isLoginBlocked(ip) {
  const entry = attempts.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.first > 10 * 60 * 1000) {
    attempts.delete(ip);
    return false;
  }
  return entry.count >= 8;
}
export function recordLoginAttempt(ip, success) {
  if (success) {
    attempts.delete(ip);
    return;
  }
  const entry = attempts.get(ip);
  if (!entry || Date.now() - entry.first > 10 * 60 * 1000) {
    attempts.set(ip, { first: Date.now(), count: 1 });
  } else {
    entry.count += 1;
  }
}
