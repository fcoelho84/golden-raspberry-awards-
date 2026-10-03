# Plano: fix paginação da lista

## Overview

A lista já usa page 0-based, mas `ListNavigation` lia o cache com `getQueryData` (sem subscribe). Controles não atualizavam. Corrigir com `useQuery` compartilhado.

## Causa

Em `apps/web/src/modules/movie-list/api/use-movies.ts`, `useCacheMovies` usava `useQueryClient().getQueryData(['movies', params])`. Isso não assina o cache. `List` atualiza; a navegação fica com total 0 ou estado velho.

## Correção

`useCacheMovies` passa a usar `useMovies()` e devolver `.data`. Mesma `queryKey`; React Query deduplica.

Não alterar a fórmula 0-based nem o `validateSearch` da rota `/list`.

## Arquivos

- `apps/web/src/modules/movie-list/api/use-movies.ts`
- Testes existentes em `apps/web/src/modules/movie-list/` (permanecem válidos)
