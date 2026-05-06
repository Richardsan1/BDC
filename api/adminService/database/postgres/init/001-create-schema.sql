CREATE SCHEMA IF NOT EXISTS admin_service;
CREATE TABLE IF NOT EXISTS admin_service.usuarios (
    id UUID PRIMARY KEY,
    email VARCHAR(255),
    tipo VARCHAR(20),
    status VARCHAR(30),
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS admin_service.profissionais (
    id UUID PRIMARY KEY,
    status VARCHAR(30),
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
