import { useEffect, useState } from 'react';
import axios from 'axios';
import { santosApi } from '../services/santos.api';
import { Santo } from '../types/santo';

export function useSantos() {
  const [santos, setSantos] = useState<Santo[]>([]);
  const [santoDoDia, setSantoDoDia] = useState<Santo | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSantos = async () => {
      try {
        setLoading(true);

        const [listaSantos, hojeSanto] = await Promise.all([
          santosApi.getTodosSantos().catch(() => [] as Santo[]),
          santosApi.getSantoDoDia().catch(() => null as Santo | null),
        ]);

        setSantos(listaSantos);
        setSantoDoDia(hojeSanto);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(error.message || 'Erro ao buscar dados dos santos');
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Erro ao buscar dados dos santos');
        }
        console.error('Erro na API de Santos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSantos();
  }, []);

  return { santos, santoDoDia, loading, error };
}
