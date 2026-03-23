import { useState, useEffect } from 'react';
import { api } from '@/shared/services/api';

export interface BreviarioData {
  data: string;
  tempo: string;
  semana: string;
  oficio: any;
  laudes: any;
  vesperas: any;
  completas: any;
  hora_media?: any;
}

export function useBreviario() {
  const [data, setData] = useState<BreviarioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBreviario() {
      try {
        setLoading(true);
        const response = await api.get('/liturgia/hoje');
        
        setData(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar a Liturgia e Breviário do Backend');
        console.error("Erro no fetch do breviario", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBreviario();
  }, []);

  return { data, loading, error };
}
