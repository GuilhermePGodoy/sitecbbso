// Pequeno wrapper sobre o fetch para falar com a API.
// Em desenvolvimento, o Vite faz proxy de /api -> http://localhost:3000.
const BASE = '/api';

async function req(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // envia/recebe o cookie do JWT
    ...options,
  });

  if (!res.ok) {
    const erro = await res.json().catch(() => ({}));
    throw new Error(erro.error || `Erro ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}

export const api = {
  get: (p) => req(p),
  post: (p, body) => req(p, { method: 'POST', body: JSON.stringify(body) }),
  put: (p, body) => req(p, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (p, body) => req(p, { method: 'PATCH', body: JSON.stringify(body) }),
  del: (p) => req(p, { method: 'DELETE' }),
};

// Upload de imagem (multipart). Não setamos Content-Type: o navegador
// define o boundary do multipart automaticamente. Retorna { url }.
export async function uploadFoto(file) {
  const fd = new FormData();
  fd.append('foto', file);
  const res = await fetch('/api/upload', {
    method: 'POST',
    credentials: 'include',
    body: fd,
  });
  if (!res.ok) {
    const erro = await res.json().catch(() => ({}));
    throw new Error(erro.error || `Erro ${res.status}`);
  }
  return res.json();
}
