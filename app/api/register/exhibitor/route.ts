import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { sendExhibitorInterestEmail, sendAdminNotificationEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rateLimit";

const exhibitorSchema = z.object({
  eventId: z.number().int().positive(),
  fullName: z.string().min(2).max(255),
  phone: z.string().min(9, "Invalid phone number").max(20),
  email: z.string().email().max(255),
  companyName: z.string().min(2).max(255),
  boothSize: z.string().max(50).optional(),
  exhibitorMessage: z.string().max(2000).optional(),
  companyPhone: z.string().max(20).optional(),
  companyWebsite: z.string().max(500).optional(),
  businessCategory: z.string().max(100).optional(),
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

    // Check if event exists in DB
    const event = await prisma.event.findUnique({
      where: { id: data.eventId },
    });

    // Check duplicate exhibitor registration
    const existing = await prisma.registration.findFirst({
      where: {
        email: data.email,
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
      }).catch(() => {});
    }

    // Create registration with PENDING status
    const registration = await prisma.registration.create({
      data: {
        eventId: data.eventId,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        registrationType: "EXHIBITOR",
        status: "PENDING",
        companyName: data.companyName,
        companyPhone: data.companyPhone || null,
        companyWebsite: data.companyWebsite || null,
        businessCategory: data.businessCategory || null,
        boothSize: data.boothSize || null,
        exhibitorMessage: data.exhibitorMessage || null,
        formResponses: data.formResponses ? JSON.parse(JSON.stringify(data.formResponses)) : undefined,
        ipAddress: ip,
        userAgent: request.headers.get("user-agent")?.substring(0, 500) || null,
        referrer: request.headers.get("referer")?.substring(0, 500) || null,
      },
    });

    // Send emails if event exists in DB
    if (event) {
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

      sendAdminNotificationEmail(
        `New Exhibitor Application - ${event.title}`,
        `<p><strong>Company:</strong> ${data.companyName}</p>
         <p><strong>Contact:</strong> ${data.fullName} (${data.email})</p>
         <p><strong>Phone:</strong> ${data.phone}</p>
         <p><strong>Booth Size:</strong> ${data.boothSize || 'Not specified'}</p>
         <p><strong>Message:</strong> ${data.exhibitorMessage || 'None'}</p>
         <p><strong>Event:</strong> ${event.title}</p>`
      ).catch((err) => {
        console.error("Failed to send admin notification email:", err);
      });
    }

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
