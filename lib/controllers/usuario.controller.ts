import { NextRequest, NextResponse } from 'next/server';
import * as usuarioRepository from '../repositories/usuario.repository';
import * as argon2 from 'argon2';

export const readUsuariosController = async (req: NextRequest) => {
  try {
    const usuarios = await usuarioRepository.getAllUsuarios();
    if (usuarios.length === 0) {
      throw new Error ('Não há usuários cadastrados.');
    }
    return NextResponse.json(usuarios, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar usuários.', details: error}, { status: 500 });
  }
};

export const readUsuarioByEmailController = async (req: NextRequest, email: string) => {
  try {
    const usuario = await usuarioRepository.getUsuarioByEmail(String(email));
    if (!usuario) {
      throw new Error('Não há um usuário com esse email.');
    }
    return NextResponse.json(usuario, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar usuário.', details: error}, { status: 500 });
  }
};

export const updateUsuarioController = async (req: NextRequest, email: string) => {
  try {
    const data = await req.json();
    const usuario = await usuarioRepository.updateUsuario(String(email), data);
    return NextResponse.json(usuario, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao editar usuário.', details: error }, { status: 500 });
  }
};

export const deleteUsuarioController = async (req: NextRequest, email: string) => {
  try {
    await usuarioRepository.deleteUsuario(email);
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar usuário.', details: error }, { status: 500 });
  }
};

export const readUsuarioByIdController = async (req: NextRequest, id: string) => {
  try {
    const usuario = await usuarioRepository.getUsuarioById(Number(id));
    if (!usuario) {
      throw new Error ('Não há um usuário com esse ID.');
    }
    return NextResponse.json(usuario, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar usuário.', details: error}, { status: 500 } );
  }
};

export const createUsuarioController = async (req: NextRequest) => {
  try {
    const { nome, empresa, email, cargo, tipo, senha } = req.json();
    const senhaCriptografada = await argon2.hash(senha);
    const newUsuario = await usuarioRepository.createUsuario({ nome, empresa, email, cargo, tipo, senha: senhaCriptografada });
    const { senha: _, ...usuarioSemSenha } = newUsuario;
    return NextResponse.json(usuarioSemSenha, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar usuário.', details: error }, { status: 500 });
  }
};