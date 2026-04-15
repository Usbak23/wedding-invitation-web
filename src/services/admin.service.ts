import api from '@/lib/axios';
import type { Invitation, User, ApiResponse } from '@/types';

export interface AdminDashboard {
  totalUsers: number;
  totalInvitations: number;
  published: number;
  draft: number;
}

export const adminService = {
  getDashboard: () =>
    api.get<ApiResponse<AdminDashboard>>('/admin/dashboard').then((r) => r.data.data),
  getUsers: () =>
    api.get<ApiResponse<User[]>>('/admin/users').then((r) => r.data.data),
  deleteUser: (id: string) =>
    api.delete(`/admin/users/${id}`).then((r) => r.data),
  getInvitations: () =>
    api.get<ApiResponse<Invitation[]>>('/admin/invitations').then((r) => r.data.data),
};
