import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const limit = parseInt(searchParams.get("limit") || "6", 10);

    const events = await prisma.event.findMany({
      where: {
        status: "PUBLISHED",
        eventDate: { gt: new Date() },
      },
      orderBy: { eventDate: "asc" },
      take: Math.min(limit, 20),
      select: {
        id: true,
        slug: true,
        title: true,
        shortDesc: true,
        category: true,
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
      },
    });

    return NextResponse.json(
      { events },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("GET /api/events/upcoming error:", error);
    return NextResponse.json(
      { error: "Failed to fetch upcoming events" },
      { status: 500 }
    );
  }
}
