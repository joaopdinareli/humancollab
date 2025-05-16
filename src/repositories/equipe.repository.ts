import { PrismaClient, Equipe } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllEquipes = async (): Promise<Equipe[]> => {
  return prisma.equipe.findMany({ include: { membros: true, gerente: true } });
};

export const getEquipeById = async (idEquipe: number): Promise<Equipe | null> => {
  return prisma.equipe.findUnique({ where: { id: idEquipe }, include: { membros: true, gerente: true } });
};

export const createEquipe = async (data: Omit<Equipe, 'idEquipe'>): Promise<Equipe> => {
  return prisma.equipe.create({ data });
};

export const updateEquipe = async (idEquipe: number, data: Partial<Equipe>): Promise<Equipe> => {
  return prisma.equipe.update({ where: { id: idEquipe }, data });
};

export const deleteEquipe = async (idEquipe: number): Promise<Equipe> => {
  return prisma.equipe.delete({ where: { id: idEquipe } });
};