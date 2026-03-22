import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const eventId = searchParams.get("eventId");
    const limit = parseInt(searchParams.get("limit") || "30", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const where: Record<string, unknown> = {};

    if (category) {
      where.category = category;
    }

    if (featured === "true") {
      where.featured = true;
    }

    if (eventId) {
      const parsedEventId = parseInt(eventId, 10);
      if (!isNaN(parsedEventId)) {
        where.eventId = parsedEventId;
      }
    }

    const [items, total] = await Promise.all([
      prisma.galleryItem.findMany({
        where,
        orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
        take: Math.min(limit, 100),
        skip: offset,
      }),
      prisma.galleryItem.count({ where }),
    ]);

    return NextResponse.json(
      { items, total, limit, offset },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("GET /api/gallery error:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery items" },
      { status: 500 }
    );
  }
}
