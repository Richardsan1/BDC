const express = require('express');
const { verificarServiceKey, requerInterno } = require('../middleware/auth');
const userController = require('../controllers/userController');

const router = express.Router();

// Públicas
router.get('/especialidades', userController.listarEspecialidades);
router.get('/servicos/:id', userController.obterServicoPublico);
router.get('/:id/perfil', userController.obterPerfilPublico);

// Autenticadas
router.use(verificarServiceKey);
router.get('/me', userController.obterMeuPerfil);
router.put('/me', userController.atualizarPerfil);
router.patch('/me/foto', userController.uploadFoto);
router.put('/me/especialidades', userController.atualizarEspecialidades);
router.get('/me/servicos', userController.listarMeusServicos);
router.post('/me/servicos', userController.criarServico);
router.put('/me/servicos/:servicoId', userController.atualizarServico);
router.delete('/me/servicos/:servicoId', userController.deletarServico);
router.get('/me/favoritos', userController.listarFavoritos);
router.post('/me/favoritos', userController.adicionarFavorito);
router.delete('/me/favoritos/:profissionalId', userController.removerFavorito);

// Internas
router.post('/internal/batch', requerInterno, userController.batch);
router.get('/internal/pendentes', requerInterno, userController.listarPendentes);
router.patch('/internal/:id/status', requerInterno, userController.atualizarStatusInterno);

module.exports = router;
