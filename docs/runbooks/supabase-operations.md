# Runbook: Operacoes Supabase

## Migrations

1. Criar nova migration SQL em `supabase/migrations`.
2. Aplicar no ambiente alvo via pipeline/CLI.
3. Atualizar `src/types/database.ts` apos mudancas de schema.
4. Registrar a alteracao em `docs/context/supabase-cadastro-log.md`.
5. Se houver impacto arquitetural, atualizar `docs/context/decisions-log.md`.

## Seguranca

1. Sempre revisar politicas RLS apos alteracoes de tabela.
2. Validar isolamento com scripts em `supabase/tests`.
3. Nao expor `SUPABASE_SERVICE_ROLE_KEY` no cliente.
4. Nunca versionar `.env.local` nem copiar chaves sensiveis em arquivos de documentacao publica.
5. Se houver vazamento de chave, rotacionar imediatamente no painel Supabase.

## Usuario proprietario

1. Criar conta manualmente no Supabase Auth.
2. Confirmar e-mail da conta.
3. Configurar o mesmo e-mail em `AUTHORIZED_OWNER_EMAIL`.

## Checklist de entrega (obrigatorio)

1. Migration versionada no Git.
2. Teste de RLS atualizado em `supabase/tests` (quando aplicavel).
3. Tipos atualizados em `src/types/database.ts`.
4. Registro preenchido em `docs/context/supabase-cadastro-log.md`.

## Ordem recomendada para novos modulos de dados

1. Criar schema/migrations para agenda e atendimentos.
2. Criar schema/migrations para score e eventos de score.
3. Criar schema/migrations para perfil detalhado e anamnese.
4. Ligar frontend aos dados reais somente apos validar RLS e testes SQL.
