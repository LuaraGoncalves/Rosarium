import { prisma } from '../../../infra/database/prisma';
import { Result } from '../../../shared/types/Result';
import { SantoScraper } from '../services/santo.scraper';
import { parseSantoHtml } from '../services/santo.parser';
import { SantoFormatter } from '../services/santo.formatter';
import { SantoDoDia } from '@prisma/client';

export async function getSantoDoDia(): Promise<Result<SantoDoDia>> {
  try {
    let santoDoDia = await prisma.santoDoDia.findUnique({
      where: { id: 'santo-do-dia' }
    });

    const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    today.setHours(0, 0, 0, 0);

    if (!santoDoDia || santoDoDia.data.getTime() !== today.getTime()) {
      try {
        const fetchResult = await SantoScraper.fetch();
        if (fetchResult.success && fetchResult.data) {
          const parseResult = parseSantoHtml(fetchResult.data);
          if (parseResult.success && parseResult.data) {
            const data = SantoFormatter.formatar(parseResult.data);
            
            santoDoDia = await prisma.santoDoDia.upsert({
              where: { id: 'santo-do-dia' },
              update: {
                data: today,
                nome: data.nome,
                historiaCompleta: data.historiaCompleta,
                historiaResumo: data.historiaResumo,
                imagemUrl: data.imagemUrl,
                padroeiroDe: data.padroeiroDe,
                intercessao: data.intercessao,
                fraseMarcante: data.fraseMarcante,
                categoria: data.categoria,
              },
              create: {
                id: 'santo-do-dia',
                data: today,
                nome: data.nome,
                historiaCompleta: data.historiaCompleta,
                historiaResumo: data.historiaResumo,
                imagemUrl: data.imagemUrl,
                padroeiroDe: data.padroeiroDe,
                intercessao: data.intercessao,
                fraseMarcante: data.fraseMarcante,
                categoria: data.categoria,
              },
            });
          }
        }
      } catch (updateError) {
        console.error('[getSantoDoDia] Erro ao atualizar o santo do dia sob demanda:', updateError);
      }
    }

    if (!santoDoDia) {
      return { success: false, error: 'SANTO_DO_DIA_NOT_FOUND' };
    }

    return { success: true, data: santoDoDia };
  } catch (error) {
    console.error('[getSantoDoDia] Erro ao buscar no banco:', error);
    return { success: false, error: 'DATABASE_ERROR', details: error };
  }
}
