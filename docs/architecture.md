# Diretrizes de Arquitetura do Projeto Rosarium

A arquitetura do Rosarium foi desenvolvida para promover manutenibilidade, escalabilidade e testes robustos em todos os níveis do ecossistema de software. O projeto é divido fisicamente em um monorepo que contém o `frontend` e o `backend`, cada um seguindo padrões de design específicos da sua stack, mas unidos por princípios arquiteturais semelhantes: separação de responsabilidades (Separation of Concerns) e alta coesão.

---

## 1. Visão Geral do Ecossistema

- **Frontend:** React + Vite, TypeScript. Padrão arquitetural **Feature-Based** e modular.
- **Backend:** Node.js + Express.js, TypeScript, ORM Prisma. Padrão arquitetural **Module-Based** e **Clean Architecture**.
- **Infraestrutura/Comum:** Monorepo, linting rigoroso (ESLint + Prettier), commitlint e CI/CD.

---

## 2. Princípios de Arquitetura do Frontend

O Frontend é rigidamente dividido em três áreas de escopo principais para garantir que qualquer desenvolvedor saiba exatamente onde procurar (e onde colocar) um trecho de código: `app/`, `features/` e `shared/`.

### `app/` (App-Centric)
O ponto de entrada e de orquestração global da aplicação. 
- Contém provedores de contexto (`ThemeProvider.tsx`), o roteamento central (`routes.ts`) e layouts raiz.
- **Regra:** Não deve conter lógica de negócio e nem componentes visuais de detalhes. É puramente um ambiente de montagem (bootstrap) e configurações de escopo global.

### `features/` (Feature-Based)
As unidades de negócio da aplicação (ex: `santos/`, `liturgia/`, `auth/`, `novenas/`, `breviario/`).
- Cada feature é um "micro-app" encapsulado.
- Organiza-se internamente em `components/`, `hooks/`, `services/`, `pages/` e `types/`.
- **Regra:** Uma feature JAMAIS pode importar código de outra feature. Isso previne o efeito "espaguete" e dependências circulares ocultas. 

### `shared/` (Código Global)
Tudo que é agnóstico à regra de negócio (cross-cutting) e que deve ser reutilizado.
- Componentes UI puros (botões, inputs, cards), utilitários globais, serviços HTTP genéricos (configuração do Axios) e estilos fundamentais (Tailwind/CSS).
- **Regra:** O `shared/` não deve importar de `features/`. O fluxo de dependência é sempre `features/` -> `shared/`.

Para mais detalhes da implementação do Frontend, consulte [Arquitetura Frontend](./frontend.md).

---

## 3. Princípios de Arquitetura do Backend

O Backend foi estruturado em módulos independentes (`domains/`), com uma camada de infraestrutura compartilhada (`shared/`), utilizando princípios da **Clean Architecture** e **Domain-Driven Design (DDD)** simplificado.

### `domains/` (Domínios de Negócio)
A divisão principal da lógica da API (ex: `santos/`, `liturgia/`, `auth/`). Cada domínio encapsula suas próprias regras e rotas, mantendo independência de outros domínios:
- **`Controllers`:** Traduzem requisições HTTP e chamam os serviços (Services). Agem apenas na camada de transporte.
- **`Services`:** A lógica de negócio essencial. Não sabem nada sobre Express e HTTP, dependem de DTOs e Repositórios.
- **`Routes`:** Declaram os endpoints e injetam os middlewares de validação/autenticação adequados.
- **`Repositories`:** Ocupam a camada de dados. Isolam a comunicação com o Prisma e o banco de dados.

### `shared/` (Infraestrutura Global)
Centraliza a infraestrutura transversal e lida com as complexidades externas:
- **`infra/`:** Configurações de Banco de Dados (`prisma.ts`), Logging, e integrações globais externas.
- **`middlewares/` e `errors/`:** Tratamentos de exceção customizados (`AppError`), validação de tokens e middlewares essenciais do Express.

### `config/` e `scripts/`
A inicialização e orquestração de ambiente (Swagger, Variáveis de Ambiente `env.ts`) e utilitários e web-scrapers em lote (`update-santo.ts`, scripts de seed/teste).

Para mais detalhes da implementação do Backend, consulte [Arquitetura Backend](./backend.md).

---

## 4. Filosofia de Testes

Ambos os projetos valorizam a pirâmide de testes e implementam estratégias claras:
- **Testes Unitários:** Concentram-se em hooks isolados (Frontend) e services isolados (Backend), "mockando" (simulando) todas as dependências externas.
- **Testes de Integração:** Validam o funcionamento de fluxos maiores. No Backend, rotas completas testadas com um banco de dados real em ambiente de teste via Supertest. No Frontend, páginas inteiras e fluxos de usuário validados por Vitest e simulação de rede (Mocks API).

## 5. Conclusão

Essas regras arquiteturais existem para padronizar o pensamento em equipe: a hierarquia clara e os limites rígidos servem para que novos desenvolvedores sejam produtivos rapidamente, reduzindo dúvidas na hora de organizar ou refatorar o código, e garantindo a resiliência em longo prazo do projeto Rosarium.