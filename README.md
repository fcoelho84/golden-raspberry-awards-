## 📂 Estrutura de Pastas

```text
.
├── apps/
│   ├── api/                 # Back end
│   │   └── README.md
│   ├── web/                 # Front end
│   │   └── README.md
```

---

## 🛠️ Tecnologias e Decisões de Arquitetura

- **Monorepo com [Turborepo](https://turbo.build/):** Utilizado para otimizar o gerenciamento de scripts, a experiência de desenvolvimento e a execução de tarefas no repositório.

---

## 🚀 Como Executar o Projeto

```bash
# 1. Instalar dependências
pnpm install

# 2. Iniciar a aplicação em modo de desenvolvimento (Back e Front end)
pnpm dev

# 2.2 Iniciar a apenas o back
pnpm dev --filter=api

# 2.3 Iniciar a apenas o front
pnpm dev --filter=web

# 3. Executar testes e2e do back-end
pnpm test:e2e

# 3. Executar a testes unitários do front-end
pnpm test

```
