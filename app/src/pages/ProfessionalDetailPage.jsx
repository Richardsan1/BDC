import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import Tag from '../components/Tag';
import { users } from '../lib/api';
import { profissionaisMock } from '../lib/mockData';

const DIAS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];

export default function ProfessionalDetailPage() {
  const { id } = useParams();
  const [profissional, setProfissional] = useState(() =>
    profissionaisMock.find((p) => String(p.id) === String(id)) || profissionaisMock[0]
  );

  useEffect(() => {
    users
      .perfil(id)
      .then((data) => data && setProfissional({ ...profissional, ...data }))
      .catch(() => {});
  }, [id]);

  const p = profissional;

  return (
    <div className="mx-auto max-w-3xl px-6 py-6">
      <Link to="/buscar" className="text-sm text-ink-500 hover:text-coral-500">
        ‹ Voltar aos resultados
      </Link>

      <div className="mt-4 overflow-hidden rounded-2xl bg-cream-200">
        <div className="flex h-64 items-center justify-center">
          <span className="font-display text-7xl text-ink-300">{p.iniciais}</span>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-cream-300/60 bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-3xl text-ink-900">{p.nome}</h1>
              {p.inclusivo && (
                <span className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-2.5 py-1 text-xs text-cyan-700">
                  💙 Atendimento Inclusivo
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-ink-500">{p.subtitulo}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-ink-700">
              <span>
                <span className="text-amber-500">★</span> {p.avaliacao}{' '}
                <span className="text-ink-400">({p.totalAvaliacoes} avaliações)</span>
              </span>
              <span>📍 {p.cidade}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(p.tags || []).map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1 rounded-lg border border-cream-300 px-3 py-1.5 text-sm text-ink-700 hover:border-coral-300">
              ♡ Salvar
            </button>
            <button className="inline-flex items-center gap-1 rounded-lg border border-cream-300 px-3 py-1.5 text-sm text-ink-700 hover:border-coral-300">
              ⇪ Compartilhar
            </button>
          </div>
        </div>

        {p.descricao && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-700">{p.descricao}</p>
        )}

        {p.features && (
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-mint-600">
            {p.features.map((f) => (
              <span key={f}>✓ {f}</span>
            ))}
          </div>
        )}
      </div>

      <section className="mt-8">
        <h2 className="text-xl text-ink-900">Serviços</h2>
        <div className="mt-3 space-y-3">
          {(p.servicos || []).map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between rounded-xl border border-cream-300/60 bg-white px-5 py-4"
            >
              <div>
                <p className="text-sm font-medium text-ink-900">{s.nome}</p>
                <p className="text-xs text-ink-500">⏱ {s.duracao}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-ink-900">R$ {s.preco}</span>
                <Link
                  to={`/profissional/${p.id}/agendar?servicoId=${s.id}`}
                  className="rounded-lg bg-coral-500 px-4 py-1.5 text-sm text-white hover:bg-coral-600"
                >
                  Agendar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {p.disponibilidade && (
        <section className="mt-8">
          <h2 className="text-xl text-ink-900">Disponibilidade esta semana</h2>
          <div className="mt-3 rounded-xl border border-cream-300/60 bg-white p-5">
            <div className="grid grid-cols-5 gap-3">
              {DIAS.map((d) => (
                <div key={d} className="text-center text-xs text-ink-500">{d}</div>
              ))}
              {DIAS.map((d) => (
                <div key={`col-${d}`} className="flex flex-col gap-2">
                  {(p.disponibilidade[d] || []).map((h) => (
                    <button
                      key={`${d}-${h}`}
                      className="rounded-full border border-cream-300 px-2 py-1 text-xs text-ink-700 hover:border-coral-300"
                    >
                      {h}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {p.avaliacoes && (
        <section className="mt-8">
          <h2 className="text-xl text-ink-900">Avaliações</h2>
          <div className="mt-3 space-y-3">
            {p.avaliacoes.map((a) => (
              <div
                key={a.id || a.autor}
                className="rounded-xl border border-cream-300/60 bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-ink-900">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cream-200 text-xs text-ink-700">
                      {a.autor.slice(0, 1)}
                    </span>
                    <strong className="font-medium">{a.autor}</strong>
                  </div>
                  <span className="text-amber-500 text-sm">
                    {'★'.repeat(a.nota)}
                    {'☆'.repeat(5 - a.nota)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-ink-700">{a.texto}</p>
                <p className="mt-2 text-xs text-ink-400">{a.data}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
