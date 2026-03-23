# Arquitetura Backend

O Backend do Rosarium adota um padrão de arquitetura modularizado (**Module-Based**) alinhado aos princípios da **Clean Architecture**, dividindo responsabilidades entre as entidades de domínio e a infraestrutura transversal. A linguagem padrão é TypeScript com o framework Express.js.

## 1. `domains/`
**Responsabilidade:** Encapsular toda a lógica, validação, serviços e integrações específicas para cada entidade de domínio do sistema (ex: `santos/`, `liturgia/`, `auth/`, `novenas/`).
**Estrutura de cada Domínio:**
- `[nome].controller.ts`: Orquestra requisições e respostas HTTP. Traduz as chamadas da rota para os serviços adequados. Totalmente agnóstico de lógicas de banco de dados.
- `[nome].service.ts`: O "coração" da regra de negócio. Aqui são executadas regras específicas, processamento de dados, comunicação com repositórios e serviços de terceiros.
- `[nome].routes.ts`: Definições das rotas e injeção de middlewares específicos.
- `[nome].dto.ts` ou `validators/`: Objeto de Transferência de Dados e esquemas de validação (ex: Zod) para garantir a integridade dos dados da requisição.
- `repositories/`: Classes responsáveis pela interação direta com o banco de dados (ex: uso do Prisma Client). Fornece abstrações sobre o ORM.
- `types/` ou `interfaces/`: Abstrações e interfaces, garantindo tipagem forte e inversão de controle.

## 2. `shared/`
**Responsabilidade:** Fornecer componentes estruturais transversais e agnósticos a domínio, compartilhados por toda a aplicação.
- `infra/`: Configurações e integrações externas globais (ex: instâncias singleton de banco de dados, `prisma.ts`, clientes HTTP globais, sistema de logging).
- `middlewares/`: Interceptadores do Express utilizados globalmente (`errorHandler.ts`, `validate.ts`, validações de tokens de autenticação como `auth.middleware.ts`).
- `errors/`: Definições padronizadas de classes de erro (ex: `AppError.ts`) que mapeiam diretamente para códigos HTTP e garantem um formato de exceção consistente em toda a API.
- `utils/`: Funções auxiliares matemáticas, de datação, geração de chaves e helpers globais.

## 3. `config/`
**Responsabilidade:** Arquivos essenciais de configuração da aplicação.
- `env.ts`: Validação e exportação centralizada de variáveis de ambiente do sistema.
- `swagger.ts`: Configurações da documentação automática (OpenAPI/Swagger).

## 4. `scripts/`
**Responsabilidade:** Tarefas operacionais avulsas, scripts de testes de scraping, manutenção do banco de dados e crawlers automatizados (ex: `update-santo.ts`, `test-scraper.ts`).

## 5. `tests/`
**Responsabilidade:** Garantir a qualidade, resiliência e estabilidade do backend por meio de testes automatizados e controlados (usando Jest).
- `unit/`: Testes focados nas lógicas dos Services e Utils, com intenso uso de mocks de Repositórios (sem acesso ao banco).
- `integration/`: Testes simulando requisições HTTP às rotas (via Supertest), validando todo o fluxo de ponta-a-ponta com um banco de dados de teste (ex: ambiente shadow/test com o Prisma).
- `mocks/`: Arquivos de dados de simulação usados em testes (ex: respostas fixas, mock de banco de dados).
- `setup.ts`: Configurações preparatórias e de teardown para suítes de teste globais.

Esta arquitetura baseada em domínios assegura baixo acoplamento, flexibiliza integrações, melhora a escalabilidade para novas funcionalidades (basta adicionar um novo domínio em `domains/`) e garante testes independentes e robustos.
