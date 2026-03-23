import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
prisma.santo.findMany().then(s => console.log(s.map(x => ({id: x.id, nome: x.nome}))));