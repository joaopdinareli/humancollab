import { Request, Response } from 'express';
import * as usuarioRepository from '../repositories/usuario.repository';
import * as argon2 from 'argon2';

export const getAllUsuariosController = async (req: Request, res: Response) => {
  const usuarios = await usuarioRepository.getAllUsuarios();
  res.json(usuarios);
};

export const getUsuarioByEmailController = async (req: Request, res: Response) => {
  const email = req.params.email;
  const usuario = await usuarioRepository.getUsuarioByEmail(email);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
};

export const getUsuarioByIdController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const usuario = await usuarioRepository.getUsuarioById(id);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
};

export const createUsuarioController = async (req: Request, res: Response) => {
  const { nome, empresa, email, cargo, tipo, senha } = req.body;
  const senhaCriptografada = await argon2.hash(senha);
  const newUsuario = await usuarioRepository.createUsuario({ nome, empresa, email, cargo, tipo, senha: senhaCriptografada });
  const { senha: _, ...usuarioSemSenha } = newUsuario;
  res.status(201).json(usuarioSemSenha);
};

export const updateUsuarioController = async (req: Request, res: Response) => {
  const email = req.params.email;
  const usuario = await usuarioRepository.updateUsuario(email, req.body);
  res.json(usuario);
};

export const deleteUsuarioController = async (req: Request, res: Response) => {
  const email = req.params.email;
  await usuarioRepository.deleteUsuario(email);
  res.status(204).send();
};