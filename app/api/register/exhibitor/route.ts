import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { sendExhibitorInterestEmail, sendAdminNotificationEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rateLimit";

const exhibitorSchema = z.object({
  eventId: z.number().int().positive(),
  contactName: z.string().min(2).max(255),
  contactPhone: z.string().regex(/^(?:\+94|0)?[0-9]{9}$/, "Invalid Sri Lankan phone number"),
  contactEmail: z.string().email().max(255),
  companyName: z.string().min(2).max(255),
  boothSize: z.string().min(1).max(50),
  message: z.string().min(1).max(2000),
  companyPhone: z.string().max(20).optional(),
  companyWebsite: z.string().url().max(500).optional().or(z.literal("")),
  businessCategory: z.string().max(100).optional(),
  formResponses: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rateLimitResult = rateLimit(`exhibitor-register:${ip}`, 5, 10 * 60 * 1000);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many registration attempts. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validation = exhibitorSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Validate event exists and is published
    const event = await prisma.event.findUnique({
      where: { id: data.eventId },
    });

    if (!event || event.status !== "PUBLISHED") {
      return NextResponse.json(
        { error: "Event not found or not available for registration" },
        { status: 404 }
      );
    }

    // Check duplicate exhibitor registration
    const existing = await prisma.registration.findFirst({
      where: {
        email: data.contactEmail,
        eventId: data.eventId,
        registrationType: "EXHIBITOR",
      },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "You have already submitted an exhibitor application for this event. Our team will contact you shortly.",
      });
    }

    // Create registration with PENDING status (admin approves first, no QR yet)
    const registration = await prisma.registration.create({
      data: {
        eventId: data.eventId,
        fullName: data.contactName,
        email: data.contactEmail,
        phone: data.contactPhone,
        registrationType: "EXHIBITOR",
        status: "PENDING",
        companyName: data.companyName,
        companyPhone: data.companyPhone || null,
        companyWebsite: data.companyWebsite || null,
        businessCategory: data.businessCategory || null,
        boothSize: data.boothSize,
        exhibitorMessage: data.message,
        formResponses: data.formResponses ? JSON.parse(JSON.stringify(data.formResponses)) : undefined,
        ipAddress: ip,
        userAgent: request.headers.get("user-agent")?.substring(0, 500) || null,
        referrer: request.headers.get("referer")?.substring(0, 500) || null,
      },
    });

    // Send exhibitor interest received email (async, non-blocking)
    sendExhibitorInterestEmail(
      {
        name: registration.fullName,
        email: registration.email,
        companyName: data.companyName,
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
      }
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
        console.error("Failed to send exhibitor interest email:", err);
      });

    // Send admin notification (async, non-blocking)
    sendAdminNotificationEmail(
      `New Exhibitor Application - ${event.title}`,
      `<p><strong>Company:</strong> ${data.companyName}</p>
       <p><strong>Contact:</strong> ${data.contactName} (${data.contactEmail})</p>
       <p><strong>Phone:</strong> ${data.contactPhone}</p>
       <p><strong>Booth Size:</strong> ${data.boothSize}</p>
       <p><strong>Message:</strong> ${data.message}</p>
       <p><strong>Event:</strong> ${event.title}</p>`
    ).catch((err) => {
      console.error("Failed to send admin notification email:", err);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Exhibitor application submitted successfully! Our team will review your application and contact you shortly.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/register/exhibitor error:", error);
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
