# Plano: Storybook só em shared/ui e shared/hooks

## Overview

Restringir o Storybook ao kit shared. Remover stories de modules. Completar Layout, Loader e useDebounce. Melhorar Introduction e simplificar preview.

## Decisões

- Escopo: `shared/ui` + `shared/hooks` apenas.
- Apagar stories de `modules/`.
- useDebounce: story interativa (500 ms).
- Layout: RouterProvider em memória (usa `Link`).
- Preview sem QueryClient.
- Introduction e README web descrevem só shared.

## Arquivos

- `.storybook/main.ts`, `.storybook/preview.tsx`
- Stories novas: loader, layout, useDebounce
- Removidas: list-filters, list-navigation, shortest-longest-interval
- `src/stories/Introduction.mdx`, `apps/web/README.md`
