-- ============================================================================
-- SERVIÇOS COMPLETOS: Cada profissional com serviços variados
-- ============================================================================

-- Limpar serviços antigos
DELETE FROM userservice.servicos;

-- ============================================================================
-- Isabella Silva - Serviços em Cabelos Afro
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222221', 'Consulta Inicial', 'Analise do seu cabelo e levantamento de necessidades. Recomendacoes de rotina de cuidados personalizada.', 30, 50.00),
    ('22222222-2222-2222-2222-222222222221', 'Lavagem Profunda', 'Lavagem com produtos especificos para afro + hidratacao profunda + finalizacao.', 60, 85.00),
    ('22222222-2222-2222-2222-222222222221', 'Penteado Afro', 'Penteado estilo afro com finalizacao profissional e longevidade de 7-10 dias.', 90, 130.00),
    ('22222222-2222-2222-2222-222222222221', 'Tratamento Reconstrutor', 'Reconstrucao capilar completa com proteina de queratina. Deixa cabelo hidratado e brilhoso.', 120, 160.00),
    ('22222222-2222-2222-2222-222222222221', 'Twist Out', 'Tecnica de penteado duravel com twists. Mantem ate 2 semanas com cuidado adequado.', 120, 140.00),
    ('22222222-2222-2222-2222-222222222221', 'Cronograma Capilar', 'Cronograma personalizado (3 meses) com hidratacao, nutricao e reconstrucao.', 30, 60.00),
    ('22222222-2222-2222-2222-222222222221', 'Pacote Mensal Afro', 'Lavagem profunda + penteado + tratamento (4x ao mes). Melhor valor!', 90, 450.00);

-- ============================================================================
-- Camila Santos - Serviços de Coloração e Química
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222228', 'Coloracao Permanente', 'Coloracao permanente com produtos Schwarzkopf. Cobertura total de fios brancos.', 120, 180.00),
    ('22222222-2222-2222-2222-222222222228', 'Balayage', 'Coloracao em degrade para um efeito natural e descontraido. Efeito degrade pincelado.', 150, 280.00),
    ('22222222-2222-2222-2222-222222222228', 'Ombre Hair', 'Efeito ombre com cores vibrantes. Tendencia 2024! Perfeito para cabelos longos.', 180, 320.00),
    ('22222222-2222-2222-2222-222222222228', 'Botox Capilar', 'Botox para reparo, brilho e maciez. Deixa cabelo lindo e mais facil de pentear.', 90, 140.00),
    ('22222222-2222-2222-2222-222222222228', 'Alisamento Progressivo', 'Alisamento progressivo com formula neutra. Sem formol! Resultado duravel ate 2 meses.', 150, 220.00),
    ('22222222-2222-2222-2222-222222222228', 'Coloracao + Hidratacao', 'Coloracao + hidratacao na mesma sessao. Cabelo protegido desde o toque.', 150, 250.00),
    ('22222222-2222-2222-2222-222222222228', 'Refil de Raiz', 'Coloracao apenas na raiz. Perfeito para manutencao mensal. Economico!', 90, 120.00),
    ('22222222-2222-2222-2222-222222222228', 'Tonalizante', 'Tonalizante semipermanente para dar brilho e ajustar tom. Dura ate 15 dias.', 60, 80.00);

-- ============================================================================
-- Daniela Ferraz - Serviços de Corte Moderno
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222229', 'Corte Geometrico', 'Corte moderno com linhas geometricas. Personalizado conforme seu rosto.', 60, 95.00),
    ('22222222-2222-2222-2222-222222222229', 'Corte com Finalizacao', 'Corte + penteado e finalizacao profissional. Saiba como pentear em casa!', 90, 140.00),
    ('22222222-2222-2222-2222-222222222229', 'Corte + Coloracao', 'Corte + coloracao na mesma sessao. Transformacao completa!', 150, 260.00),
    ('22222222-2222-2222-2222-222222222229', 'Consultoria de Imagem', 'Consultoria completa de corte, cor e estilo. Sessao de 1h com recomendacoes.', 60, 180.00),
    ('22222222-2222-2222-2222-222222222229', 'Corte Masculino', 'Corte masculino moderno com maquina e tesoura. Acabamento impecavel.', 30, 60.00),
    ('22222222-2222-2222-2222-222222222229', 'Corte + Barba', 'Corte completo + design de barba. Saida impecavel!', 45, 100.00);

-- ============================================================================
-- Giovana Costa - Serviços de Noivas e Eventos
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222230', 'Penteado Noiva', 'Penteado e maquiagem para seu grande dia. Prova com ate 2 semanas antes.', 120, 350.00),
    ('22222222-2222-2222-2222-222222222230', 'Penteado + Maquiagem Noiva', 'Pacote completo: penteado + maquiagem profissional. Impecavel do inicio ao fim!', 180, 550.00),
    ('22222222-2222-2222-2222-222222222230', 'Penteados Grupo (Amigas da Noiva)', 'Penteado para ate 5 amigas da noiva. Aproveita bem o tempo e economia.', 120, 280.00),
    ('22222222-2222-2222-2222-222222222230', 'Penteado para Formatura', 'Penteado elegante para seu formando. Fotos impecaveis garantidas!', 90, 200.00),
    ('22222222-2222-2222-2222-222222222230', 'Penteado para Festa', 'Penteado sofisticado para qualquer evento. Alto impacto visual!', 90, 150.00),
    ('22222222-2222-2222-2222-222222222230', 'Prova de Penteado', 'Sessao de prova com sugestoes de diferentes estilos. Melhor escolher antes!', 60, 100.00);

-- ============================================================================
-- Mariana Costa - Serviços de Tranças
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222222', 'Box Braids Pequenas', 'Box braids em tamanho pequeno com durabilidade de ate 8 semanas.', 300, 350.00),
    ('22222222-2222-2222-2222-222222222222', 'Box Braids Medias', 'Box braids em tamanho medio. A mais popular! Dura 6-8 semanas.', 240, 280.00),
    ('22222222-2222-2222-2222-222222222222', 'Box Braids Grandes', 'Box braids em tamanho grande. Rapido de fazer e muito estiloso!', 180, 220.00),
    ('22222222-2222-2222-2222-222222222222', 'Penteado em Trancas', 'Criacao de penteados em trancas para eventos. Super elegante!', 120, 160.00),
    ('22222222-2222-2222-2222-222222222222', 'Remocao de Trancas', 'Remocao cuidadosa de trancas sem danificar o cabelo. Tratamento no final.', 90, 100.00),
    ('22222222-2222-2222-2222-222222222222', 'Manutencao de Trancas', 'Retoque (enraizamento) durante o periodo de uso. Mantem as trancas bonitas!', 120, 150.00),
    ('22222222-2222-2222-2222-222222222222', 'Senegalese Twist', 'Tecnica de torcidas senegalesas. Rapidas e super trendy!', 180, 200.00),
    ('22222222-2222-2222-2222-222222222222', 'Faux Locs', 'Trancas falsas tipo locs. Protetor para seu cabelo natural.', 240, 300.00);

