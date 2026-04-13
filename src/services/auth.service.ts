import api from '@/lib/axios';
import type { User, LoginPayload, RegisterPayload, ApiResponse } from '@/types';

export const authService = {
  login: (payload: LoginPayload) =>
    api.post<ApiResponse<{ access_token: string }>>('/auth/login', payload).then((r) => r.data.data),

  register: (payload: RegisterPayload) =>
    api.post<ApiResponse<User>>('/auth/register', payload).then((r) => r.data.data),
};
