import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requirePermission, isNextResponse } from '@/lib/adminAuth';
export const runtime = 'nodejs';

const checkinSchema = z.object({
  ticketId: z.string().min(1, 'Ticket ID is required'),
  eventId: z.number().int().positive().optional(),
});

export async function POST(request: NextRequest) {
  const authResult = requirePermission(request, 'registrations:checkin');
  if (isNextResponse(authResult)) return authResult;

  try {
    const body = await request.json();
    const parsed = checkinSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { ticketId, eventId } = parsed.data;

    const where: Record<string, unknown> = { ticketId };
    if (eventId) where.eventId = eventId;

    const registration = await prisma.registration.findFirst({
      where,
      include: {
        event: { select: { id: true, title: true } },
      },
    });

    if (!registration) {
      return NextResponse.json(
        { error: 'Ticket not found', type: 'not_found' },
        { status: 404 }
      );
    }

    if (registration.status === 'REJECTED' || registration.status === 'CANCELLED') {
      return NextResponse.json(
        { error: `Registration is ${registration.status.toLowerCase()}`, type: 'invalid_status' },
        { status: 400 }
      );
    }

    if (registration.checkedIn) {
      return NextResponse.json(
        {
          error: 'Already checked in',
          type: 'duplicate',
          registration: {
            fullName: registration.fullName,
            checkedInAt: registration.checkedInAt,
          },
        },
        { status: 409 }
      );
    }

    const updated = await prisma.registration.update({
      where: { id: registration.id },
      data: {
        checkedIn: true,
        checkedInAt: new Date(),
      },
      include: {
        event: { select: { id: true, title: true } },
      },
    });

    return NextResponse.json({
      success: true,
      type: 'success',
      registration: {
        id: updated.id,
        fullName: updated.fullName,
        ticketId: updated.ticketId,
        registrationType: updated.registrationType,
        checkedInAt: updated.checkedInAt,
        event: updated.event,
      },
    });
  } catch (error) {
    console.error('Check-in error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
