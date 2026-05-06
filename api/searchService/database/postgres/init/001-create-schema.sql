CREATE SCHEMA IF NOT EXISTS searchservice;

-- Tabela de índice desnormalizado para buscas rápidas
CREATE TABLE IF NOT EXISTS searchservice.indice_profissionais (
    id UUID PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255),
    tipo VARCHAR(20),
    foto_url VARCHAR(500),
    cidade VARCHAR(100),
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6),
    avaliacao_media DECIMAL(2, 1) DEFAULT 0,
    preco_minimo DECIMAL(10, 2),
    especialidades TEXT[] DEFAULT '{}',
    inclusivo BOOLEAN DEFAULT false,
    busca_ts TSVECTOR,
    ativo BOOLEAN DEFAULT true,
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_indice_busca ON searchservice.indice_profissionais USING gin(busca_ts);
CREATE INDEX IF NOT EXISTS idx_indice_especialidades ON searchservice.indice_profissionais USING gin(especialidades);
CREATE INDEX IF NOT EXISTS idx_indice_ativo ON searchservice.indice_profissionais(ativo);
CREATE INDEX IF NOT EXISTS idx_indice_cidade ON searchservice.indice_profissionais(cidade);
CREATE INDEX IF NOT EXISTS idx_indice_avaliacao ON searchservice.indice_profissionais(avaliacao_media DESC);
