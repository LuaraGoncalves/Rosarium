import { useEffect, useState } from 'react';
import axios from 'axios';
import { santosApi } from '../services/santos.api';
import { Santo } from '../types/santo';

const FALLBACK_SANTO_DO_DIA: Santo = {
  id: 'santo-do-dia-fallback',
  nome: 'São José',
  descricaoCurta: 'Modelo de silêncio, cuidado e confiança em Deus.',
  historia:
    'São José recorda a fé simples e fiel: cuidar do essencial, proteger a família e caminhar com Deus mesmo quando o caminho parece silencioso.',
  imagemUrl:
    'https://upload.wikimedia.org/wikipedia/commons/2/2f/Guido_Reni_-_St_Joseph_with_the_Infant_Jesus.jpg',
  diaFesta: '19 de março',
  dataComemoracao: '03-19',
  seculo: 'Século I',
  categoria: 'Santo do Dia',
  fraseMarcante: 'A fidelidade também reza em silêncio.',
  padroeiroDe: 'Famílias, trabalhadores e da Igreja',
  intercessao: 'Proteção, trabalho, família e perseverança',
  origem: 'Nazaré',
};

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
        setSantoDoDia(hojeSanto ?? FALLBACK_SANTO_DO_DIA);
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
