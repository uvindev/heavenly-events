import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { signJWT, comparePassword } from '@/lib/auth';
import { rateLimit } from '@/lib/rateLimit';

export const runtime = 'nodejs';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 attempts per 15 minutes per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rateLimitKey = `admin_login:${ip}`;
    const { success: allowed, remaining } = rateLimit(rateLimitKey, 5, 15 * 60 * 1000);

    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again in 15 minutes.' },
        { status: 429, headers: { 'X-RateLimit-Remaining': '0' } }
      );
    }

    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    const user = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (!user.isActive) {
      return NextResponse.json({ error: 'Account is deactivated. Contact your administrator.' }, { status: 403 });
    }

    const passwordValid = await comparePassword(password, user.passwordHash);
    if (!passwordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401, headers: { 'X-RateLimit-Remaining': String(remaining) } }
      );
    }

    // Generate JWT
    const token = signJWT({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Update last login
    await prisma.adminUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Build response
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        isActive: user.isActive,
        mustChangePassword: user.mustChangePassword,
        lastLoginAt: new Date(),
        createdAt: user.createdAt,
      },
    });

    // Set HttpOnly cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error instanceof Error ? error.message : error);
    console.error('Login error stack:', error instanceof Error ? error.stack : 'no stack');
    return NextResponse.json({ error: 'Internal server error', detail: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
