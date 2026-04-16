import api from '@/lib/axios';
import type { User, LoginPayload, RegisterPayload, ApiResponse } from '@/types';

export const authService = {
  login: async (payload: LoginPayload) => {
    // Backend sets httpOnly cookie, we just fetch user profile
    await api.post('/auth/login', payload);
    const profileRes = await api.get<ApiResponse<User>>('/auth/me');
    return profileRes.data.data;
  },

  register: (payload: RegisterPayload) =>
    api.post<ApiResponse<User>>('/auth/register', payload).then((r) => r.data.data),

  me: () =>
    api.get<ApiResponse<User>>('/auth/me').then((r) => r.data.data),

  logout: () =>
    api.post('/auth/logout'),
};
