import { prisma } from '../../../infra/database/prisma';
import { Result } from '../../../shared/types/Result';
import { SantoScraper } from '../services/santo.scraper';
import { parseSantoHtml } from '../services/santo.parser';
import { SantoFormatter } from '../services/santo.formatter';
import { SantoDoDia } from '@prisma/client';
import { logger } from '@/infra/logger/logger';

export async function getSantoDoDia(): Promise<Result<SantoDoDia>> {
  try {
    let santoDoDia = await prisma.santoDoDia.findUnique({
      where: { id: 'santo-do-dia' },
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
        logger.warn({ updateError }, 'failed to refresh santo do dia on demand');
      }
    }

    if (!santoDoDia) {
      return { success: false, error: 'SANTO_DO_DIA_NOT_FOUND' };
    }

    return { success: true, data: santoDoDia };
  } catch (error) {
    logger.error({ error }, 'failed to fetch santo do dia from database');
    return { success: false, error: 'DATABASE_ERROR', details: error };
  }
}
