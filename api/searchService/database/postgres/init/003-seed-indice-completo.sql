-- ============================================================================
-- ATUALIZAR ÍNDICE DE BUSCA COM DADOS COMPLETOS E REALISTAS
-- ============================================================================

-- Limpar índice anterior
DELETE FROM searchservice.indice_profissionais;

-- Inserir dados desnormalizados completos
INSERT INTO searchservice.indice_profissionais 
(id, nome, email, tipo, foto_url, cidade, latitude, longitude, avaliacao_media, preco_minimo, especialidades, inclusivo, ativo, busca_ts)
VALUES
    -- PROFISSIONAIS
    ('22222222-2222-2222-2222-222222222221', 'Isabella Silva', 'isabella.silva@beleza.com', 'profissional', 
     'https://api.dicebear.com/7.x/avataaars/svg?seed=isabella', 'Sao Paulo', -23.5505, -46.6333, 4.8, 50.00,
     ARRAY['Cabelos Afro', 'Ambiente Adaptado'], true, true,
     to_tsvector('portuguese', 'Isabella Silva cabelos afro Sao Paulo')),
     
    ('22222222-2222-2222-2222-222222222228', 'Camila Santos', 'silva.cabeleireira@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=camila', 'Sao Paulo', -23.5410, -46.6562, 4.7, 80.00,
     ARRAY['Quimicas'], false, true,
     to_tsvector('portuguese', 'Camila Santos coloracao quimica Sao Paulo')),
     
    ('22222222-2222-2222-2222-222222222229', 'Daniela Ferraz', 'daniela.beleza@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=daniela', 'Sao Paulo', -23.5615, -46.6750, 4.6, 60.00,
     ARRAY['Corte Infantil'], false, true,
     to_tsvector('portuguese', 'Daniela Ferraz corte infantil Sao Paulo')),
     
    ('22222222-2222-2222-2222-222222222230', 'Giovana Costa', 'giovana.hair@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=giovana', 'Sao Paulo', -23.5720, -46.6400, 4.9, 100.00,
     ARRAY['Ambiente Adaptado'], true, true,
     to_tsvector('portuguese', 'Giovana Costa penteado noiva Sao Paulo')),
     
    ('22222222-2222-2222-2222-222222222222', 'Mariana Costa', 'mariana.costa@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=mariana', 'Rio de Janeiro', -22.9068, -43.1729, 4.9, 100.00,
     ARRAY['Box Braids', 'Trancas'], false, true,
     to_tsvector('portuguese', 'Mariana Costa box braids trancas Rio de Janeiro')),
     
    ('22222222-2222-2222-2222-222222222231', 'Fernanda Oliveira', 'fernanda.rio@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=fernanda', 'Rio de Janeiro', -22.9155, -43.2095, 4.8, 80.00,
     ARRAY['Cabelos Afro'], false, true,
     to_tsvector('portuguese', 'Fernanda Oliveira tricologia Rio de Janeiro')),
     
    ('22222222-2222-2222-2222-222222222232', 'Stephanie Rocha', 'stephanie.rio@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=stephanie', 'Rio de Janeiro', -22.9068, -43.1895, 4.7, 120.00,
     ARRAY['Cabelos Asiaticos'], false, true,
     to_tsvector('portuguese', 'Stephanie Rocha extensao cabelo Rio de Janeiro')),
     
    ('22222222-2222-2222-2222-222222222233', 'Carolina Duarte', 'carolina.rio@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=carolina', 'Rio de Janeiro', -22.9270, -43.1959, 4.6, 90.00,
     ARRAY['Quimicas'], false, true,
     to_tsvector('portuguese', 'Carolina Duarte penteado evento Rio de Janeiro')),
     
    ('22222222-2222-2222-2222-222222222223', 'Beatriz Oliveira', 'beatriz.oliveira@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=beatriz', 'Belo Horizonte', -19.9167, -43.9345, 4.9, 45.00,
     ARRAY['Corte Infantil', 'Ambiente Adaptado'], true, true,
     to_tsvector('portuguese', 'Beatriz Oliveira corte infantil Belo Horizonte')),
     
    ('22222222-2222-2222-2222-222222222234', 'Amanda Gomes', 'amanda.bh@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=amanda', 'Belo Horizonte', -19.9227, -43.9400, 4.7, 50.00,
     ARRAY['Cabelos Afro'], false, true,
     to_tsvector('portuguese', 'Amanda Gomes reconstrucao capilar Belo Horizonte')),
     
    ('22222222-2222-2222-2222-222222222235', 'Leticia Mendes', 'leticia.bh@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=leticia', 'Belo Horizonte', -19.9150, -43.9260, 4.8, 140.00,
     ARRAY['Quimicas'], false, true,
     to_tsvector('portuguese', 'Leticia Mendes progressiva botox Belo Horizonte')),
     
    ('22222222-2222-2222-2222-222222222224', 'Lucia Santos', 'lucia.santos@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=lucia', 'Brasilia', -15.8267, -47.8822, 4.8, 160.00,
     ARRAY['Cabelos Asiaticos', 'Quimicas'], false, true,
     to_tsvector('portuguese', 'Lucia Santos alisamento asiatico Brasilia')),
     
    ('22222222-2222-2222-2222-222222222236', 'Patricia Machado', 'patricia.bsb@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=patricia', 'Brasilia', -15.8400, -47.8900, 4.6, 80.00,
     ARRAY['Atendimento TEA', 'Ambiente Adaptado'], true, true,
     to_tsvector('portuguese', 'Patricia Machado TEA Brasilia')),
     
    ('22222222-2222-2222-2222-222222222225', 'Patricia Ferreira', 'patricia.ferreira@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=patricia', 'Salvador', -13.0044, -38.4609, 4.9, 90.00,
     ARRAY['Atendimento TEA', 'Ambiente Adaptado'], true, true,
     to_tsvector('portuguese', 'Patricia Ferreira TEA Salvador')),
     
    ('22222222-2222-2222-2222-222222222237', 'Conceicao Santos', 'conceicao.salvador@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=conceicao', 'Salvador', -13.0150, -38.4700, 4.7, 50.00,
     ARRAY['Cabelos Afro', 'Box Braids', 'Trancas'], false, true,
     to_tsvector('portuguese', 'Conceicao Santos cabelos afro Salvador')),
     
    ('22222222-2222-2222-2222-222222222226', 'Carolina Sousa', 'carolina.sousa@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=carolina', 'Curitiba', -25.4284, -49.2733, 4.7, 100.00,
     ARRAY['Quimicas'], false, true,
     to_tsvector('portuguese', 'Carolina Sousa coloracao Curitiba')),
     
    ('22222222-2222-2222-2222-222222222227', 'Amanda Rocha', 'amanda.rocha@beleza.com', 'profissional',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=amanda', 'Porto Alegre', -30.0346, -51.2177, 4.8, 60.00,
     ARRAY['Cabelos Afro', 'Quimicas'], false, true,
     to_tsvector('portuguese', 'Amanda Rocha reconstrucao hidratacao Porto Alegre')),
     
    -- SALÕES
    ('33333333-3333-3333-3333-333333333331', 'Salao Premium Beauty', 'salao.premium@beleza.com', 'salao',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=premium', 'Sao Paulo', -23.5505, -46.6333, 4.8, 60.00,
     ARRAY['Cabelos Afro', 'Box Braids', 'Trancas', 'Cabelos Asiaticos', 'Quimicas', 'Corte Infantil', 'Atendimento TEA', 'Ambiente Adaptado'], true, true,
     to_tsvector('portuguese', 'Salao Premium Beauty luxo Sao Paulo')),
     
    ('33333333-3333-3333-3333-333333333332', 'Salao Beleza Inclusiva', 'salao.inclusivo@beleza.com', 'salao',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=inclusivo', 'Rio de Janeiro', -22.9068, -43.1729, 4.9, 60.00,
     ARRAY['Atendimento TEA', 'Ambiente Adaptado'], true, true,
     to_tsvector('portuguese', 'Salao Beleza Inclusiva acessibilidade Rio de Janeiro')),
     
    ('33333333-3333-3333-3333-333333333333', 'Salao Especializado em Cabelos Afro', 'salao.especializado@beleza.com', 'salao',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=especializado', 'Belo Horizonte', -19.9167, -43.9345, 4.8, 60.00,
     ARRAY['Cabelos Afro', 'Box Braids', 'Trancas'], false, true,
     to_tsvector('portuguese', 'Salao Especializado Cabelos Afro Belo Horizonte')),
     
    ('33333333-3333-3333-3333-333333333334', 'Studio Belleza Profissional', 'studio.belleza@beleza.com', 'salao',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=studio', 'Brasilia', -15.8267, -47.8822, 4.7, 45.00,
     ARRAY['Cabelos Afro', 'Box Braids', 'Trancas', 'Cabelos Asiaticos', 'Quimicas', 'Corte Infantil', 'Atendimento TEA', 'Ambiente Adaptado'], true, true,
     to_tsvector('portuguese', 'Studio Belleza Profissional moderno Brasilia')),
     
    ('33333333-3333-3333-3333-333333333335', 'Salao Meu Jeito', 'salao.meu.jeito@beleza.com', 'salao',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=meujeito', 'Salvador', -13.0044, -38.4609, 4.6, 45.00,
     ARRAY['Cabelos Afro', 'Box Braids', 'Trancas', 'Cabelos Asiaticos', 'Quimicas', 'Corte Infantil', 'Atendimento TEA', 'Ambiente Adaptado'], true, true,
     to_tsvector('portuguese', 'Salao Meu Jeito familiar aconchegante Salvador'));

