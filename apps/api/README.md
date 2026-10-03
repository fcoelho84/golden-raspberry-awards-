# Golden Raspberry Awards (API)

No boot, a aplicação lê o CSV de filmes, persiste os registros em SQLite em memória e expõe HTTP para consultar produtores com maior e menor intervalo entre prêmios consecutivos.

Onboarding do monorepo: [README raiz](../../README.md).

## Stack

- [NestJS](https://nestjs.org/) — módulos, DI, TypeScript
- SQLite em memória (`better-sqlite3`) — sem SGBD externo
- `csv-parser` — leitura do arquivo padrão

## Endpoint

| Método | URL |
|--------|-----|
| `GET` | `http://localhost:3001/producers/awards-interval` |

Resposta: `{ min: [...], max: [...] }` com `producer`, `interval`, `previousWin`, `followingWin`.

Porta: `process.env.PORT` ou `3001`.

## Fonte de dados

```text
src/database/Movielist.csv
```

O teste e2e de dados padrões compara o JSON completo de `/producers/awards-interval` com o resultado desse arquivo. Se o CSV mudar o resultado, o teste falha.

## Comandos

Na raiz do monorepo:

```bash
pnpm install
pnpm dev --filter=api
pnpm test:e2e
```

Dentro de `apps/api`:

```bash
pnpm dev          # nest start --watch
pnpm start
pnpm build
pnpm prod         # node dist/main
pnpm test         # e2e (vitest.config.e2e.ts)
pnpm test:unit
pnpm lint         # oxlint
pnpm format
```

Testes em `test/**/*.e2e-spec.ts`.

## Documentação relacionada

- [docs/AI_INTERACTIONS.md](../../docs/AI_INTERACTIONS.md)
- [docs/plans/](../../docs/plans/)
- [openspec/changes/fix-evaluation-issues/](../../openspec/changes/fix-evaluation-issues/)
