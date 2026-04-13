import api from '@/lib/axios';
import type { Invitation, ApiResponse } from '@/types';

export interface GuestWithInvitation {
  invitation: Invitation;
  guest: {
    id: string;
    name: string;
    code: string;
    phone?: string;
    rsvp?: string | null;
  };
}

export const publicService = {
  getBySlug: (slug: string) =>
    api.get<ApiResponse<Invitation>>(`/public/${slug}`).then((r) => r.data.data),
  getGuestByCode: (slug: string, code: string) =>
    api.get<ApiResponse<GuestWithInvitation>>(`/public/${slug}/guests/${code}`).then((r) => r.data.data),
};
