import { PrismaClient } from '@prisma/client';
import { SantoScraper } from '../src/domains/santos/services/santo.scraper';
import { parseSantoHtml } from '../src/domains/santos/services/santo.parser';
import { SantoFormatter } from '../src/domains/santos/services/santo.formatter';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando atualização diária do Santo do Dia...');
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const fetchResult = await SantoScraper.fetch();
  if (!fetchResult.success) {
    throw new Error(fetchResult.error);
  }

  const result = parseSantoHtml(fetchResult.data);
  if (!result.success) {
    throw new Error(result.error);
  }

  const data = SantoFormatter.formatar(result.data);

  const santoSalvo = await prisma.santoDoDia.upsert({
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
    }
  });

  console.log('Santo do Dia atualizado com sucesso no banco de dados!');
  console.log('Santo:', santoSalvo.nome);
}

main()
  .catch((e) => {
    console.error('Erro na atualização:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });