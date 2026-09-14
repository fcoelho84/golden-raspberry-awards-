# 🏆 Golden Raspberry Awards (API)

No momento da inicialização, a aplicação realiza a leitura dos dados a partir de um arquivo CSV, persiste os registros em um banco de dados em memória e disponibiliza endpoints HTTP para consulta dos produtores com maior e menor intervalo entre prêmios consecutivos.

---

## 🛠️ Tecnologias e Decisões de Arquitetura

- **[NestJS](https://nestjs.org/):** Framework escolhido por sua arquitetura modularizada, suporte nativo a TypeScript, injeção de dependências e padronização do código, evitando configurações manuais e _boilerplates_ desnecessários.
- **SQLite (Em Memória):** Banco de dados embarcado utilizado para garantir que a aplicação rode instantaneamente sem a necessidade de instalações ou serviços externos adicionais.
- **`csv-parser`:** Escolhido para dar mais confiabilidade na leitura do arquivo CSV e permitir foco total na regra de negócio da aplicação.

---

## 📍 Endpoints da API

### **Consultar intervalo de prêmios dos produtores**

Retorna o produtor com o maior intervalo entre dois prêmios consecutivos e o produtor que obteve dois prêmios mais rápido.

- **Método:** `GET`
- **URL:** `http://localhost:3001/producers/awards-interval`

---

## 📁 Fonte de Dados (CSV)

Os dados iniciais da aplicação são carregados a partir do arquivo CSV localizado no seguinte caminho:

```text
src/database/Movielist.csv
```

> **Nota:** Caso deseje alterar os dados ou adicionar novos filmes e produtores para teste, basta modificar o arquivo `Movielist.csv` acima antes de iniciar a aplicação.
