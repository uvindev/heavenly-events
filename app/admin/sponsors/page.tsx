'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, ExternalLink, Globe, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MockSponsor {
  id: number;
  name: string;
  logoUrl: string;
  tier: 'PLATINUM' | 'GOLD' | 'SILVER' | 'STANDARD';
  websiteUrl: string | null;
  isActive: boolean;
  sortOrder: number;
}

const mockSponsors: MockSponsor[] = [
  { id: 1, name: 'Dialog Axiata', logoUrl: '/sponsors/dialog.png', tier: 'PLATINUM', websiteUrl: 'https://dialog.lk', isActive: true, sortOrder: 1 },
  { id: 2, name: 'Mobitel', logoUrl: '/sponsors/mobitel.png', tier: 'GOLD', websiteUrl: 'https://mobitel.lk', isActive: true, sortOrder: 2 },
  { id: 3, name: 'Cargills Bank', logoUrl: '/sponsors/cargills.png', tier: 'GOLD', websiteUrl: 'https://cargillsbank.com', isActive: true, sortOrder: 3 },
  { id: 4, name: 'Singer Sri Lanka', logoUrl: '/sponsors/singer.png', tier: 'SILVER', websiteUrl: 'https://singersl.com', isActive: true, sortOrder: 4 },
  { id: 5, name: 'Hameedia', logoUrl: '/sponsors/hameedia.png', tier: 'SILVER', websiteUrl: 'https://hameedia.com', isActive: false, sortOrder: 5 },
  { id: 6, name: 'Keells Super', logoUrl: '/sponsors/keells.png', tier: 'STANDARD', websiteUrl: 'https://keellssuper.com', isActive: true, sortOrder: 6 },
];

const tierColors: Record<string, { badge: string }> = {
  PLATINUM: { badge: 'bg-slate-200 text-slate-800 font-bold' },
  GOLD: { badge: 'bg-amber-100 text-amber-800 font-bold' },
  SILVER: { badge: 'bg-slate-100 text-slate-600 font-bold' },
  STANDARD: { badge: 'bg-blue-50 text-blue-600 font-bold' },
};

export default function AdminSponsorsPage() {
  const [sponsors] = useState(mockSponsors);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sponsors</h1>
          <p className="text-slate-500 text-sm mt-1">Manage sponsor logos and partnerships.</p>
        </div>
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Sponsor
        </button>
      </div>

      {/* Add Sponsor Form */}
      {formOpen && (
        <div className="rounded-xl bg-white border border-slate-200 p-6">
          <h3 className="text-slate-900 font-semibold mb-4">New Sponsor</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Sponsor Name *</label>
              <input type="text" className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" placeholder="Company name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Tier *</label>
              <select className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-sm appearance-none focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 cursor-pointer">
                <option value="PLATINUM">Platinum</option>
                <option value="GOLD">Gold</option>
                <option value="SILVER">Silver</option>
                <option value="STANDARD">Standard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Website URL</label>
              <input type="url" className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Logo</label>
              <div className="border-2 border-dashed border-blue-200 rounded-lg px-4 py-3 text-center text-sm text-slate-500 hover:border-blue-400 cursor-pointer transition-colors bg-blue-50/50">
                Click to upload logo
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
              Save Sponsor
            </button>
            <button onClick={() => setFormOpen(false)} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="w-8 px-3 py-3"></th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Logo</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Tier</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Website</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Active</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Sort</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sponsors.map((sponsor) => (
                <tr key={sponsor.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 py-3">
                    <GripVertical className="w-4 h-4 text-slate-300 cursor-grab" />
                  </td>
                  <td className="px-5 py-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                      <Globe className="w-5 h-5" />
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-800 font-medium">{sponsor.name}</td>
                  <td className="px-5 py-3">
                    <span className={cn('text-[10px] px-2.5 py-1 rounded-full', tierColors[sponsor.tier]?.badge)}>
                      {sponsor.tier}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {sponsor.websiteUrl ? (
                      <a href={sponsor.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        {new URL(sponsor.websiteUrl).hostname}
                      </a>
                    ) : (
                      <span className="text-sm text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <span className={cn('text-xs', sponsor.isActive ? 'text-emerald-600' : 'text-slate-400')}>
                      {sponsor.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-500">{sponsor.sortOrder}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors" title="Edit">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
