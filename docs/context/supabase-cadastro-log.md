# Log de Cadastros Supabase (Futuros)

Este documento registra tudo que for cadastrado no Supabase apos o bootstrap inicial.

## Regra obrigatoria

Toda alteracao no Supabase deve registrar:

1. Schema (tabelas, colunas, constraints, indices, triggers).
2. Seguranca (RLS, policies, grants).
3. Auth (providers, templates, regras de signup/invite/reset).
4. Storage (buckets, policies).
5. Dados internos (valores de referencia, tabelas de dominio, seeds controlados).

Sem registro neste arquivo, a alteracao e considerada incompleta.

## Template de entrada

Use este bloco para cada cadastro:

```md
### YYYY-MM-DD - <titulo curto>

- Tipo: schema | rls | auth | storage | seed-interno | config
- Migration/Origem: supabase/migrations/<arquivo>.sql | dashboard-manual
- Ambiente: local | preview | producao
- Objetivo: <motivo de negocio/tecnico>
- Mudancas:
  - <item 1>
  - <item 2>
- Impacto no app:
  - <rota/componente/feature afetada>
- Rollback:
  - <como desfazer com seguranca>
- Validacao:
  - <teste SQL/RLS/manual executado>
- Responsavel: <nome>
- Status: planejado | aplicado | validado
```

## Pendentes mapeados (planejados)

### 2026-02-17 - Agenda e atendimento

- Tipo: schema
- Migration/Origem: pendente
- Ambiente: pendente
- Objetivo: sair de mock local da Home para dados reais de agenda/atendimento.
- Mudancas:
  - Criar estrutura para compromissos com `scheduled_at`, `started_at`, `status`.
  - Registrar `desistencia` e atraso contabilizado no atendimento.
- Impacto no app:
  - Home (`Proxima cliente`), Agenda e historico de atendimento.
- Rollback:
  - Definir na migration oficial.
- Validacao:
  - Definir em `supabase/tests` no momento da implementacao.
- Responsavel: pendente
- Status: planejado

### 2026-02-17 - Score da cliente

- Tipo: schema
- Migration/Origem: pendente
- Ambiente: pendente
- Objetivo: persistir score de cliente e eventos de penalidade hoje calculados no frontend.
- Mudancas:
  - Definir tabela de score atual por cliente.
  - Definir tabela de eventos de score (delta, motivo, referencia de atendimento).
- Impacto no app:
  - Home e modulo Clientes.
- Rollback:
  - Definir na migration oficial.
- Validacao:
  - Definir em `supabase/tests` no momento da implementacao.
- Responsavel: pendente
- Status: planejado

### 2026-02-17 - Perfil detalhado de cliente

- Tipo: schema
- Migration/Origem: pendente
- Ambiente: pendente
- Objetivo: persistir dados exibidos/editados em `/clientes/[id]`.
- Mudancas:
  - Criar tabela de perfil com nome, sobrenome, data de nascimento e WhatsApp.
  - Relacionar perfil ao cadastro base da cliente.
- Impacto no app:
  - Tela de detalhes da cliente.
- Rollback:
  - Definir na migration oficial.
- Validacao:
  - Definir em `supabase/tests` no momento da implementacao.
- Responsavel: pendente
- Status: planejado

### 2026-02-17 - Ficha de anamnese e validade

- Tipo: schema
- Migration/Origem: pendente
- Ambiente: pendente
- Objetivo: substituir estado mock da anamnese por dados reais com regra de renovacao.
- Mudancas:
  - Criar tabela de fichas de anamnese por cliente.
  - Persistir data de preenchimento e validade (6 meses).
  - Registrar status (`filled`/`not_filled`) e payload da ficha.
- Impacto no app:
  - Componente de anamnese em `/clientes/[id]`.
- Rollback:
  - Definir na migration oficial.
- Validacao:
  - Definir em `supabase/tests` no momento da implementacao.
- Responsavel: pendente
- Status: planejado
