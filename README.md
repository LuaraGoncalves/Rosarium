# Rosarium - Plataforma de Orações e Liturgia

Plataforma fullstack para gerenciamento de conteúdos religiosos, incluindo santos, novenas e liturgia diária. O sistema foi desenvolvido com o intuito de proporcionar uma ferramenta digital completa, robusta e escalável para auxiliar a jornada de fé diária dos fiéis.

## Tecnologias

O projeto utiliza um conjunto de tecnologias modernas e eficientes, garantindo alta performance e facilidade de manutenção:

- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Shadcn/ui.
- **Backend**: Node.js, Express, Prisma ORM, PostgreSQL.
- **Validações**: Zod.
- **Testes**: Jest e Supertest.

## Arquitetura

O sistema adota padrões estruturais maduros, garantindo alta escalabilidade e manutenção profissional a longo prazo:

- **Frontend**: Padrão Feature-Based. Cada módulo (como santos, liturgia, rosário) é autocontido, possuindo suas próprias rotas, componentes, serviços e hooks, evitando acoplamento excessivo.
- **Backend**: Arquitetura modular inspirada nos princípios do Clean Architecture e Domain-Driven Design (DDD). As responsabilidades são estritamente separadas entre rotas, controladores (controllers), casos de uso (services), acesso a dados (repositories) e infraestrutura.

## Funcionalidades

- **Liturgia Diária**: Acompanhamento completo do calendário litúrgico, leituras do dia, salmos e evangelho.
- **Catálogo de Santos**: Base de dados detalhada contendo a biografia, padroeirados e orações específicas de santos católicos.
- **Gestão de Novenas**: Sistema para criar, acompanhar e concluir novenas, com rastreamento de progresso diário e histórico.
- **Santo Rosário**: Ferramenta interativa para auxiliar na contemplação dos mistérios do Rosário de acordo com o dia da semana.
- **Breviário (Liturgia das Horas)**: Acesso às orações oficiais da Igreja para diferentes momentos do dia.

## DIFERENCIAIS

O Rosarium foi projetado com foco na experiência do usuário e na precisão dos dados, destacando-se através dos seguintes diferenciais:

1. **Sincronização Offline-First para Orações e Novenas**: Arquitetura resiliente que permite o uso contínuo do aplicativo mesmo sem conexão com a internet. O progresso das novenas e as leituras da liturgia diária são cacheados localmente, sincronizando de forma transparente com o backend assim que a conexão é restabelecida.
2. **Automação de Curadoria de Dados (Web Scraping)**: Sistema de integração robusto que extrai e processa dados atualizados de fontes católicas confiáveis, garantindo que as informações biográficas dos santos e as leituras litúrgicas estejam sempre em conformidade com o calendário oficial da Igreja, sem necessidade de intervenção manual diária.

### Inteligência do Sistema

- **Motor de Recomendação Litúrgica e Espiritual Contextual**: O sistema possui uma camada analítica inteligente que cruza o comportamento do usuário com o calendário litúrgico global. Com base no tempo litúrgico atual (como Quaresma ou Advento), solenidades do dia e o histórico de devoções do usuário, o algoritmo sugere dinamicamente conteúdos personalizados. Por exemplo, sugerir a Novena de São José nos dias que antecedem sua festa, ou recomendar orações específicas baseadas em buscas textuais com processamento de linguagem natural focado em sentimentos (ex: sugerir orações de Santa Dinfna para buscas relacionadas à ansiedade).

## Como rodar o projeto

### Pré-requisitos
- Node.js (v18+)
- NPM ou Yarn
- Banco de dados PostgreSQL (ou SQLite para desenvolvimento local)

### Configuração do Backend
1. Acesse o diretório `backend` através do terminal.
2. Instale as dependências executando `npm install`.
3. Configure o arquivo `.env` baseado no `.env.example`.
4. Gere o client do Prisma e execute as migrações: `npx prisma generate` e `npx prisma migrate dev`.
5. Inicie o servidor de desenvolvimento: `npm run dev`.

### Configuração do Frontend
1. Acesse o diretório `frontend` através de um novo terminal.
2. Instale as dependências executando `npm install`.
3. Configure o arquivo `.env` baseado no `.env.example`.
4. Inicie a aplicação de desenvolvimento: `npm run dev`.

## Documentação
Para aprofundamento nas diretrizes de código e detalhes sobre a arquitetura implementada, consulte a documentação técnica disponível na pasta `docs/`.
