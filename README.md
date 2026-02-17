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

## PWA (Android e iPhone)

1. Publicar no Vercel (HTTPS obrigatorio).
2. Instalar o app pela opcao do navegador (`Instalar app` no Android ou `Adicionar a Tela de Inicio` no iPhone).
3. Abrir sempre pelo icone instalado na tela inicial.

Observacao:
- Se abrir pelo navegador normal (aba), a barra de URL vai aparecer.

## Scripts

- `npx pnpm@latest dev`
- `npx pnpm@latest lint`
- `npx pnpm@latest typecheck`
- `npx pnpm@latest test`
- `npx pnpm@latest build`

## Estado Atual do Frontend

- Dashboard autenticado com header padrao, profile menu e bottom nav fixa.
- Home com slider manual de versiculos e card de "Proxima cliente".
- Card de "Proxima cliente" com horario, tag de atraso automatica, score e confirmacao para iniciar/desistencia.
- Tela de clientes com busca refinada, CTA de adicionar cliente e modal de exclusao.
- Detalhes de cliente em `/clientes/[id]` com edicao local (mock), anamnese, metricas e historico.

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
- `/clientes/[id]`
- `/agendamento`
- `/catalogo`
- `/financeiro`
- `/ajustes`
- `/lembretes`

## Documentacao

A documentacao completa do projeto esta em `docs/README.md`.
