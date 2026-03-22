import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { generateTicketQR } from "@/lib/qr";
import { sendVisitorConfirmationEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rateLimit";

const visitorSchema = z.object({
  eventId: z.number().int().positive(),
  fullName: z.string().min(2).max(255),
  email: z.string().email().max(255),
  phone: z.string().min(9, "Invalid phone number").max(20),
  formResponses: z.record(z.string(), z.unknown()).optional(),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  fbclid: z.string().max(255).optional(),
  gclid: z.string().max(255).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rateLimitResult = rateLimit(`visitor-register:${ip}`, 5, 10 * 60 * 1000);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many registration attempts. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validation = visitorSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Check if event exists in DB (optional — events may be mock data)
    const event = await prisma.event.findUnique({
      where: { id: data.eventId },
    });

    if (event) {
      // Check registration deadline
      if (event.registrationDeadline && new Date() > event.registrationDeadline) {
        return NextResponse.json(
          { error: "Registration deadline has passed" },
          { status: 400 }
        );
      }

      // Check capacity
      if (event.maxCapacity && event.registrationCount >= event.maxCapacity) {
        return NextResponse.json(
          { error: "Event has reached maximum capacity" },
          { status: 400 }
        );
      }
    }

    // Check duplicate registration (same email + eventId)
    const existing = await prisma.registration.findFirst({
      where: {
        email: data.email,
        eventId: data.eventId,
        registrationType: "VISITOR",
      },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        ticketId: existing.ticketId,
        message: "You are already registered for this event.",
      });
    }

    // Ensure event exists in DB (create stub if needed for FK constraint)
    if (!event) {
      await prisma.event.create({
        data: {
          id: data.eventId,
          slug: `event-${data.eventId}`,
          title: `Event ${data.eventId}`,
          description: '',
          category: 'OTHER',
          status: 'PUBLISHED',
          eventDate: new Date(),
          venueName: 'TBA',
          venueAddress: 'TBA',
          venueCity: 'Colombo',
        },
      }).catch(() => {
        // Event may already exist from another request
      });
    }

    // Create registration
    const registration = await prisma.registration.create({
      data: {
        eventId: data.eventId,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        registrationType: "VISITOR",
        status: "CONFIRMED",
        formResponses: data.formResponses ? JSON.parse(JSON.stringify(data.formResponses)) : undefined,
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
        fbclid: data.fbclid,
        gclid: data.gclid,
        ipAddress: ip,
        userAgent: request.headers.get("user-agent")?.substring(0, 500) || null,
        referrer: request.headers.get("referer")?.substring(0, 500) || null,
      },
    });

    // Generate QR code
    const qrPayload = JSON.stringify({
      ticketId: registration.ticketId,
      eventId: data.eventId,
      type: "V",
    });
    const qrCode = await generateTicketQR(qrPayload);

    // Save QR code and increment registration count
    const updatePromises: Promise<unknown>[] = [
      prisma.registration.update({
        where: { id: registration.id },
        data: { qrCode },
      }),
    ];
    if (event) {
      updatePromises.push(
        prisma.event.update({
          where: { id: data.eventId },
          data: { registrationCount: { increment: 1 } },
        })
      );
    }
    await Promise.all(updatePromises);

    // Send confirmation email (async, non-blocking)
    if (event) {
      sendVisitorConfirmationEmail(
        {
          name: registration.fullName,
          email: registration.email,
          ticketCode: registration.ticketId,
        },
        {
          title: event.title,
          date: event.eventDate.toLocaleDateString("en-LK", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          venue: `${event.venueName}, ${event.venueCity}`,
        },
        qrCode
      )
        .then(() => {
          prisma.registration
            .update({
              where: { id: registration.id },
              data: { emailSent: true, emailSentAt: new Date() },
            })
            .catch(() => {});
        })
        .catch((err) => {
          console.error("Failed to send visitor confirmation email:", err);
        });
    }

    return NextResponse.json(
      {
        success: true,
        ticketId: registration.ticketId,
        message: "Registration successful! Check your email for confirmation.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/register/visitor error:", error);
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
