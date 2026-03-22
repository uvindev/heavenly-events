import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export const runtime = 'nodejs';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const event = await prisma.event.findUnique({
      where: { slug },
      include: {
        schedule: {
          orderBy: { sortOrder: "asc" },
        },
        eventSponsors: {
          include: {
            sponsor: true,
          },
        },
      },
    });

    if (!event || event.status !== "PUBLISHED") {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { event },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("GET /api/events/[slug] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}
