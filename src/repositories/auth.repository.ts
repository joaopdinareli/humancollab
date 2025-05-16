import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findUsuarioByEmail = async (email: string) => {
  return prisma.usuario.findUnique({ where: { email } });
};