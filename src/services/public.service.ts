import api from '@/lib/axios';
import type { Invitation, RSVP, ApiResponse } from '@/types';

export interface GuestWithInvitation {
  invitation: Invitation;
  guest: {
    id: string;
    name: string;
    code: string;
    phone?: string;
    created_at: string;
    rsvp: {
      id: string;
      status: string;
      total_persons: number;
      message: string | null;
      created_at: string;
    } | null;
  };
}

export const publicService = {
  getBySlug: (slug: string) =>
    api.get<ApiResponse<Invitation>>(`/public/${slug}`).then((r) => r.data.data),
  getGuestByCode: (slug: string, code: string) =>
    api.get<ApiResponse<GuestWithInvitation>>(`/public/${slug}/guests/${code}`).then((r) => r.data.data),
  getRsvps: (slug: string) =>
    api.get<ApiResponse<RSVP[]>>(`/public/${slug}/rsvps`).then((r) => r.data.data),
};
