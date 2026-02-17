# ADR 0002 - Supabase Auth e RLS

## Status

Aceito.

## Contexto

O sistema precisa de autenticacao simples e seguranca de dados por usuario.

## Decisao

Usar Supabase Auth (email/senha), signup desativado e RLS em `public.clients`.

## Consequencias

- Controle de acesso direto no banco.
- Menor risco de vazamento entre usuarios.
- Exige disciplina na definicao de politicas SQL.
