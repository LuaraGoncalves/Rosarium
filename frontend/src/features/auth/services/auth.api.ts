import { api } from '@/shared/services/api';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export const authApi = {
  async login(email: string, password: string) {
    const response = await api.post<{ user: AuthUser }>('/auth/login', { email, password });
    return response.data;
  },

  async register(name: string, email: string, password: string) {
    const response = await api.post<{ user: AuthUser }>('/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  },

  async me() {
    const response = await api.get<{ user: AuthUser }>('/auth/me');
    return response.data;
  },

  async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};
