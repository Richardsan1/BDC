CREATE SCHEMA IF NOT EXISTS authservice;

COMMENT ON SCHEMA authservice IS 'Schema inicial do authService';

-- Tabela de usuários (credenciais de acesso)
CREATE TABLE IF NOT EXISTS authservice.usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('cliente', 'profissional', 'salao', 'admin')),
    status VARCHAR(30) NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'pendente_aprovacao', 'suspenso', 'removido')),
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE authservice.usuarios IS 'Credenciais de autenticação dos usuários da plataforma';
COMMENT ON COLUMN authservice.usuarios.tipo IS 'Papel do usuário: cliente, profissional, salao ou admin';
COMMENT ON COLUMN authservice.usuarios.status IS 'Status da conta: ativo, pendente_aprovacao, suspenso ou removido';

-- Tabela de blacklist de tokens JWT invalidados
CREATE TABLE IF NOT EXISTS authservice.token_blacklist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_jti VARCHAR(255) NOT NULL UNIQUE,
    usuario_id UUID NOT NULL REFERENCES authservice.usuarios(id) ON DELETE CASCADE,
    invalidado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expira_em TIMESTAMP WITH TIME ZONE NOT NULL
);

COMMENT ON TABLE authservice.token_blacklist IS 'Tokens JWT invalidados por logout ou suspensão';

-- Tabela de tentativas de login (para rate limiting por usuário)
CREATE TABLE IF NOT EXISTS authservice.tentativas_login (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    ip_origem VARCHAR(45),
    sucesso BOOLEAN NOT NULL,
    tentado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE authservice.tentativas_login IS 'Registro de tentativas de login para auditoria e segurança';

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON authservice.usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_tipo_status ON authservice.usuarios(tipo, status);
CREATE INDEX IF NOT EXISTS idx_token_blacklist_jti ON authservice.token_blacklist(token_jti);
CREATE INDEX IF NOT EXISTS idx_token_blacklist_expira ON authservice.token_blacklist(expira_em);
CREATE INDEX IF NOT EXISTS idx_tentativas_login_email ON authservice.tentativas_login(email);

-- Função para atualizar o campo atualizado_em automaticamente
CREATE OR REPLACE FUNCTION authservice.atualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger de atualização automática de timestamp
CREATE TRIGGER trigger_atualizar_timestamp_usuarios
    BEFORE UPDATE ON authservice.usuarios
    FOR EACH ROW
    EXECUTE FUNCTION authservice.atualizar_timestamp();

-- Usuário admin padrão (senha: Admin@123 — ALTERAR EM PRODUÇÃO)
-- Hash gerado com bcrypt fator 12
-- INSERT INTO authservice.usuarios (email, senha_hash, tipo, status)
-- VALUES ('admin@belezainclusiva.com', '$2b$12$HASH_AQUI', 'admin', 'ativo');
