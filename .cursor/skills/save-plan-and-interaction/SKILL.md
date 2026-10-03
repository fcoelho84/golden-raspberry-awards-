---
name: save-plan-and-interaction
description: Salva o plano ativo em docs/plans/ e registra a interação em docs/AI_Interactions/. Use when the user says "Salve o plano e a interação", "salve o plano", "registre a interação", or asks to persist the current plan and AI session notes.
---

# Salvar plano e interação

Quando o usuário pedir para salvar o plano e/ou a interação, faça só isto. Não altere código da aplicação.

## Paths (padrão do projeto)

| Tipo | Pasta |
|------|--------|
| Planos | `docs/plans/` |
| Interações | `docs/AI_Interactions/` |
| Índice | `docs/AI_INTERACTIONS.md` |

Não criar `plans/`, `AI_Interactions/` nem `skills/` na raiz. Skills vivem em `.cursor/skills/`.

## Passos

1. **Listar o que já existe**
   - `docs/plans/`
   - `docs/AI_Interactions/`
   - Se o assunto/data já tiver arquivo, **atualize** esse arquivo. Não duplique.

2. **Localizar o plano**
   - Preferir o plano ativo da conversa ou `.cursor/plans/*.plan.md` relevante.
   - Slug em kebab-case (ex.: `readme-monorepo-completo`).

3. **Salvar o plano**
   - Destino: `docs/plans/<slug>.md`
   - Conteúdo: overview, decisões, escopo, fases. Remova frontmatter de todos do Cursor se for só ruído de UI.
   - Se `docs/plans/<slug>.md` já existir, sobrescreva com a versão atual.

4. **Registrar a interação**
   - Destino: `docs/AI_Interactions/<YYYY-MM-DD>-<slug>.md`
   - Seções mínimas: **Contexto**, **Decisões**, **Feito**.
   - Data = dia da sessão (ou a data que o usuário indicar).

5. **Atualizar o índice**
   - Em `docs/AI_INTERACTIONS.md`, adicione ou atualize uma linha na tabela apontando para o arquivo novo.
   - Não copie o corpo inteiro da interação no índice.

6. **Resposta**
   - Informe os caminhos criados/atualizados. Pare.

## Gatilhos

- "Salve o plano e a interação."
- "Salve o plano."
- "Registre a interação."
- Pedidos equivalentes em português.
