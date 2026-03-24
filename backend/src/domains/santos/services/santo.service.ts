import { prisma } from '../../../infra/database/prisma';
import { getSantoDoDia } from '../use-cases/get-santo-do-dia';
import { CategoriaSanto } from './santo.parser';

export interface Santo {
  id: number;
  nome: string;
  historia: string;
  diaFesta?: string | null;
  dataComemoracao?: string;
  descricaoCurta?: string | null;
  imagemUrl?: string | null;
  padroeiroDe?: string | null;
  intercessao?: string | null;
  seculo?: string | null;
  origem?: string | null;
  categoria?: string | null;
  fraseMarcante?: string | null;
}

const DEFAULT_CHURCH_IMAGE = 'https://images.unsplash.com/photo-1548625361-ec8531eb4ba5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFpbmVkJTIwZ2xhc3MlMjBjaHVyY2glMjB3aW5kb3d8ZW58MXx8fHwxNzczMzI2MDI0fDA&ixlib=rb-4.1.0&q=80&w=1080';

export class SantoService {
  
  static async listSantos() {
    return await prisma.santo.findMany();
  }

  static async getSantosByDiaFesta(diaFesta: string) {
    return await prisma.santo.findMany({
      where: { diaFesta },
    });
  }

  static async getSantoById(id: number) {
    if (id === 9999) {
      return this.getSantoDoDiaDetalhe();
    }
    return await prisma.santo.findUnique({ where: { id } });
  }

  static getHojeString(): { diaHoje: string, hojeDateString: string } {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    return {
      diaHoje: `${now.getDate().toString().padStart(2, '0')} de ${meses[now.getMonth()]}`,
      hojeDateString: now.toDateString()
    };
  }

  static async getSantoDoDiaList() {
    const { diaHoje } = this.getHojeString();

    const dbResult = await getSantoDoDia();

    if (dbResult.success) {
      const data = dbResult.data;
      const resultado: Santo = {
        id: 9999, 
        nome: data.nome,
        historia: data.historiaResumo || '',
        diaFesta: diaHoje,
        dataComemoracao: diaHoje,
        descricaoCurta: 'Santo do Dia',
        imagemUrl: data.imagemUrl || DEFAULT_CHURCH_IMAGE,
        categoria: data.categoria,
      };

      return resultado;
    }

    // FALLBACK 1
    const santoDoBanco = await prisma.santo.findFirst({ orderBy: { id: 'asc' } });
    if (santoDoBanco) return santoDoBanco;

    // FALLBACK 2
    return this.getFallbackSanto(diaHoje);
  }

  static async getSantoDoDiaDetalhe() {
    const { diaHoje } = this.getHojeString();

    let santoDoDia: Santo = this.getFallbackSanto(diaHoje);

    const dbResult = await getSantoDoDia();
    
    if (dbResult.success) {
      const data = dbResult.data;
      santoDoDia = {
        ...santoDoDia,
        nome: data.nome,
        historia: data.historiaCompleta || santoDoDia.historia,
        imagemUrl: data.imagemUrl || DEFAULT_CHURCH_IMAGE,
        descricaoCurta: '',
        categoria: data.categoria,
        padroeiroDe: data.padroeiroDe || santoDoDia.padroeiroDe,
        intercessao: data.intercessao || santoDoDia.intercessao,
        fraseMarcante: data.fraseMarcante || santoDoDia.fraseMarcante,
      };
    }

    return santoDoDia;
  }

  private static getFallbackSanto(diaHoje: string): Santo {
    return {
      id: 9999,
      nome: 'São José, Esposo de Maria',
      historia: 'Devido ao tempo da Quaresma ou erro de conexão, recordamos hoje a vida de São José, Patrono Universal da Igreja.',
      diaFesta: diaHoje,
      dataComemoracao: diaHoje,
      descricaoCurta: 'Padroeiro da Igreja Universal.',
      imagemUrl: DEFAULT_CHURCH_IMAGE,
      categoria: CategoriaSanto.SOLENIDADE,
    };
  }

  static async createSanto(data: { nome: string; historia: string; diaFesta: string }) {
    return await prisma.santo.create({ data });
  }

  static async updateSanto(id: number, data: { nome: string; historia: string; diaFesta: string }) {
    return await prisma.santo.update({ where: { id }, data });
  }
}