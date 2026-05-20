-- Seed de perfis de usuários
-- Sincronizado com IDs do authService

-- Clientes
INSERT INTO userservice.perfis (id, email, nome, tipo, status, bio, foto_url, cidade, latitude, longitude, ativo) VALUES
    ('11111111-1111-1111-1111-111111111111', 'cliente1@beleza.com', 'Sophia Lima', 'cliente', 'ativo', 'Procurando especialista em cabelos afro', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sophia', 'São Paulo', -23.5505, -46.6333, true),
    ('11111111-1111-1111-1111-111111111112', 'cliente2@beleza.com', 'Marina Santos', 'cliente', 'ativo', 'Adora tranças e box braids', 'https://api.dicebear.com/7.x/avataaars/svg?seed=marina', 'Rio de Janeiro', -22.9068, -43.1729, true),
    ('11111111-1111-1111-1111-111111111113', 'cliente3@beleza.com', 'Julia Costa', 'cliente', 'ativo', 'Mãe em busca de cabeleireiro infantil', 'https://api.dicebear.com/7.x/avataaars/svg?seed=julia', 'Belo Horizonte', -19.9167, -43.9345, true),
    ('11111111-1111-1111-1111-111111111114', 'cliente4@beleza.com', 'Lucas Ferreira', 'cliente', 'ativo', 'Precisa de corte e coloração', 'https://api.dicebear.com/7.x/avataaars/svg?seed=lucas', 'Brasília', -15.8267, -47.8822, true),
    ('11111111-1111-1111-1111-111111111115', 'cliente5@beleza.com', 'Ana Patricia', 'cliente', 'ativo', 'Busca profissional com atendimento acessível', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana', 'Salvador', -13.0044, -38.4609, true),

    -- Profissionais (Cabeleireiros autônomos)
    ('22222222-2222-2222-2222-222222222221', 'isabella.silva@beleza.com', 'Isabella Silva', 'profissional', 'ativo', 'Especialista em cabelos afro com 10 anos de experiência', 'https://api.dicebear.com/7.x/avataaars/svg?seed=isabella', 'São Paulo', -23.5505, -46.6333, true),
    ('22222222-2222-2222-2222-222222222222', 'mariana.costa@beleza.com', 'Mariana Costa', 'profissional', 'ativo', 'Mestre em box braids e tranças africanas', 'https://api.dicebear.com/7.x/avataaars/svg?seed=mariana', 'Rio de Janeiro', -22.9068, -43.1729, true),
    ('22222222-2222-2222-2222-222222222223', 'beatriz.oliveira@beleza.com', 'Beatriz Oliveira', 'profissional', 'ativo', 'Atendimento infantil especializado e acolhedor', 'https://api.dicebear.com/7.x/avataaars/svg?seed=beatriz', 'Belo Horizonte', -19.9167, -43.9345, true),
    ('22222222-2222-2222-2222-222222222224', 'lucia.santos@beleza.com', 'Lucia Santos', 'profissional', 'ativo', 'Especialista em cabelos asiáticos e tratamentos químicos', 'https://api.dicebear.com/7.x/avataaars/svg?seed=lucia', 'Brasília', -15.8267, -47.8822, true),
    ('22222222-2222-2222-2222-222222222225', 'patricia.ferreira@beleza.com', 'Patricia Ferreira', 'profissional', 'ativo', 'Ambiente totalmente acessível, atendimento TEA', 'https://api.dicebear.com/7.x/avataaars/svg?seed=patricia', 'Salvador', -13.0044, -38.4609, true),
    ('22222222-2222-2222-2222-222222222226', 'carolina.sousa@beleza.com', 'Carolina Sousa', 'profissional', 'ativo', 'Coloração e tratamentos avançados', 'https://api.dicebear.com/7.x/avataaars/svg?seed=carolina', 'Curitiba', -25.4284, -49.2733, true),
    ('22222222-2222-2222-2222-222222222227', 'amanda.rocha@beleza.com', 'Amanda Rocha', 'profissional', 'ativo', 'Especialista em reconstrução e hidratação capilar', 'https://api.dicebear.com/7.x/avataaars/svg?seed=amanda', 'Porto Alegre', -30.0346, -51.2177, true),

    -- Salões
    ('33333333-3333-3333-3333-333333333331', 'salao.premium@beleza.com', 'Salão Premium Beauty', 'salao', 'ativo', 'Salão de luxo com equipe especializada', 'https://api.dicebear.com/7.x/avataaars/svg?seed=premium', 'São Paulo', -23.5505, -46.6333, true),
    ('33333333-3333-3333-3333-333333333332', 'salao.inclusivo@beleza.com', 'Salão Beleza Inclusiva', 'salao', 'ativo', 'Salão com ambiente totalmente acessível', 'https://api.dicebear.com/7.x/avataaars/svg?seed=inclusivo', 'Rio de Janeiro', -22.9068, -43.1729, true),
    ('33333333-3333-3333-3333-333333333333', 'salao.especializado@beleza.com', 'Salão Especializado em Cabelos Afro', 'salao', 'ativo', 'Referência em cabelos afro e texturas naturais', 'https://api.dicebear.com/7.x/avataaars/svg?seed=especializado', 'Belo Horizonte', -19.9167, -43.9345, true);

-- Sincronizar especialidades dos profissionais
-- Isabella Silva: Cabelos Afro
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id) VALUES
    ('22222222-2222-2222-2222-222222222221', (SELECT id FROM userservice.especialidades WHERE slug = 'cabelos-afro')),
    ('22222222-2222-2222-2222-222222222221', (SELECT id FROM userservice.especialidades WHERE slug = 'ambiente-adaptado'));

-- Mariana Costa: Box Braids, Tranças
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id) VALUES
    ('22222222-2222-2222-2222-222222222222', (SELECT id FROM userservice.especialidades WHERE slug = 'box-braids')),
    ('22222222-2222-2222-2222-222222222222', (SELECT id FROM userservice.especialidades WHERE slug = 'trancas'));

