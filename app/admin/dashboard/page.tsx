'use client';

import { useAdminStore } from '@/store/adminStore';
import {
  Calendar,
  Users,
  MessageSquare,
  Clock,
  TrendingUp,
  ArrowUpRight,
  AlertCircle,
} from 'lucide-react';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

const stats = [
  {
    label: 'Total Events',
    value: '8',
    change: '+2 this month',
    icon: Calendar,
    bgColor: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    textColor: 'text-blue-600',
  },
  {
    label: 'Registered Today',
    value: '47',
    change: '+12% from yesterday',
    icon: Users,
    bgColor: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    textColor: 'text-emerald-600',
  },
  {
    label: 'Exhibitor Inquiries',
    value: '23',
    change: '5 pending approval',
    icon: MessageSquare,
    bgColor: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    textColor: 'text-amber-600',
  },
  {
    label: 'Pending Approval',
    value: '12',
    change: 'Requires attention',
    icon: Clock,
    bgColor: 'bg-rose-50',
    iconBg: 'bg-rose-100',
    textColor: 'text-rose-600',
  },
];

const upcomingEvents = [
  { title: 'Colombo Education Fair 2026', date: 'Apr 5, 2026', registrations: 342, status: 'PUBLISHED' },
  { title: 'Dream Weddings Expo', date: 'Apr 12, 2026', registrations: 189, status: 'PUBLISHED' },
  { title: 'Tech Summit Sri Lanka', date: 'Apr 20, 2026', registrations: 156, status: 'DRAFT' },
  { title: 'Food & Beverage Expo', date: 'May 3, 2026', registrations: 87, status: 'PUBLISHED' },
  { title: 'Corporate Gala Night', date: 'May 15, 2026', registrations: 45, status: 'DRAFT' },
];

const recentRegistrations = [
  { name: 'John De Silva', email: 'john@email.com', event: 'Education Fair 2026', type: 'VISITOR', time: '5 min ago' },
  { name: 'Priya Perera', email: 'priya@corp.lk', event: 'Dream Weddings Expo', type: 'EXHIBITOR', time: '12 min ago' },
  { name: 'Kamal Fernando', email: 'kamal@gmail.com', event: 'Education Fair 2026', type: 'VISITOR', time: '25 min ago' },
  { name: 'Sarah Williams', email: 'sarah@company.com', event: 'Tech Summit SL', type: 'EXHIBITOR', time: '32 min ago' },
  { name: 'Nimal Jayawardena', email: 'nimal@live.com', event: 'Education Fair 2026', type: 'VISITOR', time: '45 min ago' },
  { name: 'Dilani Silva', email: 'dilani@org.lk', event: 'Food & Beverage Expo', type: 'VISITOR', time: '1 hr ago' },
  { name: 'Ravi Kumar', email: 'ravi@biz.com', event: 'Dream Weddings Expo', type: 'EXHIBITOR', time: '1 hr ago' },
  { name: 'Amaya Bandara', email: 'amaya@email.com', event: 'Education Fair 2026', type: 'VISITOR', time: '2 hrs ago' },
  { name: 'Mark Johnson', email: 'mark@company.lk', event: 'Corporate Gala Night', type: 'VISITOR', time: '2 hrs ago' },
  { name: 'Nadeesha Dias', email: 'nadeesha@email.com', event: 'Tech Summit SL', type: 'VISITOR', time: '3 hrs ago' },
];

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
          <span>Last updated: just now</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
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
      <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex items-center gap-4">
        <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
        <div className="flex-1">
          <p className="text-amber-800 font-medium text-sm">5 Exhibitor Applications Awaiting Approval</p>
          <p className="text-amber-600/70 text-xs mt-0.5">Review exhibitor applications to allow them to participate in upcoming events.</p>
        </div>
        <a
          href="/admin/registrations?type=EXHIBITOR&status=PENDING"
          className="px-4 py-2 rounded-lg bg-amber-100 text-amber-700 text-sm font-medium hover:bg-amber-200 transition-colors whitespace-nowrap"
        >
          Review Now
        </a>
      </div>

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
            {upcomingEvents.map((event, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-800 font-medium truncate">{event.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{event.date}</div>
                </div>
                <div className="text-xs text-slate-500">{event.registrations} reg.</div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColor[event.status]}`}>
                  {event.status}
                </span>
              </div>
            ))}
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
            {recentRegistrations.map((reg, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-[10px] font-semibold shrink-0">
                  {reg.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-800 truncate">{reg.name}</div>
                  <div className="text-xs text-slate-400 truncate">{reg.event}</div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${typeColor[reg.type]}`}>
                  {reg.type}
                </span>
                <div className="text-[11px] text-slate-400 whitespace-nowrap">{reg.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
