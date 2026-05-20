const userService = require('../services/userService');

const listarEspecialidades = async (req, res, next) => {
  try {
    const especialidades = await userService.listarEspecialidades();
    res.json(especialidades);
  } catch (err) {
    next(err);
  }
};

const obterPerfilPublico = async (req, res, next) => {
  try {
    const { id } = req.params;
    const perfil = await userService.obterPerfilPublico(id);
    if (!perfil) {
      return res.status(404).json({ erro: 'Perfil não encontrado' });
    }
    res.json(perfil);
  } catch (err) {
    next(err);
  }
};

const obterServicoPublico = async (req, res, next) => {
  try {
    const { id } = req.params;
    const servico = await userService.obterServicoPublico(id);
    if (!servico) {
      return res.status(404).json({ erro: 'Serviço não encontrado' });
    }
    res.json(servico);
  } catch (err) {
    next(err);
  }
};

const obterMeuPerfil = async (req, res, next) => {
  try {
    const perfil = await userService.obterPerfilPorId(req.usuario.id);
    if (!perfil) {
      return res.status(404).json({ erro: 'Perfil não encontrado' });
    }
    res.json(perfil);
  } catch (err) {
    next(err);
  }
};

const atualizarPerfil = async (req, res, next) => {
  try {
    const perfil = await userService.atualizarPerfil(req.usuario.id, req.body);
    res.json(perfil);
  } catch (err) {
    next(err);
  }
};

const uploadFoto = async (req, res, next) => {
  try {
    // Implementar com Cloudinary (atualmente mockado)
    const url = `https://mock-cloudinary.com/${req.usuario.id}/perfil.jpg`;
    res.json({ url });
  } catch (err) {
    next(err);
  }
};

const atualizarEspecialidades = async (req, res, next) => {
  try {
    const { especialidades } = req.body;
    await userService.atualizarEspecialidades(req.usuario.id, especialidades);
    res.json({ mensagem: 'Especialidades atualizadas' });
  } catch (err) {
    next(err);
  }
};

const listarMeusServicos = async (req, res, next) => {
  try {
    const servicos = await userService.listarServicos(req.usuario.id);
    res.json(servicos);
  } catch (err) {
    next(err);
  }
};

const criarServico = async (req, res, next) => {
  try {
    const servico = await userService.criarServico(req.usuario.id, req.body);
    res.status(201).json(servico);
  } catch (err) {
    next(err);
  }
};

const atualizarServico = async (req, res, next) => {
  try {
    const { servicoId } = req.params;
    const servico = await userService.atualizarServico(req.usuario.id, servicoId, req.body);
    res.json(servico);
  } catch (err) {
    next(err);
  }
};

const deletarServico = async (req, res, next) => {
  try {
    const { servicoId } = req.params;
    await userService.deletarServico(req.usuario.id, servicoId);
    res.json({ mensagem: 'Serviço deletado' });
  } catch (err) {
    next(err);
  }
};

// Internas
const batch = async (req, res, next) => {
  try {
    const { ids } = req.body;
    const perfis = await userService.batch(ids);
    res.json(perfis);
  } catch (err) {
    next(err);
  }
};

const listarPendentes = async (req, res, next) => {
  try {
    const pendentes = await userService.listarPendentes();
    res.json(pendentes);
  } catch (err) {
    next(err);
  }
};

const atualizarStatusInterno = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await userService.atualizarStatus(id, status);
    res.json({ mensagem: 'Status atualizado' });
  } catch (err) {
    next(err);
  }
};

// Favoritos
const adicionarFavorito = async (req, res, next) => {
  try {
    const { profissionalId } = req.body;
    const favorito = await userService.adicionarFavorito(req.usuario.id, profissionalId);
    res.status(201).json(favorito);
  } catch (err) {
    next(err);
  }
};

const removerFavorito = async (req, res, next) => {
  try {
    const { profissionalId } = req.params;
    await userService.removerFavorito(req.usuario.id, profissionalId);
    res.json({ mensagem: 'Favorito removido' });
  } catch (err) {
    next(err);
  }
};

const listarFavoritos = async (req, res, next) => {
  try {
    const favoritos = await userService.listarFavoritos(req.usuario.id);
    res.json(favoritos);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listarEspecialidades,
  obterPerfilPublico,
  obterServicoPublico,
  obterMeuPerfil,
  atualizarPerfil,
  uploadFoto,
  atualizarEspecialidades,
  listarMeusServicos,
  criarServico,
  atualizarServico,
  deletarServico,
  batch,
  listarPendentes,
  atualizarStatusInterno,
  adicionarFavorito,
  removerFavorito,
  listarFavoritos,
};
