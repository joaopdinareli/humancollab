import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const readTarefas = async () => {
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

export const createTarefa = async (data: any) => {
  const { colaboradorId, ...rest } = data;
  let dataToCreate = { ...rest };
  if (colaboradorId) {
    dataToCreate = {
      ...rest,
      colaboradores: { connect: [{ id: colaboradorId }] },
    };
  }
  return prisma.tarefa.create({ data: dataToCreate });
};

export const updateTarefa = async (id: number, data: any) => {
  return prisma.tarefa.update({ where: { id }, data });
};

export const deleteTarefa = async (id: number) => {
  await prisma.checklist.deleteMany({ where: { tarefaId: id } });
  await prisma.anexo.deleteMany({ where: { tarefaId: id } });
  await prisma.comentario.deleteMany({ where: { tarefaId: id } });
  await prisma.lembrete.deleteMany({ where: { tarefaId: id } });
  await prisma.tarefa.update({ where: { id }, data: { colaboradores: { set: [] } } });
  return prisma.tarefa.delete({ where: { id } });
};
