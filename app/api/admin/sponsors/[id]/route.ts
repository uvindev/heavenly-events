import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requirePermission, isNextResponse } from '@/lib/adminAuth';

const updateSponsorSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  logoUrl: z.string().min(1).max(500).optional(),
  logoAlt: z.string().min(1).max(255).optional(),
  websiteUrl: z.string().max(500).optional().nullable(),
  tier: z.enum(['PLATINUM', 'GOLD', 'SILVER', 'STANDARD']).optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  description: z.string().max(500).optional().nullable(),
}).partial();

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = requirePermission(request, 'sponsors:update');
  if (isNextResponse(authResult)) return authResult;

  const { id } = await params;

  try {
    const body = await request.json();
    const parsed = updateSponsorSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const sponsor = await prisma.sponsor.update({
      where: { id: parseInt(id) },
      data: parsed.data,
    });

    return NextResponse.json({ sponsor });
  } catch (error) {
    console.error('Update sponsor error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = requirePermission(request, 'sponsors:delete');
  if (isNextResponse(authResult)) return authResult;

  const { id } = await params;

  try {
    // Delete related event_sponsors first
    await prisma.eventSponsor.deleteMany({ where: { sponsorId: parseInt(id) } });
    await prisma.sponsor.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete sponsor error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
