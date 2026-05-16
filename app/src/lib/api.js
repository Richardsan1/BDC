const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const TOKEN_KEY = 'bi_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function request(path, { method = 'GET', body, query, auth = false, signal } = {}) {
  const url = new URL(`${API_BASE}${path}`);
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
    });
  }

  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
      signal,
    });
  } catch (err) {
    throw new ApiError('Falha de conexão com o servidor', 0, null);
  }

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const msg = (payload && payload.erro) || response.statusText || 'Erro';
    throw new ApiError(msg, response.status, payload);
  }

  return payload;
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  patch: (path, body, opts) => request(path, { ...opts, method: 'PATCH', body }),
  del: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
};

export const auth = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout', {}, { auth: true }),
  me: () => api.get('/auth/me', { auth: true }),
};

export const users = {
  especialidades: () => api.get('/users/especialidades'),
  perfil: (id) => api.get(`/users/${id}/perfil`),
  me: () => api.get('/users/me', { auth: true }),
  atualizarMe: (data) => api.put('/users/me', data, { auth: true }),
  atualizarEspecialidades: (especialidades) =>
    api.put('/users/me/especialidades', { especialidades }, { auth: true }),
  meusServicos: () => api.get('/users/me/servicos', { auth: true }),
  criarServico: (data) => api.post('/users/me/servicos', data, { auth: true }),
  atualizarServico: (id, data) => api.put(`/users/me/servicos/${id}`, data, { auth: true }),
  deletarServico: (id) => api.del(`/users/me/servicos/${id}`, { auth: true }),
};

export const search = {
  buscar: (params) => api.get('/search', { query: params }),
};

export const bookings = {
  criar: (data) => api.post('/bookings', data, { auth: true }),
  obter: (id) => api.get(`/bookings/${id}`, { auth: true }),
  listar: () => api.get('/bookings', { auth: true }),
  cancelar: (id) => api.del(`/bookings/${id}`, { auth: true }),
};

export const payments = {
  intent: (bookingId, valor) =>
    api.post('/payments/intent', { bookingId, valor }, { auth: true }),
  confirmar: (paymentIntentId) =>
    api.post('/payments/confirmar', { paymentIntentId }, { auth: true }),
};

export const admin = {
  metricas: () => api.get('/admin/metricas', { auth: true }),
  aprovar: (profissionalId) => api.post('/admin/aprovar', { profissionalId }, { auth: true }),
  rejeitar: (profissionalId) => api.post('/admin/rejeitar', { profissionalId }, { auth: true }),
  suspender: (profissionalId) => api.post('/admin/suspender', { profissionalId }, { auth: true }),
};
