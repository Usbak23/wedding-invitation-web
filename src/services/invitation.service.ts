import api from '@/lib/axios';
import type { Invitation, ApiResponse } from '@/types';

export type InvitationPayload = {
  groom_name: string;
  bride_name: string;
  akad_date?: string | null;
  akad_location?: string | null;
  akad_maps_url?: string | null;
  resepsi_date?: string | null;
  resepsi_location?: string | null;
  resepsi_maps_url?: string | null;
  cover_photo?: string | null;
  music_url?: string | null;
  custom_message?: string | null;
};

interface PaginatedData {
  data: Invitation[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export const invitationService = {
  getAll: () =>
    api.get<ApiResponse<PaginatedData>>('/invitations').then((r) => r.data.data.data),
  getById: (id: string) =>
    api.get<ApiResponse<Invitation>>(`/invitations/${id}`).then((r) => r.data.data),
  create: (payload: InvitationPayload) =>
    api.post<ApiResponse<Invitation>>('/invitations', payload).then((r) => r.data.data),
  update: (id: string, payload: Partial<InvitationPayload>) =>
    api.patch<ApiResponse<Invitation>>(`/invitations/${id}`, payload).then((r) => r.data.data),
  delete: (id: string) =>
    api.delete(`/invitations/${id}`).then((r) => r.data),
  publish: (id: string) =>
    api.post<ApiResponse<Invitation>>(`/invitations/${id}/publish`).then((r) => r.data.data),
};
