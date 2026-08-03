# Rosarium

Monorepo da plataforma Rosarium, com frontend em React/Vite e backend em Node.js/Express com Prisma.

## Stack

- `frontend`: React, TypeScript, Vite, Tailwind CSS
- `backend`: Node.js, Express, Prisma, PostgreSQL
- testes: Jest, Supertest e Vitest
- validação: Zod

## Workspace

Este repositório usa `pnpm` como gerenciador padrão.

- `pnpm-workspace.yaml` define os pacotes do monorepo
- há um único `pnpm-lock.yaml` na raiz
- os scripts da raiz centralizam lint, test e typecheck

## Requisitos

- Node.js `24.x`
- `pnpm`
- PostgreSQL para o backend

## Como rodar

Instalação:

```bash
pnpm install
```

Frontend:

```bash
pnpm --dir frontend dev
```

Backend:

```bash
pnpm --dir backend dev
```

## Testes

Rodar tudo:

```bash
pnpm test
```

Backend:

```bash
pnpm run test:backend
```

Frontend:

```bash
pnpm run test:frontend
```

## Lint

```bash
pnpm run lint
```

## Build do frontend

```bash
pnpm --dir frontend build
```

## Estrutura

- `frontend/`: aplicação web
- `backend/`: API e regras de negócio

## Observações

- a branch principal do repositório é `master`
- O backend sobe a aplicação a partir de `backend/src/infra/http/server.ts`
- `backend/src/main.ts` monta o app Express
- existe healthcheck em `GET /api/health`
- o backend usa `pino` para logs estruturados
- o frontend organiza as rotas por feature em arquivos `routes.ts`
- arquivos de build como `dist/` e `*.tsbuildinfo` são artefatos gerados e não devem ser versionados
