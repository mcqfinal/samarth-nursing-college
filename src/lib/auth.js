import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'samarth_admin_session';
const SESSION_SECRET = process.env.SESSION_SECRET || 'samarth_nursing_secret_session_key_2026_default';

export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

export function createSessionToken(payload) {
  const data = JSON.stringify({
    ...payload,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  const dataB64 = Buffer.from(data).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(dataB64)
    .digest('base64url');
  return `${dataB64}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [dataB64, signature] = parts;
  const expectedSignature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(dataB64)
    .digest('base64url');

  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(dataB64, 'base64url').toString('utf8'));
    if (payload.exp && payload.exp < Date.now()) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export function setSessionCookie(response, token) {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  });
}

export function clearSessionCookie(response) {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}
