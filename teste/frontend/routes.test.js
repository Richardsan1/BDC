const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('frontend mantém rotas públicas e protegidas principais', () => {
  const mainFile = path.resolve(__dirname, '../../app/src/main.jsx');
  const content = fs.readFileSync(mainFile, 'utf8');

  const expectedRoutes = [
    'path="/"',
    'path="/buscar"',
    'path="/profissional/:id"',
    'path="/profissional/:id/agendar"',
    'path="/admin"'
  ];

  for (const route of expectedRoutes) {
    assert.ok(content.includes(route), `Rota esperada não encontrada: ${route}`);
  }
});
