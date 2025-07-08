import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const listarTarefas = async () => {
  return prisma.tarefa.findMany({
    include: {
      colaboradores: true,
      projeto: true,
      checklist: true,
      anexos: true,
      comentarios: true,
      lembretes: true,
    },
  });
};
