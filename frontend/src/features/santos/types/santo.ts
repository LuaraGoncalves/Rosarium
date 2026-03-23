export interface Santo {
  id: string;
  nome: string;
  descricaoCurta: string;
  historia: string;
  imagemUrl: string;
  diaFesta: string;
  dataComemoracao: string;
  seculo?: string;
  categoria?: string;
  fraseMarcante?: string;
  padroeiroDe?: string;
  intercessao?: string;
  origem?: string;
}