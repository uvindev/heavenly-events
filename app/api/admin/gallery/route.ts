import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requirePermission, isNextResponse } from '@/lib/adminAuth';

const createGallerySchema = z.object({
  filename: z.string().min(1).max(500),
  altText: z.string().min(1).max(255),
  caption: z.string().max(500).optional().nullable(),
  category: z.enum(['CORPORATE', 'WEDDING', 'BIRTHDAY', 'CONCERT', 'PRIVATE', 'GALA', 'BEHIND_SCENES']),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
  width: z.number().int().optional().nullable(),
  height: z.number().int().optional().nullable(),
  eventId: z.number().int().optional().nullable(),
});

export async function GET(request: NextRequest) {
  const authResult = requirePermission(request, 'gallery:read');
  if (isNextResponse(authResult)) return authResult;

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const eventId = searchParams.get('eventId');
    const featured = searchParams.get('featured');

    const where: Record<string, unknown> = {};
    if (category) where.category = category;
    if (eventId) where.eventId = parseInt(eventId);
    if (featured === 'true') where.featured = true;

    const items = await prisma.galleryItem.findMany({
      where,
      include: {
        event: { select: { id: true, title: true } },
      },
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Get gallery error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authResult = requirePermission(request, 'gallery:create');
  if (isNextResponse(authResult)) return authResult;

  try {
    // Check content type for file upload vs JSON
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const body = await request.json();
      const parsed = createGallerySchema.safeParse(body);

      if (!parsed.success) {
        return NextResponse.json(
          { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
          { status: 400 }
        );
      }

      const item = await prisma.galleryItem.create({
        data: parsed.data,
      });

      return NextResponse.json({ item }, { status: 201 });
    }

    // Handle multipart file upload
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const altText = formData.get('altText') as string || 'Gallery image';
    const category = formData.get('category') as string || 'CORPORATE';
    const eventId = formData.get('eventId') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // In production, you would save the file to disk/cloud storage
    // For now, we create the DB record with a placeholder path
    const filename = `/uploads/gallery/${Date.now()}-${file.name}`;

    const item = await prisma.galleryItem.create({
      data: {
        filename,
        altText,
        category: category as 'CORPORATE' | 'WEDDING' | 'BIRTHDAY' | 'CONCERT' | 'PRIVATE' | 'GALA' | 'BEHIND_SCENES',
        eventId: eventId ? parseInt(eventId) : null,
      },
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error('Create gallery item error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
