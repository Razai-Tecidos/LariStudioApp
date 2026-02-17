# Biblioteca de Componentes Base

## Componentes de marca

- `PageHeader`
- `ProfileMenu`
- `BottomNav`
- `SectionDivider`
- `SearchInput`
- `InfoBanner`
- `ClientCard`
- `EmptyState`
- `ConfirmDeleteDialog`

## Componentes compartilhados

- `SignatureField` (react-signature-canvas)
- `PdfPreview` (react-pdf)

## Base de UI

Componentes estruturais e de formulario via `shadcn/ui` em `src/components/ui`.

## Padroes Atuais (Clientes)

- `SearchInput`: estilo minimalista elegante, borda suave, tipografia `DM Sans`, foco discreto.
- `ClientCard`: hierarquia clara (`Nome` dominante, `Telefone` secundario), acoes discretas e sempre visiveis.
- `ClientList`: ritmo visual com espacamento respirado entre busca e cards.
- `ConfirmDeleteDialog`: confirmacao obrigatoria antes de excluir cliente, com destaque visual suave e texto contextual com nome.
- Header de `Clientes`: inclui CTA `Adicionar cliente` no topo, levando para `/clientes/novo`.

## Home (Banner de Versiculo)

- `InfoBanner` centralizado com hierarquia secundaria em relacao ao header principal.
- Padding mobile reduzido para manter ritmo visual com o restante da tela.
- Microtipografia de descricao ajustada para leitura leve em telas pequenas.

## Navegacao Inferior

- Estrutura de itens: `Agenda`, `Clientes`, `Inicio` (centro destacado), `Catalogo`, `Mais`.
- `Mais` abre dropdown com: `Financeiro`, `Ajustes`, `Lembretes`.
