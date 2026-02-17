# Modelo de Dados Inicial

## Tabela `public.clients`

- `id uuid primary key default gen_random_uuid()`
- `name text not null`
- `phone text not null`
- `notes text null`
- `created_by uuid not null references auth.users(id)`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

## Regras

1. Nenhum seed de dados de negocio no bootstrap.
2. Trigger `set_updated_at` atualiza `updated_at` em updates.
3. RLS restringe CRUD por `created_by = auth.uid()`.

## Modelo planejado (proximas migrations, ainda nao aplicadas)

### 1) `public.client_profiles`

Objetivo: separar dados de perfil detalhado exibidos em `/clientes/[id]`.

Campos planejados:

- `client_id uuid primary key references public.clients(id) on delete cascade`
- `first_name text not null`
- `last_name text not null`
- `birth_date date null`
- `whatsapp text null`
- `created_by uuid not null references auth.users(id)`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

### 2) `public.appointments`

Objetivo: substituir card mock da Home por agenda real.

Campos planejados:

- `id uuid primary key default gen_random_uuid()`
- `client_id uuid not null references public.clients(id) on delete restrict`
- `scheduled_at timestamptz not null`
- `status text not null check (status in ('pending','started','cancelled','completed'))`
- `started_at timestamptz null`
- `cancelled_at timestamptz null`
- `late_seconds_at_start integer null`
- `late_seconds_at_cancel integer null`
- `cancellation_reason text null`
- `created_by uuid not null references auth.users(id)`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

### 3) `public.client_scores`

Objetivo: persistir score atual exibido em Home e Detalhes.

Campos planejados:

- `client_id uuid primary key references public.clients(id) on delete cascade`
- `score integer not null default 100 check (score between 0 and 100)`
- `updated_by uuid not null references auth.users(id)`
- `updated_at timestamptz not null default now()`

### 4) `public.client_score_events`

Objetivo: auditoria de alteracoes de score (atraso, desistencia e ajustes).

Campos planejados:

- `id uuid primary key default gen_random_uuid()`
- `client_id uuid not null references public.clients(id) on delete cascade`
- `appointment_id uuid null references public.appointments(id) on delete set null`
- `delta integer not null`
- `reason text not null`
- `meta jsonb null`
- `created_by uuid not null references auth.users(id)`
- `created_at timestamptz not null default now()`

### 5) `public.anamnesis_forms`

Objetivo: suportar status "Preenchido/Nao preenchido", data da ficha e regra de renovacao.

Campos planejados:

- `id uuid primary key default gen_random_uuid()`
- `client_id uuid not null references public.clients(id) on delete cascade`
- `status text not null check (status in ('filled','not_filled'))`
- `filled_at timestamptz null`
- `expires_at timestamptz generated always as (filled_at + interval '6 months') stored`
- `payload jsonb null`
- `created_by uuid not null references auth.users(id)`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

### 6) `public.client_metrics`

Objetivo: consolidar metricas da tela de detalhes.

Campos planejados:

- `client_id uuid primary key references public.clients(id) on delete cascade`
- `total_spent_cents bigint not null default 0`
- `average_delay_seconds integer not null default 0`
- `cancellation_rate numeric(5,2) not null default 0`
- `attendances_count integer not null default 0`
- `updated_at timestamptz not null default now()`

## Governanca de cadastro Supabase

Todo novo cadastro no Supabase deve ser documentado em:

- `docs/context/supabase-cadastro-log.md`
