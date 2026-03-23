import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
prisma.santo.update({ where: { id: 1 }, data: { imagemUrl: '/images/santa-terezinha.jpg' } }).then(s => console.log('Updated:', s));