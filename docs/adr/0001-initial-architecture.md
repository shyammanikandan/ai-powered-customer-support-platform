# ADR 0001: Initial Application Architecture

- Status: Accepted
- Date: 2026-10-13

## Context

The project is an AI-powered customer support platform intended
to demonstrate backend engineering, AI integration,
and practical cloud experience.

The initial development environment must be straightforward to
run locally, easy to test, and suitable for incremental growth.

## Decision

Use a modular monolith for the backend and a separate React
frontend, maintained in one Git repository.

The backend uses Node.js, TypeScript, and Express.
The frontend uses React, TypeScript, and Vite.
npm workspaces manage the applications from the repository root.

Future backend modules will separate responsibilities such as
ticket management and AI-assisted support functionality.

PostgreSQL and Amazon Bedrock will be introduced when their
respective features are implemented.

## Alternatives considered

### Microservices

Advantages:

- Independent deployment and scaling.
- Strong service boundaries when multiple teams need them.

Disadvantages:

- More infrastructure and operational complexity.
- Network communication and distributed failure modes.
- Unnecessary overhead for the current project stage.

### Single application with frontend and backend combined

Advantages:

- Fewer initial configuration files.
- Simple for a very small prototype.

Disadvantages:

- Less explicit separation between frontend and backend.
- Less flexibility for independent development and deployment.

## Consequences

Positive:

- Simple local development.
- Clear frontend/backend separation.
- Business modules can be introduced incrementally.
- A single repository makes the project easier to review.

Trade-offs:

- Frontend and backend require separate development servers.
- The backend must maintain clear internal module boundaries.
- Shared repository tooling requires deliberate configuration.

## Scope

This decision establishes the initial architecture only.
It does not introduce authentication, PostgreSQL persistence,
AI model integration, queues, or AWS deployment.
