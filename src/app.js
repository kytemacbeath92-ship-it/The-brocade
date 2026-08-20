import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { addRule, deleteRule, listRules } from './rules.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
  });

  app.get('/api/rules', (_req, res) => {
    res.json({ rules: listRules() });
  });

  app.post('/api/rules', (req, res, next) => {
    try {
      const rule = addRule(req.body?.text);
      res.status(201).json({ rule });
    } catch (err) {
      next(err);
    }
  });

  app.delete('/api/rules/:id', (req, res, next) => {
    try {
      const removed = deleteRule(Number(req.params.id));
      res.json({ rule: removed });
    } catch (err) {
      next(err);
    }
  });

  app.use(express.static(publicDir));

  app.use((err, _req, res, _next) => {
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
  });

  return app;
}
