# 2026-10-03 — Fix paginação da lista

## Contexto

A listagem ignorava a primeira página e a paginação parecia quebrada em `ListNavigation`, apesar do índice 0-based já estar na rota e nos controles.

## Decisões

- Causa: `useCacheMovies` lia com `getQueryData` sem assinar o cache do React Query.
- Fix: reutilizar `useMovies()` e devolver `.data`.
- Manter page 0-based e `validateSearch` como estão.
- Plano e interação salvos em `docs/plans/` e `docs/AI_Interactions/`.

## Feito

- `useCacheMovies` atualizado em `apps/web/src/modules/movie-list/api/use-movies.ts`.
- Testes `src/modules/movie-list`: 3 arquivos, 9 testes, ok.
- Plano em `docs/plans/fix-list-pagination.md`.
