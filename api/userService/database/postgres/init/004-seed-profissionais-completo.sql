-- ============================================================================
-- SEED COMPLETO: Profissionais com dados realistas e completos
-- ============================================================================

-- Limpar dados antigos (comentado por segurança)
-- TRUNCATE userservice.perfil_especialidades CASCADE;
-- TRUNCATE userservice.servicos CASCADE;
-- DELETE FROM userservice.perfis WHERE tipo IN ('profissional', 'salao');

-- ============================================================================
-- PROFISSIONAIS (Cabeleireiros Autônomos) - 15 profissionais
-- ============================================================================

INSERT INTO userservice.perfis (id, email, nome, tipo, status, bio, foto_url, cidade, latitude, longitude, avaliacao_media, ativo)
VALUES
    -- São Paulo (4 profissionais)
    ('22222222-2222-2222-2222-222222222221', 'isabella.silva@beleza.com', 'Isabella Silva', 'profissional', 'ativo', 
     'Especialista em cabelos afro com 10 anos de experiência. Formada em tricologia capilar. Trabalho com produtos naturais e sustentáveis. Atendo com muita paciência e carinho!', 
     'https://api.dicebear.com/7.x/avataaars/svg?seed=isabella', 'São Paulo', -23.5505, -46.6333, 4.8, true),
    
    ('22222222-2222-2222-2222-222222222228', 'silva.cabeleireira@beleza.com', 'Camila Santos', 'profissional', 'ativo',
     'Especialista em coloração e tratamentos químicos avançados. Técnica de ombré e balayage. Atendo desde adolescentes até a terceira idade com muito cuidado.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=camila', 'São Paulo', -23.5410, -46.6562, 4.7, true),
    
    ('22222222-2222-2222-2222-222222222229', 'daniela.beleza@beleza.com', 'Daniela Ferraz', 'profissional', 'ativo',
     'Designer de cabelo com especialização em cortes modernos e geométricos. Mais de 8 anos criando tendências. Consultoria de imagem incluída.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=daniela', 'São Paulo', -23.5615, -46.6750, 4.6, true),
    
    ('22222222-2222-2222-2222-222222222230', 'giovana.hair@beleza.com', 'Giovana Costa', 'profissional', 'ativo',
     'Especialista em penteados para noivas e eventos. Trabalho com acessórios premium. Mais de 500 noivas já fizeram seus penteados comigo!',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=giovana', 'São Paulo', -23.5720, -46.6400, 4.9, true),
    
    -- Rio de Janeiro (4 profissionais)
    ('22222222-2222-2222-2222-222222222222', 'mariana.costa@beleza.com', 'Mariana Costa', 'profissional', 'ativo', 
     'Mestre em box braids, tranças africanas e penteados afro. 12 anos de experiência. Utilizo cabelo 100% humano de qualidade premium.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=mariana', 'Rio de Janeiro', -22.9068, -43.1729, 4.9, true),
    
    ('22222222-2222-2222-2222-222222222231', 'fernanda.rio@beleza.com', 'Fernanda Oliveira', 'profissional', 'ativo',
     'Tricologista com certificação internacional. Tratamentos para alopecia, queda de cabelo e problemas de couro cabeludo. Consultoria nutricional incluída.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=fernanda', 'Rio de Janeiro', -22.9155, -43.2095, 4.8, true),
    
    ('22222222-2222-2222-2222-222222222232', 'stephanie.rio@beleza.com', 'Stephanie Rocha', 'profissional', 'ativo',
     'Especialista em extensão de cabelo (micro links, mega hair, fita). Trabalho com cabelo premium nacional e importado. Garantia de 3 meses.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=stephanie', 'Rio de Janeiro', -22.9068, -43.1895, 4.7, true),
    
    ('22222222-2222-2222-2222-222222222233', 'carolina.rio@beleza.com', 'Carolina Duarte', 'profissional', 'ativo',
     'Cabeleireira diplomada com especialização em penteados nupciais e festivos. Atendo grupos (amigas da noiva, convidadas). Desconto para pacotes!',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=carolina', 'Rio de Janeiro', -22.9270, -43.1959, 4.6, true),
    
    -- Belo Horizonte (3 profissionais)
    ('22222222-2222-2222-2222-222222222223', 'beatriz.oliveira@beleza.com', 'Beatriz Oliveira', 'profissional', 'ativo',
     'Especialista em atendimento infantil. Ambiente lúdico e divertido. Técnicas suaves para não traumatizar as crianças. Pacientes desde os 2 anos!',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=beatriz', 'Belo Horizonte', -19.9167, -43.9345, 4.9, true),
    
    ('22222222-2222-2222-2222-222222222234', 'amanda.bh@beleza.com', 'Amanda Gomes', 'profissional', 'ativo',
     'Especialista em reconstrução e hidratação capilar. Trabalho com produtos importados de alta qualidade. Recupero cabelos muito danificados.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=amanda', 'Belo Horizonte', -19.9227, -43.9400, 4.7, true),
    
    ('22222222-2222-2222-2222-222222222235', 'leticia.bh@beleza.com', 'Letícia Mendes', 'profissional', 'ativo',
     'Designer capilar com formação em estética. Especialista em progressiva, hidratação e botox capilar. Amo transformar cabelos!',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=leticia', 'Belo Horizonte', -19.9150, -43.9260, 4.8, true),
    
    -- Brasília (2 profissionais)
    ('22222222-2222-2222-2222-222222222224', 'lucia.santos@beleza.com', 'Lucia Santos', 'profissional', 'ativo', 
     'Especialista em cabelos asiáticos com tratamentos químicos avançados. Alisamento japonês, coreano e brasileiro. Mais de 5.000 clientes satisfeitos!',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=lucia', 'Brasília', -15.8267, -47.8822, 4.8, true),
    
    ('22222222-2222-2222-2222-222222222236', 'patricia.bsb@beleza.com', 'Patricia Machado', 'profissional', 'ativo',
     'Cabeleireira diplomada com especialização em tricologia. Atendo casos especiais de cabelo danificado, com queda ou muito sensível.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=patricia', 'Brasília', -15.8400, -47.8900, 4.6, true),
    
    -- Salvador (2 profissionais)
    ('22222222-2222-2222-2222-222222222225', 'patricia.ferreira@beleza.com', 'Patricia Ferreira', 'profissional', 'ativo', 
     'Ambiente totalmente acessível e com atendimento especial para pessoas com TEA. Técnicas de relaxamento. Muito paciente e dedicada!',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=patricia', 'Salvador', -13.0044, -38.4609, 4.9, true),
    
    ('22222222-2222-2222-2222-222222222237', 'conceicao.salvador@beleza.com', 'Conceição Santos', 'profissional', 'ativo',
     'Especialista em penteados afro, bantu knots e penteados étnicos. Trabalho com raízes e força. Referência em estilo afro natural!',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=conceicao', 'Salvador', -13.0150, -38.4700, 4.7, true),

    -- Curitiba (1 profissional)
    ('22222222-2222-2222-2222-222222222226', 'carolina.sousa@beleza.com', 'Carolina Sousa', 'profissional', 'ativo',
     'Colorista profissional com mais de 10 anos. Especialista em coloracao criativa e tendencias. Trabalho com Schwarzkopf e produtos premium.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=carolina', 'Curitiba', -25.4284, -49.2733, 4.7, true),
    
     'https://api.dicebear.com/7.x/avataaars/svg?seed=amanda', 'Porto Alegre', -30.0346, -51.2177, 4.8, true);

-- ============================================================================
-- SALÕES - 5 salões
-- ============================================================================

INSERT INTO userservice.perfis (id, email, nome, tipo, status, bio, foto_url, cidade, latitude, longitude, avaliacao_media, ativo)
VALUES
    -- Salões
    ('33333333-3333-3333-3333-333333333331', 'salao.premium@beleza.com', 'Salão Premium Beauty', 'salao', 'ativo', 
     'Salão de luxo completo. Equipe especializada em todos os tipos de cabelo. Atendimento personalizado e consultoria de imagem. Ambiente climatizado e acessível.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=premium', 'São Paulo', -23.5505, -46.6333, 4.8, true),
    
    ('33333333-3333-3333-3333-333333333332', 'salao.inclusivo@beleza.com', 'Salão Beleza Inclusiva', 'salao', 'ativo',
     'Salão com ambiente totalmente acessível para pessoas com deficiência. Atendimento especial para TEA. Equipe treinada em inclusão. Estacionamento com vagas PCD.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=inclusivo', 'Rio de Janeiro', -22.9068, -43.1729, 4.9, true),
    
    ('33333333-3333-3333-3333-333333333333', 'salao.especializado@beleza.com', 'Salão Especializado em Cabelos Afro', 'salao', 'ativo',
     'Referência em cabelos afro e texturas naturais. Trabalho com produtos naturais e sem química agressiva. Consultoria de cabelos cacheados incluída.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=especializado', 'Belo Horizonte', -19.9167, -43.9345, 4.8, true),
    
    ('33333333-3333-3333-3333-333333333334', 'studio.belleza@beleza.com', 'Studio Belleza Profissional', 'salao', 'ativo',
     'Studio moderno com 6 estações de trabalho. Especializado em coloração, progressiva e tratamentos. Produtos premium exclusivos. Agendamento online facilitado.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=studio', 'Brasília', -15.8267, -47.8822, 4.7, true),
    
    ('33333333-3333-3333-3333-333333333335', 'salao.meu.jeito@beleza.com', 'Salão Meu Jeito', 'salao', 'ativo',
     'Salão aconchegante especializado em cortes modernos e penteados criativos. Atendimento familiar. Ótimo para casais e grupos. Promoções para clientes frequentes.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=meujeito', 'Salvador', -13.0044, -38.4609, 4.6, true);

-- ============================================================================
-- ESPECIALIDADES DOS PROFISSIONAIS
-- ============================================================================

-- Isabella Silva: Cabelos Afro + Ambiente Adaptado
DELETE FROM userservice.perfil_especialidades WHERE perfil_id = '22222222-2222-2222-2222-222222222221';
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222221', id FROM userservice.especialidades 
WHERE slug IN ('cabelos-afro', 'ambiente-adaptado');

-- Camila Santos: Químicas
DELETE FROM userservice.perfil_especialidades WHERE perfil_id = '22222222-2222-2222-2222-222222222228';
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222228', id FROM userservice.especialidades WHERE slug = 'quimicas';

-- Daniela Ferraz: Corte Infantil
DELETE FROM userservice.perfil_especialidades WHERE perfil_id = '22222222-2222-2222-2222-222222222229';
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222229', id FROM userservice.especialidades WHERE slug = 'corte-infantil';

-- Giovana Costa: Ambiente Adaptado
DELETE FROM userservice.perfil_especialidades WHERE perfil_id = '22222222-2222-2222-2222-222222222230';
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222230', id FROM userservice.especialidades WHERE slug = 'ambiente-adaptado';

-- Mariana Costa: Box Braids + Tranças
DELETE FROM userservice.perfil_especialidades WHERE perfil_id = '22222222-2222-2222-2222-222222222222';
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222222', id FROM userservice.especialidades WHERE slug IN ('box-braids', 'trancas');

-- Fernanda Oliveira: Cabelos Afro
DELETE FROM userservice.perfil_especialidades WHERE perfil_id = '22222222-2222-2222-2222-222222222231';
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222231', id FROM userservice.especialidades WHERE slug = 'cabelos-afro';

-- Stephanie Rocha: Cabelos Asiáticos
DELETE FROM userservice.perfil_especialidades WHERE perfil_id = '22222222-2222-2222-2222-222222222232';
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222232', id FROM userservice.especialidades WHERE slug = 'cabelos-asiaticos';

-- Carolina Rio: Quimicas
DELETE FROM userservice.perfil_especialidades WHERE perfil_id = '22222222-2222-2222-2222-222222222233';
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222233', id FROM userservice.especialidades WHERE slug = 'quimicas';

-- Beatriz Oliveira: Corte Infantil + Ambiente Adaptado
DELETE FROM userservice.perfil_especialidades WHERE perfil_id = '22222222-2222-2222-2222-222222222223';
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222223', id FROM userservice.especialidades WHERE slug IN ('corte-infantil', 'ambiente-adaptado');

-- Amanda BH: Cabelos Afro
DELETE FROM userservice.perfil_especialidades WHERE perfil_id = '22222222-2222-2222-2222-222222222234';
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222234', id FROM userservice.especialidades WHERE slug = 'cabelos-afro';

-- Leticia: Quimicas
DELETE FROM userservice.perfil_especialidades WHERE perfil_id = '22222222-2222-2222-2222-222222222235';
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222235', id FROM userservice.especialidades WHERE slug = 'quimicas';

-- Lucia Santos: Cabelos Asiáticos + Químicas
DELETE FROM userservice.perfil_especialidades WHERE perfil_id = '22222222-2222-2222-2222-222222222224';
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222224', id FROM userservice.especialidades WHERE slug IN ('cabelos-asiaticos', 'quimicas');

-- Patricia BSB: Atendimento TEA + Ambiente Adaptado
DELETE FROM userservice.perfil_especialidades WHERE perfil_id = '22222222-2222-2222-2222-222222222236';
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222236', id FROM userservice.especialidades WHERE slug IN ('atendimento-tea', 'ambiente-adaptado');

-- Patricia Ferreira: Atendimento TEA + Ambiente Adaptado
DELETE FROM userservice.perfil_especialidades WHERE perfil_id = '22222222-2222-2222-2222-222222222225';
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222225', id FROM userservice.especialidades WHERE slug IN ('atendimento-tea', 'ambiente-adaptado');

-- Conceição: Cabelos Afro + Box Braids + Tranças
DELETE FROM userservice.perfil_especialidades WHERE perfil_id = '22222222-2222-2222-2222-222222222237';
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222237', id FROM userservice.especialidades WHERE slug IN ('cabelos-afro', 'box-braids', 'trancas');

-- Carolina Sousa: Químicas
DELETE FROM userservice.perfil_especialidades WHERE perfil_id = '22222222-2222-2222-2222-222222222226';
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222226', id FROM userservice.especialidades WHERE slug = 'quimicas';

-- Amanda Rocha: Cabelos Afro + Químicas
DELETE FROM userservice.perfil_especialidades WHERE perfil_id = '22222222-2222-2222-2222-222222222227';
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222227', id FROM userservice.especialidades WHERE slug IN ('cabelos-afro', 'quimicas');

-- SALÕES: Todas especialidades
DELETE FROM userservice.perfil_especialidades WHERE perfil_id IN ('33333333-3333-3333-3333-333333333331', '33333333-3333-3333-3333-333333333332', '33333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333334', '33333333-3333-3333-3333-333333333335');
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT p.id, e.id FROM userservice.perfis p, userservice.especialidades e
WHERE p.tipo = 'salao';

COMMIT;
