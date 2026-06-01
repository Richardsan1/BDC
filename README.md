# BDC
Repositório do grupo Bom dia e Cia
Disciplina Laboratório de Engenharia de Software
Ciência da Computação
Turma 06N12
Universidade Presbiteriana Mackenzie

---

## 🚀 Como Rodar

2. cp api/env api/.env
3. cd api && docker-compose up -d
4. npm install && npm run dev (backend)
5. cd app && npm install && npm run dev (frontend)
6. Acessar http://localhost:5173

Serviços iniciados em:
- API Gateway: http://localhost:3000
- Auth Service: http://localhost:3001
- User Service: http://localhost:3002
- Search Service: http://localhost:3003
- Booking Service: http://localhost:3004
- Payment Service: http://localhost:3005
- Admin Service: http://localhost:3006

## ✅ Testes centralizados

Foi criada uma suíte de testes na pasta `/teste`, com cobertura para:

- `apiGateway`
- `authService`
- `userService`
- `searchService`
- `bookingService`
- `paymentService`
- `adminService`
- `notificationService`
- `frontend`

Para executar localmente:

1. Instale dependências dos serviços e do frontend.
2. Instale dependências dos testes:
   - `cd teste && npm install`
3. Rode todos os testes:
   - `npm run test:all`

## ☁️ Jenkins na AWS

Foi adicionado um `Jenkinsfile` na raiz do projeto com:

- `agent { label 'aws' }` para execução em nós Jenkins na AWS
- `disableConcurrentBuilds()` para formar fila de execução de builds
- estágio **Fila de testes** com execução separada por microsserviço e frontend
