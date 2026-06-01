const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../../api/userService/src/app');

test('userService responde healthcheck', async () => {
  const response = await request(app).get('/health');

  assert.equal(response.status, 200);
  assert.equal(response.body.status, 'ok');
  assert.equal(response.body.service, 'userService');
});
