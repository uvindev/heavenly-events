import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requirePermission, isNextResponse } from '@/lib/adminAuth';
export const runtime = 'nodejs';

const updateEventSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  slug: z.string().min(1).max(255).optional(),
  description: z.string().min(1).optional(),
  shortDesc: z.string().max(500).optional().nullable(),
  category: z.enum([
    'CORPORATE', 'WEDDING', 'BIRTHDAY', 'CONCERT', 'PRIVATE', 'GALA',
    'CONFERENCE', 'CULTURAL', 'CLIENT_EVENT', 'EDUCATION_FAIR', 'TRADE_EXPO',
    'HEALTH_EXPO', 'WEDDING_SHOW', 'OTHER',
  ]).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'COMPLETED', 'CANCELLED']).optional(),
  isClientEvent: z.boolean().optional(),
  clientName: z.string().max(255).optional().nullable(),
  facebookUrl: z.string().max(500).optional().nullable(),
  eventDate: z.string().optional(),
  eventEndDate: z.string().optional().nullable(),
  doorsOpenTime: z.string().optional().nullable(),
  registrationDeadline: z.string().optional().nullable(),
  maxCapacity: z.number().int().positive().optional().nullable(),
  requiresApproval: z.boolean().optional(),
  venueName: z.string().min(1).max(255).optional(),
  venueAddress: z.string().min(1).max(500).optional(),
  venueCity: z.string().min(1).max(100).optional(),
  googleMapsUrl: z.string().max(1000).optional().nullable(),
  googleMapsEmbed: z.string().max(2000).optional().nullable(),
  primaryColor: z.string().max(7).optional().nullable(),
  secondaryColor: z.string().max(7).optional().nullable(),
  accentColor: z.string().max(7).optional().nullable(),
  metaTitle: z.string().max(70).optional().nullable(),
  metaDesc: z.string().max(160).optional().nullable(),
}).partial();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = requirePermission(request, 'events:read');
  if (isNextResponse(authResult)) return authResult;

  const { id } = await params;

  try {
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
      include: {
        schedule: { orderBy: { sortOrder: 'asc' } },
        _count: { select: { registrations: true, galleryItems: true } },
      },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.error('Get event error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = requirePermission(request, 'events:update');
  if (isNextResponse(authResult)) return authResult;

  const { id } = await params;

  try {
    const body = await request.json();
    const parsed = updateEventSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const updateData: Record<string, unknown> = { ...data };

    // Convert date strings to Date objects
    if (data.eventDate) updateData.eventDate = new Date(data.eventDate);
    if (data.eventEndDate) updateData.eventEndDate = new Date(data.eventEndDate);
    if (data.doorsOpenTime) updateData.doorsOpenTime = new Date(data.doorsOpenTime);
    if (data.registrationDeadline) updateData.registrationDeadline = new Date(data.registrationDeadline);

    // Set publishedAt when publishing
    if (data.status === 'PUBLISHED') {
      const existing = await prisma.event.findUnique({ where: { id: parseInt(id) } });
      if (existing && !existing.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    const event = await prisma.event.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return NextResponse.json({ event });
  } catch (error) {
    console.error('Update event error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = requirePermission(request, 'events:delete');
  if (isNextResponse(authResult)) return authResult;

  const { id } = await params;

  try {
    await prisma.event.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete event error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
