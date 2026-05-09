import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@crudify.co.id';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'securepassword';

// Cache the token — it's valid 72 hours
let cachedToken: string | null = null;

async function getToken(): Promise<string> {
  if (cachedToken) return cachedToken;
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error('CMS auth failed');
  cachedToken = json.data.token;
  return cachedToken as string;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validate
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const token = await getToken();

    const res = await fetch(`${BASE_URL}/api/cp_inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject?.trim() || '(No subject)',
        message: message.trim(),
        status: 'new',
      }),
    });

    if (!res.ok) {
      // Token may have expired — clear cache and retry once
      cachedToken = null;
      const token2 = await getToken();
      const retry = await fetch(`${BASE_URL}/api/cp_inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token2}` },
        body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), subject: subject?.trim() || '(No subject)', message: message.trim(), status: 'new' }),
      });
      if (!retry.ok) throw new Error('Failed to save inquiry');
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact]', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