-- ============================================================================
-- Fernanda Oliveira - Serviços de Tricologia
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222231', 'Consulta Tricologica', 'Avaliacao completa do couro cabeludo e fios. Diagnostico e recomendacoes.', 60, 150.00),
    ('22222222-2222-2222-2222-222222222231', 'Analise Capilar + Tratamento', 'Analise microscopica + tratamento personalizado para sua necessidade.', 90, 200.00),
    ('22222222-2222-2222-2222-222222222231', 'Tratamento para Queda', 'Tratamento especifico para alopecia e queda de cabelo. Com formula anti-inflamatoria.', 60, 120.00),
    ('22222222-2222-2222-2222-222222222231', 'Limpeza de Couro Cabeludo', 'Limpeza profunda removendo residuos de produto e oleosidade. Alivio garantido!', 45, 80.00),
    ('22222222-2222-2222-2222-222222222231', 'Pacote Alopecia (4 sessoes)', 'Programa de 4 sessoes para combater queda e fortalecer cabelo.', 60, 420.00),
    ('22222222-2222-2222-2222-222222222231', 'Consultoria Nutricional', 'Recomendacoes de suplementacao e alimentacao para saude capilar.', 30, 100.00);

-- ============================================================================
-- Stephanie Rocha - Serviços de Extensão
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222232', 'Extensao Micro Links', 'Extensao com micro links. Acabamento natural e resistente. Dura ate 4 meses.', 180, 600.00),
    ('22222222-2222-2222-2222-222222222232', 'Mega Hair Fita', 'Extensao em fita adesiva. Rapida de colocar e remove facilmente.', 120, 350.00),
    ('22222222-2222-2222-2222-222222222232', 'Manutencao de Extensao', 'Limpeza e retoque de extensao. Mantem sempre linda!', 90, 150.00),
    ('22222222-2222-2222-2222-222222222232', 'Remocao de Extensao', 'Remocao cuidadosa e tratamento reconstituinte para seu cabelo natural.', 60, 120.00),
    ('22222222-2222-2222-2222-222222222232', 'Tratamento Fio Natural + Extensao', 'Hidratacao profunda para seu cabelo natural e a extensao colocada.', 120, 200.00),
    ('22222222-2222-2222-2222-222222222232', 'Extensao Completa + Corte', 'Colocacao de extensao + corte e finalizacao. Saida pronta para usar!', 180, 700.00);

-- ============================================================================
-- Carolina Rio - Serviços de Noivas
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222233', 'Penteado Festa Elegante', 'Penteado sofisticado para festas e eventos especiais.', 90, 180.00),
    ('22222222-2222-2222-2222-222222222233', 'Penteado Amigas Nupcial', 'Pacote para grupo de amigas da noiva com descontos especiais.', 90, 150.00),
    ('22222222-2222-2222-2222-222222222233', 'Penteado + Ajuste Tiara/Veu', 'Penteado perfeito com sua tiara ou veu. Prova incluida!', 90, 220.00),
    ('22222222-2222-2222-2222-222222222233', 'Teste de Penteado Noiva', 'Sessao de teste com multiplas opcoes de penteado para seu grande dia.', 60, 120.00),
    ('22222222-2222-2222-2222-222222222233', 'Maquiagem + Penteado', 'Maquiagem profissional + penteado no dia do evento. Impecavel do inicio ao fim!', 120, 350.00);

-- ============================================================================
-- Beatriz Oliveira - Serviços Infantis
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222223', 'Corte Infantil', 'Corte divertido para criancas com ambiente ludico. Sem trauma!', 45, 65.00),
    ('22222222-2222-2222-2222-222222222223', 'Penteado Infantil', 'Penteados criativos e divertidos para meninas. Instagram-ready!', 30, 50.00),
    ('22222222-2222-2222-2222-222222222223', 'Corte + Penteado Infantil', 'Corte + penteado completo para saida especial das criancas.', 60, 100.00),
    ('22222222-2222-2222-2222-222222222223', 'Tratamento Infantil Suave', 'Tratamento capilar seguro e suave para criancas com cabelo delicado.', 45, 55.00),
    ('22222222-2222-2222-2222-222222222223', 'Pacote Mensal Infantil', 'Corte + penteado uma vez por mes. Melhor preco para criancas!', 45, 180.00),
    ('22222222-2222-2222-2222-222222222223', 'Corte Festa Infantil', 'Corte especial para festas e eventos das criancas.', 45, 70.00);

-- ============================================================================
-- Amanda BH - Serviços de Reconstrução
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222234', 'Reconstrucao Capilar', 'Reconstrucao completa com proteina especial. Cabelo novo de verdade!', 120, 170.00),
    ('22222222-2222-2222-2222-222222222234', 'Hidratacao Profunda', 'Hidratacao intensiva para cabelos muito danificados. Maciez garantida!', 90, 130.00),
    ('22222222-2222-2222-2222-222222222234', 'Cronograma Capilar (3 meses)', 'Programa completo: hidratacao, nutricao, reconstrucao (1x ao mes).', 120, 420.00),
    ('22222222-2222-2222-2222-222222222234', 'Blindagem Capilar', 'Protecao total com selagem de cuticulas. Cabelo brilhoso e protegido!', 60, 100.00),
    ('22222222-2222-2222-2222-222222222234', 'Tratamento Proteina Queratina', 'Tratamento com queratina brasileira. Resultado liso e brilhante.', 120, 150.00),
    ('22222222-2222-2222-2222-222222222234', 'Consulta de Diagnostico', 'Analise do estado do seu cabelo e recomendacao de tratamento.', 30, 50.00);

