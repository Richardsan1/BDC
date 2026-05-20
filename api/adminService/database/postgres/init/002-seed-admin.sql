-- Seed do adminService
-- Sincronização de usuários e profissionais para dashboard admin

INSERT INTO admin_service.usuarios (id, email, tipo, status) VALUES
    ('11111111-1111-1111-1111-111111111111', 'cliente1@beleza.com', 'cliente', 'ativo'),
    ('11111111-1111-1111-1111-111111111112', 'cliente2@beleza.com', 'cliente', 'ativo'),
    ('11111111-1111-1111-1111-111111111113', 'cliente3@beleza.com', 'cliente', 'ativo'),
    ('11111111-1111-1111-1111-111111111114', 'cliente4@beleza.com', 'cliente', 'ativo'),
    ('11111111-1111-1111-1111-111111111115', 'cliente5@beleza.com', 'cliente', 'ativo'),
    ('22222222-2222-2222-2222-222222222221', 'isabella.silva@beleza.com', 'profissional', 'ativo'),
    ('22222222-2222-2222-2222-222222222222', 'mariana.costa@beleza.com', 'profissional', 'ativo'),
    ('22222222-2222-2222-2222-222222222223', 'beatriz.oliveira@beleza.com', 'profissional', 'ativo'),
    ('22222222-2222-2222-2222-222222222224', 'lucia.santos@beleza.com', 'profissional', 'ativo'),
    ('22222222-2222-2222-2222-222222222225', 'patricia.ferreira@beleza.com', 'profissional', 'ativo'),
    ('22222222-2222-2222-2222-222222222226', 'carolina.sousa@beleza.com', 'profissional', 'ativo'),
    ('22222222-2222-2222-2222-222222222227', 'amanda.rocha@beleza.com', 'profissional', 'ativo'),
    ('33333333-3333-3333-3333-333333333331', 'salao.premium@beleza.com', 'salao', 'ativo'),
    ('33333333-3333-3333-3333-333333333332', 'salao.inclusivo@beleza.com', 'salao', 'ativo'),
    ('33333333-3333-3333-3333-333333333333', 'salao.especializado@beleza.com', 'salao', 'ativo'),
    ('99999999-9999-9999-9999-999999999999', 'admin@beleza.com', 'admin', 'ativo')
ON CONFLICT DO NOTHING;

INSERT INTO admin_service.profissionais (id, status) VALUES
    ('22222222-2222-2222-2222-222222222221', 'ativo'),
    ('22222222-2222-2222-2222-222222222222', 'ativo'),
    ('22222222-2222-2222-2222-222222222223', 'ativo'),
    ('22222222-2222-2222-2222-222222222224', 'ativo'),
    ('22222222-2222-2222-2222-222222222225', 'ativo'),
    ('22222222-2222-2222-2222-222222222226', 'ativo'),
    ('22222222-2222-2222-2222-222222222227', 'ativo'),
    ('33333333-3333-3333-3333-333333333331', 'ativo'),
    ('33333333-3333-3333-3333-333333333332', 'ativo'),
    ('33333333-3333-3333-3333-333333333333', 'ativo')
ON CONFLICT DO NOTHING;
