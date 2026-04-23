# Auth Service — BelezaInclusiva

Microsserviço responsável por autenticação e autorização da plataforma. Roda na porta **3001**.

## Casos de uso atendidos

| UC | Ator | Descrição |
|----|------|-----------|
| UC01 | Cliente | Cadastro |
| UC02 | Cliente | Login |
| UC12 | Profissional/Salão | Cadastro (cria com status `pendente_aprovacao`) |
| UC13 | Profissional/Salão | Login |
| UC19 | Administrador | Login com token de 8h |

## Endpoints

### Públicos
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/auth/register` | Cadastro de usuário |
| `POST` | `/auth/login` | Login e geração de JWT |
| `GET` | `/health` | Health check |

### Autenticados (Bearer token ou cookie)
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/auth/logout` | Invalida token (blacklist) |
| `GET` | `/auth/me` | Dados do usuário autenticado |

### Internos (x-service-key header)
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/auth/validate` | Valida token JWT — usado pelo API Gateway |
| `PATCH` | `/auth/internal/suspend/:id` | Suspende sessões do usuário |

## Início rápido

```bash
cp .env.example .env
# edite .env com suas variáveis

# Com Docker
docker-compose up

# Sem Docker
npm install
npm run dev
```

## Testes

```bash
npm test
npm run test:watch
```

## Estrutura

```
authservice/
├── src/
│   ├── config/
│   │   ├── database.js        # Pool de conexão PostgreSQL
│   │   └── messageBroker.js   # Conexão RabbitMQ
│   ├── controllers/
│   │   └── authController.js  # Handlers HTTP
│   ├── middleware/
│   │   ├── auth.js            # Autenticação/autorização JWT
│   │   ├── validacao.js       # express-validator
│   │   └── errorHandler.js    # Tratamento global de erros
│   ├── routes/
│   │   └── authRoutes.js      # Definição de rotas
│   ├── services/
│   │   └── authService.js     # Regras de negócio
│   ├── utils/
│   │   └── jwt.js             # Geração/verificação de tokens
│   ├── __tests__/
│   │   └── auth.test.js       # Testes Jest
│   ├── app.js                 # Configuração Express
│   └── server.js              # Entry point
├── database/postgres/init/
│   └── 001-create-schema.sql  # Schema inicial
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── package.json
```

## Eventos publicados

| Routing Key | Quando |
|-------------|--------|
| `user.registered` | Cadastro de cliente |
| `professional.pending` | Cadastro de profissional/salão |

Esses eventos são consumidos pelo **Notification Service** (envio de e-mail de boas-vindas) e pelo **User Service** (criação do perfil).

## Segurança

- Senhas com bcrypt (fator 12)
- JWT: 24h para clientes/profissionais, 8h para admins
- Blacklist de tokens para logout e suspensão imediata
- Rate limiting nas rotas de autenticação (10 tentativas / 15 min)
- Cookie `httpOnly` + `sameSite: strict`
- Mensagens de erro genéricas (não revelam se e-mail existe)
