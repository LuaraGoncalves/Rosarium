import { useState, useEffect } from 'react';
import { api } from '@/shared/services/api';

export interface BreviarioHoraSection {
  invitatorio?: string;
  hino?: string;
  salmodia?: string[];
  leitura1?: string;
  leitura2?: string;
  leitura?: string;
  benedictus?: string;
  magnificat?: string;
  nunc_dimittis?: string;
  preces?: string[];
  oracao?: string;
}

export interface BreviarioData {
  data: string;
  tempo: string;
  semana: string;
  oficio: BreviarioHoraSection;
  laudes: BreviarioHoraSection;
  vesperas: BreviarioHoraSection;
  completas: BreviarioHoraSection;
  hora_media?: BreviarioHoraSection;
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
      } catch (error: unknown) {
        setError(
          error instanceof Error
            ? error.message
            : 'Erro ao carregar a Liturgia e Breviário do Backend'
        );
        console.error('Erro no fetch do breviario', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBreviario();
  }, []);

  return { data, loading, error };
}
