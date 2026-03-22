'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Eye, X, Phone, Mail, Users, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  eventType: string | null;
  eventDate: string | null;
  guestCount: string | null;
  budget: string | null;
  message: string;
  status: string;
  createdAt: string;
}

const statusStyles: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-700 border-blue-200',
  CONTACTED: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  QUOTED: 'bg-purple-100 text-purple-700 border-purple-200',
  CONFIRMED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  CLOSED: 'bg-slate-100 text-slate-600 border-slate-200',
};

const allStatuses = ['NEW', 'CONTACTED', 'QUOTED', 'CONFIRMED', 'CLOSED'];

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter !== 'ALL') params.set('status', statusFilter);
      params.set('limit', '50');

      const res = await fetch(`/api/admin/inquiries?${params}`);
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
        setTotal(data.total || 0);
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      fetchInquiries();
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status });
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Inquiries</h1>
        <p className="text-slate-500 text-sm mt-1">{total} inquiries from potential clients.</p>
      </div>

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

      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Event Type</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 text-sm text-slate-800">{inq.name}</td>
                    <td className="px-5 py-3 text-sm text-slate-500">{inq.email}</td>
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
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {inquiries.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-slate-400 text-sm">No inquiries found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
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
              <div>
                <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Contact Info</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm"><Users className="w-4 h-4 text-slate-400" /><span className="text-slate-800">{selectedInquiry.name}</span></div>
                  <div className="flex items-center gap-3 text-sm"><Mail className="w-4 h-4 text-slate-400" /><span className="text-slate-600">{selectedInquiry.email}</span></div>
                  {selectedInquiry.phone && <div className="flex items-center gap-3 text-sm"><Phone className="w-4 h-4 text-slate-400" /><span className="text-slate-600">{selectedInquiry.phone}</span></div>}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Event Details</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedInquiry.eventType && <div className="p-3 rounded-lg bg-slate-50 border border-slate-100"><div className="text-[10px] text-slate-400 uppercase mb-1">Type</div><div className="text-sm text-slate-800">{selectedInquiry.eventType}</div></div>}
                  {selectedInquiry.eventDate && <div className="p-3 rounded-lg bg-slate-50 border border-slate-100"><div className="text-[10px] text-slate-400 uppercase mb-1">Date</div><div className="text-sm text-slate-800">{new Date(selectedInquiry.eventDate).toLocaleDateString()}</div></div>}
                  {selectedInquiry.guestCount && <div className="p-3 rounded-lg bg-slate-50 border border-slate-100"><div className="text-[10px] text-slate-400 uppercase mb-1">Guests</div><div className="text-sm text-slate-800">{selectedInquiry.guestCount}</div></div>}
                  {selectedInquiry.budget && <div className="p-3 rounded-lg bg-slate-50 border border-slate-100"><div className="text-[10px] text-slate-400 uppercase mb-1">Budget</div><div className="text-sm text-slate-800">{selectedInquiry.budget}</div></div>}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Message</h3>
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="text-sm text-slate-600 leading-relaxed">{selectedInquiry.message}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Update Status</h3>
                <div className="flex flex-wrap gap-2">
                  {allStatuses.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selectedInquiry.id, s)}
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
