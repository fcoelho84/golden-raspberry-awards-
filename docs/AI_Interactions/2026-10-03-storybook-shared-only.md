# 2026-10-03 — Storybook só shared

## Contexto

Pedido para Storybook apenas em `shared/`. Grill fechou escopo em `shared/ui` + `shared/hooks`, stories para Layout/Loader, useDebounce interativo, Introduction melhor e preview sem React Query.

## Decisões

- Glob do Storybook limitado a shared + Introduction.mdx.
- Modules não têm stories.
- Persistência em `docs/plans/` e `docs/AI_Interactions/`.

## Feito

- Config e preview atualizados.
- Stories de modules apagadas.
- Layout, Loader e useDebounce adicionados.
- Introduction.mdx e README web atualizados.
- Plano e este registro salvos.
- `storybook build` ok; assets só shared + Introduction.
