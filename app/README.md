# BelezaInclusiva — Front

Marketplace inclusivo de cabeleireiros (TG Mackenzie).

## Stack

- React 19 + Vite 8
- TailwindCSS 4
- React Router 7
- Fetch nativo apontando para o API Gateway (`/api`)

## Requisitos

- Node.js **20.19+** ou **22.12+** (Vite 8 exige)
- npm 10+

## Setup

```bash
cd app
cp .env.example .env   # ajuste VITE_API_URL se necessário
npm install
npm run dev
```

A aplicação sobe em `http://localhost:5173`.

## Backend

O front consome o API Gateway em `http://localhost:3000` (configurável via
`VITE_API_URL`). Para subir o backend:

```bash
cd ../api
docker-compose up -d
```

Quando o backend está fora do ar, as páginas usam dados mockados em
`src/lib/mockData.js`, permitindo demonstrar a UI sem dependência.

## Estrutura

```
src/
├── components/      # Header, Footer, Layout, Card, Button, Tag, Avatar...
├── context/         # AuthContext (login/logout/me)
├── lib/             # api.js (client HTTP) + mockData.js
├── pages/           # Landing, Search, ProfessionalDetail, Booking,
│                    # Login, Register, ProfessionalDashboard, AdminDashboard
└── main.jsx         # rotas
```

## Rotas

| Rota | Página | Acesso |
|------|--------|--------|
| `/` | Landing | público |
| `/buscar` | Resultados + filtros | público |
| `/sobre` | Sobre o projeto | público |
| `/profissional/:id` | Perfil do profissional | público |
| `/profissional/:id/agendar` | Fluxo de agendamento (5 passos) | público* |
| `/entrar` | Login | público |
| `/cadastrar` | Cadastro (cliente/profissional/salão) | público |
| `/painel` | Painel do profissional | profissional/salão |
| `/admin` | Painel administrativo | admin |

\* O passo final do agendamento exige login.
