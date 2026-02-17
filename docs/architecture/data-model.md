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
