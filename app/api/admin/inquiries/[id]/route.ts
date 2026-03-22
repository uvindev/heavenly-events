import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requirePermission, isNextResponse } from '@/lib/adminAuth';

const updateInquirySchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'QUOTED', 'CONFIRMED', 'CLOSED']),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = requirePermission(request, 'inquiries:update');
  if (isNextResponse(authResult)) return authResult;

  const { id } = await params;

  try {
    const body = await request.json();
    const parsed = updateInquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.update({
      where: { id: parseInt(id) },
      data: { status: parsed.data.status },
    });

    return NextResponse.json({ inquiry });
  } catch (error) {
    console.error('Update inquiry error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
