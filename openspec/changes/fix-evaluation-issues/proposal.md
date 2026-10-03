# Proposal

## Why

A avaliação e o uso real da aplicação expõem resultados incorretos no card de intervalos, debounce instável, paginação que ignora a primeira página e um teste de integração que não valida o CSV padrão. O cálculo do back-end também faz passagens redundantes sobre os mesmos intervalos.

## What Changes

- Corrigir o bind de Maximum/Minimum no dashboard para usar `max` e `min` da API Outsera.
- Corrigir o debounce do filtro de ano para cancelar timers anteriores e não perder a última digitação.
- Alinhar a lista de filmes à paginação 0-based da API, preservando filtros e refletindo a página atual.
- Garantir o seed do CSV com `await` e um teste de integração que compara o resultado completo de `/producers/awards-interval` com o arquivo padrão.
- Combinar as passagens extras de min/max/filter em um único acúmulo após montar os intervalos consecutivos.
- Documentar interações com IA, checklist da avaliação, OpenSpec e Storybook.

## Capabilities

### New Capabilities

- `producer-award-intervals`: contrato observável de maior e menor intervalo entre vitórias consecutivas a partir do CSV padrão.
- `dashboard-interval-card`: apresentação distinta de Maximum e Minimum no dashboard.
- `year-filter-debounce`: filtro de ano determinístico após o intervalo de debounce.
- `movie-list-pagination`: primeira página, navegação e consistência com filtros.

### Modified Capabilities

- Nenhuma. Não há specs publicadas em `openspec/specs/` antes desta change.

## Impact

- Front: card de intervalos, `useDebounce`, rota `/list`, filtros, query de filmes, testes Vitest, Storybook.
- Back: `producer.service`, `seed.service`, e2e de awards-interval.
- Docs: `docs/AI_INTERACTIONS.md`, READMEs, `openspec/`.
