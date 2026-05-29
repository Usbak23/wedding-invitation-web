import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // send httpOnly cookie automatically
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      const url = error.config?.url || '';
      const isAuthRoute = url.includes('/auth/');
      const isPublicRoute = url.includes('/public/');
      const isPublicPage = window.location.pathname !== '/login' && window.location.pathname !== '/register' && !window.location.pathname.startsWith('/dashboard');
      if (!isAuthRoute && !isPublicRoute && !isPublicPage) window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