-- ============================================================================
-- Leticia BH - Serviços de Design Capilar
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222235', 'Progressiva Classica', 'Progressiva tradicional. Cabelo liso impecavel por ate 3 meses!', 120, 200.00),
    ('22222222-2222-2222-2222-222222222235', 'Progressiva Premium', 'Progressiva com produtos importados. Extra brilho e maciez!', 150, 280.00),
    ('22222222-2222-2222-2222-222222222235', 'Botox Capilar', 'Botox para brilho, maciez e definicao. Cabelo revigorado!', 90, 150.00),
    ('22222222-2222-2222-2222-222222222235', 'Hidratacao + Progressiva', 'Hidratacao + progressiva na mesma sessao. Cabelo protegido!', 180, 320.00),
    ('22222222-2222-2222-2222-222222222235', 'Manutencao Progressiva', 'Retoque apenas na raiz. Mantem seu cabelo lindo por mais tempo!', 90, 140.00),
    ('22222222-2222-2222-2222-222222222235', 'Ondulacao Permanente', 'Permanente para cabelo liso. Ondas duradouras e naturais!', 120, 180.00);

-- ============================================================================
-- Lucia Santos - Serviços Asiáticos
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222224', 'Alisamento Japones', 'Alisamento duravel com metodo japones. Ate 4 meses de resultado!', 180, 380.00),
    ('22222222-2222-2222-2222-222222222224', 'Alisamento Coreano', 'Alisamento do metodo coreano. Mais suave e com vitaminas!', 180, 350.00),
    ('22222222-2222-2222-2222-222222222224', 'Alisamento Brasileiro', 'Alisamento brasileiro progressivo. Melhor custo-beneficio!', 150, 250.00),
    ('22222222-2222-2222-2222-222222222224', 'Permanente Asiatica', 'Permanente para cabelos asiaticos. Ondas perfeitas e duradouras!', 150, 220.00),
    ('22222222-2222-2222-2222-222222222224', 'Coloracao Profissional', 'Coloracao com produtos premium para cabelos asiaticos.', 90, 160.00),
    ('22222222-2222-2222-2222-222222222224', 'Tratamento + Alisamento', 'Tratamento de hidratacao + alisamento na mesma sessao.', 180, 400.00),
    ('22222222-2222-2222-2222-222222222224', 'Manutencao de Alisamento', 'Retoque de raiz com produto adequado para asiaticos.', 120, 200.00);

-- ============================================================================
-- Patricia BSB - Serviços com TEA
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222236', 'Corte TEA', 'Corte com adaptacao sensorial para autistas. Sem pressa ou pressao!', 60, 110.00),
    ('22222222-2222-2222-2222-222222222236', 'Penteado TEA', 'Penteado com metodologia inclusiva e adaptada.', 45, 90.00),
    ('22222222-2222-2222-2222-222222222236', 'Sessao Tranquila Prolongada', 'Sessao sem cronometro. Voce determina o ritmo!', 90, 160.00),
    ('22222222-2222-2222-2222-222222222236', 'Atendimento com Acompanhante', 'Atendimento permitindo presenca de acompanhante. Total inclusao!', 60, 130.00),
    ('22222222-2222-2222-2222-222222222236', 'Tratamento Sensorial', 'Tratamento adaptado para sensibilidades de quem tem TEA.', 45, 80.00),
    ('22222222-2222-2222-2222-222222222236', 'Pacote Mensal TEA', 'Atendimento mensal com toda a adaptacao necessaria.', 60, 400.00);

-- ============================================================================
-- Patricia Ferreira Salvador - Serviços com TEA/Inclusivos
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222225', 'Corte Inclusivo', 'Corte com total respeito a sua necessidade de conforto e adaptacao.', 60, 100.00),
    ('22222222-2222-2222-2222-222222222225', 'Atendimento PCD', 'Atendimento especial para pessoas com deficiencia. Ambiente acessivel!', 60, 120.00),
    ('22222222-2222-2222-2222-222222222225', 'Sessao Sem Pressa', 'Voce nao tem pressa? Nos tambem nao! Descontraido e aconchegante.', 90, 140.00),
    ('22222222-2222-2222-2222-222222222225', 'Corte + Penteado Inclusivo', 'Corte completo + penteado com todo carinho e inclusao.', 90, 160.00),
    ('22222222-2222-2222-2222-222222222225', 'Hidratacao Capilar', 'Hidratacao profunda para deixar seu cabelo maravilhoso!', 60, 90.00),
    ('22222222-2222-2222-2222-222222222225', 'Tratamento Relaxante', 'Atendimento relaxante onde voce e prioridade! Zen demais!', 90, 150.00);

-- ============================================================================
-- Conceição Salvador - Serviços Afro
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222237', 'Box Braids com Fio', 'Box braids com fio de alta qualidade. Perfeicao! Ate 8 semanas.', 240, 300.00),
    ('22222222-2222-2222-2222-222222222237', 'Bantu Knots', 'Penteado afro Bantu Knots. Super trendy e protetor!', 120, 140.00),
    ('22222222-2222-2222-2222-222222222237', 'Penteado Afro Natural', 'Penteado afro com seu cabelo natural. Raizes, forca e beleza!', 90, 110.00),
    ('22222222-2222-2222-2222-222222222237', 'Twists Naturais', 'Twists com seu cabelo natural. Duravel e muito lindo!', 120, 130.00),
    ('22222222-2222-2222-2222-222222222237', 'Corte Afro Natural', 'Corte respeitando sua textura natural. Transicao capilar com qualidade!', 60, 100.00),
    ('22222222-2222-2222-2222-222222222237', 'Consultoria Cabelo Afro', 'Recomendacoes para cuidar de cabelos afros e cacheados.', 30, 50.00);

-- ============================================================================
-- Carolina Sousa Curitiba - Serviços Coloração
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222226', 'Coloracao Extrema', 'Cores vibrantes e criativas (verde, rosa, azul, roxo). Personalidade pura!', 150, 350.00),
    ('22222222-2222-2222-2222-222222222226', 'Descoloracao', 'Descoloracao profissional preparando seu cabelo para cores novas.', 120, 200.00),
    ('22222222-2222-2222-2222-222222222226', 'Coloracao Fantasista', 'Cores fantasia temporarias para dias especiais. Sem danificar!', 90, 120.00),
    ('22222222-2222-2222-2222-222222222226', 'Manutencao de Cor', 'Retoques e refresco de cor para mante-la sempre vibrante!', 90, 140.00),
    ('22222222-2222-2222-2222-222222222226', 'Mechas Criativas', 'Mechas coloridas criativas em padroes unicos. Expressao pura!', 150, 280.00),
    ('22222222-2222-2222-2222-222222222226', 'Consultoria de Cor', 'Escolha de cor que combina com seu tom de pele e estilo.', 60, 100.00);

