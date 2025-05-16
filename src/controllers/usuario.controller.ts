import { Request, Response } from 'express';
import * as usuarioRepository from '../repositories/usuario.repository';

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
  const newUsuario = await usuarioRepository.createUsuario({ nome, empresa, email, cargo, tipo, senha });
  res.status(201).json(newUsuario);
};

export const updateUsuarioController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const usuario = await usuarioRepository.updateUsuario(id, req.body);
  res.json(usuario);
};

export const deleteUsuarioController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await usuarioRepository.deleteUsuario(id);
  res.status(204).send();
};