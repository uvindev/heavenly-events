import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const where: Record<string, unknown> = {
      status: "PUBLISHED",
    };

    if (category) {
      where.category = category;
    }

    if (status) {
      where.status = status;
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy: { eventDate: "asc" },
        take: Math.min(limit, 100),
        skip: offset,
        select: {
          id: true,
          slug: true,
          title: true,
          shortDesc: true,
          category: true,
          status: true,
          eventDate: true,
          eventEndDate: true,
          venueName: true,
          venueCity: true,
          coverImage: true,
          coverImageAlt: true,
          primaryColor: true,
          maxCapacity: true,
          registrationCount: true,
          registrationDeadline: true,
          isClientEvent: true,
          isPublic: true,
        },
      }),
      prisma.event.count({ where }),
    ]);

    return NextResponse.json(
      { events, total, limit, offset },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("GET /api/events error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
