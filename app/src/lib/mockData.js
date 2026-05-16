// Fallback de dados — usados quando o backend não está disponível,
// para que o front continue navegável em desenvolvimento.

export const especialidadesMock = [
  { id: 'cabelos-afro', nome: 'Cabelos Afro', emoji: '👩🏾‍🦱' },
  { id: 'cabelos-asiaticos', nome: 'Cabelos Asiáticos', emoji: '🌸' },
  { id: 'quimicas', nome: 'Químicas', emoji: '🧪' },
  { id: 'corte-infantil', nome: 'Corte Infantil', emoji: '👶' },
  { id: 'atendimento-tea', nome: 'Atendimento TEA', emoji: '💙' },
  { id: 'trancas', nome: 'Tranças', emoji: '🎀' },
];

export const profissionaisMock = [
  {
    id: '1',
    nome: 'Ana Beatriz',
    iniciais: 'AB',
    subtitulo: 'Especialista em Cabelos Afro & Atendimento TEA',
    cidade: 'São Paulo, SP',
    avaliacao: 4.9,
    totalAvaliacoes: 127,
    inclusivo: true,
    tags: ['Cabelos Afro', 'Tranças', 'Box Braids', 'TEA', 'Infantil'],
    precoMin: 80,
    precoMax: 150,
    descricao:
      'Profissional com mais de 8 anos de experiência em cabelos afro e atendimentos inclusivos. Certificada em atendimento a crianças e adultos com Transtorno do Espectro Autista (TEA). Espaço adaptado com ambiente calmo, iluminação suave e fones de proteção auditiva disponíveis.',
    features: [
      'Ambiente calmo e adaptado',
      'Fones de proteção auditiva',
      'Atendimento paciente',
      'Agendamento flexível',
    ],
    servicos: [
      { id: 's1', nome: 'Corte Afro Feminino', duracao: '45 min', preco: 80 },
      { id: 's2', nome: 'Box Braids (médio)', duracao: '3h', preco: 250 },
      { id: 's3', nome: 'Tranças Nagô', duracao: '2h', preco: 180 },
      { id: 's4', nome: 'Hidratação Profunda', duracao: '1h', preco: 120 },
      { id: 's5', nome: 'Corte Infantil (com acolhimento TEA)', duracao: '1h', preco: 100 },
    ],
    disponibilidade: {
      Seg: ['09:00', '10:00', '14:00', '15:00'],
      Ter: ['09:00', '11:00', '14:00', '16:00'],
      Qua: ['10:00', '14:00', '15:00'],
      Qui: ['09:00', '10:00', '11:00', '14:00'],
      Sex: ['09:00', '10:00', '14:00'],
    },
    avaliacoes: [
      {
        id: 'r1',
        autor: 'Camila R.',
        nota: 5,
        data: '15/03/2025',
        texto:
          'Ana é incrível! Meu filho autista ficou super confortável. Ela tem muita paciência e sensibilidade.',
      },
      {
        id: 'r2',
        autor: 'Fernanda M.',
        nota: 5,
        data: '08/03/2025',
        texto:
          'Melhor profissional de tranças que já fui. Trabalho impecável e atendimento muito carinhoso.',
      },
      {
        id: 'r3',
        autor: 'Lucas P.',
        nota: 4,
        data: '28/02/2025',
        texto:
          'Excelente atendimento. O espaço é acolhedor e acessível. Recomendo demais!',
      },
    ],
  },
  {
    id: '2',
    nome: 'Carlos Tanaka',
    iniciais: 'CT',
    subtitulo: 'Cabelos Asiáticos',
    cidade: 'Liberdade, SP',
    avaliacao: 4.8,
    totalAvaliacoes: 89,
    inclusivo: true,
    tags: ['Asiático', 'Alisamento'],
    precoMin: 60,
    precoMax: 120,
  },
  {
    id: '3',
    nome: 'Mariana Silva',
    iniciais: 'MS',
    subtitulo: 'Atendimento Inclusivo',
    cidade: 'Campinas, SP',
    avaliacao: 5,
    totalAvaliacoes: 64,
    inclusivo: true,
    tags: ['Infantil', 'TEA'],
    precoMin: 70,
    precoMax: 130,
  },
  {
    id: '4',
    nome: 'Salão Raízes',
    iniciais: 'SR',
    subtitulo: 'Salão Especializado',
    cidade: 'Pinheiros, SP',
    avaliacao: 4.7,
    totalAvaliacoes: 203,
    inclusivo: true,
    tags: ['Afro', 'Químicas', 'Coloração'],
    precoMin: 50,
    precoMax: 200,
  },
  {
    id: '5',
    nome: 'Juliana Costa',
    iniciais: 'JC',
    subtitulo: 'Colorista',
    cidade: 'Moema, SP',
    avaliacao: 4.6,
    totalAvaliacoes: 45,
    inclusivo: false,
    tags: ['Químicas', 'Coloração'],
    precoMin: 100,
    precoMax: 250,
  },
  {
    id: '6',
    nome: 'Pedro Santos',
    iniciais: 'PS',
    subtitulo: 'Barbeiro Inclusivo',
    cidade: 'Santo Amaro, SP',
    avaliacao: 4.9,
    totalAvaliacoes: 156,
    inclusivo: true,
    tags: ['Infantil', 'TEA', 'Barba'],
    precoMin: 40,
    precoMax: 80,
  },
];

