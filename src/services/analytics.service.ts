import api from '@/lib/axios';
import type { ApiResponse } from '@/types';

export interface Stats {
  total_guests: number;
  total_rsvp: number;
  belum_rsvp: number;
  hadir: number;
  tidak: number;
  mungkin: number;
}

export const analyticsService = {
  getByInvitation: (invitationId: string) =>
    api.get<ApiResponse<Stats>>(`/invitations/${invitationId}/stats`).then((r) => r.data.data),
};
