'use client';

import { useState } from 'react';
import {
  Search,
  Download,
  Eye,
  Mail,
  CheckCircle2,
  XCircle,
  QrCode,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MockRegistration {
  id: number;
  ticketId: string;
  fullName: string;
  companyName: string | null;
  email: string;
  phone: string;
  event: string;
  eventId: number;
  registrationType: 'VISITOR' | 'EXHIBITOR';
  status: 'PENDING' | 'CONFIRMED' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  checkedIn: boolean;
  checkedInAt: string | null;
  createdAt: string;
}

const mockRegistrations: MockRegistration[] = [
  { id: 1, ticketId: 'TKT-001-ABC', fullName: 'John De Silva', companyName: null, email: 'john@email.com', phone: '+94771234567', event: 'Education Fair 2026', eventId: 1, registrationType: 'VISITOR', status: 'CONFIRMED', checkedIn: false, checkedInAt: null, createdAt: '2026-03-22T10:30:00' },
  { id: 2, ticketId: 'TKT-002-DEF', fullName: 'Priya Perera', companyName: 'Lanka Edu Solutions', email: 'priya@corp.lk', phone: '+94777654321', event: 'Education Fair 2026', eventId: 1, registrationType: 'EXHIBITOR', status: 'PENDING', checkedIn: false, checkedInAt: null, createdAt: '2026-03-22T09:15:00' },
  { id: 3, ticketId: 'TKT-003-GHI', fullName: 'Kamal Fernando', companyName: null, email: 'kamal@gmail.com', phone: '+94712345678', event: 'Dream Weddings Expo', eventId: 2, registrationType: 'VISITOR', status: 'CONFIRMED', checkedIn: true, checkedInAt: '2026-03-21T14:30:00', createdAt: '2026-03-20T11:00:00' },
  { id: 4, ticketId: 'TKT-004-JKL', fullName: 'Sarah Williams', companyName: 'Williams Catering', email: 'sarah@company.com', phone: '+94765432100', event: 'Dream Weddings Expo', eventId: 2, registrationType: 'EXHIBITOR', status: 'APPROVED', checkedIn: false, checkedInAt: null, createdAt: '2026-03-19T16:45:00' },
  { id: 5, ticketId: 'TKT-005-MNO', fullName: 'Nimal Jayawardena', companyName: null, email: 'nimal@live.com', phone: '+94701112233', event: 'Tech Summit SL', eventId: 3, registrationType: 'VISITOR', status: 'CONFIRMED', checkedIn: false, checkedInAt: null, createdAt: '2026-03-18T08:20:00' },
  { id: 6, ticketId: 'TKT-006-PQR', fullName: 'Dilani Silva', companyName: 'Fresh Foods Ltd', email: 'dilani@org.lk', phone: '+94789988776', event: 'Food & Beverage Expo', eventId: 4, registrationType: 'EXHIBITOR', status: 'PENDING', checkedIn: false, checkedInAt: null, createdAt: '2026-03-17T13:10:00' },
  { id: 7, ticketId: 'TKT-007-STU', fullName: 'Ravi Kumar', companyName: 'RK Decorations', email: 'ravi@biz.com', phone: '+94776655443', event: 'Dream Weddings Expo', eventId: 2, registrationType: 'EXHIBITOR', status: 'REJECTED', checkedIn: false, checkedInAt: null, createdAt: '2026-03-16T10:00:00' },
  { id: 8, ticketId: 'TKT-008-VWX', fullName: 'Amaya Bandara', companyName: null, email: 'amaya@email.com', phone: '+94712233445', event: 'Health & Wellness Expo', eventId: 6, registrationType: 'VISITOR', status: 'CONFIRMED', checkedIn: true, checkedInAt: '2026-03-15T09:45:00', createdAt: '2026-03-14T15:30:00' },
  { id: 9, ticketId: 'TKT-009-YZA', fullName: 'Mark Johnson', companyName: null, email: 'mark@company.lk', phone: '+94701122334', event: 'Corporate Gala Night', eventId: 5, registrationType: 'VISITOR', status: 'CANCELLED', checkedIn: false, checkedInAt: null, createdAt: '2026-03-13T12:00:00' },
  { id: 10, ticketId: 'TKT-010-BCD', fullName: 'Nadeesha Dias', companyName: 'Dias Tech Solutions', email: 'nadeesha@email.com', phone: '+94779876543', event: 'Tech Summit SL', eventId: 3, registrationType: 'EXHIBITOR', status: 'PENDING', checkedIn: false, checkedInAt: null, createdAt: '2026-03-12T09:30:00' },
];

const statusStyles: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-emerald-100 text-emerald-700',
  APPROVED: 'bg-blue-100 text-blue-700',
  REJECTED: 'bg-red-100 text-red-700',
  CANCELLED: 'bg-slate-100 text-slate-600',
};

