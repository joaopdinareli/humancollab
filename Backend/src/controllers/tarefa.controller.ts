import { Request, Response } from 'express';
import { listarTarefas } from '../repositories/tarefa.repository';

export const getTarefas = async (req: Request, res: Response) => {
  try {
    const tarefas = await listarTarefas();
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};
