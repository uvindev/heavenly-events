import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requireRole, isNextResponse } from '@/lib/adminAuth';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const authResult = requireRole(request, ['SUPER_ADMIN']);
  if (isNextResponse(authResult)) return authResult;

  try {
    const settings = await prisma.siteSetting.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach((s: { key: string; value: string }) => {
      settingsMap[s.key] = s.value;
    });

    return NextResponse.json({ settings: settingsMap });
  } catch (error) {
    console.error('Get settings error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

const updateSettingsSchema = z.record(z.string(), z.string());

export async function PUT(request: NextRequest) {
  const authResult = requireRole(request, ['SUPER_ADMIN']);
  if (isNextResponse(authResult)) return authResult;

  try {
    const body = await request.json();
    const parsed = updateSettingsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed: expected key-value pairs of strings' },
        { status: 400 }
      );
    }

    const settings = parsed.data;

    // Upsert each setting
    await Promise.all(
      Object.entries(settings).map(([key, value]) =>
        prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
