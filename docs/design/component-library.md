# Biblioteca de Componentes Base

## Componentes de marca

- `PageHeader`
- `ProfileMenu`
- `BottomNav`
- `SectionDivider`
- `SearchInput`
- `InfoBanner`
- `InfoBannerSlider`
- `ClientCard`
- `NextClientCard`
- `EmptyState`
- `ConfirmDeleteDialog`

## Componentes compartilhados

- `SignatureField` (react-signature-canvas)
- `PdfPreview` (react-pdf)

## Base de UI

Componentes estruturais e de formulario via `shadcn/ui` em `src/components/ui`.

## Padroes Atuais (Clientes)

- `SearchInput`: estilo minimalista elegante, borda suave, tipografia `DM Sans`, foco discreto sem dupla borda.
- `ClientCard`: hierarquia clara (`Nome` dominante, `Telefone` secundario), acoes discretas e sempre visiveis.
- `ClientCard`: clique no card e icone de editar abrem o mesmo fluxo (`/clientes/[id]`).
- `ClientList`: ritmo visual com espacamento respirado entre busca e cards.
- `ClientList`: botao `Adicionar cliente` full-width entre busca e lista.
- `ConfirmDeleteDialog`: confirmacao obrigatoria antes de excluir cliente, com destaque visual suave e texto contextual com nome.
- Header de `Clientes`: apenas titulo + profile menu (CTA permanece no corpo da tela).

## Padroes Atuais (Detalhes da cliente)

- Rota: `/clientes/[id]`.
- Header da rota usa titulo fixo `Detalhes`.
- Nome da cliente fica abaixo do divisor, com botao `Voltar para clientes` acima.
- Secoes principais:
  - `Dados da cliente` (edicao local de nome, sobrenome, data de nascimento e WhatsApp).
  - `Ficha de anamnese` (status, data, tags `Em dia`/`Renovar`, botoes de criar/visualizar/atualizar).
  - `Historico de atendimentos`.
- Botoes de acao dessas secoes seguem largura total.

## Home (Banner e proxima cliente)

- `InfoBanner` centralizado com hierarquia secundaria em relacao ao header principal.
- `InfoBannerSlider` controla os versiculos com arraste lateral manual (sem autoplay).
- Indicadores de slide ficam no canto inferior direito, pequenos e sem wrapper.
- Altura visual do banner estabilizada para leitura consistente de ate duas linhas.
- `NextClientCard` mostra horario, atraso, score e acoes de atendimento.
- `Iniciar atendimento` e `Desistencia` exigem modal de confirmacao.

## Navegacao Inferior

- Estrutura de itens: `Agenda`, `Clientes`, `Inicio` (centro destacado), `Catalogo`, `Mais`.
- `Mais` abre dropdown com: `Financeiro`, `Ajustes`, `Lembretes`.

## Padrao de modal

- Todos os modais de confirmacao usam o mesmo estilo base:
  - `rounded-3xl`
  - `border-primary/15`
  - `bg-card`
  - sombra suave e botoes com contraste controlado
