export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthTokens {
  access_token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export type InvitationStatus = 'draft' | 'published';

export interface Invitation {
  id: string;
  slug: string;
  status: InvitationStatus;
  groom_name: string;
  bride_name: string;
  akad_date: string;
  akad_location: string;
  akad_maps_url?: string;
  resepsi_date: string;
  resepsi_location: string;
  resepsi_maps_url?: string;
  cover_photo?: string;
  music_url?: string;
  music_url?: string;
  template?: string;
  custom_message?: string;
  created_at: string;
  updated_at: string;
}

export interface Guest {
  id: string;
  invitation_id: string;
  name: string;
  phone?: string;
  created_at: string;
}

export type RSVPStatus = 'hadir' | 'tidak' | 'mungkin';

export interface RSVP {
  id: string;
  invitation_id: string;
  guest_name: string;
  status: RSVPStatus;
  message?: string;
  created_at: string;
}

export interface Analytics {
  totalGuests: number;
  totalRSVP: number;
  attending: number;
  notAttending: number;
  maybe: number;
  totalViews: number;
}

export interface PublicInvitation extends Invitation {
  rsvps?: RSVP[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
