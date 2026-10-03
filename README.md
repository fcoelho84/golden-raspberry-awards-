# Golden Raspberry Awards

Monorepo com API NestJS e front React para consultar indicados e vencedores da categoria Pior Filme (Golden Raspberry Awards).

- **API** (`apps/api`): lê `Movielist.csv` no boot, grava em SQLite em memória e expõe o intervalo máximo e mínimo entre vitórias consecutivas de produtores.
- **Web** (`apps/web`): dashboard e lista de filmes (dados da API pública Outsera).

## Pré-requisitos

- Node.js compatível com o ecossistema do projeto (Vite 8 / Nest 12)
- [pnpm](https://pnpm.io/) `^11.10.0` (definido em `package.json` → `devEngines`)

## Estrutura do projeto

```text
.
├── apps/
│   ├── api/                 # Back-end NestJS
│   └── web/                 # Front-end React + Vite
├── docs/
│   ├── AI_INTERACTIONS.md   # Índice de interações com IA
│   ├── AI_Interactions/     # Registros por sessão
│   └── plans/               # Planos de implementação
├── openspec/                # Specs e changes (OpenSpec)
├── .cursor/
│   ├── commands/            # Slash commands OpenSpec
│   └── skills/              # Skills do Cursor
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

Detalhes de cada app: [apps/api/README.md](apps/api/README.md) e [apps/web/README.md](apps/web/README.md).

## Pastas de documentação e processo

### `docs/`

Documentação geral do repositório (fora do código dos apps).

- **Conteúdo:** índices, registros de auditoria, planos.
- **Quando usar:** consulta de contexto, auditoria de IA, planos de entrega.
- **Comece por:** [docs/AI_INTERACTIONS.md](docs/AI_INTERACTIONS.md).

### `docs/plans/`

Planos e planejamentos de implementação (não é `plans/` na raiz).

- **Conteúdo:** markdown com overview, decisões e fases.
- **Exemplos:** [docs/plans/correcoes-avaliacao-ia.md](docs/plans/correcoes-avaliacao-ia.md), [docs/plans/readme-monorepo-completo.md](docs/plans/readme-monorepo-completo.md).
- **Quando usar:** antes ou durante uma mudança maior; salvar o plano da conversa aqui.

### `docs/AI_Interactions/`

Registros por sessão de uso de IA.

- **Conteúdo:** arquivos `YYYY-MM-DD-<slug>.md` com contexto, decisões e o que foi feito.
- **Índice:** [docs/AI_INTERACTIONS.md](docs/AI_INTERACTIONS.md) lista os arquivos sem duplicar o corpo.
- **Quando usar:** após uma sessão relevante, ou ao pedir "Salve o plano e a interação."

### `.cursor/skills/`

Skills do Cursor (não é `skills/` na raiz). Cada skill é uma pasta com `SKILL.md`.

| Skill | Uso |
|-------|-----|
| `save-plan-and-interaction` | Salva plano em `docs/plans/` e registra interação em `docs/AI_Interactions/` |
| `openspec-*` | Fluxo OpenSpec (propose, apply, archive, explore, sync, update) |
| `tdd` | Desenvolvimento guiado por testes |
| `domain-modeling` | Glossário e ADRs |
| `caveman` | Respostas curtas |
| `grill-*` / `grilling` | Entrevista para afiar plano/design |

**Como usar:** no Cursor, peça a skill pelo nome ou pela frase de gatilho (ex.: "Salve o plano e a interação.").

### `openspec/`

Spec-driven development ([OpenSpec](https://github.com/Fission-AI/openspec)).

| Path | Função |
|------|--------|
| `openspec/config.yaml` | Config do projeto |
| `openspec/specs/` | Specs publicadas (após archive) |
| `openspec/changes/` | Changes ativas |
| `openspec/changes/archive/` | Changes arquivadas |

Change ativa de referência: [openspec/changes/fix-evaluation-issues/](openspec/changes/fix-evaluation-issues/).

Fluxo usual no chat: `/opsx-propose` → `/opsx-apply` → `/opsx-archive` (comandos em `.cursor/commands/`).

## Como começar

Não há `.env` obrigatório. A API aceita `PORT` opcional (padrão `3001`). O front usa a URL Outsera definida em código.

```bash
# 1. Instalar dependências (na raiz)
pnpm install

# 2. Subir API + web em desenvolvimento
pnpm dev
```

| App | URL | Comando só desse app |
|-----|-----|----------------------|
| Web | http://localhost:3000 | `pnpm dev --filter=web` |
| API | http://localhost:3001 | `pnpm dev --filter=api` |

Endpoint principal da API: `GET http://localhost:3001/producers/awards-interval`

CSV carregado no boot: `apps/api/src/database/Movielist.csv`

### Produção (scripts existentes)

```bash
# API
pnpm --filter api build
pnpm --filter api prod

# Web (build + preview local)
pnpm --filter web build
pnpm --filter web preview
```

## Testes e validação

| O quê | Comando | Onde |
|-------|---------|------|
| Testes do front (Vitest) | `pnpm test` | `apps/web/src/**/*.test.*` |
| Testes e2e da API | `pnpm test:e2e` | `apps/api/test/**/*.e2e-spec.ts` |
| Build do monorepo | `pnpm build` | via Turbo |

Comandos por app:

```bash
# Web
pnpm --filter web test
pnpm --filter web lint
pnpm --filter web check          # prettier --check
pnpm --filter web format
pnpm --filter web build

# API
pnpm --filter api test           # e2e (vitest.config.e2e.ts)
pnpm --filter api test:unit
pnpm --filter api lint           # oxlint
pnpm --filter api format
pnpm --filter api build
```

Teste específico (exemplo, a partir do diretório do app):

```bash
# Web — um arquivo
pnpm --filter web exec vitest run src/shared/hooks/useDebounce.test.ts

# API — filtro por nome
pnpm --filter api exec vitest run --config ./vitest.config.e2e.ts -t "dados padrões"
```

### Antes de abrir um PR

1. `pnpm test`
2. `pnpm test:e2e`
3. `pnpm --filter web lint` e `pnpm --filter api lint`
4. `pnpm build` (ou build do app alterado)
5. Atualizar docs/planos/interações se a mudança for relevante

## Storybook

```bash
pnpm --filter web storybook
```

Abre em http://localhost:6006. Introdução: [apps/web/src/stories/Introduction.mdx](apps/web/src/stories/Introduction.mdx).

## Onde achar cada informação

| Preciso de… | Vá em… |
|-------------|--------|
| Onboarding e comandos | Este README |
| Detalhes da API / CSV / endpoint | [apps/api/README.md](apps/api/README.md) |
| Estrutura e stack do front | [apps/web/README.md](apps/web/README.md) |
| Planos | [docs/plans/](docs/plans/) |
| Interações com IA | [docs/AI_INTERACTIONS.md](docs/AI_INTERACTIONS.md) e [docs/AI_Interactions/](docs/AI_Interactions/) |
| Specs / changes | [openspec/](openspec/) |
| Skills do agente | [.cursor/skills/](.cursor/skills/) |
| UI rápida | Storybook (`pnpm --filter web storybook`) |

## Fluxo de desenvolvimento recomendado

```text
Consultar docs/ e README
        ↓
Entender / criar change no openspec/ (se mudar comportamento)
        ↓
Consultar ou salvar plano em docs/plans/
        ↓
Usar skill relevante em .cursor/skills/ (opcional)
        ↓
Implementar em apps/api ou apps/web
        ↓
pnpm test  e  pnpm test:e2e
        ↓
lint / format / build do app
        ↓
Atualizar docs, openspec ou pedir: "Salve o plano e a interação."
```

A skill [save-plan-and-interaction](.cursor/skills/save-plan-and-interaction/SKILL.md) grava o plano em `docs/plans/` e o registro em `docs/AI_Interactions/`, atualizando o índice sem duplicar arquivos do mesmo assunto.

## Checklist da avaliação (back-end)

1. O CSV é lido e inserido no banco ao iniciar a API.
2. `GET /producers/awards-interval` devolve `min` e `max` no formato da especificação.
3. Serviço REST no nível 2 de maturidade de Richardson.
4. Testes de integração comparam o resultado com `apps/api/src/database/Movielist.csv`.
5. Banco SQLite em memória; sem SGBD externo.
6. Este README e o da API descrevem como rodar o projeto e os testes.
7. Uso de IA registrado em [docs/AI_INTERACTIONS.md](docs/AI_INTERACTIONS.md).
