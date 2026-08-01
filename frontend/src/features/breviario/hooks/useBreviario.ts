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

const FALLBACK_BREVIARIO: BreviarioData = {
  data: new Date().toLocaleDateString('pt-BR'),
  tempo: 'Oração diária',
  semana: 'Ritmo de recolhimento',
  oficio: {
    invitatorio: 'Abri, Senhor, os meus lábios. E minha boca anunciará vosso louvor.',
    hino: 'Senhor, conduzi este dia com mansidão e luz.',
    salmodia: ['Vinde, adoremos o Senhor, fonte de paz e esperança.'],
    leitura1: 'Permanecei em oração e guardai a esperança no coração.',
    leitura2: 'Quando a liturgia online não responde, seguimos em oração com serenidade.',
    oracao: 'Senhor, guiai nossos passos e conservai-nos em vossa paz. Amém.',
  },
  laudes: {
    hino: 'Ao nascer do dia, louvamos o Senhor.',
    salmodia: ['Minha alma tem sede de vós, Senhor.'],
    leitura: 'A luz de Cristo ilumine nossos pensamentos e escolhas.',
    benedictus: 'Bendito seja o Senhor, Deus de Israel.',
    preces: ['Por todos que começam este dia.', 'Pelos que precisam de consolo e coragem.'],
    oracao: 'Deus de bondade, sustentai-nos neste dia. Amém.',
  },
  vesperas: {
    hino: 'Ao cair da tarde, entregamos a Deus o que vivemos.',
    salmodia: ['Suba a minha oração como incenso à vossa presença.'],
    leitura: 'Ficai conosco, Senhor, pois a tarde cai.',
    magnificat: 'A minha alma engrandece o Senhor.',
    preces: ['Pelos que encerram sua jornada.', 'Pelas famílias e pelos enfermos.'],
    oracao: 'Acolhei, Senhor, nossa gratidão e nosso descanso. Amém.',
  },
  completas: {
    hino: 'Antes que o dia chegue ao fim, guardai-nos, Senhor.',
    salmodia: ['Quem habita ao abrigo do Altíssimo vive à sombra do Senhor.'],
    leitura: 'Em paz me deito e logo adormeço, porque só vós me fazeis repousar seguro.',
    nunc_dimittis: 'Agora, Senhor, deixai o vosso servo ir em paz.',
    oracao: 'Visitai, Senhor, esta casa e guardai-nos em paz. Amém.',
  },
};

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
        setData(FALLBACK_BREVIARIO);
        setError(null);
        console.error('Erro no fetch do breviario', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBreviario();
  }, []);

  return { data, loading, error };
}