-- ============================================================================
-- Amanda Rocha Porto Alegre - Serviços Reconstrução
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222227', 'Reconstrucao Completa', 'Reconstrucao capilar profunda para fios muito danificados.', 120, 180.00),
    ('22222222-2222-2222-2222-222222222227', 'Cronograma Personalizado', 'Cronograma adaptado a sua necessidade (3 ou 6 meses).', 120, 480.00),
    ('22222222-2222-2222-2222-222222222227', 'Hidratacao Intensiva', 'Hidratacao profunda deixando cabelo sedoso e brilhante!', 90, 140.00),
    ('22222222-2222-2222-2222-222222222227', 'Tratamento Capilar + Corte', 'Tratamento + corte estruturado para renovar o visual!', 120, 220.00),
    ('22222222-2222-2222-2222-222222222227', 'Consulta Capilar', 'Analise do seu cabelo e plano de recuperacao personalizado.', 30, 60.00),
    ('22222222-2222-2222-2222-222222222227', 'Blindagem Capilar Premium', 'Blindagem com produtos premium para maxima protecao.', 90, 160.00);

-- ============================================================================
-- SALÕES - Serviços variados oferecidos por todos
-- ============================================================================

-- Salão Premium Beauty
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('33333333-3333-3333-3333-333333333331', 'Corte + Finalizacao', 'Corte moderno + finalizacao profissional. Saida sempre impecavel!', 60, 120.00),
    ('33333333-3333-3333-3333-333333333331', 'Coloracao Salao', 'Coloracao com equipe especializada e produtos premium.', 120, 220.00),
    ('33333333-3333-3333-3333-333333333331', 'Botox Capilar', 'Botox para brilho e maciez. Resultado visivel!', 90, 160.00),
    ('33333333-3333-3333-3333-333333333331', 'Penteado Evento', 'Penteado profissional para qualquer evento especial.', 90, 200.00),
    ('33333333-3333-3333-3333-333333333331', 'Progressiva + Corte', 'Progressiva completa + corte e finalizacao.', 180, 350.00),
    ('33333333-3333-3333-3333-333333333331', 'Pacote Beleza Completo', 'Corte + coloracao + tratamento + maquiagem. Transformacao total!', 240, 600.00);

-- Salão Beleza Inclusiva
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('33333333-3333-3333-3333-333333333332', 'Atendimento PCD', 'Atendimento especial para pessoas com deficiencia. Equipe treinada!', 60, 100.00),
    ('33333333-3333-3333-3333-333333333332', 'Corte Inclusivo TEA', 'Corte com adaptacoes sensoriais para autistas. Total inclusao!', 60, 120.00),
    ('33333333-3333-3333-3333-333333333332', 'Atendimento com Acompanhante', 'Permitimos presenca de acompanhante em todo atendimento.', 60, 110.00),
    ('33333333-3333-3333-3333-333333333332', 'Sessao Sem Pressa', 'Sem cronometro! Voce determina o ritmo. Muito confortavel!', 90, 150.00),
    ('33333333-3333-3333-3333-333333333332', 'Tratamento Relaxante', 'Atendimento relaxante onde sua necessidade e prioridade.', 90, 140.00),
    ('33333333-3333-3333-3333-333333333332', 'Consultoria Inclusiva', 'Orientacoes para cuidar de seus cabelos com inclusao total.', 30, 60.00);

-- Salão Especializado em Cabelos Afro
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('33333333-3333-3333-3333-333333333333', 'Box Braids Profissional', 'Box braids em varios tamanhos com fio premium. Fino demais!', 240, 320.00),
    ('33333333-3333-3333-3333-333333333333', 'Penteado Afro Natural', 'Penteado respeitando seu cabelo natural. Raizes, forca e beleza!', 90, 130.00),
    ('33333333-3333-3333-3333-333333333333', 'Transicao Capilar', 'Consultoria completa para transicao do alisado para natural!', 60, 120.00),
    ('33333333-3333-3333-3333-333333333333', 'Cronograma Cabelo Afro', 'Cronograma personalizado (3 meses) com produtos naturais.', 120, 480.00),
    ('33333333-3333-3333-3333-333333333333', 'Tratamento Afro Especializado', 'Tratamento com produtos especificos para texturas afro.', 90, 150.00),
    ('33333333-3333-3333-3333-333333333333', 'Consultoria Estilo', 'Recomendacoes de cortes e estilos para cabelos afros.', 30, 70.00);

-- Studio Belleza Profissional
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('33333333-3333-3333-3333-333333333334', 'Corte Premium', 'Corte executivo impecavel com acabamento profissional.', 45, 100.00),
    ('33333333-3333-3333-3333-333333333334', 'Coloracao Premium', 'Coloracao com produtos de luxo. Cor perfeita garantida!', 120, 250.00),
    ('33333333-3333-3333-3333-333333333334', 'Progressiva Premium', 'Progressiva com produtos importados. Maximo brilho e maciez!', 150, 320.00),
    ('33333333-3333-3333-3333-333333333334', 'Alisamento Japones', 'Alisamento duravel com tecnica classica japonesa.', 180, 400.00),
    ('33333333-3333-3333-3333-333333333334', 'Extensao de Cabelo', 'Extensao com acabamento natural em fita ou micro links.', 180, 700.00),
    ('33333333-3333-3333-3333-333333333334', 'Pacote Executivo', 'Corte + coloracao + tratamento + finalizador. Saida executiva!', 180, 480.00);

-- Salão Meu Jeito
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('33333333-3333-3333-3333-333333333335', 'Corte Casal', 'Promocao: 2 cortes + 2 finalizacoes por preco especial!', 60, 150.00),
    ('33333333-3333-3333-3333-333333333335', 'Penteado Festa', 'Penteado para qualquer ocasiao. Muito lindo e descontraido!', 90, 170.00),
    ('33333333-3333-3333-3333-333333333335', 'Coloracao Grupo', 'Grupo de amigas? Desconto especial para coloracao em lote!', 120, 200.00),
    ('33333333-3333-3333-3333-333333333335', 'Tratamento Hidratante', 'Hidratacao para restaurar cabelo ressecado. Maciez garantida!', 60, 100.00),
    ('33333333-3333-3333-3333-333333333335', 'Corte Infantil Familiar', 'Pacote para a familia toda: pais + filhos com desconto!', 45, 200.00),
    ('33333333-3333-3333-3333-333333333335', 'Pacote Mensal Familiar', 'Atendimento mensal para voce e sua familia. Melhor preco!', 60, 400.00);

