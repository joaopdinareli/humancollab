import { Request, Response } from 'express';
import * as equipeRepository from '../repositories/equipe.repository';

export const getAllEquipesController = async (req: Request, res: Response) => {
  const equipes = await equipeRepository.getAllEquipes();
  res.json(equipes);
};

export const getEquipeByIdController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const equipe = await equipeRepository.getEquipeById(id);
  if (equipe) {
    res.json(equipe);
  } else {
    res.status(404).json({ message: 'Equipe não encontrada' });
  }
};

export const getEquipesByUsuariosEmailController = async (req: Request, res: Response) => {
  const email = req.params.email;
  const equipes = await equipeRepository.getEquipesByUsuariosEmail(email);
  res.json(equipes);
};

export const getEquipeByNome = async (req: Request, res: Response) => {
  const nome = req.params.nome;
  const equipe = await equipeRepository.getEquipeByNome(nome);
  if (equipe) {
    res.json(equipe);
  } else {
    res.status(404).json({ message: 'Equipe não encontrada' });
  }
};

export const createEquipeController = async (req: Request, res: Response) => {
  const { nome, descricao, gerenteId } = req.body;
  const newEquipe = await equipeRepository.createEquipe({ nome, descricao, gerenteId, id: 0});
  res.status(201).json(newEquipe);
};

export const updateEquipeController = async (req: Request, res: Response) => {
  const nome = req.params.nome;
  const equipe = await equipeRepository.updateEquipe(nome, req.body);
  res.json(equipe);
};

export const deleteEquipeController = async (req: Request, res: Response) => {
  const nome = req.params.nome;
  await equipeRepository.deleteEquipe(nome);
  res.status(204).send();
};