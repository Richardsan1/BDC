import { useEffect, useState } from 'react';
import StatsCard from '../components/StatsCard';
import Tag from '../components/Tag';
import Button from '../components/Button';
import { admin } from '../lib/api';

const CORES_ATIVIDADE = {
  aprovado: 'bg-mint-600',
  cancelado: 'bg-coral-500',
  reportado: 'bg-amber-500',
  pendente: 'bg-ink-300',
};

export default function AdminDashboard() {
  const [metricas, setMetricas] = useState({ usuariosTotais: 0, profissionaisAtivos: 0, agendamentosMes: 0, receitaMes: 0, deltaUsuarios:0, deltaProfissionais:0, deltaAgendamentos:0, deltaReceita:0 });
  const [aprovacoes, setAprovacoes] = useState([]);
  const [atividade] = useState([]);
  const [busca, setBusca] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    admin
      .metricas()
      .then((d) => d && setMetricas({ ...metricas, ...d }))
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtradas = aprovacoes.filter((a) =>
    busca ? a.nome.toLowerCase().includes(busca.toLowerCase()) : true
  );

  const aprovar = async (id) => {
    setErro('');
    try {
      await admin.aprovar(id);
    } catch (e) {
      // tudo bem — apenas atualiza UI
    }
    setAprovacoes((prev) => prev.filter((a) => a.id !== id));
  };
  const rejeitar = async (id) => {
    try {
      await admin.rejeitar(id);
    } catch (e) {
      // ok
    }
    setAprovacoes((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <h1 className="font-display text-3xl text-ink-900">Painel Administrativo</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard icon="👥" label="Usuários totais" value={metricas.usuariosTotais.toLocaleString('pt-BR')} delta={metricas.deltaUsuarios} />
        <StatsCard icon="✂" label="Profissionais ativos" value={metricas.profissionaisAtivos} delta={metricas.deltaProfissionais} />
        <StatsCard icon="📅" label="Agendamentos (mês)" value={metricas.agendamentosMes.toLocaleString('pt-BR')} delta={metricas.deltaAgendamentos} />
        <StatsCard icon="📊" label="Receita (mês)" value={`R$ ${metricas.receitaMes.toLocaleString('pt-BR')}`} delta={metricas.deltaReceita} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl border border-cream-300/60 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-ink-900">
              <span>🕐</span> Aprovações Pendentes{' '}
              <Tag variant="warning">{filtradas.length}</Tag>
            </div>
            <div className="relative">
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="🔍 Buscar..."
                className="rounded-lg border border-cream-300 bg-white px-3 py-1.5 text-sm"
              />
            </div>
          </div>

          <div className="mt-3 space-y-3">
            {filtradas.length === 0 && (
              <p className="rounded-lg border border-dashed border-cream-300 p-6 text-center text-sm text-ink-500">
                Nenhuma aprovação pendente.
              </p>
            )}
            {filtradas.map((a) => (
              <div
                key={a.id}
                className="rounded-xl border border-cream-300/60 bg-cream-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-ink-900">{a.nome}</p>
                      <Tag variant="neutral">{a.tipo}</Tag>
                    </div>
                    <p className="mt-1 text-xs text-ink-500">
                      {a.cidade} · Cadastro em {a.cadastradoEm}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {a.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button variant="secondary" size="sm" onClick={() => rejeitar(a.id)}>
                      ⊘ Recusar
                    </Button>
                    <Button size="sm" onClick={() => aprovar(a.id)}>
                      ✓ Aprovar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {erro && <p className="mt-3 text-sm text-coral-700">{erro}</p>}
        </section>

        <aside className="rounded-2xl border border-cream-300/60 bg-white p-5">
          <p className="text-sm font-medium text-ink-900">Atividade recente</p>
          <ul className="mt-3 space-y-3">
            {atividade.map((a) => (
              <li key={a.id} className="flex gap-3">
                <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${CORES_ATIVIDADE[a.tipo] || 'bg-ink-300'}`} />
                <div className="text-sm">
                  <p className="font-medium text-ink-900">{a.titulo}</p>
                  <p className="text-xs text-ink-500">{a.detalhe}</p>
                  <p className="text-xs text-ink-400">{a.quando}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
