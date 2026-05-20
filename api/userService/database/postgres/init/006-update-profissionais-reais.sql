-- ============================================================================
-- ATUALIZAR PROFISSIONAIS COM DADOS REAIS DAS IMAGENS
-- ============================================================================

-- Limpar dados anteriores e inserir com dados reais
DELETE FROM userservice.perfis WHERE id IN (
  '22222222-2222-2222-2222-222222222221',
  '22222222-2222-2222-2222-222222222222',
  '22222222-2222-2222-2222-222222222223',
  '22222222-2222-2222-2222-222222222224',
  '22222222-2222-2222-2222-222222222225',
  '22222222-2222-2222-2222-222222222226',
  '22222222-2222-2222-2222-222222222227',
  '22222222-2222-2222-2222-222222222236',
  '22222222-2222-2222-2222-222222222237'
);

-- Reinserir com dados reais baseado nas imagens
INSERT INTO userservice.perfis (id, email, nome, tipo, status, bio, foto_url, cidade, latitude, longitude, avaliacao_media, ativo)
VALUES
    -- Ana Beatriz - São Paulo
    ('22222222-2222-2222-2222-222222222221', 'ana.beatriz@beleza.com', 'Ana Beatriz', 'profissional', 'ativo',
     'Especialista em Cabelos Afro e Atendimento TEA. Profissional com mais de 10 anos de experiência. Espaço acolhedor com ambiente calmo, durante do suave e tones de proteção auditiva disponíveis.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=ana', 'Sao Paulo', -23.5505, -46.6333, 4.9, true),

    -- Carlos Tanaka - São Paulo
    ('22222222-2222-2222-2222-222222222222', 'carlos.tanaka@beleza.com', 'Carlos Tanaka', 'profissional', 'ativo',
     'Especialista em Cabelos Asiáticos com mais de 8 anos de experiência em alisamento japonês e coreano. Oferece consultoria e reconstrução capilar profissional.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos', 'Sao Paulo', -23.5547, -46.6597, 4.8, true),

    -- Mariana Silva - São Paulo
    ('22222222-2222-2222-2222-222222222223', 'mariana.silva@beleza.com', 'Mariana Silva', 'profissional', 'ativo',
     'Profissional com atendimento inclusivo especializado em TEA. Ambiente totalmente adaptado com técnicas de relaxamento e paciência. Trabalho com crianças e adultos com deficiência.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=mariana', 'Sao Paulo', -23.5505, -46.6333, 5.0, true),

    -- Isabella Silva - São Paulo
    ('22222222-2222-2222-2222-222222222224', 'isabella.silva@beleza.com', 'Isabella Silva', 'profissional', 'ativo',
     'Cabeleireira especializada em cabelos afro com mais de 12 anos de experiência. Oferecimento completo de serviços desde cortes modernos até tranças refinadas e hidratação profunda.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=isabella', 'Sao Paulo', -23.5505, -46.6333, 4.8, true),

    -- Patricia Ferreira - São Paulo
    ('22222222-2222-2222-2222-222222222225', 'patricia.ferreira@beleza.com', 'Patricia Ferreira', 'profissional', 'ativo',
     'Ambiente totalmente acessível com atendimento especial para pessoas com TEA. Técnicas de relaxamento, profissional muito paciente e dedicada com crianças e adultos.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=patricia', 'Sao Paulo', -23.5505, -46.6333, 4.9, true),

    -- Camila Rodrigues - São Paulo
    ('22222222-2222-2222-2222-222222222226', 'camila.rodrigues@beleza.com', 'Camila Rodrigues', 'profissional', 'ativo',
     'Box Braids specialist com 7 anos de experiência. Trabalho com técnicas modernas de proteção capilar. Especialista em estilo afro natural e tranças decorativas.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=camila', 'Sao Paulo', -23.5505, -46.6333, 4.7, true),

    -- Lucas Pereira - São Paulo
    ('22222222-2222-2222-2222-222222222227', 'lucas.pereira@beleza.com', 'Lucas Pereira', 'profissional', 'ativo',
     'Cabeleireiro clássico com foco em cortes modernos e bem definidos. Atendimento atencioso e precisão em cada corte. Especialista em cabelo ondulado e texturizado.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=lucas', 'Sao Paulo', -23.5505, -46.6333, 4.8, true),

    -- Patricia Machado - Brasília
    ('22222222-2222-2222-2222-222222222236', 'patricia.machado@beleza.com', 'Patricia Machado', 'profissional', 'ativo',
     'Cabeleireira diplomada com especialização em tricologia. Atendo casos especiais de cabelo danificado, com queda ou muito sensível. Tratamentos reparadores de qualidade premium.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=patricia', 'Brasilia', -15.8267, -47.8822, 4.8, true),

    -- Conceição Santos - Salvador
    ('22222222-2222-2222-2222-222222222237', 'conceicao.santos@beleza.com', 'Conceição Santos', 'profissional', 'ativo',
     'Especialista em penteados afro, bantu knots e penteados étnicos. Trabalho com raízes e força do cabelo natural. Referência em estilo afro natural e cultural.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=conceicao', 'Salvador', -13.0044, -38.4609, 4.7, true);

