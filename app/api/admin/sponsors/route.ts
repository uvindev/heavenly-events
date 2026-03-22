import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requirePermission, isNextResponse } from '@/lib/adminAuth';

const createSponsorSchema = z.object({
  name: z.string().min(1).max(255),
  logoUrl: z.string().min(1).max(500),
  logoAlt: z.string().min(1).max(255),
  websiteUrl: z.string().max(500).optional().nullable(),
  tier: z.enum(['PLATINUM', 'GOLD', 'SILVER', 'STANDARD']).default('STANDARD'),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
  description: z.string().max(500).optional().nullable(),
});

export async function GET(request: NextRequest) {
  const authResult = requirePermission(request, 'sponsors:read');
  if (isNextResponse(authResult)) return authResult;

  try {
    const sponsors = await prisma.sponsor.findMany({
      orderBy: [{ tier: 'asc' }, { sortOrder: 'asc' }],
      include: {
        _count: { select: { eventSponsors: true } },
      },
    });

    return NextResponse.json({ sponsors });
  } catch (error) {
    console.error('Get sponsors error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authResult = requirePermission(request, 'sponsors:create');
  if (isNextResponse(authResult)) return authResult;

  try {
    const body = await request.json();
    const parsed = createSponsorSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const sponsor = await prisma.sponsor.create({
      data: parsed.data,
    });

    return NextResponse.json({ sponsor }, { status: 201 });
  } catch (error) {
    console.error('Create sponsor error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
