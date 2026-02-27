const BASE_URL = 'http://localhost:3000';

function authHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

// Auth
export async function login(email, senha) {
  const res = await fetch(`${BASE_URL}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || 'Erro ao fazer login');
  return data;
}

// Projetos
export async function getProjetos() {
  const res = await fetch(`${BASE_URL}/projetos`);
  if (!res.ok) return [];
  return res.json();
}

export async function createProjeto(body) {
  const res = await fetch(`${BASE_URL}/projetos`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || 'Erro ao criar projeto');
  return data;
}

export async function updateProjeto(id, body) {
  const res = await fetch(`${BASE_URL}/projetos/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || 'Erro ao atualizar projeto');
  return data;
}

export async function deleteProjeto(id) {
  const res = await fetch(`${BASE_URL}/projetos/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || 'Erro ao excluir projeto');
  return data;
}

// Experiências
export async function getExperiencias() {
  const res = await fetch(`${BASE_URL}/experiencias`);
  if (!res.ok) return [];
  return res.json();
}

export async function createExperiencia(body) {
  const res = await fetch(`${BASE_URL}/experiencias`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || 'Erro ao criar experiência');
  return data;
}

export async function updateExperiencia(id, body) {
  const res = await fetch(`${BASE_URL}/experiencias/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || 'Erro ao atualizar experiência');
  return data;
}

export async function deleteExperiencia(id) {
  const res = await fetch(`${BASE_URL}/experiencias/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || 'Erro ao excluir experiência');
  return data;
}
