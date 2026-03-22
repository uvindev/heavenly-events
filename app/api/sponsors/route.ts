import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export const runtime = 'nodejs';
const SPONSOR_TIERS = ["PLATINUM", "GOLD", "SILVER", "BRONZE"] as const;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const eventId = searchParams.get("eventId");

    if (eventId) {
      const parsedEventId = parseInt(eventId, 10);
      if (isNaN(parsedEventId)) {
        return NextResponse.json(
          { error: "Invalid eventId" },
          { status: 400 }
        );
      }

      const eventSponsors = await prisma.eventSponsor.findMany({
        where: { eventId: parsedEventId },
        include: {
          sponsor: true,
        },
        orderBy: { sponsor: { sortOrder: "asc" } },
      });

      // Group by tier
      const grouped: Record<string, typeof eventSponsors> = {};
      for (const tier of SPONSOR_TIERS) {
        const tierSponsors = eventSponsors.filter((es: { tier: string }) => es.tier === tier);
        if (tierSponsors.length > 0) {
          grouped[tier] = tierSponsors;
        }
      }

      return NextResponse.json(
        { sponsors: grouped },
        {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        }
      );
    }

    // Return all active sponsors grouped by tier
    const sponsors = await prisma.sponsor.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });

    const grouped: Record<string, typeof sponsors> = {};
    for (const tier of SPONSOR_TIERS) {
      const tierSponsors = sponsors.filter((s: { tier: string }) => s.tier === tier);
      if (tierSponsors.length > 0) {
        grouped[tier] = tierSponsors;
      }
    }

    return NextResponse.json(
      { sponsors: grouped },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("GET /api/sponsors error:", error);
    return NextResponse.json(
      { error: "Failed to fetch sponsors" },
      { status: 500 }
    );
  }
}