COMMIT;
    ('22222222-2222-2222-2222-222222222221', 'Penteado Afro', 'Penteado estilo afro com finalização profissional e longevidade de 7-10 dias.', 90, 130.00),
    ('22222222-2222-2222-2222-222222222221', 'Tratamento Reconstrutor', 'Reconstrução capilar completa com proteína de queratina. Deixa cabelo hidratado e brilhoso.', 120, 160.00),
    ('22222222-2222-2222-2222-222222222221', 'Twist Out', 'Técnica de penteado duradouro com twists. Mantém até 2 semanas com cuidado adequado.', 120, 140.00),
    ('22222222-2222-2222-2222-222222222221', 'Cronograma Capilar', 'Cronograma personalizado (3 meses) com hidratação, nutrição e reconstrução.', 30, 60.00),
    ('22222222-2222-2222-2222-222222222221', 'Pacote Mensal Afro', 'Lavagem profunda + penteado + tratamento (4x ao mês). Melhor valor!', 90, 450.00);

-- ============================================================================
-- Camila Santos - Serviços de Coloração e Química
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222228', 'Coloração Permanente', 'Coloração permanente com produtos Schwarzkopf. Cobertura total de fios brancos.', 120, 180.00),
    ('22222222-2222-2222-2222-222222222228', 'Balayage', 'Coloração em degradê para um efeito natural e descontraído. Efeito degradê pincelado.', 150, 280.00),
    ('22222222-2222-2222-2222-222222222228', 'Ombré Hair', 'Efeito ombré com cores vibrantes. Tendência 2024! Perfeito para cabelos longos.', 180, 320.00),
    ('22222222-2222-2222-2222-222222222228', 'Botox Capilar', 'Botox para reparo, brilho e maciez. Deixa cabelo lindo e mais fácil de pentear.', 90, 140.00),
    ('22222222-2222-2222-2222-222222222228', 'Alisamento Progressivo', 'Alisamento progressivo com fórmula neutra. Sem formol! Resultado duradouro até 2 meses.', 150, 220.00),
    ('22222222-2222-2222-2222-222222222228', 'Coloração + Hidratação', 'Coloração + hidratação na mesma sessão. Cabelo protegido desde o toque.', 150, 250.00),
    ('22222222-2222-2222-2222-222222222228', 'Refil de Raiz', 'Coloração apenas na raiz. Perfeito para manutenção mensal. Econômico!', 90, 120.00),
    ('22222222-2222-2222-2222-222222222228', 'Tonalizante', 'Tonalizante semipermanente para dar brilho e ajustar tom. Dura até 15 dias.', 60, 80.00);

-- ============================================================================
-- Daniela Ferraz - Serviços de Corte Moderno
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222229', 'Corte Geométrico', 'Corte moderno com linhas geométricas. Personalizado conforme seu rosto.', 60, 95.00),
    ('22222222-2222-2222-2222-222222222229', 'Corte com Finalização', 'Corte + penteado e finalização profissional. Saiba como pentear em casa!', 90, 140.00),
    ('22222222-2222-2222-2222-222222222229', 'Corte + Coloração', 'Corte + coloração na mesma sessão. Transformação completa!', 150, 260.00),
    ('22222222-2222-2222-2222-222222222229', 'Consultoria de Imagem', 'Consultoria completa de corte, cor e estilo. Sessão de 1h com recomendações.', 60, 180.00),
    ('22222222-2222-2222-2222-222222222229', 'Corte Masculino', 'Corte masculino moderno com máquina e tesoura. Acabamento impecável.', 30, 60.00),
    ('22222222-2222-2222-2222-222222222229', 'Corte + Barba', 'Corte completo + design de barba. Saída impecável!', 45, 100.00);

-- ============================================================================
-- Giovana Costa - Serviços de Noivas e Eventos
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222230', 'Penteado Noiva', 'Penteado e maquiagem para seu grande dia. Prova com até 2 semanas antes.', 120, 350.00),
    ('22222222-2222-2222-2222-222222222230', 'Penteado + Maquiagem Noiva', 'Pacote completo: penteado + maquiagem profissional. Impecável do início ao fim!', 180, 550.00),
    ('22222222-2222-2222-2222-222222222230', 'Penteados Grupo (Amigas da Noiva)', 'Penteado para até 5 amigas da noiva. Aproveita bem o tempo e economia.', 120, 280.00),
    ('22222222-2222-2222-2222-222222222230', 'Penteado para Formatura', 'Penteado elegante para seu formando. Fotos impecáveis garantidas!', 90, 200.00),
    ('22222222-2222-2222-2222-222222222230', 'Penteado para Festa', 'Penteado sofisticado para qualquer evento. Alto impacto visual!', 90, 150.00),
    ('22222222-2222-2222-2222-222222222230', 'Prova de Penteado', 'Sessão de prova com sugestões de diferentes estilos. Melhor escolher antes!', 60, 100.00);

-- ============================================================================
-- Mariana Costa - Serviços de Tranças
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222222', 'Box Braids Pequenas', 'Box braids em tamanho pequeno com durabilidade de até 8 semanas.', 300, 350.00),
    ('22222222-2222-2222-2222-222222222222', 'Box Braids Médias', 'Box braids em tamanho médio. A mais popular! Dura 6-8 semanas.', 240, 280.00),
    ('22222222-2222-2222-2222-222222222222', 'Box Braids Grandes', 'Box braids em tamanho grande. Rápido de fazer e muito estiloso!', 180, 220.00),
    ('22222222-2222-2222-2222-222222222222', 'Penteado em Tranças', 'Criação de penteados em tranças para eventos. Super elegante!', 120, 160.00),
    ('22222222-2222-2222-2222-222222222222', 'Remoção de Tranças', 'Remoção cuidadosa de tranças sem danificar o cabelo. Tratamento no final.', 90, 100.00),
    ('22222222-2222-2222-2222-222222222222', 'Manutenção de Tranças', 'Retoque (enraizamento) durante o período de uso. Mantém as tranças bonitas!', 120, 150.00),
    ('22222222-2222-2222-2222-222222222222', 'Senegalese Twist', 'Técnica de torcidas senegalesas. Rápidas e super trendy!', 180, 200.00),
    ('22222222-2222-2222-2222-222222222222', 'Faux Locs', 'Tranças falsas tipo locs. Protetor para seu cabelo natural.', 240, 300.00);

