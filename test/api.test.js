import { test, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';
import { resetRules } from '../src/rules.js';

let server;
let baseUrl;

before(async () => {
  const app = createApp();
  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', resolve);
  });
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

after(() => {
  server.close();
});

beforeEach(() => {
  resetRules();
});

test('health endpoint reports ok', async () => {
  const res = await fetch(`${baseUrl}/api/health`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.status, 'ok');
});

test('lists the seeded rules', async () => {
  const res = await fetch(`${baseUrl}/api/rules`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.rules.length, 3);
});

test('adds a new rule', async () => {
  const res = await fetch(`${baseUrl}/api/rules`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'A bro writes tests.' }),
  });
  assert.equal(res.status, 201);
  const body = await res.json();
  assert.equal(body.rule.text, 'A bro writes tests.');

  const list = await (await fetch(`${baseUrl}/api/rules`)).json();
  assert.equal(list.rules.length, 4);
});

test('rejects an empty rule', async () => {
  const res = await fetch(`${baseUrl}/api/rules`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: '   ' }),
  });
  assert.equal(res.status, 400);
});

test('deletes a rule', async () => {
  const res = await fetch(`${baseUrl}/api/rules/1`, { method: 'DELETE' });
  assert.equal(res.status, 200);

  const list = await (await fetch(`${baseUrl}/api/rules`)).json();
  assert.equal(list.rules.length, 2);
});

test('returns 404 when deleting a missing rule', async () => {
  const res = await fetch(`${baseUrl}/api/rules/9999`, { method: 'DELETE' });
  assert.equal(res.status, 404);
});
