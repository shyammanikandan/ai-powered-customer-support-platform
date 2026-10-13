# AI-Powered Customer Support Platform

A portfolio project demonstrating backend engineering,
AI integration, and practical cloud experience.

## Project status

Sprint 1, Day 1: Initial development environment established.

Currently implemented:

- TypeScript and Express backend
- GET /health endpoint
- React and TypeScript frontend
- npm workspaces
- Initial project documentation

Planned:

- Support ticket creation and management
- PostgreSQL persistence
- Automated backend tests
- AI-assisted support features using Amazon Bedrock
- AWS deployment

## Architecture

The repository contains separate frontend and backend applications
managed through npm workspaces.

- `apps/api`: Node.js, Express, and TypeScript
- `apps/web`: React, TypeScript, and Vite
- `docs/adr`: Architecture decision records

See `docs/adr/0001-initial-architecture.md` for the
initial architecture decision.

## Prerequisites

- Node.js 24 or a compatible supported version
- npm
- Git

## Local setup

Clone the repository, then enter the project directory.

Install dependencies:

```bash
npm install
```

Create `apps/api/.env` with:

```dotenv
PORT=3000
```

Start the backend:

```bash
npm run dev:api
```

The API runs on `http://localhost:3000`.

Test its health endpoint:

```bash
curl -i http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok"
}
```

In a second terminal, start the frontend:

```bash
npm run dev:web
```

Open the local URL printed by Vite, normally
`http://localhost:5173`.

## Development checks

Run the backend TypeScript check:

```bash
npm run typecheck --workspace=@support/api
```

## Scope and limitations

Authentication, database persistence, ticket CRUD operations,
AI integration, queues, and cloud deployment are not yet implemented.

Do not commit `.env` files or real credentials.