-- ============================================================================
-- Fernanda Oliveira - Serviços de Tricologia
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222231', 'Consulta Tricológica', 'Avaliação completa do couro cabeludo e fios. Diagnóstico e recomendações.', 60, 150.00),
    ('22222222-2222-2222-2222-222222222231', 'Análise Capilar + Tratamento', 'Análise microscópica + tratamento personalizado para sua necessidade.', 90, 200.00),
    ('22222222-2222-2222-2222-222222222231', 'Tratamento para Queda', 'Tratamento específico para alopecia e queda de cabelo. Com fórmula anti-inflamatória.', 60, 120.00),
    ('22222222-2222-2222-2222-222222222231', 'Limpeza de Couro Cabeludo', 'Limpeza profunda removendo resíduos de produto e oleosidade. Alívio garantido!', 45, 80.00),
    ('22222222-2222-2222-2222-222222222231', 'Pacote Alopecia (4 sessões)', 'Programa de 4 sessões para combater queda e fortalecer cabelo.', 60, 420.00),
    ('22222222-2222-2222-2222-222222222231', 'Consultoria Nutricional', 'Recomendações de suplementação e alimentação para saúde capilar.', 30, 100.00);

-- ============================================================================
-- Stephanie Rocha - Serviços de Extensão
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222232', 'Extensão Micro Links', 'Extensão com micro links. Acabamento natural e resistente. Dura até 4 meses.', 180, 600.00),
    ('22222222-2222-2222-2222-222222222232', 'Mega Hair Fita', 'Extensão em fita adesiva. Rápida de colocar e remove facilmente.', 120, 350.00),
    ('22222222-2222-2222-2222-222222222232', 'Manutenção de Extensão', 'Limpeza e retoque de extensão. Mantém sempre linda!', 90, 150.00),
    ('22222222-2222-2222-2222-222222222232', 'Remoção de Extensão', 'Remoção cuidadosa e tratamento reconstituinte para seu cabelo natural.', 60, 120.00),
    ('22222222-2222-2222-2222-222222222232', 'Tratamento Fio Natural + Extensão', 'Hidratação profunda para seu cabelo natural e a extensão colocada.', 120, 200.00),
    ('22222222-2222-2222-2222-222222222232', 'Extensão Completa + Corte', 'Colocação de extensão + corte e finalização. Saída pronta para usar!', 180, 700.00);

-- ============================================================================
-- Carolina Rio - Serviços de Noivas
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222233', 'Penteado Festa Elegante', 'Penteado sofisticado para festas e eventos especiais.', 90, 180.00),
    ('22222222-2222-2222-2222-222222222233', 'Penteado Amigas Nupcial', 'Pacote para grupo de amigas da noiva com descontos especiais.', 90, 150.00),
    ('22222222-2222-2222-2222-222222222233', 'Penteado + Ajuste Tiara/Véu', 'Penteado perfeito com sua tiara ou véu. Prova incluída!', 90, 220.00),
    ('22222222-2222-2222-2222-222222222233', 'Teste de Penteado Noiva', 'Sessão de teste com múltiplas opções de penteado para seu grande dia.', 60, 120.00),
    ('22222222-2222-2222-2222-222222222233', 'Maquiagem + Penteado', 'Maquiagem profissional + penteado no dia do evento. Impecável do início ao fim!', 120, 350.00);

-- ============================================================================
-- Beatriz Oliveira - Serviços Infantis
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222223', 'Corte Infantil', 'Corte divertido para crianças com ambiente lúdico. Sem trauma!', 45, 65.00),
    ('22222222-2222-2222-2222-222222222223', 'Penteado Infantil', 'Penteados criativos e divertidos para meninas. Instagram-ready!', 30, 50.00),
    ('22222222-2222-2222-2222-222222222223', 'Corte + Penteado Infantil', 'Corte + penteado completo para saída especial das crianças.', 60, 100.00),
    ('22222222-2222-2222-2222-222222222223', 'Tratamento Infantil Suave', 'Tratamento capilar seguro e suave para crianças com cabelo delicado.', 45, 55.00),
    ('22222222-2222-2222-2222-222222222223', 'Pacote Mensal Infantil', 'Corte + penteado uma vez por mês. Melhor preço para crianças!', 45, 180.00),
    ('22222222-2222-2222-2222-222222222223', 'Corte Festa Infantil', 'Corte especial para festas e eventos das crianças.', 45, 70.00);

-- ============================================================================
-- Amanda BH - Serviços de Reconstrução
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222234', 'Reconstrução Capilar', 'Reconstrução completa com proteína especial. Cabelo novo de verdade!', 120, 170.00),
    ('22222222-2222-2222-2222-222222222234', 'Hidratação Profunda', 'Hidratação intensiva para cabelos muito danificados. Maciez garantida!', 90, 130.00),
    ('22222222-2222-2222-2222-222222222234', 'Cronograma Capilar (3 meses)', 'Programa completo: hidratação, nutrição, reconstrução (1x ao mês).', 120, 420.00),
    ('22222222-2222-2222-2222-222222222234', 'Blindagem Capilar', 'Proteção total com selagem de cutículas. Cabelo brilhoso e protegido!', 60, 100.00),
    ('22222222-2222-2222-2222-222222222234', 'Tratamento Proteína Queratina', 'Tratamento com queratina brasileira. Resultado liso e brilhante.', 120, 150.00),
    ('22222222-2222-2222-2222-222222222234', 'Consulta de Diagnóstico', 'Análise do estado do seu cabelo e recomendação de tratamento.', 30, 50.00);

