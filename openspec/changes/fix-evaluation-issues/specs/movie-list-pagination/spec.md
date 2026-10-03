# Spec Delta

## Purpose

Navegar a lista de filmes a partir da primeira página da API e manter filtros e controles coerentes com a página selecionada.

## ADDED Requirements

### Requirement: Zero-based first page
A lista SHALL carregar a página inicial correspondente ao índice 0 da API e SHALL exibir os registros dessa página.

#### Scenario: Initial load
- **WHEN** o usuário abre a lista sem página na URL
- **THEN** a primeira página da API é solicitada e Previous fica desabilitado

### Requirement: Page navigation
O usuário SHALL avançar e voltar páginas, e os controles SHALL refletir a página atual e os limites da primeira e da última página.

#### Scenario: Next and previous
- **WHEN** o usuário avança e depois retorna
- **THEN** a página solicitada e o intervalo exibido acompanham a seleção

#### Scenario: Filter resets page
- **WHEN** um filtro válido é aplicado
- **THEN** a paginação volta à primeira página e o filtro permanece no estado da busca
