import { PrismaClient, Usuario } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllUsuarios = async (): Promise<Usuario[]> => {
  return prisma.usuario.findMany();
};

export const getUsuarioByEmail = async (email: string): Promise<Usuario | null> => {
  return prisma.usuario.findUnique({ where: { email } });
};

export const getUsuarioById = async (idUsuario: number): Promise<Usuario | null> => {
  return prisma.usuario.findUnique({ where: { id: idUsuario } });
};

export const createUsuario = async (data: Omit<Usuario, 'id'>): Promise<Usuario> => {
  return prisma.usuario.create({ data });
};

export const updateUsuario = async (email: string, data: Partial<Usuario>): Promise<Usuario> => {
  return prisma.usuario.update({ where: { email }, data });
};

export const deleteUsuario = async (email: string): Promise<Usuario> => {
  return prisma.usuario.delete({ where: { email } });
};