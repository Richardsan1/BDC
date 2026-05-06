const { query } = require('../config/database');
const { publish } = require('../config/messageBroker');

const aprovarProfissional = async (profissionalId) => {
  await query('UPDATE admin_service.profissionais SET status = $2 WHERE id = $1', [profissionalId, 'ativo']);
  await publish('professional.approved', { usuarioId: profissionalId });
};

const rejeitarProfissional = async (profissionalId) => {
  await query('UPDATE admin_service.profissionais SET status = $2 WHERE id = $1', [profissionalId, 'rejeitado']);
};

const suspenderProfissional = async (profissionalId) => {
  await query('UPDATE admin_service.profissionais SET status = $2 WHERE id = $1', [profissionalId, 'suspenso']);
  await publish('professional.suspended', { usuarioId: profissionalId });
};

const obterMetricas = async () => {
  const result = await query(`
    SELECT 
      COUNT(*) as total_usuarios,
      SUM(CASE WHEN tipo = 'profissional' THEN 1 ELSE 0 END) as profissionais_ativos,
      SUM(CASE WHEN tipo = 'cliente' THEN 1 ELSE 0 END) as clientes_totais
    FROM admin_service.usuarios
  `);
  return result.rows[0] || { total_usuarios: 0, profissionais_ativos: 0, clientes_totais: 0 };
};

module.exports = { aprovarProfissional, rejeitarProfissional, suspenderProfissional, obterMetricas };
