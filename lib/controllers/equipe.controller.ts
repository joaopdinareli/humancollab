import { NextRequest, NextResponse } from 'next/server';
import * as equipeRepository from '../repositories/equipe.repository';

export const readAllEquipesController = async (req: NextRequest) => {
  try {
    const equipes = await equipeRepository.readAllEquipes();
    if (equipes.length === 0) {
      throw new Error ('Não há equipes cadastradas.');
    }
    return NextResponse.json(equipes, { status: 200 } );
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao buscar equipes.', details: error }, { status: 500 });
  }
};

export const readEquipeByIdController = async (req: NextRequest, id: string) => {
  try {
    const equipe = await equipeRepository.readEquipeById(Number(id));
    if (!equipe) {
      throw new Error ('Não há uma equipe com esse ID.');
    }
    return NextResponse.json(equipe, { status: 200 } );
  } catch (error) {
    return NextResponse.json({ message: 'Equipe não encontrada.', details: error }, { status: 404 } );
  }
};

export const readEquipesByUsuariosEmailController = async (req: NextRequest, email: string) => {
  try {
    const equipes = await equipeRepository.readEquipesByUsuariosEmail(String(email));
    if (equipes.length === 0) {
      throw new Error ('Não há equipes associadas a este usuário.');
    }
    return NextResponse.json(equipes, { status: 200 } );
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao buscar equipes do usuário.', details: error }, { status: 500 });
  }
};

export const readEquipeByNomeController = async (req: NextRequest, nome: string) => {
  try {
    const equipe = await equipeRepository.readEquipeByNome(String(nome));
    if (!equipe) {
      throw new Error ('Não há uma equipe com este nome.');
    }
    return NextResponse.json(equipe);
  } catch (error) {
    return NextResponse.json({ message: 'Equipe não encontrada.', details: error }, { status: 404 } );
  }
};

export const createEquipeController = async (req: NextRequest) => {
  try {
    const { nome, descricao, gerenteId } = await req.json();
    if (!nome || !descricao || !gerenteId) {
      throw new Error ('Dados obrigatórios faltando.');
    }
    const newEquipe = await equipeRepository.createEquipe({ nome, descricao, gerenteId, id: 0 });
    return NextResponse.json(newEquipe, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao criar equipe.', details: error }, { status: 500 });
  }
};

export const updateEquipeController = async (req: NextRequest, nome: string) => {
  try {
    const data = await req.json();
    const equipe = await equipeRepository.updateEquipe(String(nome), data);
    return NextResponse.json(equipe, { status: 200 } );
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao atualizar equipe.', details: error }, { status: 500 } );
  }
};

export const deleteEquipeController = async (req: NextRequest, nome: string) => {
  try {
    await equipeRepository.deleteEquipe(String(nome));
    return NextResponse.json(null, { status: 204 } );
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao deletar equipe.', details: error }, { status: 500 } );
  }
};