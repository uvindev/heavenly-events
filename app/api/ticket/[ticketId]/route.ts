import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  try {
    const { ticketId } = await params;

    const registration = await prisma.registration.findUnique({
      where: { ticketId },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            eventDate: true,
            eventEndDate: true,
            venueName: true,
            venueAddress: true,
            venueCity: true,
            primaryColor: true,
            coverImage: true,
            googleMapsUrl: true,
          },
        },
      },
    });

    if (!registration) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      registration: {
        ticketId: registration.ticketId,
        fullName: registration.fullName,
        email: registration.email,
        phone: registration.phone,
        registrationType: registration.registrationType,
        status: registration.status,
        companyName: registration.companyName,
        qrCode: registration.qrCode,
        checkedIn: registration.checkedIn,
        checkedInAt: registration.checkedInAt,
        createdAt: registration.createdAt,
      },
      event: registration.event,
    });
  } catch (error) {
    console.error("GET /api/ticket/[ticketId] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch ticket" },
      { status: 500 }
    );
  }
}
