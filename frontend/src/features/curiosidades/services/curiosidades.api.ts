import { api } from '@/shared/services/api';
import type { Curiosidade } from '../types/curiosidade';

export const curiosidadesApi = {
  async list(search?: string) {
    const response = await api.get<Curiosidade[]>('/curiosidades', {
      params: search ? { search } : undefined,
    });
    return response.data;
  },
  async create(
    data: Omit<Curiosidade, 'id' | 'santo'> & { santoId?: number | null; publicado?: boolean }
  ) {
    const response = await api.post<Curiosidade>('/curiosidades', data);
    return response.data;
  },
};
