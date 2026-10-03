# Spec Delta

## Purpose

Mostrar no dashboard os produtores com o maior e o menor intervalo entre vitórias, sem misturar os dois conjuntos.

## ADDED Requirements

### Requirement: Distinct maximum and minimum sections
O card SHALL renderizar a seção Maximum com os registros `max` e a seção Minimum com os registros `min` retornados pela API.

#### Scenario: Different max and min payloads
- **WHEN** a resposta contém produtores e intervalos diferentes em `max` e `min`
- **THEN** Maximum mostra somente os dados de `max` e Minimum mostra somente os dados de `min`
