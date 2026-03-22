'use client';

import { useState } from 'react';
import {
  Upload,
  Search,
  Star,
  Edit,
  Trash2,
  Image as ImageIcon,
  CheckSquare,
  Square,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MockGalleryItem {
  id: number;
  filename: string;
  altText: string;
  category: string;
  featured: boolean;
  sortOrder: number;
  eventName: string | null;
}

const mockGallery: MockGalleryItem[] = [
  { id: 1, filename: '/gallery/edu-fair-1.jpg', altText: 'Education Fair 2025 Main Hall', category: 'CORPORATE', featured: true, sortOrder: 1, eventName: 'Education Fair 2025' },
  { id: 2, filename: '/gallery/wedding-expo-1.jpg', altText: 'Wedding Expo Stage Setup', category: 'WEDDING', featured: true, sortOrder: 2, eventName: 'Dream Weddings Expo' },
  { id: 3, filename: '/gallery/concert-1.jpg', altText: 'Independence Day Concert Crowd', category: 'CONCERT', featured: false, sortOrder: 3, eventName: 'Independence Day Concert' },
  { id: 4, filename: '/gallery/gala-1.jpg', altText: 'Corporate Gala Table Setting', category: 'GALA', featured: true, sortOrder: 4, eventName: 'Annual Business Awards' },
  { id: 5, filename: '/gallery/bts-1.jpg', altText: 'Behind the Scenes Setup', category: 'BEHIND_SCENES', featured: false, sortOrder: 5, eventName: null },
  { id: 6, filename: '/gallery/birthday-1.jpg', altText: 'Birthday Party Decorations', category: 'BIRTHDAY', featured: false, sortOrder: 6, eventName: null },
  { id: 7, filename: '/gallery/private-1.jpg', altText: 'Private Event Venue', category: 'PRIVATE', featured: false, sortOrder: 7, eventName: null },
  { id: 8, filename: '/gallery/corporate-2.jpg', altText: 'Corporate Conference Panel', category: 'CORPORATE', featured: true, sortOrder: 8, eventName: 'Tech Summit SL' },
];

const categoryLabels: Record<string, string> = {
  CORPORATE: 'Corporate',
  WEDDING: 'Wedding',
  BIRTHDAY: 'Birthday',
  CONCERT: 'Concert',
  PRIVATE: 'Private',
  GALA: 'Gala',
  BEHIND_SCENES: 'Behind Scenes',
};

const categoryColors: Record<string, string> = {
  CORPORATE: 'bg-blue-100 text-blue-700',
  WEDDING: 'bg-pink-100 text-pink-700',
  BIRTHDAY: 'bg-amber-100 text-amber-700',
  CONCERT: 'bg-purple-100 text-purple-700',
  PRIVATE: 'bg-emerald-100 text-emerald-700',
  GALA: 'bg-yellow-100 text-yellow-700',
  BEHIND_SCENES: 'bg-slate-100 text-slate-600',
};

export default function AdminGalleryPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [items, setItems] = useState(mockGallery);

  const toggleSelect = (id: number) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const toggleFeatured = (id: number) => {
    setItems(items.map((item) => item.id === id ? { ...item, featured: !item.featured } : item));
  };

  const filtered = items.filter((item) => {
    if (categoryFilter !== 'ALL' && item.category !== categoryFilter) return false;
    if (search && !item.altText.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gallery</h1>
          <p className="text-slate-500 text-sm mt-1">Manage event photos and media assets.</p>
        </div>
        {selected.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">{selected.size} selected</span>
            <button className="px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors border border-red-200">
              Delete Selected
            </button>
          </div>
        )}
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-blue-50/50">
        <Upload className="w-10 h-10 text-blue-400 mx-auto mb-3" />
        <p className="text-sm text-slate-600">Drag & drop images here, or click to browse</p>
        <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, WebP. Max 10MB per file.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by alt text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
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

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={cn(
              'rounded-xl bg-white border overflow-hidden group transition-all',
              selected.has(item.id) ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-200 hover:shadow-md'
            )}
          >
            {/* Thumbnail */}
            <div className="relative bg-slate-100 flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
              <ImageIcon className="w-12 h-12 text-slate-300" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-white/90 text-slate-700 hover:bg-white shadow-sm">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 shadow-sm">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* Select checkbox */}
              <button
                onClick={() => toggleSelect(item.id)}
                className="absolute top-2 left-2 p-0.5 rounded text-slate-400 hover:text-blue-600"
              >
                {selected.has(item.id) ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5" />}
              </button>
              {/* Featured star */}
              <button
                onClick={() => toggleFeatured(item.id)}
                className="absolute top-2 right-2"
              >
                <Star className={cn('w-5 h-5', item.featured ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300 hover:text-yellow-500')} />
              </button>
            </div>

            {/* Info */}
            <div className="p-3">
              <div className="text-sm text-slate-800 truncate mb-1">{item.altText}</div>
              <div className="flex items-center justify-between">
                <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', categoryColors[item.category])}>
                  {categoryLabels[item.category]}
                </span>
                {item.eventName && (
                  <span className="text-[10px] text-slate-400 truncate ml-2">{item.eventName}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-400 text-sm">No gallery items found.</div>
      )}
    </div>
  );
}
