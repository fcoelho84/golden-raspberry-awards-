# Spec Delta

## Purpose

Expor, a partir do arquivo CSV padrão carregado no boot, os produtores com o maior e o menor intervalo entre vitórias consecutivas.

## ADDED Requirements

### Requirement: Award interval response from the default file
A API SHALL retornar `min` e `max` calculados a partir do arquivo CSV padrão, com cada item contendo `producer`, `interval`, `previousWin` e `followingWin`, onde `followingWin - previousWin` equals `interval`.

#### Scenario: Default file result
- **WHEN** o cliente consulta o endpoint de intervalos após o boot com o arquivo padrão
- **THEN** o corpo da resposta contém exatamente os produtores, anos, intervalos, quantidades e ordenação observável produzidos por esse arquivo

#### Scenario: Changed default file changes the result
- **WHEN** o arquivo padrão é alterado de forma que qualquer intervalo, produtor, ano ou quantidade relevante mude
- **THEN** o resultado esperado da API muda e o teste de integração baseado no arquivo anterior deixa de passar

### Requirement: Consecutive wins only
O sistema SHALL considerar apenas pares consecutivos de vitórias do mesmo produtor, e SHALL incluir todos os empates no menor e no maior intervalo.

#### Scenario: Three or more wins
- **WHEN** um produtor tem três ou mais vitórias
- **THEN** cada par consecutivo gera um intervalo próprio e apenas os extremos globais entram em `min` ou `max`
