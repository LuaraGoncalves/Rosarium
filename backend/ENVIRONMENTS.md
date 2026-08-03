# Ambientes do backend

O backend usa PostgreSQL via Prisma. A conexão do banco vem sempre da variável `DATABASE_URL`.

## Arquivos locais

- `.env.example`: modelo seguro para copiar. Pode ir para o Git.
- `.env.local`: desenvolvimento local. Nao deve ir para o Git.
- `.env.production`: simulacao local de producao. Nao deve ir para o Git.
- `.env`: fallback local para ferramentas como Prisma CLI. Nao deve ir para o Git.

## Neon

Use bancos separados por ambiente:

- `development`: para testar alteracoes antes de publicar.
- `production`: para dados reais dos usuarios.

Na Neon, copie a connection string da branch correta e use como `DATABASE_URL`.

## Plataformas

Cadastre as variaveis como segredo no painel da plataforma.

### GitHub Actions

Repository Settings > Secrets and variables > Actions > New repository secret

Variaveis recomendadas:

- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `FRONTEND_URL`

### Vercel

Project Settings > Environment Variables

Cadastre por ambiente:

- Development
- Preview
- Production

### Render

Service > Environment > Add Environment Variable

### Railway

Service > Variables > New Variable

## Regra importante

Nunca coloque a connection string de producao em arquivo versionado.

O `.env.example` deve conter apenas exemplos e placeholders.
