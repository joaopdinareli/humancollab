import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import * as authRepository from '../repositories/auth.repository';

export const loginController = async (req: NextRequest) => {
  const { email, senha } = await req.json();
  if (!email || !senha) {
    return NextResponse.json({ message: 'Email e senha são obrigatórios.' }, { status: 400 });
  }
  const usuario = await authRepository.findUsuarioByEmail(email);
  if (!usuario) {
    return NextResponse.json({ message: 'Usuário não encontrado.' }, { status: 401 });
  }
  const senhaValida = await argon2.verify(usuario.senha, senha);
  if (!senhaValida) {
    return NextResponse.json({ message: 'Senha inválida.' }, { status: 401 });
  }
  const token = jwt.sign(
    { email: usuario.email, tipo: usuario.tipo },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1h' }
  );
  return NextResponse.json({ message: 'Login realizado com sucesso!', token, id: usuario.id });
};

export const meController = async (req: NextRequest) => {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ message: 'Não autenticado.' }, { status: 401 });
  }
  const token = authHeader.replace('Bearer ', '');
  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
  } catch {
    return NextResponse.json({ message: 'Token inválido.' }, { status: 401 });
  }
  const usuario = await authRepository.findUsuarioByEmail(decoded.email);
  if (!usuario) {
    return NextResponse.json({ message: 'Usuário não encontrado.' }, { status: 404 });
  }
  return NextResponse.json({ nome: usuario.nome, email: usuario.email });
};