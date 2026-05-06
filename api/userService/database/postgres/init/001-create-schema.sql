CREATE SCHEMA IF NOT EXISTS userservice;

-- Tabela de perfis base
CREATE TABLE IF NOT EXISTS userservice.perfis (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    nome VARCHAR(255),
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('cliente', 'profissional', 'salao')),
    status VARCHAR(30) NOT NULL DEFAULT 'ativo',
    bio TEXT,
    foto_url VARCHAR(500),
    cidade VARCHAR(100),
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6),
    avaliacao_media DECIMAL(2, 1) DEFAULT 0,
    ativo BOOLEAN DEFAULT true,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de especialidades (pré-populado)
CREATE TABLE IF NOT EXISTS userservice.especialidades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de relação N:N entre perfis e especialidades
CREATE TABLE IF NOT EXISTS userservice.perfil_especialidades (
    perfil_id UUID NOT NULL REFERENCES userservice.perfis(id) ON DELETE CASCADE,
    especialidade_id UUID NOT NULL REFERENCES userservice.especialidades(id) ON DELETE CASCADE,
    PRIMARY KEY (perfil_id, especialidade_id)
);

-- Tabela de serviços
CREATE TABLE IF NOT EXISTS userservice.servicos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    perfil_id UUID NOT NULL REFERENCES userservice.perfis(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    duracao_minutos INTEGER,
    preco DECIMAL(10, 2),
    ativo BOOLEAN DEFAULT true,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_perfis_email ON userservice.perfis(email);
CREATE INDEX IF NOT EXISTS idx_perfis_tipo_status ON userservice.perfis(tipo, status);
CREATE INDEX IF NOT EXISTS idx_perfis_ativo ON userservice.perfis(ativo);
CREATE INDEX IF NOT EXISTS idx_servicos_perfil ON userservice.servicos(perfil_id);

-- Inserir especialidades pré-cadastradas
INSERT INTO userservice.especialidades (slug, nome, descricao) VALUES
    ('cabelos-afro', 'Cabelos Afro', 'Especialista em cabelos afro'),
    ('cabelos-asiaticos', 'Cabelos Asiáticos', 'Especialista em cabelos asiáticos'),
    ('quimicas', 'Químicas', 'Aplica alisamentos, permanentes e colorações'),
    ('trancas', 'Tranças', 'Especialista em tranças e boxbraids'),
    ('box-braids', 'Box Braids', 'Especializador em box braids'),
    ('corte-infantil', 'Corte Infantil', 'Especialista em corte infantil'),
    ('atendimento-tea', 'Atendimento TEA', 'Oferece atendimento inclusivo para autistas'),
    ('ambiente-adaptado', 'Ambiente Adaptado', 'Possui ambiente com acessibilidade')
ON CONFLICT DO NOTHING;
