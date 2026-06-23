import { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '@/shared/services/api';
import { Santo } from '../types/santo';

export function useSanto(id?: string) {
  const [santo, setSanto] = useState<Santo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchSanto = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/santos/${id}`);
        setSanto(res.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(error.message || 'Erro ao buscar santo');
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Erro ao buscar santo');
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSanto();
  }, [id]);

  return { santo, loading, error };
}
