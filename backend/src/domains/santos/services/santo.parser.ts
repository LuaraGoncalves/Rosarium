import * as cheerio from 'cheerio';
import { SantoFormatter } from './santo.formatter';
import { Result } from '../../../shared/types/Result';

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
  if (nomeLower.includes('padre') || nomeLower.includes('sacerdote')) return CategoriaSanto.SACERDOTE;
  if (nomeLower.includes('frei') || nomeLower.includes('irmã') || nomeLower.includes('monge')) return CategoriaSanto.RELIGIOSO;

  return CategoriaSanto.MEMORIA;
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

      let historiaCompleta = paragrafosUnicos.join('\n\n') || 'A vida deste santo nos ensina a amar a Deus com todo o coração e alma.';

      let historiaResumo = paragrafosUnicos.slice(0, 3).join(' ').substring(0, 300).trim() || historiaCompleta;

      let padroeiroDe = undefined;
      let intercessao = 'Intercede por nós junto a Deus';
      let fraseMarcante = undefined;

      const matchPadroeiro = historiaCompleta.match(/(?:padroeiro|padroeira|protetor|protetora)(?:\s+d[eao]s?)?\s+([^.,;]+)/i);
      if (matchPadroeiro && matchPadroeiro[1]) {
        padroeiroDe = matchPadroeiro[1].trim();
        padroeiroDe = padroeiroDe.charAt(0).toUpperCase() + padroeiroDe.slice(1);
      }

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
        }
      };
    } catch (error) {
      console.error('[SantoParser] Erro ao fazer parse do HTML:', error);
      return { success: false, error: 'PARSE_FAILED', details: error };
    }
}
