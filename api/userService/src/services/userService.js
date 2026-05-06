const { query } = require('../config/database');
const { publish } = require('../config/messageBroker');
const { v4: uuidv4 } = require('uuid');

const listarEspecialidades = async () => {
  const result = await query('SELECT * FROM userservice.especialidades ORDER BY nome');
  return result.rows;
};

const obterPerfilPublico = async (id) => {
  const result = await query(`
    SELECT p.id, p.nome, p.email, p.tipo, p.bio, p.foto_url, p.cidade, p.latitude, p.longitude
    FROM userservice.perfis p
    WHERE p.id = $1 AND p.ativo = true
  `, [id]);
  
  if (!result.rows[0]) return null;

  const perfil = result.rows[0];
  const { rows: esp } = await query(`
    SELECT e.slug, e.nome FROM userservice.especialidades e
    JOIN userservice.perfil_especialidades pe ON e.id = pe.especialidade_id
    WHERE pe.perfil_id = $1
  `, [id]);

  const { rows: servicos } = await query(`
    SELECT id, nome, descricao, duracao_minutos, preco
    FROM userservice.servicos
    WHERE perfil_id = $1 AND ativo = true
  `, [id]);

  perfil.especialidades = esp;
  perfil.servicos = servicos;
  return perfil;
};

const obterPerfilPorId = async (id) => {
  const result = await query(`
    SELECT * FROM userservice.perfis WHERE id = $1
  `, [id]);

  if (!result.rows[0]) return null;
  return result.rows[0];
};

const atualizarPerfil = async (id, dados) => {
  const { nome, bio, cidade, latitude, longitude } = dados;
  
  const result = await query(`
    UPDATE userservice.perfis
    SET nome = COALESCE($2, nome),
        bio = COALESCE($3, bio),
        cidade = COALESCE($4, cidade),
        latitude = COALESCE($5, latitude),
        longitude = COALESCE($6, longitude),
        atualizado_em = NOW()
    WHERE id = $1
    RETURNING *
  `, [id, nome, bio, cidade, latitude, longitude]);

  if (result.rows[0]) {
    await publish('user.profile_updated', { usuarioId: id });
  }

  return result.rows[0];
};

const atualizarEspecialidades = async (id, especialidades) => {
  await query('DELETE FROM userservice.perfil_especialidades WHERE perfil_id = $1', [id]);
  
  for (const slug of especialidades) {
    const { rows } = await query('SELECT id FROM userservice.especialidades WHERE slug = $1', [slug]);
    if (rows[0]) {
      await query(
        'INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id) VALUES ($1, $2)',
        [id, rows[0].id]
      );
    }
  }

  await publish('user.profile_updated', { usuarioId: id });
};

const listarServicos = async (perfilId) => {
  const result = await query(`
    SELECT id, nome, descricao, duracao_minutos, preco, ativo
    FROM userservice.servicos
    WHERE perfil_id = $1
    ORDER BY criado_em DESC
  `, [perfilId]);

  return result.rows;
};

const criarServico = async (perfilId, dados) => {
  const { nome, descricao, duracao_minutos, preco } = dados;
  
  const result = await query(`
    INSERT INTO userservice.servicos (id, perfil_id, nome, descricao, duracao_minutos, preco)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `, [uuidv4(), perfilId, nome, descricao, duracao_minutos, preco]);

  return result.rows[0];
};

const atualizarServico = async (perfilId, servicoId, dados) => {
  const { nome, descricao, duracao_minutos, preco } = dados;
  
  const result = await query(`
    UPDATE userservice.servicos
    SET nome = COALESCE($3, nome),
        descricao = COALESCE($4, descricao),
        duracao_minutos = COALESCE($5, duracao_minutos),
        preco = COALESCE($6, preco),
        atualizado_em = NOW()
    WHERE id = $1 AND perfil_id = $2
    RETURNING *
  `, [servicoId, perfilId, nome, descricao, duracao_minutos, preco]);

  if (!result.rows[0]) {
    const err = new Error('Serviço não encontrado');
    err.statusCode = 404;
    throw err;
  }

  return result.rows[0];
};

const deletarServico = async (perfilId, servicoId) => {
  const result = await query(`
    UPDATE userservice.servicos
    SET ativo = false, atualizado_em = NOW()
    WHERE id = $1 AND perfil_id = $2
  `, [servicoId, perfilId]);

  if (result.rowCount === 0) {
    const err = new Error('Serviço não encontrado');
    err.statusCode = 404;
    throw err;
  }
};

// Internas
const batch = async (ids) => {
  const result = await query(`
    SELECT id, nome, email, tipo, foto_url, cidade, avaliacao_media
    FROM userservice.perfis
    WHERE id = ANY($1)
  `, [ids]);

  return result.rows;
};

const listarPendentes = async () => {
  const result = await query(`
    SELECT * FROM userservice.perfis
    WHERE status = 'pendente_aprovacao'
    ORDER BY criado_em
  `);

  return result.rows;
};

const atualizarStatus = async (id, status) => {
  const result = await query(`
    UPDATE userservice.perfis
    SET status = $2, atualizado_em = NOW()
    WHERE id = $1
    RETURNING *
  `, [id, status]);

  if (result.rows[0] && status === 'ativo') {
    await publish('professional.approved', { usuarioId: id });
  }

  return result.rows[0];
};

module.exports = {
  listarEspecialidades,
  obterPerfilPublico,
  obterPerfilPorId,
  atualizarPerfil,
  atualizarEspecialidades,
  listarServicos,
  criarServico,
  atualizarServico,
  deletarServico,
  batch,
  listarPendentes,
  atualizarStatus,
};
