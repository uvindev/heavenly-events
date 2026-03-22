import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT, type AdminPayload } from '@/lib/auth';
import { permissions, type Permission, type AdminRole } from '@/types/admin';

export function getAdminFromRequest(request: NextRequest): AdminPayload | null {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return null;
  return verifyJWT(token);
}

export function requireAdmin(request: NextRequest): AdminPayload | NextResponse {
  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return admin;
}

export function requirePermission(
  request: NextRequest,
  permission: Permission
): AdminPayload | NextResponse {
  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const role = admin.role as AdminRole;
  const rolePermissions = permissions[role];

  if (!rolePermissions || !rolePermissions.includes(permission)) {
    return NextResponse.json(
      { error: 'Forbidden: insufficient permissions' },
      { status: 403 }
    );
  }

  return admin;
}

export function requireRole(
  request: NextRequest,
  requiredRoles: AdminRole[]
): AdminPayload | NextResponse {
  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!requiredRoles.includes(admin.role as AdminRole)) {
    return NextResponse.json(
      { error: 'Forbidden: insufficient role' },
      { status: 403 }
    );
  }

  return admin;
}

export function isNextResponse(value: unknown): value is NextResponse {
  return value instanceof NextResponse;
}
