import { create } from 'zustand';
import type { AdminUser } from '@/types/admin';

interface AdminState {
  currentUser: AdminUser | null;
  setCurrentUser: (user: AdminUser) => void;
  clearCurrentUser: () => void;
  isAuthenticated: () => boolean;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  currentUser: null,

  setCurrentUser: (user: AdminUser) => set({ currentUser: user }),

  clearCurrentUser: () => set({ currentUser: null }),

  isAuthenticated: () => get().currentUser !== null,
}));