-- ============================================================================
-- Leticia BH - Serviços de Design Capilar
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222235', 'Progressiva Clássica', 'Progressiva tradicional. Cabelo liso impecável por até 3 meses!', 120, 200.00),
    ('22222222-2222-2222-2222-222222222235', 'Progressiva Premium', 'Progressiva com produtos importados. Extra brilho e maciez!', 150, 280.00),
    ('22222222-2222-2222-2222-222222222235', 'Botox Capilar', 'Botox para brilho, maciez e definição. Cabelo revigorado!', 90, 150.00),
    ('22222222-2222-2222-2222-222222222235', 'Hidratação + Progressiva', 'Hidratação + progressiva na mesma sessão. Cabelo protegido!', 180, 320.00),
    ('22222222-2222-2222-2222-222222222235', 'Manutenção Progressiva', 'Retoque apenas na raiz. Mantém seu cabelo lindo por mais tempo!', 90, 140.00),
    ('22222222-2222-2222-2222-222222222235', 'Ondulação Permanente', 'Permanente para cabelo liso. Ondas duradouras e naturais!', 120, 180.00);

-- ============================================================================
-- Lucia Santos - Serviços Asiáticos
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222224', 'Alisamento Japonês', 'Alisamento duradouro com método japonês. Até 4 meses de resultado!', 180, 380.00),
    ('22222222-2222-2222-2222-222222222224', 'Alisamento Coreano', 'Alisamento do método coreano. Mais suave e com vitaminas!', 180, 350.00),
    ('22222222-2222-2222-2222-222222222224', 'Alisamento Brasileiro', 'Alisamento brasileiro progressivo. Melhor custo-benefício!', 150, 250.00),
    ('22222222-2222-2222-2222-222222222224', 'Permanente Asiática', 'Permanente para cabelos asiáticos. Ondas perfeitas e duradouras!', 150, 220.00),
    ('22222222-2222-2222-2222-222222222224', 'Coloração Profissional', 'Coloração com produtos premium para cabelos asiáticos.', 90, 160.00),
    ('22222222-2222-2222-2222-222222222224', 'Tratamento + Alisamento', 'Tratamento de hidratação + alisamento na mesma sessão.', 180, 400.00),
    ('22222222-2222-2222-2222-222222222224', 'Manutenção de Alisamento', 'Retoque de raiz com produto adequado para asiáticos.', 120, 200.00);

-- ============================================================================
-- Patricia BSB - Serviços com TEA
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222236', 'Corte TEA', 'Corte com adaptação sensorial para autistas. Sem pressa ou pressão!', 60, 110.00),
    ('22222222-2222-2222-2222-222222222236', 'Penteado TEA', 'Penteado com metodologia inclusiva e adaptada.', 45, 90.00),
    ('22222222-2222-2222-2222-222222222236', 'Sessão Tranquila Prolongada', 'Sessão sem cronômetro. Você determina o ritmo!', 90, 160.00),
    ('22222222-2222-2222-2222-222222222236', 'Atendimento com Acompanhante', 'Atendimento permitindo presença de acompanhante. Total inclusão!', 60, 130.00),
    ('22222222-2222-2222-2222-222222222236', 'Tratamento Sensorial', 'Tratamento adaptado para sensibilidades de quem tem TEA.', 45, 80.00),
    ('22222222-2222-2222-2222-222222222236', 'Pacote Mensal TEA', 'Atendimento mensal com toda a adaptação necessária.', 60, 400.00);

-- ============================================================================
-- Patricia Ferreira Salvador - Serviços com TEA/Inclusivos
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222225', 'Corte Inclusivo', 'Corte com total respeito à sua necessidade de conforto e adaptação.', 60, 100.00),
    ('22222222-2222-2222-2222-222222222225', 'Atendimento PCD', 'Atendimento especial para pessoas com deficiência. Ambiente acessível!', 60, 120.00),
    ('22222222-2222-2222-2222-222222222225', 'Sessão Sem Pressa', 'Você não tem pressa? Nós também não! Descontraído e aconchegante.', 90, 140.00),
    ('22222222-2222-2222-2222-222222222225', 'Corte + Penteado Inclusivo', 'Corte completo + penteado com todo carinho e inclusão.', 90, 160.00),
    ('22222222-2222-2222-2222-222222222225', 'Hidratação Capilar', 'Hidratação profunda para deixar seu cabelo maravilhoso!', 60, 90.00),
    ('22222222-2222-2222-2222-222222222225', 'Tratamento Relaxante', 'Atendimento relaxante onde você é prioridade! Zen demais!', 90, 150.00);

-- ============================================================================
-- Conceição Salvador - Serviços Afro
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222237', 'Box Braids com Fio', 'Box braids com fio de alta qualidade. Perfeição! Até 8 semanas.', 240, 300.00),
    ('22222222-2222-2222-2222-222222222237', 'Bantu Knots', 'Penteado afro Bantu Knots. Super trendy e protetor!', 120, 140.00),
    ('22222222-2222-2222-2222-222222222237', 'Penteado Afro Natural', 'Penteado afro com seu cabelo natural. Raízes, força e beleza!', 90, 110.00),
    ('22222222-2222-2222-2222-222222222237', 'Twists Naturais', 'Twists com seu cabelo natural. Duradouro e muito lindo!', 120, 130.00),
    ('22222222-2222-2222-2222-222222222237', 'Corte Afro Natural', 'Corte respeitando sua textura natural. Transição capilar com qualidade!', 60, 100.00),
    ('22222222-2222-2222-2222-222222222237', 'Consultoria Cabelo Afro', 'Recomendações para cuidar de cabelos afros e cacheados.', 30, 50.00);

-- ============================================================================
-- Carolina Sousa Curitiba - Serviços Coloração
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222226', 'Coloração Extrema', 'Cores vibrantes e criativas (verde, rosa, azul, roxo). Personalidade pura!', 150, 350.00),
    ('22222222-2222-2222-2222-222222222226', 'Descoloração', 'Descoloração profissional preparando seu cabelo para cores novas.', 120, 200.00),
    ('22222222-2222-2222-2222-222222222226', 'Coloração Fantasista', 'Cores fantasia temporárias para dias especiais. Sem danificar!', 90, 120.00),
    ('22222222-2222-2222-2222-222222222226', 'Manutenção de Cor', 'Retoques e refresco de cor para mantê-la sempre vibrante!', 90, 140.00),
    ('22222222-2222-2222-2222-222222222226', 'Mechas Criativas', 'Mechas coloridas criativas em padrões únicos. Expressão pura!', 150, 280.00),
    ('22222222-2222-2222-2222-222222222226', 'Consultoria de Cor', 'Escolha de cor que combina com seu tom de pele e estilo.', 60, 100.00);

