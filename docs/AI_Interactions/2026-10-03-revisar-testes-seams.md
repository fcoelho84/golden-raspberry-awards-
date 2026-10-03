# 2026-10-03 — Revisar testes (foco E2E)

## Contexto

Revisão TDD nos seams confirmados, com ênfase em e2e: regressão do golden/contrato, campos inválidos e fluxos principais. Persistência via `save-plan-and-interaction`.

## Decisões

- Seams: API, movie-list, dashboard cards, useDebounce.
- Só reforçar testes fracos no front.
- Seed passa a rejeitar title/year/producers inválidos para bater com as validações esperadas.

## Feito

- E2E: contrato no golden; max no intervalo único; mistura válido+inválido; producers vazio; só `yes` no intervalo.
- Seed: validação de campos essenciais.
- Front: empty/loading apertados; labels de filtros.
- Suites: web 21 ok; api e2e 13 ok.
