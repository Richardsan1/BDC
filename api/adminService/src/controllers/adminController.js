const adminService = require('../services/adminService');
const aprovar = async (req, res, next) => {
  try {
    await adminService.aprovarProfissional(req.body.profissionalId);
    res.json({ mensagem: 'Aprovado' });
  } catch (err) {
    next(err);
  }
};
const rejeitar = async (req, res, next) => {
  try {
    await adminService.rejeitarProfissional(req.body.profissionalId);
    res.json({ mensagem: 'Rejeitado' });
  } catch (err) {
    next(err);
  }
};
const suspender = async (req, res, next) => {
  try {
    await adminService.suspenderProfissional(req.body.profissionalId);
    res.json({ mensagem: 'Suspenso' });
  } catch (err) {
    next(err);
  }
};
const metricas = async (req, res, next) => {
  try {
    const dados = await adminService.obterMetricas();
    res.json(dados);
  } catch (err) {
    next(err);
  }
};
module.exports = { aprovar, rejeitar, suspender, metricas };
