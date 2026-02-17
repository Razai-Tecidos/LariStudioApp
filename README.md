# Lari Machado Studio

Projeto base para gestao interna do estudio, construido com Next.js, TypeScript, Tailwind, shadcn/ui e Supabase.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Supabase (Auth + Postgres + RLS)
- lucide-react
- react-signature-canvas
- react-pdf

## Setup rapido

1. Copie `.env.example` para `.env.local`.
2. Preencha as variaveis de ambiente do Supabase.
3. Instale as dependencias: `npx pnpm@latest install`.
4. Rode em desenvolvimento: `npx pnpm@latest dev`.

## Scripts

- `npx pnpm@latest dev`
- `npx pnpm@latest lint`
- `npx pnpm@latest typecheck`
- `npx pnpm@latest test`
- `npx pnpm@latest build`

## Navegacao Atual (Dashboard)

Barra inferior fixa:

- `Agenda`
- `Clientes`
- `Inicio` (item central destacado)
- `Catalogo`
- `Mais` (dropdown com `Financeiro`, `Ajustes`, `Lembretes`)

Rotas frontend existentes:

- `/`
- `/clientes`
- `/clientes/novo`
- `/agendamento`
- `/catalogo`
- `/financeiro`
- `/ajustes`
- `/lembretes`

## Documentacao

A documentacao completa do projeto esta em `docs/README.md`.
