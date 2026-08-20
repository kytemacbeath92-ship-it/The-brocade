# The Brocade

A small, modern full-stack demo app for maintaining a shared list of rules — "the bro code". It ships an Express JSON API and a polished vanilla-JS single-page frontend, with automated tests, linting, and a ready-to-use Cloud Agent development environment.

## Stack

- **Runtime:** Node.js (>= 20), ES modules
- **Server:** [Express](https://expressjs.com/) 4
- **Frontend:** static HTML/CSS/JS served from `public/`
- **Tests:** built-in `node:test`
- **Lint:** ESLint 9 (flat config)

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server with auto-restart
```

Then open http://localhost:3000.

Use `npm start` to run the server without watch mode. Set `PORT` to change the port (defaults to `3000`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the server with `--watch` auto-restart. |
| `npm start` | Start the server. |
| `npm test` | Run the automated test suite. |
| `npm run lint` | Lint the source with ESLint. |

## API

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Health/uptime check. |
| `GET` | `/api/rules` | List all rules. |
| `POST` | `/api/rules` | Add a rule. Body: `{ "text": "..." }`. |
| `DELETE` | `/api/rules/:id` | Delete a rule by id. |

Rules are stored in memory and reset when the server restarts.

## Project layout

```
src/
  app.js      Express app factory (routes + middleware)
  server.js   HTTP server entry point
  rules.js    In-memory rules store
public/       Static frontend (index.html, styles.css, app.js)
test/         API tests (node:test)
```

## Cloud Agent environment

`.cursor/environment.json` configures the Cursor Cloud Agent environment: it runs `npm ci` on setup and launches the dev server (`npm run dev`) in a `dev-server` terminal on port 3000.
