import { prisma } from '../src/infra/database/prisma';
import { getSantoDoDia } from '../src/domains/santos/use-cases/get-santo-do-dia';

async function main() {
  console.log('Iniciando atualização diária do Santo do Dia...');

  const result = await getSantoDoDia();
  if (!result.success) {
    throw new Error(result.error);
  }

  console.log('Santo do Dia atualizado com sucesso no banco de dados!');
  console.log('Santo:', result.data.nome);
}

main()
  .catch((e) => {
    console.error('Erro na atualização:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
