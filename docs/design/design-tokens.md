# Design Tokens

Tokens em `src/styles/tokens.css`.

## Paleta oficial

- `#3B564D`: tom principal (tipografia forte, acoes principais e contraste).
- `#E0E0D4`: superficie base de cards e campos.
- `#B9C5B1`: suporte para blocos secundarios e bordas suaves.
- `#E8E6DA`: fundo geral da aplicacao.
- `#D3BEB9`: destaque sutil para estados de enfase.

## Mapeamento semantico

- `--primary`: `#3B564D`
- `--background`: `#E8E6DA`
- `--card` e `--muted`: `#E0E0D4`
- `--secondary` e `--border`: `#B9C5B1`
- `--accent`: `#D3BEB9`

## Uso

1. Componentes devem consumir variaveis sem hardcode de cores.
2. Novos tokens devem ser adicionados no arquivo central.
3. O frontend deve manter leitura minimalista moderna, com alinhamento preciso e organizacao visual consistente.