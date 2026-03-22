import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requirePermission, isNextResponse } from '@/lib/adminAuth';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const authResult = requirePermission(request, 'registrations:export');
  if (isNextResponse(authResult)) return authResult;

  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    const where: Record<string, unknown> = {};
    if (eventId) where.eventId = parseInt(eventId);
    if (type) where.registrationType = type;
    if (status) where.status = status;

    const registrations = await prisma.registration.findMany({
      where,
      include: {
        event: { select: { title: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Build CSV
    const headers = [
      'Ticket ID',
      'Full Name',
      'Email',
      'Phone',
      'Company',
      'Event',
      'Type',
      'Status',
      'Checked In',
      'Checked In At',
      'Registered At',
    ];

    const rows = registrations.map((r: { ticketId: string; fullName: string; email: string; phone: string; companyName: string | null; event: { title: string }; registrationType: string; status: string; checkedIn: boolean; checkedInAt: Date | null; createdAt: Date }) => [
      r.ticketId,
      `"${r.fullName}"`,
      r.email,
      r.phone,
      r.companyName ? `"${r.companyName}"` : '',
      `"${r.event.title}"`,
      r.registrationType,
      r.status,
      r.checkedIn ? 'Yes' : 'No',
      r.checkedInAt ? r.checkedInAt.toISOString() : '',
      r.createdAt.toISOString(),
    ]);

    const csv = [headers.join(','), ...rows.map((r: string[]) => r.join(','))].join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="registrations-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
