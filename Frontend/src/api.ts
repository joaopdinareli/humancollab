// API utilitário para login e listagem

const API_URL = 'http://localhost:3000'; // raiz do backend

export async function login(email: string, senha: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });
  if (!res.ok) throw new Error('Login inválido');
  const data = await res.json(); // { message, token }
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
}

export function getToken() {
  return localStorage.getItem('token');
}

export async function listarUsuarios(token?: string) {
  token = token || getToken() || undefined;
  if (!token) throw new Error('Token não encontrado');
  const res = await fetch(`${API_URL}/usuarios`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Erro ao buscar usuários');
  return res.json();
}

export async function listarEquipes(token?: string) {
  token = token || getToken() || undefined;
  if (!token) throw new Error('Token não encontrado');
  const res = await fetch(`${API_URL}/equipes`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Erro ao buscar equipes');
  return res.json();
}
