# Estrutura de Pastas

## Principios

1. Separar entrega visual (`components`) de dominio (`features`).
2. Centralizar infraestrutura em `lib`.
3. Preservar documentacao viva em `docs`.

## Mapa Resumido

```txt
src/
  app/
  components/
  features/
  lib/
  hooks/
  styles/
  types/
supabase/
docs/
```

## Convencoes

- Componentes shadcn ficam em `src/components/ui`.
- Componentes de identidade visual ficam em `src/components/brand`.
- Wrappers de bibliotecas externas ficam em `src/components/shared`.
- Cada dominio em `src/features/<dominio>`.
