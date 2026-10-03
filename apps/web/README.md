# Golden Raspberry Awards (Web)

Front React com dashboard (intervalos, estúdios, anos) e lista paginada de filmes. O cliente HTTP aponta para a API pública Outsera (`https://challenge.outsera.tech/api/`).

Onboarding do monorepo: [README raiz](../../README.md).

## Estrutura

```text
.
├── src/
│   ├── modules/                 # Domínios (dashboard, movie-list)
│   │   └── [module]/
│   │       ├── api/
│   │       └── components/
│   ├── routes/                  # TanStack Router (file-based)
│   ├── shared/
│   │   ├── api/                 # Axios
│   │   ├── hooks/
│   │   └── ui/
│   ├── stories/                 # Intro Storybook
│   ├── test/
│   ├── main.tsx
│   ├── router.tsx
│   └── routeTree.gen.ts         # Gerado — não editar
├── .storybook/
├── vite.config.ts
└── package.json
```

## Stack

- React + TypeScript + Tailwind CSS
- TanStack Router e TanStack Query
- Axios
- Vitest + Testing Library
- Storybook 8
- ESLint + Prettier

## Arquitetura

1. **Módulos** (`src/modules`): domínio isolado com API e componentes.
2. **Shared** (`src/shared`): UI kit, hooks e cliente HTTP.
3. **Rotas** (`src/routes`): file-based; `routeTree.gen.ts` é gerado pelo plugin.

## Comandos

Na raiz:

```bash
pnpm install
pnpm dev --filter=web
pnpm test
pnpm --filter web storybook
```

Dentro de `apps/web`:

```bash
pnpm dev                 # Vite :3000
pnpm test                # Vitest
pnpm lint
pnpm check               # prettier --check
pnpm format
pnpm build
pnpm preview
pnpm storybook           # :6006
pnpm generate-routes     # tsr generate
```

Testes em `src/**/*.test.*`. Setup: `src/test/setup.ts`.

## Storybook

Documenta apenas `src/shared/ui` e `src/shared/hooks`. Composições em `modules/` não têm stories.

```bash
pnpm storybook
```

Introdução: [src/stories/Introduction.mdx](src/stories/Introduction.mdx).

## Documentação relacionada

- [docs/plans/](../../docs/plans/)
- [docs/AI_INTERACTIONS.md](../../docs/AI_INTERACTIONS.md)
- [.cursor/skills/](../../.cursor/skills/)
