export const AdminRole = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  EDITOR: 'EDITOR',
} as const;

export type AdminRole = (typeof AdminRole)[keyof typeof AdminRole];

export interface AdminUser {
  id: number;
  email: string;
  fullName: string;
  role: AdminRole;
  isActive: boolean;
  mustChangePassword: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
}

export type Permission =
  | 'events:create'
  | 'events:read'
  | 'events:update'
  | 'events:delete'
  | 'events:publish'
  | 'registrations:read'
  | 'registrations:update'
  | 'registrations:delete'
  | 'registrations:export'
  | 'registrations:checkin'
  | 'gallery:create'
  | 'gallery:read'
  | 'gallery:update'
  | 'gallery:delete'
  | 'sponsors:create'
  | 'sponsors:read'
  | 'sponsors:update'
  | 'sponsors:delete'
  | 'blog:create'
  | 'blog:read'
  | 'blog:update'
  | 'blog:delete'
  | 'blog:publish'
  | 'inquiries:read'
  | 'inquiries:update'
  | 'users:create'
  | 'users:read'
  | 'users:update'
  | 'users:delete'
  | 'settings:read'
  | 'settings:update';

export const permissions: Record<AdminRole, Permission[]> = {
  SUPER_ADMIN: [
    'events:create',
    'events:read',
    'events:update',
    'events:delete',
    'events:publish',
    'registrations:read',
    'registrations:update',
    'registrations:delete',
    'registrations:export',
    'registrations:checkin',
    'gallery:create',
    'gallery:read',
    'gallery:update',
    'gallery:delete',
    'sponsors:create',
    'sponsors:read',
    'sponsors:update',
    'sponsors:delete',
    'blog:create',
    'blog:read',
    'blog:update',
    'blog:delete',
    'blog:publish',
    'inquiries:read',
    'inquiries:update',
    'users:create',
    'users:read',
    'users:update',
    'users:delete',
    'settings:read',
    'settings:update',
  ],
  ADMIN: [
    'events:create',
    'events:read',
    'events:update',
    'events:publish',
    'registrations:read',
    'registrations:update',
    'registrations:export',
    'registrations:checkin',
    'gallery:create',
    'gallery:read',
    'gallery:update',
    'gallery:delete',
    'sponsors:create',
    'sponsors:read',
    'sponsors:update',
    'sponsors:delete',
    'blog:create',
    'blog:read',
    'blog:update',
    'blog:delete',
    'blog:publish',
    'inquiries:read',
    'inquiries:update',
    'users:read',
    'settings:read',
  ],
  EDITOR: [
    'events:read',
    'events:update',
    'registrations:read',
    'registrations:checkin',
    'gallery:read',
    'gallery:create',
    'gallery:update',
    'sponsors:read',
    'blog:create',
    'blog:read',
    'blog:update',
    'inquiries:read',
  ],
};
