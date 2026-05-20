-- Seed do índice desnormalizado para busca rápida
-- Sincronizado com dados do userService

INSERT INTO searchservice.indice_profissionais (id, nome, email, tipo, foto_url, cidade, latitude, longitude, avaliacao_media, especialidades, inclusivo, ativo) VALUES
    ('22222222-2222-2222-2222-222222222221', 'Isabella Silva', 'isabella.silva@beleza.com', 'profissional', 
     'https://api.dicebear.com/7.x/avataaars/svg?seed=isabella', 'São Paulo', -23.5505, -46.6333, 4.8, 
     ARRAY['Cabelos Afro', 'Ambiente Adaptado'], true, true),
    
    ('22222222-2222-2222-2222-222222222222', 'Mariana Costa', 'mariana.costa@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=mariana', 'Rio de Janeiro', -22.9068, -43.1729, 4.9,
     ARRAY['Box Braids', 'Tranças'], false, true),
    
    ('22222222-2222-2222-2222-222222222223', 'Beatriz Oliveira', 'beatriz.oliveira@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=beatriz', 'Belo Horizonte', -19.9167, -43.9345, 4.7,
     ARRAY['Corte Infantil', 'Ambiente Adaptado'], true, true),
    
    ('22222222-2222-2222-2222-222222222224', 'Lucia Santos', 'lucia.santos@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=lucia', 'Brasília', -15.8267, -47.8822, 4.6,
     ARRAY['Cabelos Asiáticos', 'Químicas'], false, true),
    
    ('22222222-2222-2222-2222-222222222225', 'Patricia Ferreira', 'patricia.ferreira@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=patricia', 'Salvador', -13.0044, -38.4609, 4.9,
     ARRAY['Atendimento TEA', 'Ambiente Adaptado'], true, true),
    
    ('22222222-2222-2222-2222-222222222226', 'Carolina Sousa', 'carolina.sousa@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=carolina', 'Curitiba', -25.4284, -49.2733, 4.5,
     ARRAY['Químicas'], false, true),
    
    ('22222222-2222-2222-2222-222222222227', 'Amanda Rocha', 'amanda.rocha@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=amanda', 'Porto Alegre', -30.0346, -51.2177, 4.8,
     ARRAY['Cabelos Afro', 'Químicas'], false, true),
    
    -- Salões
    ('33333333-3333-3333-3333-333333333331', 'Salão Premium Beauty', 'salao.premium@beleza.com', 'salao',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=premium', 'São Paulo', -23.5505, -46.6333, 4.7,
     ARRAY['Cabelos Afro', 'Box Braids', 'Tranças', 'Cabelos Asiáticos', 'Químicas', 'Corte Infantil', 'Atendimento TEA', 'Ambiente Adaptado'], true, true),
    
    ('33333333-3333-3333-3333-333333333332', 'Salão Beleza Inclusiva', 'salao.inclusivo@beleza.com', 'salao',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=inclusivo', 'Rio de Janeiro', -22.9068, -43.1729, 4.9,
     ARRAY['Atendimento TEA', 'Ambiente Adaptado'], true, true),
    
    ('33333333-3333-3333-3333-333333333333', 'Salão Especializado em Cabelos Afro', 'salao.especializado@beleza.com', 'salao',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=especializado', 'Belo Horizonte', -19.9167, -43.9345, 4.8,
     ARRAY['Cabelos Afro', 'Box Braids', 'Tranças'], false, true);

-- Nota: O campo busca_ts (full-text search) será preenchido automaticamente por trigger
-- caso exista um, ou pode ser atualizado manualmente com:
-- UPDATE searchservice.indice_profissionais 
-- SET busca_ts = to_tsvector('portuguese', nome || ' ' || coalesce(email, ''));
