import api from '@/lib/axios';
import type { ApiResponse } from '@/types';

export interface Guest {
  id: string;
  name: string;
  code: string;
  phone?: string;
  rsvp: string | null;
  created_at: string;
}

interface PaginatedData {
  data: Guest[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export const guestService = {
  getByInvitation: (invitationId: string) =>
    api.get<ApiResponse<PaginatedData>>(`/invitations/${invitationId}/guests`).then((r) => r.data.data.data),
  create: (invitationId: string, payload: { name: string; phone?: string }) =>
    api.post<ApiResponse<Guest>>(`/invitations/${invitationId}/guests`, payload).then((r) => r.data.data),
};
