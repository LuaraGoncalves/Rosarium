import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const santo = await prisma.santo.findUnique({ where: { id: 1 } });
  if (!santo) return;

  const historiaFormatada = santo.historia.replace(/  /g, '\n\n');

  const updated = await prisma.santo.update({
    where: { id: 1 },
    data: {
      seculo: 'Século XIX',
      historia: historiaFormatada,
    }
  });

  console.log('Fixed Santa Teresinha in DB');
}

main().catch(console.error).finally(() => prisma.$disconnect());
