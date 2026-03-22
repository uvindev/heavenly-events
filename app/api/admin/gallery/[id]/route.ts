import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requirePermission, isNextResponse } from '@/lib/adminAuth';
export const runtime = 'nodejs';

const updateGallerySchema = z.object({
  altText: z.string().min(1).max(255).optional(),
  caption: z.string().max(500).optional().nullable(),
  category: z.enum(['CORPORATE', 'WEDDING', 'BIRTHDAY', 'CONCERT', 'PRIVATE', 'GALA', 'BEHIND_SCENES']).optional(),
  featured: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  eventId: z.number().int().optional().nullable(),
}).partial();

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = requirePermission(request, 'gallery:update');
  if (isNextResponse(authResult)) return authResult;

  const { id } = await params;

  try {
    const body = await request.json();
    const parsed = updateGallerySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const item = await prisma.galleryItem.update({
      where: { id: parseInt(id) },
      data: parsed.data,
    });

    return NextResponse.json({ item });
  } catch (error) {
    console.error('Update gallery item error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = requirePermission(request, 'gallery:delete');
  if (isNextResponse(authResult)) return authResult;

  const { id } = await params;

  try {
    await prisma.galleryItem.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
