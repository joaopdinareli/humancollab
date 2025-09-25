import { NextRequest, NextResponse } from 'next/server';
import * as TarefaRepository from '../repositories/tarefa.repository';

export const readTarefasController = async (req: NextRequest) => {
  try {
    const tarefas = await TarefaRepository.readTarefas();
    if (tarefas.length === 0) {
      throw new Error ('Não há tarefas cadastradas.');
    }
    return NextResponse.json(tarefas, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar tarefas.', details: error}, { status: 500});
  }
};

export const createTarefaController = async (req: NextRequest) => {
  try {
    const tarefa = await TarefaRepository.createTarefa(req.body);
    return NextResponse.json(tarefa, { status: 201 });
  } catch (error) {
    return NextResponse.status(500).json({ error: 'Erro ao criar tarefa.', details: error }, { status: 500 });
  }
};

export const updateTarefaController = async (req: NextRequest, id: string) => {
  try {
    const data = await req.json();
    const tarefa = await TarefaRepository.updateTarefa(Number(id), data);
    if (!tarefa) {
      throw new Error ('Tarefa não encontrada.');
    }
    return NextResponse.json(tarefa, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao editar tarefa.', details: error }, { status: 500})
  }
};

export const deleteTarefaController = async (req: NextRequest, id: string) => {
  try {
    await TarefaRepository.deleteTarefa(Number(id));
    return NextResponse.json(null, { status: 204});
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar tarefa.', details: error }, { status: 500})
  }
};