-- Beatriz Oliveira: Corte Infantil, Ambiente Adaptado
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id) VALUES
    ('22222222-2222-2222-2222-222222222223', (SELECT id FROM userservice.especialidades WHERE slug = 'corte-infantil')),
    ('22222222-2222-2222-2222-222222222223', (SELECT id FROM userservice.especialidades WHERE slug = 'ambiente-adaptado'));

-- Lucia Santos: Cabelos Asiáticos, Químicas
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id) VALUES
    ('22222222-2222-2222-2222-222222222224', (SELECT id FROM userservice.especialidades WHERE slug = 'cabelos-asiaticos')),
    ('22222222-2222-2222-2222-222222222224', (SELECT id FROM userservice.especialidades WHERE slug = 'quimicas'));

-- Patricia Ferreira: Atendimento TEA, Ambiente Adaptado
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id) VALUES
    ('22222222-2222-2222-2222-222222222225', (SELECT id FROM userservice.especialidades WHERE slug = 'atendimento-tea')),
    ('22222222-2222-2222-2222-222222222225', (SELECT id FROM userservice.especialidades WHERE slug = 'ambiente-adaptado'));

-- Carolina Sousa: Químicas
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id) VALUES
    ('22222222-2222-2222-2222-222222222226', (SELECT id FROM userservice.especialidades WHERE slug = 'quimicas'));

-- Amanda Rocha: Cabelos Afro, Químicas
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id) VALUES
    ('22222222-2222-2222-2222-222222222227', (SELECT id FROM userservice.especialidades WHERE slug = 'cabelos-afro')),
    ('22222222-2222-2222-2222-222222222227', (SELECT id FROM userservice.especialidades WHERE slug = 'quimicas'));

-- Adicionar especialidades aos salões
-- Salão Premium: Todas as especialidades
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id) 
SELECT '33333333-3333-3333-3333-333333333331', id FROM userservice.especialidades;

-- Salão Inclusivo: TEA, Ambiente Adaptado
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id) VALUES
    ('33333333-3333-3333-3333-333333333332', (SELECT id FROM userservice.especialidades WHERE slug = 'atendimento-tea')),
    ('33333333-3333-3333-3333-333333333332', (SELECT id FROM userservice.especialidades WHERE slug = 'ambiente-adaptado'));

-- Salão Especializado: Cabelos Afro, Box Braids, Tranças
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id) VALUES
    ('33333333-3333-3333-3333-333333333333', (SELECT id FROM userservice.especialidades WHERE slug = 'cabelos-afro')),
    ('33333333-3333-3333-3333-333333333333', (SELECT id FROM userservice.especialidades WHERE slug = 'box-braids')),
    ('33333333-3333-3333-3333-333333333333', (SELECT id FROM userservice.especialidades WHERE slug = 'trancas'));
