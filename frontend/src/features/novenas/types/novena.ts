export interface NovenaDia {
  dia: number;
  titulo: string;
  meditacao: string;
  oracao: string;
}

export interface Novena {
  id: string;
  titulo: string;
  descricao: string;
  duracao: number;
  oracaoInicial: string;
  oracaoPrincipal: string;
  oracaoFinal: string;
  dias: NovenaDia[];
}