-- ============================================================================
-- ATUALIZAR SALÕES COM DADOS REAIS
-- ============================================================================

DELETE FROM userservice.perfis WHERE id IN (
  '33333333-3333-3333-3333-333333333331',
  '33333333-3333-3333-3333-333333333332',
  '33333333-3333-3333-3333-333333333333',
  '33333333-3333-3333-3333-333333333334',
  '33333333-3333-3333-3333-333333333335'
);

INSERT INTO userservice.perfis (id, email, nome, tipo, status, bio, foto_url, cidade, latitude, longitude, avaliacao_media, ativo)
VALUES
    -- Salão Raizes - São Paulo
    ('33333333-3333-3333-3333-333333333331', 'salao.raizes@beleza.com', 'Salao Raizes', 'salao', 'ativo',
     'Salão Especializado em Cabelos Afro com referência em estilos naturais. Equipe altamente treinada em cuidados com cabelos texturizados e étnicos. Trabalho com produtos naturais.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=raizes', 'Sao Paulo', -23.5656, -46.6605, 4.7, true),

    -- Salão Premium Beauty - São Paulo
    ('33333333-3333-3333-3333-333333333332', 'salao.premium@beleza.com', 'Salao Premium Beauty', 'salao', 'ativo',
     'Salão de luxo completo com equipe especializada em todos os tipos de cabelo. Atendimento personalizado, consultoria de imagem. Ambiente climatizado e totalmente acessível.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=premium', 'Sao Paulo', -23.5505, -46.6333, 4.8, true),

    -- Salão Beleza Inclusiva - São Paulo
    ('33333333-3333-3333-3333-333333333333', 'salao.inclusivo@beleza.com', 'Salao Beleza Inclusiva', 'salao', 'ativo',
     'Salão com ambiente totalmente acessível para pessoas com deficiência e atendimento especial para TEA. Equipe treinada em inclusão. Estacionamento com vagas PCD.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=inclusivo', 'Sao Paulo', -23.5505, -46.6333, 4.9, true),

    -- Studio Belleza Profissional - São Paulo
    ('33333333-3333-3333-3333-333333333334', 'studio.belleza@beleza.com', 'Studio Belleza Profissional', 'salao', 'ativo',
     'Studio moderno com 6 estações de trabalho. Especializado em coloração, progressiva e tratamentos reparadores. Produtos premium exclusivos. Agendamento online facilitado.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=studio', 'Sao Paulo', -23.5505, -46.6333, 4.7, true),

    -- Salão Meu Jeito - São Paulo
    ('33333333-3333-3333-3333-333333333335', 'salao.meu.jeito@beleza.com', 'Salao Meu Jeito', 'salao', 'ativo',
     'Salão aconchegante especializado em cortes modernos e penteados criativos. Atendimento familiar e caloroso. Ótimo para casais e grupos. Promoções para clientes frequentes.',
     'https://api.dicebear.com/7.x/avataaars/svg?seed=meujeito', 'Sao Paulo', -23.5505, -46.6333, 4.6, true);

-- ============================================================================
-- ATUALIZAR SERVIÇOS REAIS PARA ANA BEATRIZ
-- ============================================================================

DELETE FROM userservice.servicos WHERE perfil_id = '22222222-2222-2222-2222-222222222221';

