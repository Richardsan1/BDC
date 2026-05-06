CREATE SCHEMA IF NOT EXISTS bookingservice;
CREATE TABLE IF NOT EXISTS bookingservice.agendamentos (
    id UUID PRIMARY KEY,
    cliente_id UUID NOT NULL,
    profissional_id UUID NOT NULL,
    servico_id UUID NOT NULL,
    data_hora TIMESTAMP NOT NULL,
    status VARCHAR(30) DEFAULT 'aguardando_pagamento',
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_agendamentos_cliente ON bookingservice.agendamentos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_agendamentos_profissional ON bookingservice.agendamentos(profissional_id);
CREATE INDEX IF NOT EXISTS idx_agendamentos_status ON bookingservice.agendamentos(status);
