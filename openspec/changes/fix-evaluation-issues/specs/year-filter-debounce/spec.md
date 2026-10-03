# Spec Delta

## Purpose

Aplicar o filtro de ano da lista somente depois de uma pausa na digitação, sem perder a última alteração válida.

## ADDED Requirements

### Requirement: Deterministic year debounce
Cada alteração válida do ano SHALL ser processada somente após o intervalo de debounce, e uma nova digitação SHALL cancelar o processamento pendente anterior.

#### Scenario: Rapid typing
- **WHEN** o usuário altera o ano várias vezes dentro do intervalo de debounce
- **THEN** apenas o último valor é aplicado, uma única vez, depois do intervalo

#### Scenario: Cleanup
- **WHEN** o debounce pendente é descartado antes do intervalo terminar
- **THEN** o valor pendente não é aplicado
