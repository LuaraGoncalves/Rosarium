# Arquitetura Frontend

A arquitetura do nosso frontend é **Feature-Based** e dividida em três diretórios principais: `app/`, `features/` e `shared/`. Essa divisão promove alta coesão, baixo acoplamento e facilita a escalabilidade e a manutenção do projeto.

## 1. `app/` (App-Centric)
**Responsabilidade:** Ponto de entrada da aplicação, configurações globais, provedores de contexto e roteamento principal.
**O que deve ter:**
- Arquivos de inicialização como `App.tsx` e `main.tsx`.
- Configuração de rotas principais (`routes.ts`).
- Provedores de contexto globais (`providers/ThemeProvider.tsx`, etc.).
- Componentes de layout base e estruturais globais (`components/`).
**O que NÃO deve ter:**
- Lógicas de negócio, telas específicas ou componentes genéricos de UI.

## 2. `features/` (Feature-Based)
**Responsabilidade:** Encapsular módulos de negócio independentes. Cada feature atua como um "micro-app" contendo sua própria lógica, UI e integração com APIs. **Uma feature não deve importar código de outra feature.**
**Estrutura Padrão (ex: `auth/`, `liturgia/`, `santos/`, `novenas/`, `breviario/`):**
- `components/`: Componentes visuais exclusivos da feature.
- `hooks/`: Custom hooks com regras de negócio específicas da feature.
- `services/`: Integrações com a API (ex: `[feature].api.ts`).
- `pages/`: Componentes de tela inteira que agregam a lógica e UI da feature.
- `types/`: Tipagens TypeScript específicas do domínio.
- `data/` ou `utils/`: Dados estáticos, formatações e funções auxiliares locais.

## 3. `shared/`
**Responsabilidade:** Código global transversal, agnóstico a domínio de negócio, reutilizável em qualquer parte do sistema.
**O que deve ter:**
- `components/`: Componentes de UI genéricos (botões, modais, inputs, tipografia).
- `hooks/`: Hooks utilitários globais (ex: debounce, manipulação de janela).
- `services/`: Configurações base de rede (ex: cliente HTTP `api.ts`, interceptors).
- `utils/`: Funções utilitárias globais (formatação de data, validações genéricas).
- `styles/`: Classes CSS, variáveis CSS e temas globais (ex: `theme.css`).

## 4. `tests/`
**Responsabilidade:** Centralizar a infraestrutura de testes e garantir a confiabilidade do frontend.
- `unit/`: Testes isolados de componentes e hooks (via Vitest + Testing Library).
- `integration/`: Testes de fluxo e interação.
- `mocks/`: Simulações de respostas de API (`api.mock.ts`).
- `setup.ts`: Configurações de ambiente de teste e limpeza do DOM.

---

**Regra de Ouro:** Se um código é usado por mais de uma feature, ele deve ser extraído para o `shared/`. Se pertence apenas a um domínio de negócio, deve ficar contido na sua `feature/`.