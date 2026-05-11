#!/bin/bash

# BelezaInclusiva API - cURL test flow

API_GATEWAY_URL="http://localhost:3000"
AUTH_URL="$API_GATEWAY_URL/auth"
USERS_URL="$API_GATEWAY_URL/users"
SEARCH_URL="$API_GATEWAY_URL/search"
BOOKINGS_URL="$API_GATEWAY_URL/bookings"
PAYMENTS_URL="$API_GATEWAY_URL/payments"
ADMIN_URL="$API_GATEWAY_URL/admin"

CLIENT_EMAIL="cliente@example.com"
PROF_EMAIL="prof@example.com"
PASSWORD="SenhaForte123!"
ADMIN_TOKEN="${ADMIN_TOKEN:-}"

extract_field() {
  printf '%s' "$1" | tr -d '\n' | sed -nE "s/.*\"$2\":\"([^\"]*)\".*/\1/p" | head -n 1
}

extract_usuario_id() {
  printf '%s' "$1" | tr -d '\n' | sed -nE 's/.*"usuario":\{"id":"([^"]*)".*/\1/p' | head -n 1
}

echo "=== 1. Register Cliente ==="
curl -s -X POST "$AUTH_URL/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$CLIENT_EMAIL\",
    \"senha\": \"$PASSWORD\",
    \"tipo\": \"cliente\"
  }"

echo -e "\n\n=== 2. Register Profissional ==="
curl -s -X POST "$AUTH_URL/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$PROF_EMAIL\",
    \"senha\": \"$PASSWORD\",
    \"tipo\": \"profissional\"
  }"

echo -e "\n\n=== 3. Login Cliente ==="
CLIENT_LOGIN_RESPONSE=$(curl -s -X POST "$AUTH_URL/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$CLIENT_EMAIL\",
    \"senha\": \"$PASSWORD\"
  }")

printf '%s\n' "$CLIENT_LOGIN_RESPONSE"
CLIENT_TOKEN=$(extract_field "$CLIENT_LOGIN_RESPONSE" token)
CLIENT_USER_ID=$(extract_usuario_id "$CLIENT_LOGIN_RESPONSE")
echo "Token do cliente extraído: $CLIENT_TOKEN"

echo -e "\n\n=== 4. Login Profissional ==="
PROF_LOGIN_RESPONSE=$(curl -s -X POST "$AUTH_URL/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$PROF_EMAIL\",
    \"senha\": \"$PASSWORD\"
  }")

printf '%s\n' "$PROF_LOGIN_RESPONSE"
PROF_TOKEN=$(extract_field "$PROF_LOGIN_RESPONSE" token)
PROF_USER_ID=$(extract_usuario_id "$PROF_LOGIN_RESPONSE")
echo "Token do profissional extraído: $PROF_TOKEN"

if [ -z "$PROF_TOKEN" ] || [ -z "$PROF_USER_ID" ]; then
  echo "Profissional sem token valido; pulando etapas dependentes de perfil/servicos/agendamentos."
fi

echo -e "\n\n=== 5. Get Current User ==="
curl -s -X GET "$AUTH_URL/me" \
  -H "Authorization: Bearer $CLIENT_TOKEN"

echo -e "\n\n=== 6. Get Especialidades ==="
curl -s -X GET "$USERS_URL/especialidades"

echo -e "\n\n=== 7. Update Profissional Profile ==="
if [ -n "$PROF_TOKEN" ]; then
  PROF_PROFILE_RESPONSE=$(curl -s -X PUT "$USERS_URL/me" \
    -H "Authorization: Bearer $PROF_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"nome\": \"João Silva\",
      \"bio\": \"Especialista em cabelos afro\",
      \"cidade\": \"São Paulo\",
      \"latitude\": -23.5505,
      \"longitude\": -46.6333
    }")

  printf '%s\n' "$PROF_PROFILE_RESPONSE"
