import api from '@/lib/axios';
import type { User, LoginPayload, RegisterPayload, ApiResponse } from '@/types';

export const authService = {
  login: async (payload: LoginPayload) => {
    const res = await api.post<ApiResponse<{ access_token: string }>>('/auth/login', payload);
    const { access_token } = res.data.data;
    // Fetch full profile to get name
    const profileRes = await api.get<ApiResponse<User>>('/auth/me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return { access_token, user: profileRes.data.data };
  },

  register: (payload: RegisterPayload) =>
    api.post<ApiResponse<User>>('/auth/register', payload).then((r) => r.data.data),
};
