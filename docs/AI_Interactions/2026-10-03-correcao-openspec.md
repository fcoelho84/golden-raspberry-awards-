# Registro de interações com IA

Índice das interações com ferramentas de inteligência artificial neste repositório.

Registros detalhados por sessão ficam em [`AI_Interactions/`](AI_Interactions/).

## Índice

| Data | Assunto | Arquivo |
|------|---------|---------|
| 2026-10-03 | Correções da avaliação, OpenSpec, Storybook e documentação | [entrada abaixo](#2026-10-03--correções-da-avaliação-openspec-storybook-e-documentação) |
| 2026-10-03 | README completo, plano e skill de persistência | [`AI_Interactions/2026-10-03-readme-plano-e-skill.md`](AI_Interactions/2026-10-03-readme-plano-e-skill.md) |

---

## 2026-10-03 — Correções da avaliação, OpenSpec, Storybook e documentação

- **Ferramenta / modelo:** Cursor, com o agente Composer (Grok 4.7), e a CLI [OpenSpec](https://github.com/Fission-AI/openspec) (`@fission-ai/openspec`).
- **Contexto:** monorepo Golden Raspberry Awards (`apps/web` + `apps/api`), a partir do plano em [`docs/plans/correcoes-avaliacao-ia.md`](plans/correcoes-avaliacao-ia.md) e do PDF da avaliação.

### Prompts

1. Analisar o projeto e corrigir o card de intervalos, o debounce do ano, a primeira página e a paginação; tornar o teste de integração fiel ao arquivo padrão; reduzir loops redundantes; criar o registro de interações com IA; usar OpenSpec para os comandos da IA; melhorar a documentação e adicionar Storybook.
2. Criar a pasta `docs` na raiz e salvar os planos nela.
3. Implementar o plano de correções da avaliação, OpenSpec, Storybook e documentação.

### Objetivo

Deixar o comportamento observável correto (front e API local), com testes, e deixar rastreável como a IA foi usada.

### Orientações relevantes obtidas

- O card mostrava Maximum e Minimum iguais porque os dois campos liam `min`.
- O debounce anulava o timer antes de `clearTimeout`, então digitação rápida não cancelava a chamada anterior.
- A lista da API externa é paginada a partir de `page=0`. O default `page: 1` e `pageNumber || 1` pulavam a primeira página e travavam o botão Previous.
- O teste de “dados padrões” só checava tipos. O arquivo oficial produz Joel Silver (intervalo 1, 1990–1991) e Matthew Vaughn (intervalo 13, 2002–2015).
- O cálculo montava os intervalos e depois percorria a mesma lista quatro vezes (`map`/`Math.min`, `map`/`Math.max` e dois `filter`).
- OpenSpec, no projeto existente, deve registrar a change em `openspec/changes/` (proposal, specs, design, tasks) antes da implementação.

### Comandos OpenSpec

```bash
openspec init --tools cursor --language pt --force --profile core
openspec new change fix-evaluation-issues
openspec status --change fix-evaluation-issues
openspec validate fix-evaluation-issues --strict
```

Os artefatos equivalentes a `/opsx:propose` estão em [`openspec/changes/fix-evaluation-issues/`](../openspec/changes/fix-evaluation-issues/). A implementação seguiu o checklist de [`tasks.md`](../openspec/changes/fix-evaluation-issues/tasks.md), no papel de `/opsx:apply`. A change não foi arquivada.

### Alterações feitas a partir da interação

- Front: bind de `max`/`min`, debounce com cancelamento e limpeza, paginação 0-based, filtros preservados no search e `queryKey` com os parâmetros.
- Testes de card, debounce, filtros e paginação.
- Back: `await` no seed do CSV, um único percurso para acumular mínimo e máximo, e2e com o JSON completo do `Movielist.csv`.
- Storybook com stories manuais e introdução em `apps/web/src/stories/Introduction.mdx`.
- Este documento e a atualização dos READMEs.

### Validação humana e ajustes

Os testes automatizados foram executados depois das mudanças. O valor golden do e2e não foi inventado: a API foi executada contra o CSV padrão e o corpo observado (Joel Silver e Matthew Vaughn) foi fixado na asserção. Ajustes posteriores devem ser registrados em uma nova entrada em [`AI_Interactions/`](AI_Interactions/) e listados neste índice.
