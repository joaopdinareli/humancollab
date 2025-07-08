import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import * as authRepository from '../repositories/auth.repository';

export const loginController = async (req: Request, res: Response): Promise<void> => {
   const { email, senha } = req.body;
   if (!email || !senha) {
      res.status(400).json({ message: 'Email e senha são obrigatórios.' });
      return;
   }
   const usuario = await authRepository.findUsuarioByEmail(email);
   if (!usuario) {
      res.status(401).json({ message: 'Usuário não encontrado.' });
      return;
   }
   const senhaValida = await argon2.verify(usuario.senha, senha);
   if (!senhaValida) {
      res.status(401).json({ message: 'Senha inválida.' });
      return;
   }
   const token = jwt.sign(
      { email: usuario.email, tipo: usuario.tipo },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1h' }
   );
   res.json({ message: 'Login realizado com sucesso!', token, id: usuario.id });
};

export const meController = async (req: Request, res: Response): Promise<void> => {
  const user = (req as any).user;
  if (!user || !user.email) {
    res.status(401).json({ message: 'Não autenticado' });
    return;
  }
  const usuario = await authRepository.findUsuarioByEmail(user.email);
  if (!usuario) {
    res.status(404).json({ message: 'Usuário não encontrado' });
    return;
  }
  res.json({ nome: usuario.nome, email: usuario.email });
};