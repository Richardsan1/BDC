const request = require('supertest');
const app = require('../../app');
const { query, pool } = require('../../config/database');

// Mock do banco e broker para testes isolados
jest.mock('../../config/database');
jest.mock('../../config/messageBroker', () => ({ publish: jest.fn() }));

const mockUsuarioCliente = {
  id: 'uuid-123',
  email: 'cliente@teste.com',
  senha_hash: '$2b$12$mockhashvalue',
  tipo: 'cliente',
  status: 'ativo',
  criado_em: new Date().toISOString(),
};

describe('Auth Service — Endpoints', () => {
  afterAll(async () => {
    await pool.end?.();
  });

  // ─── POST /auth/register ──────────────────────────────────────────────────

  describe('POST /auth/register', () => {
    it('deve cadastrar cliente com dados válidos', async () => {
      query
        .mockResolvedValueOnce({ rows: [] }) // verifica duplicidade
        .mockResolvedValueOnce({ rows: [mockUsuarioCliente] }); // insert

      const res = await request(app).post('/auth/register').send({
        email: 'cliente@teste.com',
        senha: 'Senha123',
        tipo: 'cliente',
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('usuario');
      expect(res.body.usuario.tipo).toBe('cliente');
    });

    it('deve retornar 409 se e-mail já estiver cadastrado', async () => {
      query.mockResolvedValueOnce({ rows: [{ id: 'uuid-existente' }] });

      const res = await request(app).post('/auth/register').send({
        email: 'existente@teste.com',
        senha: 'Senha123',
        tipo: 'cliente',
      });

      expect(res.statusCode).toBe(409);
      expect(res.body.erro).toMatch(/e-mail já cadastrado/i);
    });

    it('deve retornar 422 para tipo inválido', async () => {
      const res = await request(app).post('/auth/register').send({
        email: 'teste@teste.com',
        senha: 'Senha123',
        tipo: 'hacker',
      });

      expect(res.statusCode).toBe(422);
    });

    it('deve retornar 422 para senha fraca', async () => {
      const res = await request(app).post('/auth/register').send({
        email: 'teste@teste.com',
        senha: '123',
        tipo: 'cliente',
      });

      expect(res.statusCode).toBe(422);
    });

    it('profissional deve ser criado com status pendente_aprovacao', async () => {
      const mockProfissional = { ...mockUsuarioCliente, tipo: 'profissional', status: 'pendente_aprovacao' };
      query
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [mockProfissional] });

      const res = await request(app).post('/auth/register').send({
        email: 'prof@teste.com',
        senha: 'Senha123',
        tipo: 'profissional',
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.usuario.status).toBe('pendente_aprovacao');
      expect(res.body.mensagem).toMatch(/aguardando aprovação/i);
    });
  });

  // ─── POST /auth/login ─────────────────────────────────────────────────────

  describe('POST /auth/login', () => {
    it('deve retornar 401 com credenciais inválidas', async () => {
      query
        .mockResolvedValueOnce({ rows: [] }) // usuário não encontrado
        .mockResolvedValueOnce({ rows: [], rowCount: 0 }); // log tentativa

      const res = await request(app).post('/auth/login').send({
        email: 'naoexiste@teste.com',
        senha: 'SenhaErrada1',
      });

      expect(res.statusCode).toBe(401);
      expect(res.body.erro).toBe('Credenciais inválidas.');
    });

    it('deve retornar 403 para conta pendente de aprovação', async () => {
      const bcrypt = require('bcrypt');
      const hash = await bcrypt.hash('Senha123', 10);

      query
        .mockResolvedValueOnce({ rows: [{ ...mockUsuarioCliente, senha_hash: hash, status: 'pendente_aprovacao' }] })
        .mockResolvedValueOnce({ rows: [], rowCount: 0 });

      const res = await request(app).post('/auth/login').send({
        email: 'prof@teste.com',
        senha: 'Senha123',
      });

      expect(res.statusCode).toBe(403);
      expect(res.body.codigo).toBe('PENDING_APPROVAL');
    });
  });

  // ─── GET /health ─────────────────────────────────────────────────────────

  describe('GET /health', () => {
    it('deve retornar status ok', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.servico).toBe('auth-service');
    });
  });

  // ─── Rota inexistente ─────────────────────────────────────────────────────

  describe('Rotas inexistentes', () => {
    it('deve retornar 404 para rotas não mapeadas', async () => {
      const res = await request(app).get('/auth/naoexiste');
      expect(res.statusCode).toBe(404);
    });
  });
});
