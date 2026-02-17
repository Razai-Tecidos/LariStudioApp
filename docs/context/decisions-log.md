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
17. CTA `Adicionar cliente` movida para entre busca e lista, em botao full-width.
18. Banner de versiculo da Home passou para slider manual com arraste horizontal.
19. Indicadores do slider foram reduzidos e posicionados no canto inferior direito.
20. Card de "Proxima cliente" passou a incluir horario, score e status de atraso.
21. Tag `Atrasada` deve aparecer automaticamente sem refresh manual (timer em frontend).
22. `Iniciar atendimento` e `Desistencia` passaram a exigir modal de confirmacao.
23. `Desistencia` apos atraso aplica penalidade no score (regra frontend atual).
24. Atraso contabilizado e exibido apos iniciar/encerrar atendimento (estado local).
25. Tela de detalhes da cliente adicionada em `/clientes/[id]`.
26. Clique no card de cliente e acao de editar usam o mesmo destino (`/clientes/[id]`).
27. Header da tela de detalhes permanece fixo como `Detalhes`; nome fica abaixo do divisor.
28. Botao `Voltar para clientes` posicionado acima do nome da cliente.
29. Campos editaveis na tela de detalhes: nome, sobrenome, data de nascimento e WhatsApp.
30. Ficha de anamnese ganhou botao `Atualizar ficha` e regra de renovacao em 6 meses.
31. Tag da anamnese: `Renovar` quando vencida; `Em dia` quando dentro do prazo.
32. Padrao visual de modais unificado para manter consistencia entre telas.
33. Cadastro futuro no Supabase exige registro obrigatorio em `docs/context/supabase-cadastro-log.md`.
34. Base PWA adicionada com `manifest.webmanifest`, icones e service worker minimo.
35. Metadata de web app/Apple configurada para experiencia mais proxima de app nativo.