else
  echo "Pulando atualizacao de perfil: PROF_TOKEN vazio."
fi

echo -e "\n\n=== 8. Create Service ==="
if [ -n "$PROF_TOKEN" ]; then
  SERVICE_RESPONSE=$(curl -s -X POST "$USERS_URL/me/servicos" \
    -H "Authorization: Bearer $PROF_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"nome\": \"Corte Afro\",
      \"descricao\": \"Corte especializado para cabelos afro\",
      \"duracao_minutos\": 45,
      \"preco\": 60.00
    }")

  printf '%s\n' "$SERVICE_RESPONSE"
  SERVICE_ID=$(extract_field "$SERVICE_RESPONSE" id)
  echo "Serviço criado: $SERVICE_ID"
else
  echo "Pulando criacao de servico: PROF_TOKEN vazio."
fi

echo -e "\n\n=== 9. List My Services ==="
if [ -n "$PROF_TOKEN" ]; then
  curl -s -X GET "$USERS_URL/me/servicos" \
    -H "Authorization: Bearer $PROF_TOKEN"
else
  echo "Pulando listagem de servicos: PROF_TOKEN vazio."
fi

echo -e "\n\n=== 10. Update Especialidades ==="
if [ -n "$PROF_TOKEN" ]; then
  curl -s -X PUT "$USERS_URL/me/especialidades" \
    -H "Authorization: Bearer $PROF_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "especialidades": ["cabelos-afro", "atendimento-tea"]
    }'
else
  echo "Pulando atualizacao de especialidades: PROF_TOKEN vazio."
fi

echo -e "\n\n=== 11. Search Profissionais ==="
curl -s -G "$SEARCH_URL" \
  --data-urlencode "termo=afro" \
  --data-urlencode "cidade=São Paulo" \
  --data-urlencode "pagina=1" \
  --data-urlencode "por_pagina=10"

echo -e "\n\n=== 12. Search with Especialidades ==="
curl -s -G "$SEARCH_URL" \
  --data-urlencode "especialidades=cabelos-afro,atendimento-tea" \
  --data-urlencode "ordenar=avaliacao"

echo -e "\n\n=== 13. Search with Geolocation ==="
curl -s -G "$SEARCH_URL" \
  --data-urlencode "latitude=-23.5505" \
  --data-urlencode "longitude=-46.6333" \
  --data-urlencode "raio_km=5" \
  --data-urlencode "ordenar=distancia"

echo -e "\n\n=== 14. Get Public Profile ==="
if [ -n "$PROF_USER_ID" ]; then
  curl -s -X GET "$USERS_URL/$PROF_USER_ID/perfil"
else
  echo "Pulando perfil publico: PROF_USER_ID vazio."
fi

echo -e "\n\n=== 15. Create Booking ==="
BOOKING_RESPONSE=""
BOOKING_ID=""

if [ -n "$CLIENT_TOKEN" ] && [ -n "$PROF_USER_ID" ] && [ -n "$SERVICE_ID" ]; then
  BOOKING_RESPONSE=$(curl -s -X POST "$BOOKINGS_URL" \
    -H "Authorization: Bearer $CLIENT_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"profissionalId\": \"$PROF_USER_ID\",
      \"servicoId\": \"$SERVICE_ID\",
      \"data_hora\": \"2026-05-20T14:30:00Z\"
    }")

  printf '%s\n' "$BOOKING_RESPONSE"
  BOOKING_ID=$(extract_field "$BOOKING_RESPONSE" id)
  echo "Agendamento criado: $BOOKING_ID"
else
  echo "Pulando booking: faltam CLIENT_TOKEN, PROF_USER_ID ou SERVICE_ID."
fi

echo -e "\n\n=== 16. List My Bookings ==="
if [ -n "$BOOKING_ID" ]; then
  curl -s -X GET "$BOOKINGS_URL" \
    -H "Authorization: Bearer $CLIENT_TOKEN"
else
  echo "Pulando listagem de bookings: BOOKING_ID vazio."