INSERT INTO userservice.servicos (id, perfil_id, nome, descricao, duracao_minutos, preco, ativo)
VALUES
    (gen_random_uuid(), '22222222-2222-2222-2222-222222222221', 'Corte Afro Feminino', 'Corte moderno para cabelos afro com técnicas que protegem a fibra. Inclui finalização com óleos profissionais.', 45, 80.00, true),
    (gen_random_uuid(), '22222222-2222-2222-2222-222222222221', 'Box Braids Pequenas', 'Box braids em diversos tamanhos. Perfeito para proteção capilar. Duram até 8 semanas.', 180, 250.00, true),
    (gen_random_uuid(), '22222222-2222-2222-2222-222222222221', 'Tranças Nagô', 'Tranças tradicionais nagô com design moderno. Ideal para todas as idades. Duram até 2 semanas.', 120, 180.00, true),
    (gen_random_uuid(), '22222222-2222-2222-2222-222222222221', 'Hidratação Profunda', 'Tratamento profundo com produtos premium para recuperação capilar. Recomendado a cada 15 dias.', 60, 120.00, true),
    (gen_random_uuid(), '22222222-2222-2222-2222-222222222221', 'Corte Infantil Inclusivo com TEA', 'Corte especial com protocolos de inclusão para crianças com TEA. Ambiente calmo com fones de proteção.', 60, 100.00, true);

-- ============================================================================
-- ATUALIZAR ESPECIALIDADES PARA OS NOVOS PROFISSIONAIS
-- ============================================================================

-- Limpar antigas relações
DELETE FROM userservice.perfil_especialidades 
WHERE perfil_id IN ('22222222-2222-2222-2222-222222222221', '22222222-2222-2222-2222-222222222222',
                     '22222222-2222-2222-2222-222222222223', '22222222-2222-2222-2222-222222222224',
                     '22222222-2222-2222-2222-222222222225', '22222222-2222-2222-2222-222222222226',
                     '22222222-2222-2222-2222-222222222227', '22222222-2222-2222-2222-222222222236',
                     '22222222-2222-2222-2222-222222222237',
                     '33333333-3333-3333-3333-333333333331', '33333333-3333-3333-3333-333333333332',
                     '33333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333334',
                     '33333333-3333-3333-3333-333333333335');

-- Associar especialidades para Ana Beatriz
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222221', id FROM userservice.especialidades WHERE nome IN ('Cabelos Afro', 'Atendimento TEA');

-- Associar especialidades para Carlos Tanaka
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222222', id FROM userservice.especialidades WHERE nome IN ('Cabelos Asiáticos', 'Químicas');

-- Associar especialidades para Mariana Silva
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222223', id FROM userservice.especialidades WHERE nome IN ('Corte Infantil', 'Atendimento TEA');

-- Associar especialidades para Isabella Silva
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222224', id FROM userservice.especialidades WHERE nome IN ('Cabelos Afro', 'Tranças');

-- Associar especialidades para Patricia Ferreira
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222225', id FROM userservice.especialidades WHERE nome IN ('Atendimento TEA', 'Ambiente Adaptado');

-- Associar especialidades para Camila Rodrigues
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222226', id FROM userservice.especialidades WHERE nome IN ('Box Braids', 'Cabelos Afro');

-- Associar especialidades para Lucas Pereira
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222227', id FROM userservice.especialidades WHERE nome IN ('Corte Infantil', 'Ambiente Adaptado');

-- Associar especialidades para Patricia Machado
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222236', id FROM userservice.especialidades WHERE nome IN ('Químicas', 'Cabelos Asiáticos');

-- Associar especialidades para Conceição Santos
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '22222222-2222-2222-2222-222222222237', id FROM userservice.especialidades WHERE nome IN ('Cabelos Afro', 'Tranças');

-- Associar especialidades para Salão Raizes
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '33333333-3333-3333-3333-333333333331', id FROM userservice.especialidades WHERE nome IN ('Cabelos Afro', 'Químicas');

-- Associar especialidades para Salão Premium Beauty
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '33333333-3333-3333-3333-333333333332', id FROM userservice.especialidades WHERE nome IN ('Cabelos Afro', 'Cabelos Asiáticos', 'Químicas');

-- Associar especialidades para Salão Beleza Inclusiva
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '33333333-3333-3333-3333-333333333333', id FROM userservice.especialidades WHERE nome IN ('Atendimento TEA', 'Ambiente Adaptado');

-- Associar especialidades para Studio Belleza
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '33333333-3333-3333-3333-333333333334', id FROM userservice.especialidades WHERE nome IN ('Químicas', 'Cabelos Asiáticos', 'Corte Infantil');

-- Associar especialidades para Salão Meu Jeito
INSERT INTO userservice.perfil_especialidades (perfil_id, especialidade_id)
SELECT '33333333-3333-3333-3333-333333333335', id FROM userservice.especialidades WHERE nome IN ('Corte Infantil', 'Cabelos Afro');
