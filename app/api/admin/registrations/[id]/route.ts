import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requirePermission, isNextResponse } from '@/lib/adminAuth';

const updateRegistrationSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'APPROVED', 'REJECTED', 'CANCELLED']).optional(),
  checkedIn: z.boolean().optional(),
  reviewNotes: z.string().max(500).optional().nullable(),
}).partial();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = requirePermission(request, 'registrations:read');
  if (isNextResponse(authResult)) return authResult;

  const { id } = await params;

  try {
    const registration = await prisma.registration.findUnique({
      where: { id: parseInt(id) },
      include: {
        event: { select: { id: true, title: true, slug: true } },
      },
    });

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json({ registration });
  } catch (error) {
    console.error('Get registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = requirePermission(request, 'registrations:update');
  if (isNextResponse(authResult)) return authResult;

  const { id } = await params;

  try {
    const body = await request.json();
    const parsed = updateRegistrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const updateData: Record<string, unknown> = { ...data };

    // If checking in, set checkedInAt
    if (data.checkedIn === true) {
      updateData.checkedInAt = new Date();
    }

    // If approving/rejecting, set review info
    if (data.status === 'APPROVED' || data.status === 'REJECTED') {
      updateData.reviewedBy = authResult.id;
      updateData.reviewedAt = new Date();
    }

    const registration = await prisma.registration.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        event: { select: { id: true, title: true, slug: true } },
      },
    });

    return NextResponse.json({ registration });
  } catch (error) {
    console.error('Update registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = requirePermission(request, 'registrations:delete');
  if (isNextResponse(authResult)) return authResult;

  const { id } = await params;

  try {
    const registration = await prisma.registration.findUnique({
      where: { id: parseInt(id) },
    });

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    await prisma.registration.delete({ where: { id: parseInt(id) } });

    // Decrement registration count
    await prisma.event.update({
      where: { id: registration.eventId },
      data: { registrationCount: { decrement: 1 } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
