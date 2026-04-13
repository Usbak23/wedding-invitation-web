import api from '@/lib/axios';
import type { RSVP, RSVPStatus, ApiResponse } from '@/types';

interface PaginatedData {
  data: RSVP[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export const rsvpService = {
  getByInvitation: (invitationId: string) =>
    api.get<ApiResponse<PaginatedData>>(`/rsvp/invitation/${invitationId}`).then((r) => r.data.data.data),
  create: (payload: { guest_id: string; invitation_id: string; status: RSVPStatus; message?: string; total_persons?: number }) =>
    api.post<ApiResponse<RSVP>>('/rsvp', payload).then((r) => r.data.data),
};
