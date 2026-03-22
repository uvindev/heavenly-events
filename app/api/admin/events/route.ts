import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requirePermission, isNextResponse } from '@/lib/adminAuth';
export const runtime = 'nodejs';

const createEventSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  description: z.string().min(1),
  shortDesc: z.string().max(500).optional().nullable(),
  category: z.enum([
    'CORPORATE', 'WEDDING', 'BIRTHDAY', 'CONCERT', 'PRIVATE', 'GALA',
    'CONFERENCE', 'CULTURAL', 'CLIENT_EVENT', 'EDUCATION_FAIR', 'TRADE_EXPO',
    'HEALTH_EXPO', 'WEDDING_SHOW', 'OTHER',
  ]),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
  isClientEvent: z.boolean().default(false),
  clientName: z.string().max(255).optional().nullable(),
  facebookUrl: z.string().max(500).optional().nullable(),
  eventDate: z.string().min(1),
  eventEndDate: z.string().optional().nullable(),
  doorsOpenTime: z.string().optional().nullable(),
  registrationDeadline: z.string().optional().nullable(),
  maxCapacity: z.number().int().positive().optional().nullable(),
  requiresApproval: z.boolean().default(false),
  venueName: z.string().min(1).max(255),
  venueAddress: z.string().min(1).max(500),
  venueCity: z.string().min(1).max(100),
  googleMapsUrl: z.string().max(1000).optional().nullable(),
  googleMapsEmbed: z.string().max(2000).optional().nullable(),
  primaryColor: z.string().max(7).optional().nullable(),
  secondaryColor: z.string().max(7).optional().nullable(),
  accentColor: z.string().max(7).optional().nullable(),
  metaTitle: z.string().max(70).optional().nullable(),
  metaDesc: z.string().max(160).optional().nullable(),
  schedule: z.array(z.object({
    time: z.string(),
    title: z.string(),
    description: z.string().optional(),
  })).optional(),
});

export async function GET(request: NextRequest) {
  const authResult = requirePermission(request, 'events:read');
  if (isNextResponse(authResult)) return authResult;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (category) where.category = category;

    const events = await prisma.event.findMany({
      where,
      orderBy: { eventDate: 'desc' },
      include: {
        _count: { select: { registrations: true } },
      },
    });

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Get events error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authResult = requirePermission(request, 'events:create');
  if (isNextResponse(authResult)) return authResult;

  try {
    const body = await request.json();
    const parsed = createEventSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { schedule, ...eventData } = parsed.data;

    // Check slug uniqueness
    const existing = await prisma.event.findUnique({ where: { slug: eventData.slug } });
    if (existing) {
      return NextResponse.json({ error: 'An event with this slug already exists' }, { status: 409 });
    }

    const event = await prisma.event.create({
      data: {
        ...eventData,
        eventDate: new Date(eventData.eventDate),
        eventEndDate: eventData.eventEndDate ? new Date(eventData.eventEndDate) : null,
        doorsOpenTime: eventData.doorsOpenTime ? new Date(eventData.doorsOpenTime) : null,
        registrationDeadline: eventData.registrationDeadline ? new Date(eventData.registrationDeadline) : null,
        publishedAt: eventData.status === 'PUBLISHED' ? new Date() : null,
        schedule: schedule
          ? {
              create: schedule.map((item, index) => ({
                time: item.time,
                title: item.title,
                description: item.description || null,
                sortOrder: index,
              })),
            }
          : undefined,
      },
      include: { schedule: true },
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error('Create event error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
