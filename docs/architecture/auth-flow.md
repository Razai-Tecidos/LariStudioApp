# Fluxo de Autenticacao

## Regras

1. Apenas uma usuaria autorizada (dona).
2. A autenticacao usa email e senha do Supabase Auth.
3. Signup publico permanece desativado.

## Fluxo

1. Usuaria acessa `/login`.
2. Envia credenciais via Supabase Auth.
3. Middleware verifica sessao e confere `AUTHORIZED_OWNER_EMAIL`.
4. Se valido, libera rotas em `(dashboard)`.
5. Se invalido, encerra sessao e redireciona para `/login`.

## Recuperacao de senha

- Tela `/reset-password` envia e-mail de recuperacao via Supabase.
