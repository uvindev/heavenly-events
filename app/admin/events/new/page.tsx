'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { slugify, cn } from '@/lib/utils';
import {
  ArrowLeft,
  Save,
  Send,
  Plus,
  Trash2,
  Upload,
  Info,
  Calendar as CalendarIcon,
  MapPin,
  Palette,
  Clock,
  Globe,
} from 'lucide-react';

const tabs = [
  { id: 'basic', label: 'Basic Info', icon: Info },
  { id: 'datetime', label: 'Date & Location', icon: CalendarIcon },
  { id: 'theme', label: 'Theme & Media', icon: Palette },
  { id: 'schedule', label: 'Schedule', icon: Clock },
  { id: 'seo', label: 'SEO', icon: Globe },
];

const categories = [
  'CORPORATE', 'WEDDING', 'BIRTHDAY', 'CONCERT', 'PRIVATE', 'GALA',
  'CONFERENCE', 'CULTURAL', 'CLIENT_EVENT', 'EDUCATION_FAIR', 'TRADE_EXPO',
  'HEALTH_EXPO', 'WEDDING_SHOW', 'OTHER',
];

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
}

export default function NewEventPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('basic');
  const [saving, setSaving] = useState(false);

  // Basic Info
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('CORPORATE');
  const [status, setStatus] = useState('DRAFT');
  const [isClientEvent, setIsClientEvent] = useState(false);
  const [clientName, setClientName] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');

  // Date & Location
  const [eventDate, setEventDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [doorsOpenTime, setDoorsOpenTime] = useState('');
  const [registrationDeadline, setRegistrationDeadline] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [requiresApproval, setRequiresApproval] = useState(false);
  const [venueName, setVenueName] = useState('');
  const [venueAddress, setVenueAddress] = useState('');
  const [venueCity, setVenueCity] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
  const [googleMapsEmbed, setGoogleMapsEmbed] = useState('');

  // Theme
  const [primaryColor, setPrimaryColor] = useState('#e65a35');
  const [secondaryColor, setSecondaryColor] = useState('#1a234d');
  const [accentColor, setAccentColor] = useState('#477ae0');

  // Schedule
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);

  // SEO
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(slugify(val));
  };

  const addScheduleItem = () => {
    setScheduleItems([...scheduleItems, { time: '', title: '', description: '' }]);
  };

  const updateScheduleItem = (index: number, field: keyof ScheduleItem, value: string) => {
    const updated = [...scheduleItems];
    const existing = updated[index];
    if (existing) {
      updated[index] = { ...existing, [field]: value };
    }
    setScheduleItems(updated);
  };

  const removeScheduleItem = (index: number) => {
    setScheduleItems(scheduleItems.filter((_, i) => i !== index));
  };

  const handleSave = async (publish: boolean) => {
    setSaving(true);
    try {
      const payload = {
        title, slug, shortDesc, description, category, status: publish ? 'PUBLISHED' : status,
        isClientEvent, clientName: isClientEvent ? clientName : null, facebookUrl: facebookUrl || null,
        eventDate, eventEndDate: eventEndDate || null, doorsOpenTime: doorsOpenTime || null,
        registrationDeadline: registrationDeadline || null, maxCapacity: maxCapacity ? parseInt(maxCapacity) : null,
        requiresApproval, venueName, venueAddress, venueCity,
        googleMapsUrl: googleMapsUrl || null, googleMapsEmbed: googleMapsEmbed || null,
        primaryColor, secondaryColor, accentColor,
        schedule: scheduleItems, metaTitle: metaTitle || null, metaDesc: metaDesc || null,
      };

      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/events');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to create event');
      }
    } catch {
      alert('Network error');
    } finally {
      setSaving(false);
    }
  };

  const inputClass = 'w-full px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors';
  const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">Create New Event</h1>
          <p className="text-slate-500 text-sm mt-0.5">Fill in the details below to create a new event.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 border border-slate-200 transition-colors disabled:opacity-50 shadow-sm"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            Publish
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="rounded-xl bg-white border border-slate-200 p-6">
        {/* Basic Info */}
        {activeTab === 'basic' && (
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Event Title *</label>
              <input type="text" value={title} onChange={(e) => handleTitleChange(e.target.value)} className={inputClass} placeholder="e.g. Colombo Education Fair 2026" />
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClass} placeholder="auto-generated-from-title" />
              <p className="text-xs text-slate-400 mt-1">URL: /events/{slug || '...'}</p>
            </div>
            <div>
              <label className={labelClass}>Short Description</label>
              <input type="text" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} className={inputClass} placeholder="Brief description for cards and previews" maxLength={500} />
            </div>
            <div>
              <label className={labelClass}>Full Description *</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={cn(inputClass, 'h-40 resize-y')} placeholder="Detailed event description..." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Category *</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className={cn(inputClass, 'appearance-none cursor-pointer')}>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat.replace(/_/g, ' ')}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className={cn(inputClass, 'appearance-none cursor-pointer')}>
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={isClientEvent} onChange={(e) => setIsClientEvent(e.target.checked)} className="sr-only peer" />
                <div className="w-10 h-5 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
              </label>
              <span className="text-sm text-slate-700">This is a Client Event</span>
            </div>
            {isClientEvent && (
              <div>
                <label className={labelClass}>Client Name</label>
                <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} className={inputClass} placeholder="Client or company name" />
              </div>
            )}
            <div>
              <label className={labelClass}>Facebook Event URL</label>
              <input type="url" value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} className={inputClass} placeholder="https://facebook.com/events/..." />
            </div>
          </div>
        )}

        {/* Date & Location */}
        {activeTab === 'datetime' && (
          <div className="space-y-6">
            <h3 className="text-slate-900 font-semibold flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-blue-600" /> Date & Time
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Event Date *</label>
                <input type="datetime-local" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>End Date</label>
                <input type="datetime-local" value={eventEndDate} onChange={(e) => setEventEndDate(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Doors Open</label>
                <input type="datetime-local" value={doorsOpenTime} onChange={(e) => setDoorsOpenTime(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Registration Deadline</label>
                <input type="datetime-local" value={registrationDeadline} onChange={(e) => setRegistrationDeadline(e.target.value)} className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Max Capacity</label>
                <input type="number" value={maxCapacity} onChange={(e) => setMaxCapacity(e.target.value)} className={inputClass} placeholder="e.g. 500" />
              </div>
              <div className="flex items-end pb-1">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100 w-full">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={requiresApproval} onChange={(e) => setRequiresApproval(e.target.checked)} className="sr-only peer" />
                    <div className="w-10 h-5 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                  </label>
                  <span className="text-sm text-slate-700">Requires Approval</span>
                </div>
              </div>
            </div>

            <h3 className="text-slate-900 font-semibold flex items-center gap-2 pt-4 border-t border-slate-200">
              <MapPin className="w-4 h-4 text-blue-600" /> Venue Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Venue Name *</label>
                <input type="text" value={venueName} onChange={(e) => setVenueName(e.target.value)} className={inputClass} placeholder="e.g. BMICH" />
              </div>
              <div>
                <label className={labelClass}>City *</label>
                <input type="text" value={venueCity} onChange={(e) => setVenueCity(e.target.value)} className={inputClass} placeholder="e.g. Colombo" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Address *</label>
              <input type="text" value={venueAddress} onChange={(e) => setVenueAddress(e.target.value)} className={inputClass} placeholder="Full venue address" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Google Maps URL</label>
                <input type="url" value={googleMapsUrl} onChange={(e) => setGoogleMapsUrl(e.target.value)} className={inputClass} placeholder="https://maps.google.com/..." />
              </div>
              <div>
                <label className={labelClass}>Google Maps Embed URL</label>
                <input type="url" value={googleMapsEmbed} onChange={(e) => setGoogleMapsEmbed(e.target.value)} className={inputClass} placeholder="https://www.google.com/maps/embed?..." />
              </div>
            </div>
          </div>
        )}

        {/* Theme & Media */}
        {activeTab === 'theme' && (
          <div className="space-y-6">
            <h3 className="text-slate-900 font-semibold flex items-center gap-2">
              <Palette className="w-4 h-4 text-blue-600" /> Event Colors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className={labelClass}>Primary Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer bg-transparent" />
                  <input type="text" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className={inputClass} maxLength={7} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Secondary Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer bg-transparent" />
                  <input type="text" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className={inputClass} maxLength={7} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Accent Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer bg-transparent" />
                  <input type="text" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className={inputClass} maxLength={7} />
                </div>
              </div>
            </div>

            <h3 className="text-slate-900 font-semibold flex items-center gap-2 pt-4 border-t border-slate-200">
              <Upload className="w-4 h-4 text-blue-600" /> Cover Image
            </h3>
            <div className="border-2 border-dashed border-blue-200 rounded-xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer bg-blue-50/50">
              <Upload className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <p className="text-sm text-slate-600">Drag & drop your cover image here, or click to browse</p>
              <p className="text-xs text-slate-400 mt-1">Recommended: 1920x1080, Max 5MB, JPG/PNG/WebP</p>
            </div>
          </div>
        )}

        {/* Schedule */}
        {activeTab === 'schedule' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900 font-semibold">Event Schedule</h3>
              <button onClick={addScheduleItem} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors">
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
            {scheduleItems.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm">
                No schedule items yet. Click &quot;Add Item&quot; to get started.
              </div>
            )}
            {scheduleItems.map((item, index) => (
              <div key={index} className="flex gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="w-32 shrink-0">
                  <label className={labelClass}>Time</label>
                  <input type="text" value={item.time} onChange={(e) => updateScheduleItem(index, 'time', e.target.value)} className={inputClass} placeholder="09:00 AM" />
                </div>
                <div className="flex-1">
                  <label className={labelClass}>Title</label>
                  <input type="text" value={item.title} onChange={(e) => updateScheduleItem(index, 'title', e.target.value)} className={inputClass} placeholder="Session title" />
                </div>
                <div className="flex-1">
                  <label className={labelClass}>Description</label>
                  <input type="text" value={item.description} onChange={(e) => updateScheduleItem(index, 'description', e.target.value)} className={inputClass} placeholder="Brief description" />
                </div>
                <div className="flex items-end pb-1">
                  <button onClick={() => removeScheduleItem(index)} className="p-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SEO */}
        {activeTab === 'seo' && (
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Meta Title</label>
              <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className={inputClass} placeholder="SEO title (max 70 characters)" maxLength={70} />
              <p className="text-xs text-slate-400 mt-1">{metaTitle.length}/70 characters</p>
            </div>
            <div>
              <label className={labelClass}>Meta Description</label>
              <textarea value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} className={cn(inputClass, 'h-24 resize-y')} placeholder="SEO description (max 160 characters)" maxLength={160} />
              <p className="text-xs text-slate-400 mt-1">{metaDesc.length}/160 characters</p>
            </div>
            {/* Preview */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider">Search Preview</p>
              <div className="text-blue-600 text-base font-medium truncate">{metaTitle || title || 'Event Title'}</div>
              <div className="text-emerald-600 text-xs mt-0.5">heavenlyevents.lk/events/{slug || '...'}</div>
              <div className="text-slate-500 text-sm mt-1 line-clamp-2">{metaDesc || shortDesc || 'Event description will appear here...'}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
