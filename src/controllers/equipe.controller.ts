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

export const createEquipeController = async (req: Request, res: Response) => {
  const { descricao, gerenteId } = req.body;
  const newEquipe = await equipeRepository.createEquipe({ descricao, gerenteId, id: 0});
  res.status(201).json(newEquipe);
};

export const updateEquipeController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const equipe = await equipeRepository.updateEquipe(id, req.body);
  res.json(equipe);
};

export const deleteEquipeController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await equipeRepository.deleteEquipe(id);
  res.status(204).send();
};