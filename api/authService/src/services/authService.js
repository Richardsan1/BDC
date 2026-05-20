const bcrypt = require('bcrypt');
const { query } = require('../config/database');
const { gerarToken } = require('../utils/jwt');
const { publish } = require('../config/messageBroker');

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);

/**
 * UC01 / UC12 — Registra um novo usuário (cliente, profissional, salão).
 */
const registrar = async ({ email, senha, tipo, nome }) => {
  // Verifica duplicidade de e-mail
  const { rows: existente } = await query(
    'SELECT id FROM authservice.usuarios WHERE email = $1',
    [email]
  );
  if (existente.length > 0) {
    const err = new Error('E-mail já cadastrado.');
    err.statusCode = 409;
    throw err;
  }

  // Gera hash da senha (bcrypt fator mínimo 12 — LGPD / segurança)
  const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

  // Status inicial: clientes ficam 'ativo'; profissionais/salões ficam 'pendente_aprovacao'
  const statusInicial = (tipo === 'cliente' || tipo === 'admin') ? 'ativo' : 'pendente_aprovacao';

  const { rows } = await query(
    `INSERT INTO authservice.usuarios (email, senha_hash, tipo, status)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, tipo, status, criado_em`,
    [email, senhaHash, tipo, statusInicial]
  );

  const usuario = rows[0];

  // Publica evento no broker (consumido pelo Notification Service e User Service)
  const eventoKey = tipo === 'cliente' ? 'user.registered' : 'professional.pending';
  await publish(eventoKey, {
    user_id: usuario.id,
    email: usuario.email,
    nome: nome || usuario.email.split('@')[0], // Usa nome ou parte do email como fallback
    tipo: usuario.tipo,
    status: usuario.status,
  });

  return {
    id: usuario.id,
    email: usuario.email,
    tipo: usuario.tipo,
    status: usuario.status,
    criadoEm: usuario.criado_em,
  };
};

/**
 * UC02 / UC13 / UC19 — Autentica um usuário e retorna token JWT.
 */
const login = async ({ email, senha, ipOrigem }) => {
  const { rows } = await query(
    'SELECT id, email, senha_hash, tipo, status FROM authservice.usuarios WHERE email = $1',
    [email]
  );

  const usuario = rows[0];

  // Verifica credenciais (mensagem genérica por segurança — não revela se e-mail existe)
  const senhaValida = usuario
    ? await bcrypt.compare(senha, usuario.senha_hash)
    : false;

  // Registra tentativa de login para auditoria
  await query(
    `INSERT INTO authservice.tentativas_login (email, ip_origem, sucesso)
     VALUES ($1, $2, $3)`,
    [email, ipOrigem || null, senhaValida && !!usuario]
  ).catch(() => {}); // Não bloqueia o fluxo principal se falhar

  if (!usuario || !senhaValida) {
    const err = new Error('Credenciais inválidas.');
    err.statusCode = 401;
    throw err;
  }

  // Verifica status da conta
  if (usuario.status === 'pendente_aprovacao') {
    const err = new Error('Seu cadastro está em análise. Você receberá um e-mail quando for aprovado.');
    err.statusCode = 403;
    err.code = 'PENDING_APPROVAL';
    throw err;
  }

  if (usuario.status === 'suspenso') {
    const err = new Error('Seu cadastro foi suspenso. Entre em contato com o suporte.');
    err.statusCode = 403;
    err.code = 'ACCOUNT_SUSPENDED';
    throw err;
  }

  if (usuario.status === 'removido') {
    const err = new Error('Credenciais inválidas.');
    err.statusCode = 401;
    throw err;
  }

  const { token, jti, expiresAt } = gerarToken(usuario);

  return { token, jti, expiresAt, usuario: { id: usuario.id, email: usuario.email, tipo: usuario.tipo } };
};

/**
 * Logout — invalida o token adicionando à blacklist.
 */
const logout = async ({ usuarioId, jti, expiresAt }) => {
  await query(
    `INSERT INTO authservice.token_blacklist (token_jti, usuario_id, expira_em)
     VALUES ($1, $2, $3)
     ON CONFLICT (token_jti) DO NOTHING`,
    [jti, usuarioId, expiresAt]
  );
};

/**
 * Invalida todos os tokens ativos de um usuário (usado em suspensões pelo Admin Service).
 * Chamado internamente via rota protegida entre serviços.
 */
const invalidarSessoesPorUsuario = async (usuarioId) => {
  // Atualiza status para 'suspenso' para bloquear novos logins
  await query(
    `UPDATE authservice.usuarios SET status = 'suspenso' WHERE id = $1`,
    [usuarioId]
  );
  // Nota: tokens já emitidos são bloqueados pela verificação de status no middleware
};

/**
 * Verifica se um token está na blacklist.
 */
const isTokenBlacklisted = async (jti) => {
  const { rows } = await query(
    `SELECT id FROM authservice.token_blacklist 
     WHERE token_jti = $1 AND expira_em > NOW()`,
    [jti]
  );
  return rows.length > 0;
};

/**
 * Valida token e retorna payload — usado por outros serviços via rota interna.
 */
const validarToken = async (token) => {
  const { verificarToken } = require('../utils/jwt');
  const payload = verificarToken(token); // lança se inválido/expirado

  // Verifica blacklist
  const blacklisted = await isTokenBlacklisted(payload.jti);
  if (blacklisted) {
    const err = new Error('Token inválido.');
    err.statusCode = 401;
    throw err;
  }

  // Verifica status atual do usuário no banco (captura suspensões pós-emissão)
  const { rows } = await query(
    'SELECT status FROM authservice.usuarios WHERE id = $1',
    [payload.sub]
  );

  if (!rows[0] || rows[0].status !== 'ativo') {
    const err = new Error('Usuário sem acesso.');
    err.statusCode = 401;
    throw err;
  }

  return payload;
};

/**
 * Limpeza periódica de tokens expirados na blacklist.
 */
const limparTokensExpirados = async () => {
  const { rowCount } = await query(
    'DELETE FROM authservice.token_blacklist WHERE expira_em < NOW()'
  );
  if (rowCount > 0) {
    console.log(`[Auth] Limpeza: ${rowCount} token(s) expirado(s) removidos da blacklist.`);
  }
};

module.exports = {
  registrar,
  login,
  logout,
  validarToken,
  invalidarSessoesPorUsuario,
  isTokenBlacklisted,
  limparTokensExpirados,
};
