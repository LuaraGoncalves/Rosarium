import { env } from '@/config/env';
import { logger } from '@/infra/logger/logger';
import { Result } from '../../../shared/types/Result';

interface SaintsCalendarRecord {
  patronage?: string[];
}

interface SaintsCalendarResponse {
  data?: SaintsCalendarRecord[];
}

function formatPatronage(patronage: string[]): string {
  return patronage
    .map((item) => item.replace(/[-_]/g, ' ').trim())
    .filter(Boolean)
    .join(', ');
}

export class SaintsCalendarService {
  static async findIntercessao(nome: string): Promise<Result<string>> {
    if (!env.SAINTS_API_KEY) {
      return { success: false, error: 'SAINTS_API_KEY_NOT_CONFIGURED' };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
      const url = new URL(`${env.SAINTS_API_URL}/saints`);
      url.searchParams.set('search', nome);
      url.searchParams.set('limit', '5');

      const response = await fetch(url, {
        signal: controller.signal,
        headers: { Authorization: `Bearer ${env.SAINTS_API_KEY}` },
      });

      if (!response.ok) {
        return { success: false, error: 'SAINTS_API_HTTP_ERROR' };
      }

      const payload = (await response.json()) as SaintsCalendarResponse;
      const patronage = payload.data?.find((saint) => saint.patronage?.length)?.patronage;

      if (!patronage?.length) {
        return { success: false, error: 'SAINTS_API_PATRONAGE_NOT_FOUND' };
      }

      return { success: true, data: formatPatronage(patronage) };
    } catch (error) {
      logger.warn({ error, nome }, 'failed to fetch saint patronage');
      return { success: false, error: 'SAINTS_API_FAILED', details: error };
    } finally {
      clearTimeout(timeout);
    }
  }
}
