import { Request, Response } from 'express';
import { listarTarefas, criarTarefa, editarTarefa, deletarTarefa } from '../repositories/tarefa.repository';

export const getTarefas = async (req: Request, res: Response) => {
  try {
    const tarefas = await listarTarefas();
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

export const postTarefa = async (req: Request, res: Response) => {
  try {
    const tarefa = await criarTarefa(req.body);
    res.status(201).json(tarefa);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ error: 'Erro ao criar tarefa', details: error });
  }
};

export const putTarefa = async (req: Request, res: Response) => {
  try {
    const tarefa = await editarTarefa(Number(req.params.id), req.body);
    res.json(tarefa);
  } catch (error) {
    console.error('Erro ao editar tarefa:', error);
    res.status(500).json({ error: 'Erro ao editar tarefa', details: error });
  }
};

export const deleteTarefa = async (req: Request, res: Response) => {
  try {
    await deletarTarefa(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    res.status(500).json({ error: 'Erro ao deletar tarefa', details: error });
  }
};