-- ============================================================================
-- Amanda Rocha Porto Alegre - Serviços Reconstrução
-- ============================================================================
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('22222222-2222-2222-2222-222222222227', 'Reconstrução Completa', 'Reconstrução capilar profunda para fios muito danificados.', 120, 180.00),
    ('22222222-2222-2222-2222-222222222227', 'Cronograma Personalizado', 'Cronograma adaptado à sua necessidade (3 ou 6 meses).', 120, 480.00),
    ('22222222-2222-2222-2222-222222222227', 'Hidratação Intensiva', 'Hidratação profunda deixando cabelo sedoso e brilhante!', 90, 140.00),
    ('22222222-2222-2222-2222-222222222227', 'Tratamento Capilar + Corte', 'Tratamento + corte estruturado para renovar o visual!', 120, 220.00),
    ('22222222-2222-2222-2222-222222222227', 'Consulta Capilar', 'Análise do seu cabelo e plano de recuperação personalizado.', 30, 60.00),
    ('22222222-2222-2222-2222-222222222227', 'Blindagem Capilar Premium', 'Blindagem com produtos premium para máxima proteção.', 90, 160.00);

-- ============================================================================
-- SALÕES - Serviços variados oferecidos por todos
-- ============================================================================

-- Salão Premium Beauty
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('33333333-3333-3333-3333-333333333331', 'Corte + Finalização', 'Corte moderno + finalização profissional. Saída sempre impecável!', 60, 120.00),
    ('33333333-3333-3333-3333-333333333331', 'Coloração Salão', 'Coloração com equipe especializada e produtos premium.', 120, 220.00),
    ('33333333-3333-3333-3333-333333333331', 'Botox Capilar', 'Botox para brilho e maciez. Resultado visível!', 90, 160.00),
    ('33333333-3333-3333-3333-333333333331', 'Penteado Evento', 'Penteado profissional para qualquer evento especial.', 90, 200.00),
    ('33333333-3333-3333-3333-333333333331', 'Progressiva + Corte', 'Progressiva completa + corte e finalização.', 180, 350.00),
    ('33333333-3333-3333-3333-333333333331', 'Pacote Beleza Completo', 'Corte + coloração + tratamento + maquiagem. Transformação total!', 240, 600.00);

-- Salão Beleza Inclusiva
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('33333333-3333-3333-3333-333333333332', 'Atendimento PCD', 'Atendimento especial para pessoas com deficiência. Equipe treinada!', 60, 100.00),
    ('33333333-3333-3333-3333-333333333332', 'Corte Inclusivo TEA', 'Corte com adaptações sensoriais para autistas. Total inclusão!', 60, 120.00),
    ('33333333-3333-3333-3333-333333333332', 'Atendimento com Acompanhante', 'Permitimos presença de acompanhante em todo atendimento.', 60, 110.00),
    ('33333333-3333-3333-3333-333333333332', 'Sessão Sem Pressa', 'Sem cronômetro! Você determina o ritmo. Muito confortável!', 90, 150.00),
    ('33333333-3333-3333-3333-333333333332', 'Tratamento Relaxante', 'Atendimento relaxante onde sua necessidade é prioridade.', 90, 140.00),
    ('33333333-3333-3333-3333-333333333332', 'Consultoria Inclusiva', 'Orientações para cuidar de seus cabelos com inclusão total.', 30, 60.00);

-- Salão Especializado em Cabelos Afro
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('33333333-3333-3333-3333-333333333333', 'Box Braids Profissional', 'Box braids em vários tamanhos com fio premium. Fino demais!', 240, 320.00),
    ('33333333-3333-3333-3333-333333333333', 'Penteado Afro Natural', 'Penteado respeitando seu cabelo natural. Raízes, força e beleza!', 90, 130.00),
    ('33333333-3333-3333-3333-333333333333', 'Transição Capilar', 'Consultoria completa para transição do alisado para natural!', 60, 120.00),
    ('33333333-3333-3333-3333-333333333333', 'Cronograma Cabelo Afro', 'Cronograma personalizado (3 meses) com produtos naturais.', 120, 480.00),
    ('33333333-3333-3333-3333-333333333333', 'Tratamento Afro Especializado', 'Tratamento com produtos específicos para texturas afro.', 90, 150.00),
    ('33333333-3333-3333-3333-333333333333', 'Consultoria Estilo', 'Recomendações de cortes e estilos para cabelos afros.', 30, 70.00);

-- Studio Belleza Profissional
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('33333333-3333-3333-3333-333333333334', 'Corte Premium', 'Corte executivo impecável com acabamento profissional.', 45, 100.00),
    ('33333333-3333-3333-3333-333333333334', 'Coloração Premium', 'Coloração com produtos de luxo. Cor perfeita garantida!', 120, 250.00),
    ('33333333-3333-3333-3333-333333333334', 'Progressiva Premium', 'Progressiva com produtos importados. Máximo brilho e maciez!', 150, 320.00),
    ('33333333-3333-3333-3333-333333333334', 'Alisamento Japonês', 'Alisamento duradouro com técnica clássica japonesa.', 180, 400.00),
    ('33333333-3333-3333-3333-333333333334', 'Extensão de Cabelo', 'Extensão com acabamento natural em fita ou micro links.', 180, 700.00),
    ('33333333-3333-3333-3333-333333333334', 'Pacote Executivo', 'Corte + coloração + tratamento + finalizador. Saída executiva!', 180, 480.00);

-- Salão Meu Jeito
INSERT INTO userservice.servicos (perfil_id, nome, descricao, duracao_minutos, preco) VALUES
    ('33333333-3333-3333-3333-333333333335', 'Corte Casal', 'Promoção: 2 cortes + 2 finalizações por preço especial!', 60, 150.00),
    ('33333333-3333-3333-3333-333333333335', 'Penteado Festa', 'Penteado para qualquer ocasião. Muito lindo e descontraído!', 90, 170.00),
    ('33333333-3333-3333-3333-333333333335', 'Coloração Grupo', 'Grupo de amigas? Desconto especial para coloração em lote!', 120, 200.00),
    ('33333333-3333-3333-3333-333333333335', 'Tratamento Hidratante', 'Hidratação para restaurar cabelo ressecado. Maciez garantida!', 60, 100.00),
    ('33333333-3333-3333-3333-333333333335', 'Corte Infantil Familiar', 'Pacote para a família toda: pais + filhos com desconto!', 45, 200.00),
    ('33333333-3333-3333-3333-333333333335', 'Pacote Mensal Familiar', 'Atendimento mensal para você e sua família. Melhor preço!', 60, 400.00);

COMMIT;
