# 2026-10-03 — README, plano e skill de persistência

## Contexto

Pedido para reescrever os READMEs do monorepo e, em seguida, salvar o plano, registrar a interação e criar uma skill que automatize "Salve o plano e a interação."

## Decisões

- Planos ficam em `docs/plans/` (não na raiz).
- Interações por sessão ficam em `docs/AI_Interactions/`.
- O índice geral continua em `docs/AI_INTERACTIONS.md`.
- Skills ficam em `.cursor/skills/` (não em `skills/` na raiz).
- Documentar só scripts e pastas que existem no repo.

## Feito

- Plano salvo em `docs/plans/readme-monorepo-completo.md`.
- Este registro criado; índice atualizado em `docs/AI_INTERACTIONS.md`.
- Skill `.cursor/skills/save-plan-and-interaction/` adicionada.
- READMEs da raiz, da API e do web reescritos.
- Paths e scripts do README validados contra o disco e os `package.json`.
