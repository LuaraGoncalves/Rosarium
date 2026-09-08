import * as cheerio from 'cheerio';
import { SantoFormatter } from './santo.formatter';
import { Result } from '../../../shared/types/Result';
import { logger } from '@/infra/logger/logger';

export enum CategoriaSanto {
  PAPA = 'Papa',
  VIRGEM = 'Virgem',
  MARTIR = 'Mártir',
  BISPO = 'Bispo',
  SACERDOTE = 'Sacerdote',
  RELIGIOSO = 'Religioso(a)',
  MEMORIA = 'Memória',
  SOLENIDADE = 'Solenidade',
  FESTA = 'Festa',
  PADROEIRO = 'Padroeiro',
  NENHUMA = 'Nenhuma',
}

export interface SantoScrapedData {
  nome: string;
  historiaResumo: string;
  historiaCompleta: string;
  imagemUrl: string | null;
  padroeiroDe?: string;
  intercessao?: string;
  fraseMarcante?: string;
  categoria?: CategoriaSanto;
}

export function detectCategoria(nome: string, historia: string): CategoriaSanto {
  const nomeLower = nome.toLowerCase();
  const histLower = historia.toLowerCase();

  if (nomeLower.includes('papa') || histLower.includes('papa')) return CategoriaSanto.PAPA;
  if (nomeLower.includes('virgem') || histLower.includes('virgem')) return CategoriaSanto.VIRGEM;
  if (nomeLower.includes('mártir') || histLower.includes('martírio')) return CategoriaSanto.MARTIR;
  if (nomeLower.includes('bispo') || histLower.includes('arcebispo')) return CategoriaSanto.BISPO;
  if (nomeLower.includes('padre') || nomeLower.includes('sacerdote'))
    return CategoriaSanto.SACERDOTE;
  if (nomeLower.includes('frei') || nomeLower.includes('irmã') || nomeLower.includes('monge'))
    return CategoriaSanto.RELIGIOSO;

  return CategoriaSanto.MEMORIA;
}

