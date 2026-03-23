import { SantoScraper } from './santo.scraper';

async function run() {
  try {
    const result = await SantoScraper.fetch();

    if (!result.success) {
      console.error('Erro:', result.error);
      return;
    }

    console.log(result.data);
  } catch (error) {
    console.error(error);
  }
}

run();