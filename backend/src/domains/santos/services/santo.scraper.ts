import { Result } from '../../../shared/types/Result';

export class SantoScraper {
  static async fetch(): Promise<Result<string>> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000); // 6s limit
    
    try {
      const response = await fetch('https://santo.cancaonova.com/', { signal: controller.signal });
      if (!response.ok) {
        return { success: false, error: 'HTTP_ERROR_FETCHING_SANTO' };
      }

      const html = await response.text();
      return { success: true, data: html };
    } catch (error) {
      console.error('[SantoScraper] Erro ao buscar HTML do santo:', error);
      return { success: false, error: 'SCRAPER_FAILED', details: error };
    } finally {
      clearTimeout(timeout);
    }
  }
}
