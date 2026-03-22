'use client';

import { useState } from 'react';
import { useAdminStore } from '@/store/adminStore';
import {
  Save,
  Globe,
  BarChart3,
  Mail,
  Share2,
  Users,
  AlertTriangle,
  ShieldX,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sections = [
  { id: 'general', label: 'General', icon: Globe },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'email', label: 'Email / SMTP', icon: Mail },
  { id: 'social', label: 'Social Media', icon: Share2 },
  { id: 'accounts', label: 'Admin Accounts', icon: Users },
  { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
];

const mockAdmins = [
  { id: 1, fullName: 'Uvin Admin', email: 'admin@heavenlyevents.lk', role: 'SUPER_ADMIN', isActive: true, lastLoginAt: '2026-03-22T10:00:00' },
  { id: 2, fullName: 'Sarah Editor', email: 'sarah@heavenlyevents.lk', role: 'ADMIN', isActive: true, lastLoginAt: '2026-03-21T14:30:00' },
  { id: 3, fullName: 'Kamal Writer', email: 'kamal@heavenlyevents.lk', role: 'EDITOR', isActive: true, lastLoginAt: '2026-03-20T09:00:00' },
  { id: 4, fullName: 'Priya Former', email: 'priya@heavenlyevents.lk', role: 'EDITOR', isActive: false, lastLoginAt: '2026-01-15T08:00:00' },
];

const roleBadgeColors: Record<string, string> = {
  SUPER_ADMIN: 'bg-red-100 text-red-600',
  ADMIN: 'bg-blue-100 text-blue-600',
  EDITOR: 'bg-emerald-100 text-emerald-600',
};

export default function AdminSettingsPage() {
  const { currentUser } = useAdminStore();
  const [activeSection, setActiveSection] = useState('general');

  // Check permission
  if (currentUser?.role !== 'SUPER_ADMIN') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
          <ShieldX className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-xl font-bold text-slate-900 mb-2">Access Denied</h1>
        <p className="text-slate-500 text-sm max-w-md">
          You do not have permission to access Site Settings. This page is restricted to Super Administrators only.
        </p>
      </div>
    );
  }

  const inputClass = 'w-full px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors';
  const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage site configuration and admin accounts.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Section Nav */}
        <div className="lg:w-56 shrink-0">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-700'
                      : section.id === 'danger'
                        ? 'text-red-400 hover:text-red-600 hover:bg-red-50'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="rounded-xl bg-white border border-slate-200 p-6">
            {/* General */}
            {activeSection === 'general' && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-slate-900">General Settings</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Site Name</label>
                    <input type="text" defaultValue="Heavenly Events" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Tagline</label>
                    <input type="text" defaultValue="Sri Lanka's Premier Events Organizer" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone 1</label>
                    <input type="text" defaultValue="+94 11 234 5678" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone 2</label>
                    <input type="text" defaultValue="+94 77 123 4567" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input type="email" defaultValue="info@heavenlyevents.lk" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>WhatsApp</label>
                    <input type="text" defaultValue="+94771234567" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Address</label>
                  <textarea defaultValue="123 Event Street, Colombo 07, Sri Lanka" className={cn(inputClass, 'h-20 resize-y')} />
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            )}

            {/* Analytics */}
            {activeSection === 'analytics' && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-slate-900">Analytics & Tracking</h2>
                <div>
                  <label className={labelClass}>Google Tag Manager ID</label>
                  <input type="text" placeholder="GTM-XXXXXXX" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Google Analytics 4 Measurement ID</label>
                  <input type="text" placeholder="G-XXXXXXXXXX" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Meta (Facebook) Pixel ID</label>
                  <input type="text" placeholder="123456789012345" className={inputClass} />
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            )}

            {/* Email/SMTP */}
            {activeSection === 'email' && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-slate-900">Email / SMTP Configuration</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>SMTP Host</label>
                    <input type="text" placeholder="smtp.gmail.com" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>SMTP Port</label>
                    <input type="text" placeholder="587" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>SMTP Username</label>
                    <input type="text" placeholder="noreply@heavenlyevents.lk" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>SMTP Password</label>
                    <input type="password" placeholder="********" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>From Name</label>
                    <input type="text" defaultValue="Heavenly Events" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>From Email</label>
                    <input type="email" defaultValue="noreply@heavenlyevents.lk" className={inputClass} />
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            )}

            {/* Social Media */}
            {activeSection === 'social' && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-slate-900">Social Media Links</h2>
                <div>
                  <label className={labelClass}>Facebook</label>
                  <input type="url" placeholder="https://facebook.com/heavenlyevents" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Instagram</label>
                  <input type="url" placeholder="https://instagram.com/heavenlyevents" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>YouTube</label>
                  <input type="url" placeholder="https://youtube.com/@heavenlyevents" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>TikTok</label>
                  <input type="url" placeholder="https://tiktok.com/@heavenlyevents" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>LinkedIn</label>
                  <input type="url" placeholder="https://linkedin.com/company/heavenlyevents" className={inputClass} />
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            )}

            {/* Admin Accounts */}
            {activeSection === 'accounts' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">Admin Accounts</h2>
                  <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors">
                    <Plus className="w-4 h-4" /> Create Account
                  </button>
                </div>
                <div className="space-y-3">
                  {mockAdmins.map((admin) => (
                    <div key={admin.id} className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-semibold">
                        {admin.fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-800 font-medium">{admin.fullName}</span>
                          <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', roleBadgeColors[admin.role])}>
                            {admin.role.replace('_', ' ')}
                          </span>
                          {!admin.isActive && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">Inactive</span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500">{admin.email}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Last login: {admin.lastLoginAt ? new Date(admin.lastLoginAt).toLocaleDateString() : 'Never'}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="px-3 py-1.5 rounded-md text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
                          Change Password
                        </button>
                        <button className={cn(
                          'px-3 py-1.5 rounded-md text-xs transition-colors',
                          admin.isActive
                            ? 'text-amber-600 hover:bg-amber-50'
                            : 'text-emerald-600 hover:bg-emerald-50'
                        )}>
                          {admin.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Danger Zone */}
            {activeSection === 'danger' && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-red-600 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" /> Danger Zone
                </h2>
                <p className="text-sm text-slate-500">These actions are destructive and cannot be undone. Proceed with extreme caution.</p>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-red-200 bg-red-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm text-slate-800 font-medium">Clear Old Registration Data</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Remove registrations for completed events older than 1 year.</p>
                      </div>
                      <button className="px-4 py-2 rounded-lg border border-red-300 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors">
                        Clear Data
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm text-slate-800 font-medium">Rebuild Sitemap</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Regenerate the sitemap.xml with current published events and pages.</p>
                      </div>
                      <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-300 text-amber-700 text-sm font-medium hover:bg-amber-100 transition-colors">
                        <RefreshCw className="w-3.5 h-3.5" /> Rebuild
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
