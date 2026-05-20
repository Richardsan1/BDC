-- Seed de serviços oferecidos pelos profissionais

-- Isabella Silva - Serviços em Cabelos Afro
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222221', 'Lavagem Profunda', 'Lavagem e hidratação profunda para cabelos afro', 60, 80.00),
    ('22222222-2222-2222-2222-222222222221', 'Penteado Afro', 'Penteado estilo afro com finalização profissional', 90, 120.00),
    ('22222222-2222-2222-2222-222222222221', 'Tratamento Reconstrutor', 'Reconstrução capilar completa', 120, 150.00),
    ('22222222-2222-2222-2222-222222222221', 'Consulta de Cuidados', 'Consulta personalizada de rotina de cuidados', 30, 50.00);

-- Mariana Costa - Serviços em Tranças
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222222', 'Box Braids Médias', 'Box braids em tamanho médio', 240, 250.00),
    ('22222222-2222-2222-2222-222222222222', 'Box Braids Grandes', 'Box braids em tamanho grande', 180, 200.00),
    ('22222222-2222-2222-2222-222222222222', 'Penteado em Tranças', 'Criação de penteados em tranças', 120, 150.00),
    ('22222222-2222-2222-2222-222222222222', 'Remoção de Tranças', 'Remoção cuidadosa de tranças', 90, 80.00);

-- Beatriz Oliveira - Serviços Infantis
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222223', 'Corte Infantil', 'Corte estilo infantil com ambiente divertido', 45, 60.00),
    ('22222222-2222-2222-2222-222222222223', 'Penteado Infantil', 'Penteados divertidos para crianças', 30, 45.00),
    ('22222222-2222-2222-2222-222222222223', 'Tratamento Infantil', 'Tratamento capilar seguro para crianças', 45, 55.00),
    ('22222222-2222-2222-2222-222222222223', 'Pacote Mensal Infantil', 'Corte e penteado uma vez por mês', 30, 150.00);

-- Lucia Santos - Serviços em Cabelos Asiáticos
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222224', 'Alisamento Japonês', 'Alisamento duradouro com método japonês', 180, 320.00),
    ('22222222-2222-2222-2222-222222222224', 'Permanente', 'Permanente para cabelos asiáticos', 150, 200.00),
    ('22222222-2222-2222-2222-222222222224', 'Coloração Profissional', 'Coloração com produtos premium', 90, 150.00),
    ('22222222-2222-2222-2222-222222222224', 'Tratamento Capilar', 'Tratamento hidratante especializado', 60, 100.00);

-- Patricia Ferreira - Atendimento TEA
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222225', 'Corte TEA', 'Corte com adaptação sensorial para autistas', 45, 90.00),
    ('22222222-2222-2222-2222-222222222225', 'Penteado TEA', 'Penteado com metodologia inclusiva', 30, 70.00),
    ('22222222-2222-2222-2222-222222222225', 'Sessão Tranquila', 'Sessão prolongada sem pressão de tempo', 90, 140.00),
    ('22222222-2222-2222-2222-222222222225', 'Atendimento com Acompanhante', 'Atendimento permitindo acompanhante', 60, 100.00);

-- Carolina Sousa - Serviços de Química
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222226', 'Alisamento Progressivo', 'Alisamento progressivo com fórmula premium', 120, 180.00),
    ('22222222-2222-2222-2222-222222222226', 'Botox Capilar', 'Botox para reparo e brilho', 90, 140.00),
    ('22222222-2222-2222-2222-222222222226', 'Coloração + Hidratação', 'Coloração profissional com hidratação', 120, 200.00),
    ('22222222-2222-2222-2222-222222222226', 'Ombré Hair', 'Efeito ombré com degradê de cores', 150, 250.00);

-- Amanda Rocha - Serviços de Reconstrução
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222227', 'Reconstrução Capilar', 'Reconstrução completa com proteína', 120, 160.00),
    ('22222222-2222-2222-2222-222222222227', 'Hidratação Profunda', 'Hidratação intensiva para cabelos danificados', 90, 120.00),
    ('22222222-2222-2222-2222-222222222227', 'Cronograma Capilar', 'Cronograma personalizado (consulta)', 30, 40.00),
    ('22222222-2222-2222-2222-222222222227', 'Pacote 3 Sessões', 'Reconstrução + Hidratação (3 sessões)', 90, 350.00);
