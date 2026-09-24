export interface Curiosidade {
  id: number;
  titulo: string;
  conteudo: string;
  fonte: string;
  fonteUrl: string;
  imagemUrl?: string | null;
  santo?: { id: number; nome: string } | null;
}