const typeStyles: Record<string, string> = {
  VISITOR: 'bg-blue-100 text-blue-700',
  EXHIBITOR: 'bg-purple-100 text-purple-700',
};

export default function AdminRegistrationsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [eventFilter, setEventFilter] = useState('ALL');

  const pendingExhibitors = mockRegistrations.filter(
    (r) => r.registrationType === 'EXHIBITOR' && r.status === 'PENDING'
  );

  const filtered = mockRegistrations.filter((r) => {
    if (typeFilter !== 'ALL' && r.registrationType !== typeFilter) return false;
    if (statusFilter !== 'ALL' && r.status !== statusFilter) return false;
    if (eventFilter !== 'ALL' && r.eventId !== parseInt(eventFilter)) return false;
    if (search) {
      const s = search.toLowerCase();
      if (!r.fullName.toLowerCase().includes(s) && !r.email.toLowerCase().includes(s) && !r.ticketId.toLowerCase().includes(s)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Registrations</h1>
          <p className="text-slate-500 text-sm mt-1">Manage all event registrations and exhibitor applications.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 border border-slate-200 transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Exhibitor Approval Queue */}
      {pendingExhibitors.length > 0 && (
        <div className="rounded-xl bg-purple-50 border border-purple-200 p-4">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-5 h-5 text-purple-500" />
            <h3 className="text-purple-800 font-medium text-sm">{pendingExhibitors.length} Exhibitor Applications Pending</h3>
          </div>
          <div className="space-y-2">
            {pendingExhibitors.map((ex) => (
              <div key={ex.id} className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-white border border-purple-100">
                <div>
                  <span className="text-sm text-slate-800">{ex.fullName}</span>
                  <span className="text-slate-400 text-xs ml-2">{ex.companyName}</span>
                  <span className="text-slate-400 text-xs ml-2">for {ex.event}</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 rounded-md bg-emerald-100 text-emerald-700 text-xs font-medium hover:bg-emerald-200 transition-colors">
                    Approve
                  </button>
                  <button className="px-3 py-1.5 rounded-md bg-red-100 text-red-700 text-xs font-medium hover:bg-red-200 transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1" style={{ minWidth: '200px' }}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or ticket ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <select value={eventFilter} onChange={(e) => setEventFilter(e.target.value)} className="px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-sm appearance-none focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 cursor-pointer">
          <option value="ALL">All Events</option>
          <option value="1">Education Fair 2026</option>
          <option value="2">Dream Weddings Expo</option>
          <option value="3">Tech Summit SL</option>
          <option value="4">Food & Beverage Expo</option>
          <option value="5">Corporate Gala Night</option>
          <option value="6">Health & Wellness Expo</option>
        </select>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-sm appearance-none focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 cursor-pointer">
          <option value="ALL">All Types</option>
          <option value="VISITOR">Visitor</option>
          <option value="EXHIBITOR">Exhibitor</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-sm appearance-none focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 cursor-pointer">
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Name / Company</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Phone</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Event</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Registered</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Check-in</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((reg) => (
                <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="text-sm text-slate-800">{reg.fullName}</div>
                    {reg.companyName && <div className="text-xs text-slate-400">{reg.companyName}</div>}
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-500">{reg.email}</td>
                  <td className="px-5 py-3 text-sm text-slate-500">{reg.phone}</td>
                  <td className="px-5 py-3 text-sm text-slate-500">{reg.event}</td>
                  <td className="px-5 py-3">
                    <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', typeStyles[reg.registrationType])}>
                      {reg.registrationType}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-400">
                    {new Date(reg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-5 py-3">
                    <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', statusStyles[reg.status])}>
                      {reg.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {reg.checkedIn ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Yes
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">No</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors" title="View details">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors" title="Resend email">
                        <Mail className="w-3.5 h-3.5" />
                      </button>
                      {reg.registrationType === 'EXHIBITOR' && reg.status === 'PENDING' && (
                        <>
                          <button className="p-1.5 rounded text-emerald-500 hover:bg-emerald-50 transition-colors" title="Approve">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded text-red-500 hover:bg-red-50 transition-colors" title="Reject">
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                      {!reg.checkedIn && (reg.status === 'CONFIRMED' || reg.status === 'APPROVED') && (
                        <button className="p-1.5 rounded text-blue-500 hover:bg-blue-50 transition-colors" title="Check in">
                          <QrCode className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-5 py-12 text-center text-slate-400 text-sm">
                    No registrations found matching your filters.
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
