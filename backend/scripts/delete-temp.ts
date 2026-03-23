import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
prisma.santoDoDia.deleteMany({}).then(() => console.log('Deleted')).finally(() => prisma.$disconnect());