export const metricasMock = {
  usuariosTotais: 1247,
  profissionaisAtivos: 183,
  agendamentosMes: 2891,
  receitaMes: 48320,
  deltaUsuarios: 12,
  deltaProfissionais: 6,
  deltaAgendamentos: 23,
  deltaReceita: 18,
};

export const aprovacoesMock = [
  {
    id: 'p1',
    nome: 'Studio Hair Inclusivo',
    tipo: 'salão',
    cidade: 'Vila Madalena, SP',
    cadastradoEm: '19/03/2025',
    tags: ['Afro', 'TEA'],
  },
  {
    id: 'p2',
    nome: 'Rodrigo Almeida',
    tipo: 'profissional',
    cidade: 'Moema, SP',
    cadastradoEm: '18/03/2025',
    tags: ['Asiático', 'Químicas'],
  },
  {
    id: 'p3',
    nome: 'Espaço Raízes Naturais',
    tipo: 'salão',
    cidade: 'Tatuapé, SP',
    cadastradoEm: '17/03/2025',
    tags: ['Afro', 'Infantil'],
  },
];

export const atividadeMock = [
  {
    id: 'a1',
    tipo: 'aprovado',
    titulo: 'Novo cadastro aprovado',
    detalhe: 'Ana Luiza — Barbeira Inclusiva',
    quando: '2h atrás',
  },
  {
    id: 'a2',
    tipo: 'cancelado',
    titulo: 'Agendamento cancelado',
    detalhe: 'Cliente #1204 → Pedro Santos',
    quando: '3h atrás',
  },
  {
    id: 'a3',
    tipo: 'reportado',
    titulo: 'Avaliação reportada',
    detalhe: 'Review #892 — conteúdo inapropriado',
    quando: '5h atrás',
  },
  {
    id: 'a4',
    tipo: 'pendente',
    titulo: 'Novo cadastro pendente',
    detalhe: 'Studio Hair Inclusivo',
    quando: '6h atrás',
  },
];

export const painelProfissionalMock = {
  nome: 'Ana Beatriz',
  iniciais: 'AB',
  kpis: {
    agendamentos: 12,
    receita: 1840,
    avaliacao: 4.9,
    novosClientes: 4,
  },
  hoje: '20/03/2025',
  agenda: [
    { hora: '09:00', cliente: 'Camila Rodrigues', servico: 'Box Braids · 3h', status: 'confirmado' },
    { hora: '14:00', cliente: 'Lucas Pereira', servico: 'Corte Afro · 45 min', status: 'confirmado' },
    { hora: '15:00', cliente: 'Maria Eduarda', servico: 'Hidratação · 1h', status: 'pendente' },
  ],
  servicos: [
    { id: 's1', nome: 'Corte Afro Feminino', duracao: '45 min', preco: 80, ativo: true },
    { id: 's2', nome: 'Box Braids (médio)', duracao: '3h', preco: 250, ativo: true },
    { id: 's3', nome: 'Tranças Nagô', duracao: '2h', preco: 180, ativo: true },
    { id: 's4', nome: 'Hidratação Profunda', duracao: '1h', preco: 120, ativo: false },
  ],
  avaliacoes: [
    { autor: 'Camila R.', nota: 5, texto: 'Ana é incrível! Meu filho ficou super confortável.' },
    { autor: 'Fernanda M.', nota: 5, texto: 'Trabalho impecável e atendimento carinhoso.' },
  ],
};
