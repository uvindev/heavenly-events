'use client';

import { useEffect, useState } from 'react';
import { useAdminStore } from '@/store/adminStore';
import {
  Calendar,
  Users,
  MessageSquare,
  Clock,
  TrendingUp,
  ArrowUpRight,
  AlertCircle,
  Loader2,
} from 'lucide-react';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

interface DashboardStats {
  totalEvents: number;
  todayRegistrations: number;
  pendingExhibitors: number;
  pendingInquiries: number;
  upcomingEvents: { title: string; eventDate: string; registrationCount: number; status: string }[];
  recentRegistrations: { fullName: string; email: string; eventTitle: string; registrationType: string; createdAt: string }[];
}

const statusColor: Record<string, string> = {
  PUBLISHED: 'bg-emerald-100 text-emerald-700',
  DRAFT: 'bg-slate-100 text-slate-600',
  COMPLETED: 'bg-blue-100 text-blue-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

const typeColor: Record<string, string> = {
  VISITOR: 'bg-blue-100 text-blue-700',
  EXHIBITOR: 'bg-purple-100 text-purple-700',
};

export default function DashboardPage() {
  const { currentUser } = useAdminStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/dashboard/stats');
        if (res.ok) {
          const data = await res.json();
          setStats({
            totalEvents: data.stats?.totalEvents ?? 0,
            todayRegistrations: data.stats?.registeredToday ?? 0,
            pendingExhibitors: data.stats?.pendingExhibitors ?? 0,
            pendingInquiries: data.stats?.pendingInquiries ?? 0,
            upcomingEvents: (data.upcomingEvents || []).map((e: Record<string, unknown>) => ({
              title: e.title,
              eventDate: e.eventDate,
              registrationCount: e.registrationCount,
              status: e.status,
            })),
            recentRegistrations: (data.recentRegistrations || []).map((r: Record<string, unknown>) => ({
              fullName: r.fullName,
              email: r.email,
              eventTitle: (r.event as Record<string, unknown>)?.title || '',
              registrationType: r.registrationType,
              createdAt: r.createdAt,
            })),
          });
        }
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Events',
      value: stats?.totalEvents ?? 0,
      change: 'All events',
      icon: Calendar,
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      label: 'Today\'s Registrations',
      value: stats?.todayRegistrations ?? 0,
      change: 'New today',
      icon: Users,
      bgColor: 'bg-emerald-50',
      iconBg: 'bg-emerald-100',
      textColor: 'text-emerald-600',
    },
    {
      label: 'Pending Exhibitors',
      value: stats?.pendingExhibitors ?? 0,
      change: 'Awaiting approval',
      icon: MessageSquare,
      bgColor: 'bg-amber-50',
      iconBg: 'bg-amber-100',
      textColor: 'text-amber-600',
    },
    {
      label: 'New Inquiries',
      value: stats?.pendingInquiries ?? 0,
      change: 'Unread',
      icon: Clock,
      bgColor: 'bg-rose-50',
      iconBg: 'bg-rose-100',
      textColor: 'text-rose-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {getGreeting()}, {currentUser?.fullName?.split(' ')[0] || 'Admin'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">Here&apos;s what&apos;s happening with your events today.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Live data from database</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-xl bg-white border border-slate-200 p-5 hover:border-blue-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${stat.iconBg}`}>
                  <Icon className={`w-5 h-5 ${stat.textColor}`} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-blue-400 transition-colors" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
              <div className={`text-xs mt-2 ${stat.textColor}`}>{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Exhibitor Approvals Banner */}
      {(stats?.pendingExhibitors ?? 0) > 0 && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex items-center gap-4">
          <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
          <div className="flex-1">
            <p className="text-amber-800 font-medium text-sm">{stats?.pendingExhibitors} Exhibitor Applications Awaiting Approval</p>
            <p className="text-amber-600/70 text-xs mt-0.5">Review exhibitor applications to allow them to participate in upcoming events.</p>
          </div>
          <a
            href="/admin/registrations"
            className="px-4 py-2 rounded-lg bg-amber-100 text-amber-700 text-sm font-medium hover:bg-amber-200 transition-colors whitespace-nowrap"
          >
            Review Now
          </a>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-slate-900 font-semibold text-sm">Upcoming Events</h2>
            <a href="/admin/events" className="text-blue-600 text-xs hover:text-blue-700 transition-colors font-medium">
              View All
            </a>
          </div>
          <div className="divide-y divide-slate-100">
            {stats?.upcomingEvents && stats.upcomingEvents.length > 0 ? (
              stats.upcomingEvents.map((event, i) => (
                <div key={i} className="px-5 py-3 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-slate-800 font-medium truncate">{event.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">{event.registrationCount} reg.</div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColor[event.status] || 'bg-slate-100 text-slate-600'}`}>
                    {event.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-5 py-8 text-center text-slate-400 text-sm">No upcoming events yet.</div>
            )}
          </div>
        </div>

        {/* Recent Registrations */}
        <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-slate-900 font-semibold text-sm">Recent Registrations</h2>
            <a href="/admin/registrations" className="text-blue-600 text-xs hover:text-blue-700 transition-colors font-medium">
              View All
            </a>
          </div>
          <div className="divide-y divide-slate-100">
            {stats?.recentRegistrations && stats.recentRegistrations.length > 0 ? (
              stats.recentRegistrations.map((reg, i) => (
                <div key={i} className="px-5 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-[10px] font-semibold shrink-0">
                    {reg.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-slate-800 truncate">{reg.fullName}</div>
                    <div className="text-xs text-slate-400 truncate">{reg.eventTitle || reg.email}</div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${typeColor[reg.registrationType] || 'bg-slate-100 text-slate-600'}`}>
                    {reg.registrationType}
                  </span>
                  <div className="text-[11px] text-slate-400 whitespace-nowrap">
                    {new Date(reg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-5 py-8 text-center text-slate-400 text-sm">No registrations yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
