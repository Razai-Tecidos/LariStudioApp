# Visao Geral de Arquitetura

## Objetivo

Base tecnica para sistema interno single-tenant do Lari Machado Studio, com acesso exclusivo da dona.

## Camadas

1. `src/app`: rotas e layouts (App Router).
2. `src/features`: regras de negocio organizadas por dominio.
3. `src/components`: biblioteca visual reutilizavel.
4. `src/lib`: infraestrutura transversal (Supabase, env, validacoes, utilitarios).
5. `supabase`: infraestrutura de banco, migrations e testes SQL.
6. `docs`: contexto e governanca tecnica.

## Seguranca

- Signup publico desativado no Supabase.
- Middleware exige sessao ativa e valida e-mail da proprietaria.
- RLS em `public.clients` para isolamento por `created_by`.

## UI do Dashboard (Atual)

- Header padrao nas telas principais com classe `text-4xl leading-[1.05] md:text-5xl`.
- Menu de perfil no header com acao de logout via dropdown.
- Barra inferior fixa com safe-area para evitar sobreposicao de conteudo.
- Item central destacado da barra: `Inicio`.
- Item `Mais` abre dropdown com atalhos de modulos secundarios.
- Home usa `InfoBannerSlider` (arraste horizontal manual, sem autoplay).
- Home usa `NextClientCard` com status de atraso em tempo real (frontend/memory).
- Padrao de modal visual unificado para confirmacoes de acao.
- Clientes usa fluxo de lista -> detalhe via rota dinamica.

## Rotas Principais (Atual)

- `/` Home
- `/clientes`
- `/clientes/novo` (placeholder frontend para cadastro)
- `/clientes/[id]` (detalhe da cliente)
- `/agendamento`
- `/catalogo`
- `/financeiro`
- `/ajustes`
- `/lembretes`

Compatibilidade:

- `/documentos` redireciona para `/catalogo`
- `/configuracoes` redireciona para `/ajustes`
