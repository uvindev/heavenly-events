import nodemailer from "nodemailer";

const FROM_EMAIL = "noreply@heavenlyevents.lk";
const REPLY_TO_EMAIL = "info@heavenlyevents.lk";

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function emailLayout(title: string, bodyContent: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#F8F5F0;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8F5F0;">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:8px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color:#070708;padding:32px 24px;text-align:center;">
              <h1 style="margin:0;color:#FFFFFF;font-size:24px;font-weight:700;">Heavenly Events</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px 24px;">
              ${bodyContent}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#F8F5F0;padding:24px;text-align:center;font-size:12px;color:#888888;">
              <p style="margin:0 0 8px 0;">&copy; ${new Date().getFullYear()} Heavenly Events. All rights reserved.</p>
              <p style="margin:0;">info@heavenlyevents.lk</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendVisitorConfirmationEmail(
  registration: { name: string; email: string; ticketCode: string },
  event: { title: string; date: string; venue: string },
  qrCodeBase64: string
) {
  const transporter = createTransporter();

  const body = `
    <h2 style="margin:0 0 16px 0;color:#070708;font-size:20px;">Registration Confirmed!</h2>
    <p style="margin:0 0 12px 0;color:#333333;line-height:1.6;">Dear ${registration.name},</p>
    <p style="margin:0 0 12px 0;color:#333333;line-height:1.6;">Thank you for registering for <strong>${event.title}</strong>. Your registration has been confirmed.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;background-color:#F8F5F0;border-radius:8px;">
      <tr>
        <td style="padding:20px;">
          <p style="margin:0 0 8px 0;color:#333333;"><strong>Event:</strong> ${event.title}</p>
          <p style="margin:0 0 8px 0;color:#333333;"><strong>Date:</strong> ${event.date}</p>
          <p style="margin:0 0 8px 0;color:#333333;"><strong>Venue:</strong> ${event.venue}</p>
          <p style="margin:0;color:#333333;"><strong>Ticket Code:</strong> ${registration.ticketCode}</p>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 12px 0;color:#333333;line-height:1.6;">Please present the QR code below at the event entrance:</p>
    <div style="text-align:center;margin:24px 0;">
      <img src="${qrCodeBase64}" alt="Ticket QR Code" width="250" height="250" style="border:1px solid #E0E0E0;border-radius:8px;" />
    </div>
    <p style="margin:0;color:#888888;font-size:13px;line-height:1.5;">If you have any questions, please reply to this email or contact us at info@heavenlyevents.lk.</p>
  `;

  await transporter.sendMail({
    from: FROM_EMAIL,
    replyTo: REPLY_TO_EMAIL,
    to: registration.email,
    subject: `Registration Confirmed - ${event.title}`,
    html: emailLayout("Registration Confirmed", body),
  });
}

export async function sendExhibitorInterestEmail(
  registration: { name: string; email: string; companyName: string },
  event: { title: string; date: string; venue: string }
) {
  const transporter = createTransporter();

  const body = `
    <h2 style="margin:0 0 16px 0;color:#070708;font-size:20px;">Exhibitor Interest Received</h2>
    <p style="margin:0 0 12px 0;color:#333333;line-height:1.6;">Dear ${registration.name},</p>
    <p style="margin:0 0 12px 0;color:#333333;line-height:1.6;">Thank you for expressing your interest in exhibiting at <strong>${event.title}</strong>. We have received your application and our team will review it shortly.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;background-color:#F8F5F0;border-radius:8px;">
      <tr>
        <td style="padding:20px;">
          <p style="margin:0 0 8px 0;color:#333333;"><strong>Event:</strong> ${event.title}</p>
          <p style="margin:0 0 8px 0;color:#333333;"><strong>Date:</strong> ${event.date}</p>
          <p style="margin:0 0 8px 0;color:#333333;"><strong>Venue:</strong> ${event.venue}</p>
          <p style="margin:0;color:#333333;"><strong>Company:</strong> ${registration.companyName}</p>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 12px 0;color:#333333;line-height:1.6;">You will receive a confirmation email once your application has been approved.</p>
    <p style="margin:0;color:#888888;font-size:13px;line-height:1.5;">If you have any questions, please reply to this email or contact us at info@heavenlyevents.lk.</p>
  `;

  await transporter.sendMail({
    from: FROM_EMAIL,
    replyTo: REPLY_TO_EMAIL,
    to: registration.email,
    subject: `Exhibitor Interest Received - ${event.title}`,
    html: emailLayout("Exhibitor Interest Received", body),
  });
}

export async function sendExhibitorApprovalEmail(
  registration: { name: string; email: string; companyName: string; ticketCode: string },
  event: { title: string; date: string; venue: string },
  qrCodeBase64: string
) {
  const transporter = createTransporter();

  const body = `
    <h2 style="margin:0 0 16px 0;color:#070708;font-size:20px;">Exhibitor Application Approved!</h2>
    <p style="margin:0 0 12px 0;color:#333333;line-height:1.6;">Dear ${registration.name},</p>
    <p style="margin:0 0 12px 0;color:#333333;line-height:1.6;">Great news! Your exhibitor application for <strong>${event.title}</strong> has been approved.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;background-color:#F8F5F0;border-radius:8px;">
      <tr>
        <td style="padding:20px;">
          <p style="margin:0 0 8px 0;color:#333333;"><strong>Event:</strong> ${event.title}</p>
          <p style="margin:0 0 8px 0;color:#333333;"><strong>Date:</strong> ${event.date}</p>
          <p style="margin:0 0 8px 0;color:#333333;"><strong>Venue:</strong> ${event.venue}</p>
          <p style="margin:0 0 8px 0;color:#333333;"><strong>Company:</strong> ${registration.companyName}</p>
          <p style="margin:0;color:#333333;"><strong>Ticket Code:</strong> ${registration.ticketCode}</p>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 12px 0;color:#333333;line-height:1.6;">Please present the QR code below at the event entrance:</p>
    <div style="text-align:center;margin:24px 0;">
      <img src="${qrCodeBase64}" alt="Exhibitor QR Code" width="250" height="250" style="border:1px solid #E0E0E0;border-radius:8px;" />
    </div>
    <p style="margin:0;color:#888888;font-size:13px;line-height:1.5;">If you have any questions, please reply to this email or contact us at info@heavenlyevents.lk.</p>
  `;

  await transporter.sendMail({
    from: FROM_EMAIL,
    replyTo: REPLY_TO_EMAIL,
    to: registration.email,
    subject: `Exhibitor Approved - ${event.title}`,
    html: emailLayout("Exhibitor Approved", body),
  });
}

export async function sendContactFormEmail(inquiry: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const transporter = createTransporter();
  const adminEmail = process.env.ADMIN_EMAIL || "info@heavenlyevents.lk";

  const body = `
    <h2 style="margin:0 0 16px 0;color:#070708;font-size:20px;">New Contact Form Submission</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;background-color:#F8F5F0;border-radius:8px;">
      <tr>
        <td style="padding:20px;">
          <p style="margin:0 0 8px 0;color:#333333;"><strong>Name:</strong> ${inquiry.name}</p>
          <p style="margin:0 0 8px 0;color:#333333;"><strong>Email:</strong> ${inquiry.email}</p>
          ${inquiry.phone ? `<p style="margin:0 0 8px 0;color:#333333;"><strong>Phone:</strong> ${inquiry.phone}</p>` : ""}
          <p style="margin:0 0 8px 0;color:#333333;"><strong>Subject:</strong> ${inquiry.subject}</p>
        </td>
      </tr>
    </table>
    <h3 style="margin:0 0 8px 0;color:#070708;font-size:16px;">Message:</h3>
    <p style="margin:0;color:#333333;line-height:1.6;white-space:pre-wrap;">${inquiry.message}</p>
  `;

  await transporter.sendMail({
    from: FROM_EMAIL,
    replyTo: inquiry.email,
    to: adminEmail,
    subject: `Contact Form: ${inquiry.subject}`,
    html: emailLayout("Contact Form Submission", body),
  });
}

export async function sendAdminNotificationEmail(
  subject: string,
  content: string
) {
  const transporter = createTransporter();
  const adminEmail = process.env.ADMIN_EMAIL || "info@heavenlyevents.lk";

  const body = `
    <h2 style="margin:0 0 16px 0;color:#070708;font-size:20px;">Admin Notification</h2>
    <div style="color:#333333;line-height:1.6;">${content}</div>
  `;

  await transporter.sendMail({
    from: FROM_EMAIL,
    replyTo: REPLY_TO_EMAIL,
    to: adminEmail,
    subject: `[Admin] ${subject}`,
    html: emailLayout("Admin Notification", body),
  });
}
