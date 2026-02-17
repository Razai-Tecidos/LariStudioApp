# Log de Decisoes

## 2026-02-17

1. Stack oficial: Next.js + TypeScript + Tailwind + shadcn/ui + Supabase.
2. Projeto single-tenant: acesso apenas da dona.
3. Auth inicial por email/senha.
4. Signup publico desativado.
5. Sem seeds de dados de negocio neste bootstrap.
6. Deploy alvo principal: Vercel.
7. Package manager oficial: pnpm.
8. Header padrao das telas principais definido com `text-4xl leading-[1.05] md:text-5xl`.
9. Barra inferior fixa definida como padrao de navegacao no dashboard autenticado.
10. Item central destacado da barra alterado para `Inicio`.
11. Navegacao final da barra: `Agenda`, `Clientes`, `Inicio`, `Catalogo`, `Mais`.
12. Dropdown de `Mais` definido com `Financeiro`, `Ajustes` e `Lembretes`.
13. Rotas frontend adicionadas: `/catalogo`, `/financeiro`, `/ajustes`, `/lembretes`.
14. Rotas antigas mantidas com redirecionamento: `/documentos` -> `/catalogo`, `/configuracoes` -> `/ajustes`.
15. Tela de clientes (busca e cards) redesenhada do zero mantendo paleta e linguagem visual oficial.
16. Exclusao de cliente no frontend exige confirmacao em modal antes da remocao da linha na lista.
17. Tela `Clientes` ganhou CTA no header para adicionar cliente e rota frontend dedicada `/clientes/novo`.
18. Banner de versiculo da Home foi refinado para mobile com menor padding e microtipografia mais leve.
