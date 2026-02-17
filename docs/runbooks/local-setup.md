# Runbook: Setup Local

## Pre-requisitos

- Node.js 22+
- pnpm 10 (via `npx pnpm@latest`)
- Projeto Supabase criado

## Passos

1. `cp .env.example .env.local`
2. Preencher variaveis do Supabase e `AUTHORIZED_OWNER_EMAIL`.
3. `npx pnpm@latest install`
4. `npx pnpm@latest dev`
5. Abrir `http://localhost:3000`

## Validacao rapida

1. `npx pnpm@latest lint`
2. `npx pnpm@latest typecheck`
3. `npx pnpm@latest test`
