'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Search,
  Download,
  Eye,
  Mail,
  CheckCircle2,
  XCircle,
  QrCode,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Registration {
  id: number;
  ticketId: string;
  fullName: string;
  companyName: string | null;
  email: string;
  phone: string;
  registrationType: 'VISITOR' | 'EXHIBITOR';
  status: string;
  checkedIn: boolean;
  createdAt: string;
  event: { id: number; title: string };
}

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
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (typeFilter !== 'ALL') params.set('type', typeFilter);
      if (statusFilter !== 'ALL') params.set('status', statusFilter);
      params.set('limit', '50');

      const res = await fetch(`/api/admin/registrations?${params}`);
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data.registrations || []);
        setTotal(data.total || 0);
      }
    } catch (err) {
      console.error('Failed to fetch registrations:', err);
    } finally {
      setLoading(false);
    }
  }, [search, typeFilter, statusFilter]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const handleApprove = async (id: number) => {
    try {
      await fetch(`/api/admin/registrations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'APPROVED' }),
      });
      fetchRegistrations();
    } catch (err) {
      console.error('Failed to approve:', err);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await fetch(`/api/admin/registrations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'REJECTED' }),
      });
      fetchRegistrations();
    } catch (err) {
      console.error('Failed to reject:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Registrations</h1>
          <p className="text-slate-500 text-sm mt-1">{total} total registrations in database.</p>
        </div>
        <a
          href="/api/admin/registrations/export?format=csv"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 border border-slate-200 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </a>
      </div>

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
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Name / Company</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Phone</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Event</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Check-in</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="text-sm text-slate-800">{reg.fullName}</div>
                      {reg.companyName && <div className="text-xs text-slate-400">{reg.companyName}</div>}
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-500">{reg.email}</td>
                    <td className="px-5 py-3 text-sm text-slate-500">{reg.phone}</td>
                    <td className="px-5 py-3 text-sm text-slate-500">{reg.event?.title || '-'}</td>
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
                            <button onClick={() => handleApprove(reg.id)} className="p-1.5 rounded text-emerald-500 hover:bg-emerald-50 transition-colors" title="Approve">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleReject(reg.id)} className="p-1.5 rounded text-red-500 hover:bg-red-50 transition-colors" title="Reject">
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
                {registrations.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-5 py-12 text-center text-slate-400 text-sm">
                      No registrations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
