CREATE SCHEMA IF NOT EXISTS paymentservice;
CREATE TABLE IF NOT EXISTS paymentservice.pagamentos (
    id UUID PRIMARY KEY,
    booking_id UUID NOT NULL,
    cliente_id UUID NOT NULL,
    stripe_intent_id VARCHAR(255),
    valor DECIMAL(10, 2),
    status VARCHAR(30) DEFAULT 'pendente',
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_pagamentos_booking ON paymentservice.pagamentos(booking_id);
CREATE INDEX IF NOT EXISTS idx_pagamentos_cliente ON paymentservice.pagamentos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_pagamentos_stripe_intent ON paymentservice.pagamentos(stripe_intent_id);
