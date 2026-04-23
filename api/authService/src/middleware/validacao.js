const { body, validationResult } = require('express-validator');

/**
 * Extrai e retorna erros de validação formatados.
 */
const validar = (req, res, next) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(422).json({
      erro: 'Dados inválidos.',
      detalhes: erros.array().map((e) => ({ campo: e.path, mensagem: e.msg })),
    });
  }
  next();
};

const regrasRegistro = [
  body('email')
    .isEmail().withMessage('E-mail inválido.')
    .normalizeEmail(),
  body('senha')
    .isLength({ min: 8 }).withMessage('A senha deve ter no mínimo 8 caracteres.')
    .matches(/[A-Z]/).withMessage('A senha deve conter ao menos uma letra maiúscula.')
    .matches(/[0-9]/).withMessage('A senha deve conter ao menos um número.'),
  body('tipo')
    .isIn(['cliente', 'profissional', 'salao']).withMessage('Tipo inválido. Use: cliente, profissional ou salao.'),
];

const regrasLogin = [
  body('email')
    .isEmail().withMessage('E-mail inválido.')
    .normalizeEmail(),
  body('senha')
    .notEmpty().withMessage('Senha obrigatória.'),
];

module.exports = { validar, regrasRegistro, regrasLogin };