-- Recriar índices full-text search
DROP INDEX IF EXISTS idx_indice_busca;
CREATE INDEX idx_indice_busca ON searchservice.indice_profissionais USING gin(busca_ts);

-- Recriar índices para especialidades e performance
DROP INDEX IF EXISTS idx_indice_especialidades;
CREATE INDEX idx_indice_especialidades ON searchservice.indice_profissionais USING gin(especialidades);

-- Índices adicionais para melhor performance
CREATE INDEX IF NOT EXISTS idx_indice_cidade_ativo ON searchservice.indice_profissionais(cidade, ativo);
CREATE INDEX IF NOT EXISTS idx_indice_avaliacao_ativo ON searchservice.indice_profissionais(avaliacao_media DESC, ativo);
CREATE INDEX IF NOT EXISTS idx_indice_tipo_ativo ON searchservice.indice_profissionais(tipo, ativo);
CREATE INDEX IF NOT EXISTS idx_indice_preco_ativo ON searchservice.indice_profissionais(preco_minimo ASC, ativo);
CREATE INDEX IF NOT EXISTS idx_indice_inclusivo_ativo ON searchservice.indice_profissionais(inclusivo, ativo);

-- Vacuumizar índices para otimizar
VACUUM ANALYZE searchservice.indice_profissionais;

COMMIT;
