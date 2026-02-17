# Runbook: Deploy Vercel

## Variaveis de ambiente

Configurar no projeto Vercel:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `AUTHORIZED_OWNER_EMAIL`

## Processo

1. Conectar repositorio na Vercel.
2. Definir variaveis por ambiente.
3. Garantir que build command seja `pnpm build`.
4. Publicar branch `main`.

## Verificacao pos-deploy

1. `GET /api/health` retorna `status: ok`.
2. Rota privada redireciona para `/login` sem sessao.
3. Login so permite e-mail da dona.
4. `GET /manifest.webmanifest` responde com `display: standalone`.
5. `GET /sw.js` responde `200`.

## Validacao de instalacao PWA

1. Android (Chrome): menu `Instalar app`.
2. iPhone (Safari): `Compartilhar` -> `Adicionar a Tela de Inicio`.
3. Abrir pelo icone instalado (nao pela aba do navegador).
4. Confirmar que a interface abre em modo app, sem barra de URL persistente.
