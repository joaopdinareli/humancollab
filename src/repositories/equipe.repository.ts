import { PrismaClient, Equipe } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllEquipes = async (): Promise<Equipe[]> => {
  return prisma.equipe.findMany({ include: { membros: true, gerente: true } });
};

export const getEquipeById = async (idEquipe: number): Promise<Equipe | null> => {
  return prisma.equipe.findUnique({ where: { id: idEquipe }, include: { membros: true, gerente: true } });
};

export const getEquipesByUsuariosEmail = async (email: string): Promise<Equipe[]> => {
  return prisma.equipe.findMany({
    where: {
      OR: [
        {
          membros: {
            some: {
              email: email
            }
          }
        },
        {
          gerente: {
            email: email
          }
        }
      ]
    },
    include: { membros: true, gerente: true }
  });
};

export const getEquipeByNome = async (nome: string): Promise<Equipe | null> => {
  return prisma.equipe.findUnique({ where: { nome }, include: { membros: true, gerente: true } });
};

export const createEquipe = async (data: Omit<Equipe, 'idEquipe'>): Promise<Equipe> => {
  return prisma.equipe.create({ data });
};

export const updateEquipe = async (nome: string, data: Partial<Equipe>): Promise<Equipe> => {
  return prisma.equipe.update({ where: { nome }, data });
};

export const deleteEquipe = async (nome: string): Promise<Equipe> => {
  return prisma.equipe.delete({ where: { nome } });
};