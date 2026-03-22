'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/adminStore';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Image,
  Handshake,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/events', label: 'Events', icon: Calendar },
  { href: '/admin/registrations', label: 'Registrations', icon: Users },
  { href: '/admin/gallery', label: 'Gallery', icon: Image },
  { href: '/admin/sponsors', label: 'Sponsors', icon: Handshake },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

const roleBadgeColors: Record<string, string> = {
  SUPER_ADMIN: 'bg-red-100 text-red-600 border-red-200',
  ADMIN: 'bg-blue-100 text-blue-600 border-blue-200',
  EDITOR: 'bg-green-100 text-green-600 border-green-200',
};

const roleLabels: Record<string, string> = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  EDITOR: 'Editor',
};

export default function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, clearCurrentUser } = useAdminStore();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      clearCurrentUser();
      router.push('/admin/login');
    } catch {
      clearCurrentUser();
      router.push('/admin/login');
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-blue-700/30">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <img
            src="/images/heavenly_logo.png"
            alt="Heavenly Events"
            className="h-9 w-auto rounded-lg"
          />
          <div>
            <div className="text-white font-semibold text-sm tracking-wide">Heavenly Events</div>
            <div className="text-[11px] text-blue-200/60 tracking-wider uppercase">Admin Panel</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group',
                isActive
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-blue-100/70 hover:text-white hover:bg-white/10'
              )}
            >
              <Icon className={cn('w-4.5 h-4.5', isActive ? 'text-white' : 'text-blue-200/50 group-hover:text-white')} />
              <span>{item.label}</span>
              {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-white/60" />}
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      {currentUser && (
        <div className="border-t border-blue-700/30 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-blue-700 text-xs font-semibold bg-white/90">
              {currentUser.fullName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white font-medium truncate">{currentUser.fullName}</div>
              <span
                className={cn(
                  'inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border font-medium',
                  roleBadgeColors[currentUser.role] || 'bg-white/20 text-blue-100'
                )}
              >
                <Shield className="w-2.5 h-2.5" />
                {roleLabels[currentUser.role] || currentUser.role}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-blue-200/70 hover:text-red-300 hover:bg-red-500/15 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-blue-700 border border-blue-600 text-white shadow-md"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-linear-to-b from-blue-800 to-blue-900 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-64 bg-linear-to-b from-blue-800 to-blue-900 shadow-2xl z-50">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-blue-200/70 hover:text-white hover:bg-white/10"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
