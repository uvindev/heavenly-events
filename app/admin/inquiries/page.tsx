'use client';

import { useState } from 'react';
import { Search, Eye, X, Phone, Mail, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

type InquiryStatus = 'NEW' | 'CONTACTED' | 'QUOTED' | 'CONFIRMED' | 'CLOSED';

interface MockInquiry {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  eventType: string | null;
  eventDate: string | null;
  guestCount: string | null;
  budget: string | null;
  message: string;
  status: InquiryStatus;
  createdAt: string;
}

const mockInquiries: MockInquiry[] = [
  { id: 1, name: 'Kumari Jayasuriya', email: 'kumari@email.com', phone: '+94771234567', eventType: 'Wedding', eventDate: '2026-08-15', guestCount: '250-300', budget: 'LKR 2,000,000 - 3,000,000', message: 'We are looking for a complete wedding planning service including venue decoration, catering, and entertainment.', status: 'NEW', createdAt: '2026-03-22T09:00:00' },
  { id: 2, name: 'Rohan Wijesinghe', email: 'rohan@corp.lk', phone: '+94777654321', eventType: 'Corporate', eventDate: '2026-05-20', guestCount: '100-150', budget: 'LKR 500,000 - 800,000', message: 'Annual company awards ceremony. Need stage setup, AV equipment, and dinner catering.', status: 'CONTACTED', createdAt: '2026-03-21T14:30:00' },
  { id: 3, name: 'Fathima Ahmed', email: 'fathima@gmail.com', phone: '+94765432100', eventType: 'Birthday', eventDate: '2026-04-28', guestCount: '50-80', budget: 'LKR 200,000 - 400,000', message: 'Planning a surprise 50th birthday celebration for my father. Theme: Vintage Gold.', status: 'QUOTED', createdAt: '2026-03-20T10:15:00' },
  { id: 4, name: 'David Mendis', email: 'david@company.lk', phone: '+94701112233', eventType: 'Conference', eventDate: '2026-07-10', guestCount: '500+', budget: 'LKR 5,000,000+', message: 'Two-day technology conference with multiple tracks, exhibition area, and networking events.', status: 'CONFIRMED', createdAt: '2026-03-19T11:45:00' },
  { id: 5, name: 'Anisha Fernando', email: 'anisha@live.com', phone: null, eventType: 'Private', eventDate: null, guestCount: '30-50', budget: 'LKR 100,000 - 200,000', message: 'Intimate dinner party for close friends and family. Looking for a nice venue suggestion.', status: 'CLOSED', createdAt: '2026-03-15T08:20:00' },
  { id: 6, name: 'Tharaka Silva', email: 'tharaka@biz.lk', phone: '+94789988776', eventType: 'Gala', eventDate: '2026-12-31', guestCount: '200-250', budget: 'LKR 3,000,000 - 4,000,000', message: 'New Year\'s Eve gala dinner with live band, fireworks, and premium catering.', status: 'NEW', createdAt: '2026-03-22T07:30:00' },
];

const statusStyles: Record<InquiryStatus, string> = {
  NEW: 'bg-blue-100 text-blue-700 border-blue-200',
  CONTACTED: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  QUOTED: 'bg-purple-100 text-purple-700 border-purple-200',
  CONFIRMED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  CLOSED: 'bg-slate-100 text-slate-600 border-slate-200',
};

const allStatuses: InquiryStatus[] = ['NEW', 'CONTACTED', 'QUOTED', 'CONFIRMED', 'CLOSED'];

export default function AdminInquiriesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedInquiry, setSelectedInquiry] = useState<MockInquiry | null>(null);

  const filtered = mockInquiries.filter((inq) => {
    if (statusFilter !== 'ALL' && inq.status !== statusFilter) return false;
    if (search) {
      const s = search.toLowerCase();
      if (!inq.name.toLowerCase().includes(s) && !inq.email.toLowerCase().includes(s)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Inquiries</h1>
        <p className="text-slate-500 text-sm mt-1">Manage event planning inquiries from potential clients.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-sm appearance-none focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 cursor-pointer"
        >
          <option value="ALL">All Status</option>
          {allStatuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Phone</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Event Type</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((inq) => (
                <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 text-sm text-slate-800">{inq.name}</td>
                  <td className="px-5 py-3 text-sm text-slate-500">{inq.email}</td>
                  <td className="px-5 py-3 text-sm text-slate-500">{inq.phone || '-'}</td>
                  <td className="px-5 py-3 text-sm text-slate-500">{inq.eventType || '-'}</td>
                  <td className="px-5 py-3 text-sm text-slate-500">
                    {inq.eventDate ? new Date(inq.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                  </td>
                  <td className="px-5 py-3">
                    <span className={cn('text-[10px] px-2.5 py-1 rounded-full font-medium border', statusStyles[inq.status])}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => setSelectedInquiry(inq)}
                      className="p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      title="View details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-400 text-sm">
                    No inquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSelectedInquiry(null)} />
          <div className="relative w-full max-w-lg bg-white border-l border-slate-200 shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-slate-900 font-semibold">Inquiry Details</h2>
              <button onClick={() => setSelectedInquiry(null)} className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Contact */}
              <div>
                <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Contact Info</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-800">{selectedInquiry.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">{selectedInquiry.email}</span>
                  </div>
                  {selectedInquiry.phone && (
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">{selectedInquiry.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Event Details */}
              <div>
                <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Event Details</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedInquiry.eventType && (
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="text-[10px] text-slate-400 uppercase mb-1">Type</div>
                      <div className="text-sm text-slate-800">{selectedInquiry.eventType}</div>
                    </div>
                  )}
                  {selectedInquiry.eventDate && (
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="text-[10px] text-slate-400 uppercase mb-1">Date</div>
                      <div className="text-sm text-slate-800">{new Date(selectedInquiry.eventDate).toLocaleDateString()}</div>
                    </div>
                  )}
                  {selectedInquiry.guestCount && (
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="text-[10px] text-slate-400 uppercase mb-1">Guests</div>
                      <div className="text-sm text-slate-800">{selectedInquiry.guestCount}</div>
                    </div>
                  )}
                  {selectedInquiry.budget && (
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="text-[10px] text-slate-400 uppercase mb-1">Budget</div>
                      <div className="text-sm text-slate-800">{selectedInquiry.budget}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Message</h3>
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="text-sm text-slate-600 leading-relaxed">{selectedInquiry.message}</p>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Update Status</h3>
                <div className="flex flex-wrap gap-2">
                  {allStatuses.map((s) => (
                    <button
                      key={s}
                      className={cn(
                        'text-xs px-3 py-1.5 rounded-lg font-medium border transition-colors',
                        selectedInquiry.status === s
                          ? statusStyles[s]
                          : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300'
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs text-slate-400">
                Submitted: {new Date(selectedInquiry.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
