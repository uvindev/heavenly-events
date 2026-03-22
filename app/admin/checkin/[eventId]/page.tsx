'use client';

import { useState, useEffect, use } from 'react';
import { QrCode, Search, CheckCircle2, XCircle, AlertTriangle, ArrowLeft, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckinResult {
  type: 'success' | 'error' | 'duplicate';
  name: string;
  message: string;
}

interface RecentCheckin {
  name: string;
  ticketId: string;
  time: string;
}

export default function CheckinPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = use(params);
  const [ticketInput, setTicketInput] = useState('');
  const [result, setResult] = useState<CheckinResult | null>(null);
  const [checkedInCount, setCheckedInCount] = useState(127);
  const totalRegistered = 342;
  const eventName = 'Colombo Education Fair 2026';

  const [recentCheckins] = useState<RecentCheckin[]>([
    { name: 'John De Silva', ticketId: 'TKT-001-ABC', time: '2 min ago' },
    { name: 'Kamal Fernando', ticketId: 'TKT-003-GHI', time: '5 min ago' },
    { name: 'Amaya Bandara', ticketId: 'TKT-008-VWX', time: '8 min ago' },
    { name: 'Nimal Jayawardena', ticketId: 'TKT-005-MNO', time: '12 min ago' },
    { name: 'Mark Johnson', ticketId: 'TKT-009-YZA', time: '15 min ago' },
  ]);

  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => setResult(null), 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [result]);

  const handleManualCheckin = async () => {
    if (!ticketInput.trim()) return;

    // Mock check-in logic
    if (ticketInput === 'TKT-001-ABC') {
      setResult({ type: 'duplicate', name: 'John De Silva', message: 'Already checked in at 10:30 AM' });
    } else if (ticketInput.startsWith('TKT-')) {
      setResult({ type: 'success', name: 'Guest Name', message: 'Successfully checked in!' });
      setCheckedInCount((c) => c + 1);
    } else {
      setResult({ type: 'error', name: '', message: 'Ticket not found. Please verify the ID.' });
    }
    setTicketInput('');
  };

  const progressPercent = Math.round((checkedInCount / totalRegistered) * 100);

  const flashColors = {
    success: 'bg-emerald-500',
    error: 'bg-red-500',
    duplicate: 'bg-amber-500',
  };

  const flashIcons = {
    success: CheckCircle2,
    error: XCircle,
    duplicate: AlertTriangle,
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Full Screen Flash */}
      {result && (
        <div className={cn(
          'fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-300',
          flashColors[result.type],
          'bg-opacity-95'
        )}>
          {(() => {
            const Icon = flashIcons[result.type];
            return <Icon className="w-24 h-24 text-white mb-6" />;
          })()}
          <div className="text-white text-3xl font-bold mb-2">
            {result.type === 'success' ? 'CHECKED IN' : result.type === 'duplicate' ? 'ALREADY CHECKED IN' : 'NOT FOUND'}
          </div>
          {result.name && <div className="text-white/80 text-xl mb-2">{result.name}</div>}
          <div className="text-white/60 text-sm">{result.message}</div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 shadow-sm">
        <a href="/admin/events" className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </a>
        <div className="flex-1">
          <div className="text-slate-900 font-semibold text-sm">{eventName}</div>
          <div className="text-slate-400 text-xs">Event #{eventId} - Check-in Mode</div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-slate-900 font-bold text-lg">CHECKED IN: {checkedInCount} / {totalRegistered}</span>
          </div>
          <span className="text-blue-600 font-semibold">{progressPercent}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 bg-blue-600"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-4">
        {/* Scan QR Button */}
        <button className="w-full py-8 rounded-2xl bg-blue-600 text-white flex flex-col items-center gap-3 transition-all shadow-lg hover:bg-blue-700 active:scale-95">
          <QrCode className="w-16 h-16" />
          <span className="text-xl font-bold">SCAN QR CODE</span>
          <span className="text-sm text-white/60">Tap to open camera</span>
        </button>

        {/* Manual Input */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={ticketInput}
              onChange={(e) => setTicketInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleManualCheckin()}
              placeholder="Enter Ticket ID (e.g. TKT-001-ABC)"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              autoFocus
            />
          </div>
          <button
            onClick={handleManualCheckin}
            className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors shadow-sm"
          >
            Check In
          </button>
        </div>

        {/* Recent Check-ins */}
        <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-slate-100">
            <h3 className="text-slate-900 font-semibold text-sm">Recent Check-ins</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {recentCheckins.map((checkin, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-800">{checkin.name}</div>
                  <div className="text-xs text-slate-400 font-mono">{checkin.ticketId}</div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs text-slate-400">{checkin.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
