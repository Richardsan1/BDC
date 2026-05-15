import { useEffect, useState } from 'react';
import StatsCard from '../components/StatsCard';
import Tag from '../components/Tag';
import { bookings, users } from '../lib/api';
import { painelProfissionalMock } from '../lib/mockData';
import { useAuth } from '../context/AuthContext';

export default function ProfessionalDashboard() {
  const { usuario } = useAuth();
  const [dados, setDados] = useState(painelProfissionalMock);

  useEffect(() => {
    Promise.all([bookings.listar().catch(() => null), users.meusServicos().catch(() => null)])
      .then(([ags, servicos]) => {
        const next = { ...dados };
        if (Array.isArray(ags)) next.agenda = ags;
        if (Array.isArray(servicos)) next.servicos = servicos;
        if (usuario?.nome) next.nome = usuario.nome;
        setDados(next);
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <h1 className="font-display text-3xl text-ink-900">Painel do Profissional</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard icon="📅" label="Agendamentos" value={dados.kpis.agendamentos} />
        <StatsCard icon="💰" label="Receita" value={`R$ ${dados.kpis.receita.toLocaleString('pt-BR')}`} />
        <StatsCard icon="⭐" label="Avaliação média" value={dados.kpis.avaliacao} />
        <StatsCard icon="👥" label="Novos clientes" value={dados.kpis.novosClientes} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl border border-cream-300/60 bg-white p-5">
          <div className="flex items-center gap-2 text-sm font-medium text-ink-900">
            <span>📅</span> Hoje — {dados.hoje}
          </div>
          <div className="mt-3 space-y-2">
            {dados.agenda.map((a, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg bg-cream-50 px-4 py-3"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs text-ink-400">{a.hora}</span>
                  <div>
                    <p className="text-sm font-medium text-ink-900">{a.cliente}</p>
                    <p className="text-xs text-ink-500">{a.servico}</p>
                  </div>
                </div>
                <Tag variant={a.status === 'pendente' ? 'warning' : 'success'}>{a.status}</Tag>
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-2xl border border-cream-300/60 bg-white p-5">
          <p className="text-sm font-medium text-ink-900">Ações rápidas</p>
          <ul className="mt-3 divide-y divide-cream-200">
            {[
              ['⚙ Editar perfil', '/perfil'],
              ['🕐 Gerenciar horários', '/painel/horarios'],
              ['👥 Meus clientes', '/painel/clientes'],
              ['📊 Relatórios', '/painel/relatorios'],
            ].map(([label]) => (
              <li
                key={label}
                className="flex items-center justify-between py-3 text-sm text-ink-700"
              >
                <span>{label}</span>
                <span className="text-ink-300">›</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl border border-cream-300/60 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-ink-900">
              <span>✂</span> Meus Serviços
            </div>
            <button className="rounded-lg border border-cream-300 px-3 py-1 text-xs text-ink-700 hover:border-coral-300">
              + Adicionar
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {dados.servicos.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between rounded-lg bg-cream-50 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-ink-900">{s.nome}</p>
                  <p className="text-xs text-ink-500">{s.duracao}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-ink-900">R$ {s.preco}</span>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      s.ativo ? 'bg-mint-600' : 'bg-ink-300'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-2xl border border-cream-300/60 bg-white p-5">
          <p className="flex items-center gap-2 text-sm font-medium text-ink-900">
            <span>⭐</span> Últimas avaliações
          </p>
          <ul className="mt-3 space-y-3">
            {dados.avaliacoes.map((a, i) => (
              <li key={i} className="text-sm">
                <p className="font-medium text-ink-900">
                  {a.autor}{' '}
                  <span className="text-amber-500">{'★'.repeat(a.nota)}</span>
                </p>
                <p className="text-xs text-ink-500">{a.texto}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
