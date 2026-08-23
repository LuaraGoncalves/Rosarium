import { api } from '@/shared/services/api';

export type RosarioPrayer = {
  id: string;
  titulo: string;
  conteudo: Array<{
    subtitulo: string;
    texto: string;
  }>;
};

export type RosarioMysteryGroup = {
  slug?: string;
  tipo: string;
  dia: string;
  lista: Array<{
    titulo: string;
    leitura: string;
  }>;
};

export type RosarioResponse = {
  oracoes: RosarioPrayer[];
  misterios: RosarioMysteryGroup[];
  misterioHoje: RosarioMysteryGroup;
};

export async function getRosario() {
  const response = await api.get<RosarioResponse>('/rosario');
  return response.data;
}
