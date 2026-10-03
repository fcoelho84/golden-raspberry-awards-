# Design

## Context

O front consome a API Outsera (paginação Spring 0-based e `max`/`min` de intervalos). O back NestJS carrega `Movielist.csv` em SQLite em memória e expõe `GET /producers/awards-interval`. O seed não espera o parser, e o cálculo faz várias passagens sobre a mesma lista de intervalos.

## Goals / Non-Goals

**Goals:**

- Corrigir a origem dos bugs de apresentação, debounce e paginação.
- Validar o resultado observável da API local contra o CSV padrão.
- Reduzir passagens redundantes sem complicar o algoritmo.
- Registrar IA, OpenSpec e Storybook no repositório.

**Non-Goals:**

- Reimplementar a lista de filmes no back local.
- Trocar a API externa do dashboard.
- Arquivar a change OpenSpec nesta entrega.

## Decisions

- Paginação permanece 0-based de ponta a ponta: default `page: 0`, `pageNumber ?? 0`, filtros resetam para 0 e `year`/`winner` permanecem no search.
- `queryKey` da lista inclui os parâmetros; o refetch manual some.
- Debounce cancela o timeout anterior antes de agendar o próximo e limpa no unmount.
- Intervalos consecutivos continuam sendo gerados por produtor; min e max são acumulados no mesmo loop, sem quatro passagens extras.
- O e2e de dados padrões compara o JSON completo, não só tipos.
- Storybook documenta shared UI e os componentes do card, filtros e paginação.

## Risks / Trade-offs

- O golden do e2e quebra de propósito se o CSV oficial mudar. Isso é o comportamento pedido.
- Componentes de lista dependem do router; os testes precisam mockar navegação em vez de subir a app inteira.
