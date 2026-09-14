## 📂 Estrutura de Pastas

```text
.
├── src/
│   ├── modules/                 # Módulos de domínio da aplicação
│   │   └── [module-name]/       # Módulo específico (ex: dashboard, movie-list)
│   │       ├── api/             # Requisições e queries específicas do módulo
│   │       └── components/      # Componentes exclusivos do módulo
│   │
│   ├── routes/                  # Rotas gerenciadas pelo TanStack Router (File-based Routing)
│   │   ├── __root.tsx           # Layout raiz global e provedores de contexto
│   │   └── [route-name].tsx     # Páginas/rotas da aplicação (ex: index.tsx, list.tsx)
│   │
│   ├── shared/                  # Recursos utilitários compartilhados entre módulos
│   │   ├── api/                 # Cliente HTTP base (Axios) e configurações globais
│   │   ├── hooks/               # Custom hooks globais e reutilizáveis
│   │   └── ui/                  # Design System / Componentes genéricos de UI (Botões, Modais, Inputs)
│   │
│   ├── test/                    # Configurações de testes, mocks e utilitários
│   ├── main.css                 # Estilos globais e diretivas do Tailwind CSS
│   ├── main.tsx                 # Ponto de entrada (entry point) da aplicação React
│   ├── router.tsx               # Configuração da instância do TanStack Router
│   └── routeTree.gen.ts         # Árvore de rotas gerada automaticamente pelo TanStack Router
│
├── .gitignore                   # Arquivos ignorados pelo Git
├── .prettierignore              # Arquivos ignorados pelo Prettier
├── eslint.config.js             # Configurações do ESLint (Flat Config)
├── index.html                   # HTML base da aplicação
├── package.json                 # Dependências e scripts do projeto
└── pnpm-lock.yaml               # Trava de versões das dependências (pnpm)
```

---

## 🛠️ Tecnologias Utilizadas

### **Core & Estilização**

- **[React](https://react.dev/)** — Componentes feitos em React.
- **[TypeScript](https://www.typescriptlang.org/)** — Para garantir as tipagens corretas.
- **[Tailwind CSS](https://tailwindcss.com/)** — utilizamos o tailwind CSS para estilização.

### **Gerenciamento de Dados & Requisições**

- **[Axios](https://axios-http.com/)** — Cliente HTTP.
- **[TanStack Query (React Query)](https://tanstack.com/query/latest)** — Gerenciamento de estado, caching e sincronização de dados.

### **Roteamento**

- **[TanStack Router](https://tanstack.com/router/latest)** — Para criação de routas com tipagem.

### **Testes & Qualidade de Código**

- **[@testing-library/jest-dom](https://testing-library.com/)** — Para testes
- **[ESLint](https://eslint.org/)** — Linter para identificação e correção de problemas no código.
- **[Prettier](https://prettier.io/)** — Formatador de código automatizado.

## 📐 Padrões de Arquitetura

1. **Arquitetura Modular (`src/modules`)**: Cada funcionalidade/domínio da aplicação fica isolado em sua própria pasta com seus próprios componentes e serviços de API. Isso reduz o acoplamento e facilita a manutenção.
2. **Camada Compartilhada (`src/shared`)**: Componentes genéricos da interface (UI Kit), hooks utilitários e o cliente HTTP base ficam centralizados para reuso em qualquer módulo.
3. **Roteamento Baseado em Arquivos (`src/routes`)**: As rotas são geradas automaticamente pelo TanStack Router. O arquivo `routeTree.gen.ts` é gerado automaticamente durante o desenvolvimento — **não edite este arquivo manualmente**.

---
