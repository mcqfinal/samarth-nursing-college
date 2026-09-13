import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, createSessionToken, setSessionCookie } from '@/lib/auth';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const defaultEmail = process.env.ADMIN_EMAIL || 'admin@samarthnursing.edu.in';
    const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';

    let admin = null;
    let isValid = false;

    try {
      admin = await prisma.admin.findUnique({
        where: { email: email.toLowerCase().trim() },
      });

      if (admin) {
        isValid = await verifyPassword(password, admin.passwordHash);
      }
    } catch (dbErr) {
      console.warn('Database query failed, checking environment fallback:', dbErr.message);
    }

    // Fallback authentication if database not connected yet or admin not in DB
    if (!isValid && email.toLowerCase().trim() === defaultEmail.toLowerCase().trim() && password === defaultPassword) {
      isValid = true;
      admin = {
        id: 'default-admin',
        email: defaultEmail,
        name: 'Samarth Administrator',
        role: 'superadmin',
      };
    }

    if (!isValid || !admin) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const token = createSessionToken({
      id: admin.id,
      email: admin.email,
      name: admin.name || 'Administrator',
      role: admin.role || 'admin',
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });

    setSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during login' },
      { status: 500 }
    );
  }
}
