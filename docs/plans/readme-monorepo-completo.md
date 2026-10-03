# Plano: README completo + persistência de plano/interação + skill

## Overview

Salvar este plano em `docs/plans/`, criar `docs/AI_Interactions/` com o registro da interação, adicionar skill em `.cursor/skills/` para automatizar "salve o plano e a interação", e reescrever os READMEs com as pastas reais.

## Decisões de path

| Pedido | Caminho real |
|--------|----------------|
| `plans/` | `docs/plans/` |
| `AI_Interactions/` | `docs/AI_Interactions/` |
| `skills/` | `.cursor/skills/` |

Não criar essas pastas na raiz do monorepo.

## Fatos do repositório

- Apps: `apps/api` (NestJS, SQLite memória, CSV) e `apps/web` (React, Outsera).
- Sem `.env` obrigatório. API: `PORT ?? 3001`.
- Scripts raiz: `dev`, `build`, `test` (web), `test:e2e` (api).
- OpenSpec em `openspec/`. Skills em `.cursor/skills/`.

## Fases

### A — Persistência

1. Este arquivo em `docs/plans/readme-monorepo-completo.md`.
2. Registro em `docs/AI_Interactions/` + índice em `docs/AI_INTERACTIONS.md`.
3. Skill `.cursor/skills/save-plan-and-interaction/`.

### B — READMEs

1. README raiz: onboarding completo.
2. `apps/api/README.md` e `apps/web/README.md`: específicos + links para a raiz.

### C — Validação

Conferir paths, comandos e links. Sem pastas inventadas na raiz.

## Escopo dos READMEs

Ordem do README raiz: o que é → pré-requisitos → estrutura → pastas de processo → começar → produção → testes → Storybook → mapa de docs → fluxo de desenvolvimento → checklist da avaliação.
