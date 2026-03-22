'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  Edit,
  ExternalLink,
  QrCode,
  Copy,
  Trash2,
  MoreHorizontal,
  Calendar,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type EventStatus = 'DRAFT' | 'PUBLISHED' | 'COMPLETED' | 'CANCELLED';
type EventCategory = 'EDUCATION_FAIR' | 'WEDDING_SHOW' | 'CONFERENCE' | 'TRADE_EXPO' | 'HEALTH_EXPO' | 'CORPORATE' | 'GALA' | 'CONCERT';

interface MockEvent {
  id: number;
  title: string;
  slug: string;
  category: EventCategory;
  eventDate: string;
  registrations: number;
  maxCapacity: number | null;
  status: EventStatus;
}

const mockEvents: MockEvent[] = [
  { id: 1, title: 'Colombo Education Fair 2026', slug: 'colombo-education-fair-2026', category: 'EDUCATION_FAIR', eventDate: '2026-04-05', registrations: 342, maxCapacity: 1000, status: 'PUBLISHED' },
  { id: 2, title: 'Dream Weddings Expo', slug: 'dream-weddings-expo', category: 'WEDDING_SHOW', eventDate: '2026-04-12', registrations: 189, maxCapacity: 500, status: 'PUBLISHED' },
  { id: 3, title: 'Tech Summit Sri Lanka', slug: 'tech-summit-sri-lanka', category: 'CONFERENCE', eventDate: '2026-04-20', registrations: 156, maxCapacity: 800, status: 'DRAFT' },
  { id: 4, title: 'Food & Beverage Expo', slug: 'food-beverage-expo', category: 'TRADE_EXPO', eventDate: '2026-05-03', registrations: 87, maxCapacity: 600, status: 'PUBLISHED' },
  { id: 5, title: 'Corporate Gala Night', slug: 'corporate-gala-night', category: 'GALA', eventDate: '2026-05-15', registrations: 45, maxCapacity: 300, status: 'DRAFT' },
  { id: 6, title: 'Colombo Health & Wellness Expo', slug: 'colombo-health-wellness-expo', category: 'HEALTH_EXPO', eventDate: '2026-06-01', registrations: 210, maxCapacity: 700, status: 'PUBLISHED' },
  { id: 7, title: 'Independence Day Concert', slug: 'independence-day-concert', category: 'CONCERT', eventDate: '2026-02-04', registrations: 1500, maxCapacity: 2000, status: 'COMPLETED' },
  { id: 8, title: 'Annual Business Awards', slug: 'annual-business-awards', category: 'CORPORATE', eventDate: '2026-03-10', registrations: 250, maxCapacity: 400, status: 'CANCELLED' },
];

const statusStyles: Record<EventStatus, string> = {
  DRAFT: 'bg-slate-100 text-slate-600 border-slate-200',
  PUBLISHED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  COMPLETED: 'bg-blue-100 text-blue-700 border-blue-200',
  CANCELLED: 'bg-red-100 text-red-700 border-red-200',
};

const categoryLabels: Record<string, string> = {
  EDUCATION_FAIR: 'Education Fair',
  WEDDING_SHOW: 'Wedding Show',
  CONFERENCE: 'Conference',
  TRADE_EXPO: 'Trade Expo',
  HEALTH_EXPO: 'Health Expo',
  CORPORATE: 'Corporate',
  GALA: 'Gala',
  CONCERT: 'Concert',
};

export default function AdminEventsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const filtered = mockEvents.filter((e) => {
    if (statusFilter !== 'ALL' && e.status !== statusFilter) return false;
    if (categoryFilter !== 'ALL' && e.category !== categoryFilter) return false;
    if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Events</h1>
          <p className="text-slate-500 text-sm mt-1">Manage all events and their details.</p>
        </div>
        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create New Event
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-sm appearance-none focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 cursor-pointer"
            >
              <option value="ALL">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-sm appearance-none focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Registrations</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((event) => (
                <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-800 font-medium">{event.title}</div>
                        <div className="text-xs text-slate-400">{event.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">
                      {categoryLabels[event.category] || event.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">
                    {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm text-slate-800">{event.registrations}</div>
                    {event.maxCapacity && (
                      <div className="text-xs text-slate-400">of {event.maxCapacity}</div>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className={cn('text-[11px] px-2.5 py-1 rounded-full font-medium border', statusStyles[event.status])}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() => setOpenMenu(openMenu === event.id ? null : event.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      {openMenu === event.id && (
                        <div className="absolute right-0 top-full mt-1 w-48 rounded-lg bg-white border border-slate-200 shadow-lg z-20 py-1">
                          <Link
                            href={`/admin/events/${event.id}`}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                            onClick={() => setOpenMenu(null)}
                          >
                            <Edit className="w-3.5 h-3.5" /> Edit
                          </Link>
                          <a
                            href={`/events/${event.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                            onClick={() => setOpenMenu(null)}
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> View Page
                          </a>
                          <Link
                            href={`/admin/checkin/${event.id}`}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                            onClick={() => setOpenMenu(null)}
                          >
                            <QrCode className="w-3.5 h-3.5" /> Check-in
                          </Link>
                          <button
                            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-800 w-full text-left"
                            onClick={() => setOpenMenu(null)}
                          >
                            <Copy className="w-3.5 h-3.5" /> Duplicate
                          </button>
                          <div className="border-t border-slate-100 my-1" />
                          <button
                            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                            onClick={() => setOpenMenu(null)}
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-400 text-sm">
                    No events found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
