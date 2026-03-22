import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { sendContactFormEmail, sendAdminNotificationEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rateLimit";

const contactSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email().max(255),
  phone: z.string().regex(/^(?:\+94|0)?[0-9]{9}$/, "Invalid Sri Lankan phone number"),
  eventType: z.string().max(100),
  eventDate: z.string().optional(),
  guestCount: z.string().max(50).optional(),
  budget: z.string().max(100).optional(),
  message: z.string().min(50).max(5000),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 3 per IP per 30 minutes
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rateLimitResult = rateLimit(`contact:${ip}`, 3, 30 * 60 * 1000);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Create inquiry record
    const inquiry = await prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        eventType: data.eventType,
        eventDate: data.eventDate ? new Date(data.eventDate) : null,
        guestCount: data.guestCount || null,
        budget: data.budget || null,
        message: data.message,
      },
    });

    // Send contact form acknowledgement email (async, non-blocking)
    sendContactFormEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: `Event Inquiry - ${data.eventType}`,
      message: data.message,
    }).catch((err) => {
      console.error("Failed to send contact form email:", err);
    });

    // Send admin notification (async, non-blocking)
    sendAdminNotificationEmail(
      `New Contact Inquiry - ${data.eventType}`,
      `<p><strong>Name:</strong> ${data.name}</p>
       <p><strong>Email:</strong> ${data.email}</p>
       <p><strong>Phone:</strong> ${data.phone}</p>
       <p><strong>Event Type:</strong> ${data.eventType}</p>
       ${data.eventDate ? `<p><strong>Event Date:</strong> ${data.eventDate}</p>` : ""}
       ${data.guestCount ? `<p><strong>Guest Count:</strong> ${data.guestCount}</p>` : ""}
       ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ""}
       <p><strong>Message:</strong></p>
       <p style="white-space:pre-wrap;">${data.message}</p>`
    ).catch((err) => {
      console.error("Failed to send admin notification email:", err);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your inquiry! We will get back to you shortly.",
        inquiryId: inquiry.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry. Please try again." },
      { status: 500 }
    );
  }
}
