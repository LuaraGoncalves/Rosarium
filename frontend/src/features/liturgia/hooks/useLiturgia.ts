import { useState, useEffect } from 'react';
import { api } from '@/shared/services/api';

export interface LiturgiaDiaria {
  data: string;
  liturgia: string;
  cor: string;
  dia: string;
  primeiraLeitura: {
    referencia: string;
    titulo: string;
    texto: string;
  };
  segundaLeitura?: {
    referencia: string;
    titulo: string;
    texto: string;
  };
  salmo: {
    referencia: string;
    refrao: string;
    texto: string;
  };
  evangelho: {
    referencia: string;
    titulo: string;
    texto: string;
  };
}

export function useLiturgia() {
  const [data, setData] = useState<LiturgiaDiaria | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLiturgia() {
      try {
        setLoading(true);
        const response = await api.get<LiturgiaDiaria>('/liturgia/hoje');
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar a liturgia diária');
        console.error('Erro no fetch da liturgia', err);
      } finally {
        setLoading(false);
      }
    }

    fetchLiturgia();
  }, []);

  return { data, loading, error };
}
