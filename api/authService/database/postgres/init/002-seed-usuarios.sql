-- Seed de usuários para testes
-- Senhas geradas com bcrypt (todas as senhas de teste são 'Senha@123')
-- Hash: $2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUexTEJm

INSERT INTO authservice.usuarios (id, email, senha_hash, tipo, status) VALUES
    -- Clientes
    ('11111111-1111-1111-1111-111111111111', 'cliente1@beleza.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUexTEJm', 'cliente', 'ativo'),
    ('11111111-1111-1111-1111-111111111112', 'cliente2@beleza.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUexTEJm', 'cliente', 'ativo'),
    ('11111111-1111-1111-1111-111111111113', 'cliente3@beleza.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUexTEJm', 'cliente', 'ativo'),
    ('11111111-1111-1111-1111-111111111114', 'cliente4@beleza.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUexTEJm', 'cliente', 'ativo'),
    ('11111111-1111-1111-1111-111111111115', 'cliente5@beleza.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUexTEJm', 'cliente', 'ativo'),
    
    -- Profissionais (Cabeleireiros autônomos)
    ('22222222-2222-2222-2222-222222222221', 'isabella.silva@beleza.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUexTEJm', 'profissional', 'ativo'),
    ('22222222-2222-2222-2222-222222222222', 'mariana.costa@beleza.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUexTEJm', 'profissional', 'ativo'),
    ('22222222-2222-2222-2222-222222222223', 'beatriz.oliveira@beleza.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUexTEJm', 'profissional', 'ativo'),
    ('22222222-2222-2222-2222-222222222224', 'lucia.santos@beleza.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUexTEJm', 'profissional', 'ativo'),
    ('22222222-2222-2222-2222-222222222225', 'patricia.ferreira@beleza.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUexTEJm', 'profissional', 'ativo'),
    ('22222222-2222-2222-2222-222222222226', 'carolina.sousa@beleza.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUexTEJm', 'profissional', 'ativo'),
    ('22222222-2222-2222-2222-222222222227', 'amanda.rocha@beleza.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUexTEJm', 'profissional', 'ativo'),
    
    -- Salões
    ('33333333-3333-3333-3333-333333333331', 'salao.premium@beleza.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUexTEJm', 'salao', 'ativo'),
    ('33333333-3333-3333-3333-333333333332', 'salao.inclusivo@beleza.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUexTEJm', 'salao', 'ativo'),
    ('33333333-3333-3333-3333-333333333333', 'salao.especializado@beleza.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUexTEJm', 'salao', 'ativo'),
    
    -- Admin
    ('99999999-9999-9999-9999-999999999999', 'admin@beleza.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUexTEJm', 'admin', 'ativo')
ON CONFLICT (email) DO NOTHING;
