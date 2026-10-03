# Plano: revisar testes (seams) — foco E2E

## Overview

Priorizar e2e de `GET /producers/awards-interval` (regressão, campos inválidos, fluxos principais), apertar testes fracos do front nos seams confirmados e persistir com `save-plan-and-interaction`.

## Decisões

- Seams: API awards-interval; movie-list; dashboard cards; useDebounce.
- Q2: só reforçar testes fracos; manter os bons.
- E2E primeiro: golden + contrato; inválidos misturados com válidos; producers vazio; max no intervalo único; só winner=yes.
- Seed rejeita title vazio, year não inteiro e producers vazio (alinha ao comportamento esperado pelos e2e).

## Escopo

### Manter

useDebounce; list-filters debounce/page 0; list-navigation 0-based; max≠min no card; e2e mockados existentes.

### Alterar

- `awards-interval.e2e-spec.ts` — contrato, mistos, producers vazio, interleaved yes/no, max no unordered.
- `seed.service.ts` — validação de campos essenciais.
- Front: empty/loading em interval, list, movie/studio win-count; labels em list-filters.

## Validação

```bash
# api e2e — 13 testes
# web seams — 21 testes
```
