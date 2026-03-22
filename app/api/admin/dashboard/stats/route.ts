import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requirePermission, isNextResponse } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  const authResult = requirePermission(request, 'events:read');
  if (isNextResponse(authResult)) return authResult;

  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

    const [
      totalEvents,
      publishedEvents,
      registeredToday,
      totalRegistrations,
      pendingExhibitors,
      pendingInquiries,
      upcomingEvents,
      recentRegistrations,
    ] = await Promise.all([
      prisma.event.count(),
      prisma.event.count({ where: { status: 'PUBLISHED' } }),
      prisma.registration.count({
        where: {
          createdAt: { gte: todayStart, lt: todayEnd },
        },
      }),
      prisma.registration.count(),
      prisma.registration.count({
        where: {
          registrationType: 'EXHIBITOR',
          status: 'PENDING',
        },
      }),
      prisma.inquiry.count({ where: { status: 'NEW' } }),
      prisma.event.findMany({
        where: {
          eventDate: { gte: now },
          status: 'PUBLISHED',
        },
        orderBy: { eventDate: 'asc' },
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
          eventDate: true,
          status: true,
          registrationCount: true,
          maxCapacity: true,
        },
      }),
      prisma.registration.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: {
          id: true,
          fullName: true,
          email: true,
          registrationType: true,
          createdAt: true,
          event: { select: { title: true } },
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalEvents,
        publishedEvents,
        registeredToday,
        totalRegistrations,
        pendingExhibitors,
        pendingInquiries,
      },
      upcomingEvents,
      recentRegistrations,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
