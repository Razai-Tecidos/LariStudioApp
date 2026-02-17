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

## Navegacao Inferior

- Estrutura de itens: `Agenda`, `Clientes`, `Inicio` (centro destacado), `Catalogo`, `Mais`.
- `Mais` abre dropdown com: `Financeiro`, `Ajustes`, `Lembretes`.