function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function includesAny(text: string, terms: string[]): boolean {
  return terms.some((term) => {
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^a-z])${escapedTerm}(?=$|[^a-z])`).test(text);
  });
}

export function detectIntercessao(nome: string, historia: string, padroeiroDe?: string): string {
  const normalizedName = normalizeText(nome);
  const thematicText = normalizeText(`${historia} ${padroeiroDe ?? ''}`);

  const specificIntercessions = [
    {
      terms: ['santa rita', 'rita de cassia'],
      intercessao: 'Causas impossíveis, famílias, perdão e reconciliação',
    },
    {
      terms: ['sao jose operario', 'jose operario'],
      intercessao: 'Trabalho, trabalhadores, dignidade profissional e sustento das famílias',
    },
    {
      terms: ['jose moscati'],
      intercessao: 'Médicos, enfermos, profissionais da saúde e estudantes de medicina',
    },
    {
      terms: ['sao jose', 'jose esposo'],
      intercessao: 'Famílias, pais, trabalhadores, proteção da Igreja e boa morte',
    },
    {
      terms: ['frei galvao', 'antonio de santanna galvao', 'santanna galvao'],
      intercessao: 'Enfermos, gestantes, famílias e profissionais da construção civil',
    },
    {
      terms: ['santo antonio', 'antonio de padua'],
      intercessao: 'Famílias, pobres, pessoas que buscam matrimônio e objetos perdidos',
    },
    {
      terms: ['sao francisco de assis', 'francisco de assis'],
      intercessao: 'Paz, simplicidade, pobres, criação e conversão do coração',
    },
    {
      terms: ['santa teresinha', 'teresa do menino jesus', 'teresinha do menino jesus'],
      intercessao: 'Missionários, vocações, confiança em Deus e pequenas ações feitas com amor',
    },
    {
      terms: ['santo expedito'],
      intercessao: 'Causas urgentes, decisões difíceis e perseverança na fé',
    },
    {
      terms: ['sao bento'],
      intercessao: 'Proteção espiritual, vida de oração, estudantes e comunidades religiosas',
    },
    {
      terms: ['santa luzia'],
      intercessao: 'Saúde dos olhos, visão, luz espiritual e fidelidade em meio às provações',
    },
    {
      terms: ['sao bras', 'sao braz'],
      intercessao: 'Doenças da garganta, proteção da voz e saúde dos enfermos',
    },
  ];

  const matchedIntercession = specificIntercessions.find(({ terms }) =>
    includesAny(normalizedName, terms)
  );

  if (matchedIntercession) {
    return matchedIntercession.intercessao;
  }

  if (includesAny(thematicText, ['medico', 'hospital', 'enfermo', 'doente', 'cura'])) {
    return 'Enfermos, profissionais da saúde, cuidado com os doentes e esperança na cura';
  }

  if (includesAny(thematicText, ['familia', 'matrimonio', 'esposo', 'esposa', 'mae', 'pai'])) {
    return 'Famílias, matrimônios, pais, mães e reconciliação no lar';
  }

  if (includesAny(thematicText, ['trabalhador', 'operario', 'carpinteiro', 'oficio'])) {
    return 'Trabalho, trabalhadores, sustento diário e santificação da vida profissional';
  }

  if (includesAny(thematicText, ['missionario', 'evangelizacao', 'pregacao', 'evangelho'])) {
    return 'Missionários, evangelização, anúncio do Evangelho e perseverança apostólica';
  }

  if (includesAny(thematicText, ['martir', 'martirio', 'perseguicao'])) {
    return 'Coragem na fé, cristãos perseguidos, perseverança e fidelidade a Cristo';
  }

  if (includesAny(thematicText, ['bispo', 'papa', 'pastor', 'sacerdote'])) {
    return 'Pastores da Igreja, sacerdotes, liderança cristã e fidelidade ao serviço de Deus';
  }

  if (includesAny(thematicText, ['virgem', 'castidade', 'pureza'])) {
    return 'Pureza, castidade, juventude e consagração a Deus';
  }

  return 'Intercede por nós junto a Deus';
}

export function parseSantoHtml(html: string): Result<SantoScrapedData> {
  try {
    const $ = cheerio.load(html);

    const nomeSanto = $('h1.entry-title').first().text().trim();
    if (!nomeSanto) {
      return { success: false, error: 'NO_SANTO_FOUND_IN_HTML' };
    }

    const paragrafos = $('.entry-content p');
    const listaParagrafos: string[] = [];

    paragrafos.each((i, p) => {
      $(p).find('strong, b').remove();

      const texto = $(p).text().trim();
      if (texto.length > 20) {
        listaParagrafos.push(texto);
      }
    });

    const paragrafosUnicos = SantoFormatter.removerDuplicados(listaParagrafos);

    const historiaCompleta =
      paragrafosUnicos.join('\n\n') ||
      'A vida deste santo nos ensina a amar a Deus com todo o coração e alma.';

    const historiaResumo =
      paragrafosUnicos.slice(0, 3).join(' ').substring(0, 300).trim() || historiaCompleta;

    let padroeiroDe: string | undefined = undefined;
    let intercessao = 'Intercede por nós junto a Deus';
    let fraseMarcante: string | undefined = undefined;

    const matchPadroeiro = historiaCompleta.match(
      /(?:padroeiro|padroeira|protetor|protetora)(?:\s+d[eao]s?)?\s+([^.,;]+)/i
    );
    if (matchPadroeiro && matchPadroeiro[1]) {
      padroeiroDe = matchPadroeiro[1].trim();
      padroeiroDe = padroeiroDe.charAt(0).toUpperCase() + padroeiroDe.slice(1);
    }

    intercessao = detectIntercessao(nomeSanto, historiaCompleta, padroeiroDe);

    const matchFrase = historiaCompleta.match(/["'](.*?)["']/);
    if (matchFrase && matchFrase[1] && matchFrase[1].length > 10) {
      fraseMarcante = `"${matchFrase[1].trim()}"`;
    }

    const imagemUrl =
      $('img.wp-post-image').first().attr('src') ||
      $('.entry-content img').not('[src*="icon"]').first().attr('src') ||
      null;

    const categoria = detectCategoria(nomeSanto, historiaCompleta);

    return {
      success: true,
      data: {
        nome: nomeSanto,
        historiaResumo,
        historiaCompleta,
        imagemUrl,
        padroeiroDe,
        intercessao,
        fraseMarcante,
        categoria,
      },
    };
  } catch (error) {
    logger.error({ error }, 'failed to parse santo html');
    return { success: false, error: 'PARSE_FAILED', details: error };
  }
}
