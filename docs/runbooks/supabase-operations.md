# Runbook: Operacoes Supabase

## Migrations

1. Criar nova migration SQL em `supabase/migrations`.
2. Aplicar no ambiente alvo via pipeline/CLI.
3. Atualizar `src/types/database.ts` apos mudancas de schema.

## Seguranca

1. Sempre revisar politicas RLS apos alteracoes de tabela.
2. Validar isolamento com scripts em `supabase/tests`.
3. Nao expor `SUPABASE_SERVICE_ROLE_KEY` no cliente.

## Usuario proprietario

1. Criar conta manualmente no Supabase Auth.
2. Confirmar e-mail da conta.
3. Configurar o mesmo e-mail em `AUTHORIZED_OWNER_EMAIL`.