fi

echo -e "\n\n=== 17. Get Booking Details ==="
if [ -n "$BOOKING_ID" ]; then
  curl -s -X GET "$BOOKINGS_URL/$BOOKING_ID" \
    -H "Authorization: Bearer $CLIENT_TOKEN"
else
  echo "Pulando detalhes do booking: BOOKING_ID vazio."
fi

echo -e "\n\n=== 18. Create Payment Intent ==="
PAYMENT_RESPONSE=""
PAYMENT_INTENT=""

if [ -n "$BOOKING_ID" ]; then
  PAYMENT_RESPONSE=$(curl -s -X POST "$PAYMENTS_URL/intent" \
    -H "Authorization: Bearer $CLIENT_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"bookingId\": \"$BOOKING_ID\",
      \"valor\": 60.00
    }")

  printf '%s\n' "$PAYMENT_RESPONSE"
  PAYMENT_INTENT=$(extract_field "$PAYMENT_RESPONSE" id)
  echo "Payment intent criado: $PAYMENT_INTENT"
else
  echo "Pulando payment intent: BOOKING_ID vazio."
fi

echo -e "\n\n=== 19. Confirm Payment ==="
if [ -n "$PAYMENT_INTENT" ]; then
  curl -s -X POST "$PAYMENTS_URL/confirmar" \
    -H "Authorization: Bearer $CLIENT_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"paymentIntentId\": \"$PAYMENT_INTENT\"
    }"
else
  echo "Pulando confirmacao de pagamento: PAYMENT_INTENT vazio."
fi

echo -e "\n\n=== 20. Refund Payment ==="
if [ -n "$PAYMENT_INTENT" ]; then
  curl -s -X POST "$PAYMENTS_URL/reembolso" \
    -H "Authorization: Bearer $CLIENT_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"paymentIntentId\": \"$PAYMENT_INTENT\"
    }"
else
  echo "Pulando reembolso: PAYMENT_INTENT vazio."
fi

if [ -n "$ADMIN_TOKEN" ]; then
  echo -e "\n\n=== 21. Admin - Get Metrics ==="
  curl -s -X GET "$ADMIN_URL/metricas" \
    -H "Authorization: Bearer $ADMIN_TOKEN"

  echo -e "\n\n=== 22. Admin - Approve Professional ==="
  curl -s -X POST "$ADMIN_URL/aprovar" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"profissionalId\": \"$PROF_USER_ID\"
    }"

  echo -e "\n\n=== 23. Admin - Suspend Professional ==="
  curl -s -X POST "$ADMIN_URL/suspender" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"profissionalId\": \"$PROF_USER_ID\"
    }"
else
  echo -e "\n\n=== 21. Admin - Skipped ==="
  echo "ADMIN_TOKEN nao definido; pulando testes de admin."
fi

echo -e "\n\n=== 24. Health Check - API Gateway ==="
curl -s -X GET "$API_GATEWAY_URL/health"

echo -e "\n\n=== 25. Health Check - Auth Service ==="
curl -s -X GET "http://localhost:3001/health"

echo -e "\n\n=== 26. Health Check - User Service ==="
curl -s -X GET "http://localhost:3002/health"

echo -e "\n\n=== 27. Health Check - Search Service ==="
curl -s -X GET "http://localhost:3003/health"

echo -e "\n\n=== 28. Health Check - Booking Service ==="
curl -s -X GET "http://localhost:3004/health"

echo -e "\n\n=== 29. Health Check - Payment Service ==="
curl -s -X GET "http://localhost:3005/health"

echo -e "\n\n=== 30. Health Check - Admin Service ==="
curl -s -X GET "http://localhost:3007/health"

echo -e "\n\n=== 31. Logout ==="
curl -s -X POST "$AUTH_URL/logout" \
  -H "Authorization: Bearer $CLIENT_TOKEN"

echo -e "\n\n✅ Tests completed!"
