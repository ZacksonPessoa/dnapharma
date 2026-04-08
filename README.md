# dnapharma

Projeto com **frontend (Next.js)** e **backend (Node.js/Express)**, com persistência via **PostgreSQL** usando **Prisma**.

## Estrutura

- `frontend/`: aplicação Next.js
- `backend/`: API Express + Prisma

## Requisitos

- Node.js (recomendado: LTS)
- PostgreSQL (local ou remoto, ex.: Supabase)

## Configuração do backend

Entre na pasta:

```bash
cd backend
```

Instale dependências:

```bash
npm install
```

Crie o arquivo `.env` em `backend/.env` com:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
```

Observações:
- Se sua senha tiver caracteres especiais (ex.: `@`), encode na URL (ex.: `@` → `%40`).

Gere o Prisma Client:

```bash
npx prisma generate
```

(Opcional) Abrir Prisma Studio:

```bash
npx prisma studio
```

## Configuração do frontend

Entre na pasta:

```bash
cd frontend
```

Instale dependências:

```bash
npm install
```

Rode o projeto:

```bash
npm run dev
```

## Rodando a API

Entre na pasta `backend/` e inicie o servidor (conforme script do `package.json`):

```bash
npm run dev
```

Se não existir script `dev`, use:

```bash
npm start
```

Endpoint de health-check:
- `GET /health`

## Prisma (schema)

O schema fica em:
- `backend/prisma/schema.prisma`

O datasource usa:
- `url = env("DATABASE_URL")`

