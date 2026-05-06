# BelezaInclusiva API

Este projeto é uma API de microsserviços para um marketplace de beleza inclusiva.

## Como rodar

### 1. Pré-requisitos

- Docker
- Docker Compose
- Portas `3000` a `3007` livres

### 2. Configure o ambiente

Na pasta `api/`:

```bash
cp .env.example .env
```

Se quiser eliminar os avisos de ambiente, preencha também no `.env`:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `MERCADOPAGO_ACCESS_TOKEN`

Esses valores podem ficar mockados por enquanto.

### 3. Suba a aplicação

```bash
cd api
docker-compose up -d
```

Para ver os logs:

```bash
docker-compose logs -f
```

### 4. Verifique se está tudo ok

```bash
docker-compose ps
curl http://localhost:3000/health
```

## Serviços disponíveis

| Serviço | Porta | Função |
|---|---:|---|
| API Gateway | 3000 | Entrada única da API |
| Auth Service | 3001 | Registro, login e JWT |
| User Service | 3002 | Perfis, especialidades e serviços |
| Search Service | 3003 | Busca de profissionais |
| Booking Service | 3004 | Agendamentos |
| Payment Service | 3005 | Pagamentos |
| Notification Service | 3006 | Notificações |
| Admin Service | 3007 | Aprovação e métricas |

## Endpoints principais

### Autenticação

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`

### Usuários

- `GET /users/especialidades`
- `GET /users/:id/perfil`
- `PUT /users/me`
- `PUT /users/me/especialidades`
- `GET /users/me/servicos`
- `POST /users/me/servicos`
- `PUT /users/me/servicos/:id`
- `DELETE /users/me/servicos/:id`

### Busca

- `GET /search?termo=...`
- `GET /search?especialidades=...`
- `GET /search?cidade=...`
- `GET /search?latitude=...&longitude=...&raio_km=...`

### Agendamentos

- `POST /bookings`
- `GET /bookings`
- `GET /bookings/:id`
- `DELETE /bookings/:id`

### Pagamentos

- `POST /payments/intent`
- `POST /payments/confirmar`
- `POST /payments/reembolso`

### Admin

- `POST /admin/aprovar`
- `POST /admin/rejeitar`
- `POST /admin/suspender`
- `GET /admin/metricas`

## Exemplo de uso

### Registrar usuário

```bash
curl -X POST http://localhost:3000/auth/register \
    -H "Content-Type: application/json" \
    -d '{
        "email": "teste@example.com",
        "senha": "Senha123!",
        "tipo": "cliente"
    }'
```

### Fazer login

```bash
curl -X POST http://localhost:3000/auth/login \
    -H "Content-Type: application/json" \
    -d '{
        "email": "teste@example.com",
        "senha": "Senha123!"
    }'
```

### Buscar profissionais

```bash
curl "http://localhost:3000/search?termo=afro&cidade=São Paulo"
```

## Se der problema

- Veja os logs com `docker-compose logs -f`
- Reinicie com `docker-compose down -v` e depois `docker-compose up -d`
- Se aparecer aviso de variáveis faltando, preencha o `.env`
