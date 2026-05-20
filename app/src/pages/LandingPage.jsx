import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import ProfessionalCard from '../components/ProfessionalCard';
import { search, users } from '../lib/api';

export default function LandingPage() {
  const navigate = useNavigate();
  const [termo, setTermo] = useState('');
  const [cidade, setCidade] = useState('');
  const [especialidades, setEspecialidades] = useState([]);
  const [destaques, setDestaques] = useState([]);

  useEffect(() => {
    users.especialidades().then((data) => Array.isArray(data) && data.length && setEspecialidades(data)).catch(() => setEspecialidades([]));
    search
      .buscar({ por_pagina: 4, ordenar: 'avaliacao' })
      .then((data) => {
        const lista = Array.isArray(data) ? data : data?.dados;
        if (lista && lista.length) setDestaques(lista.slice(0, 4));
      })
      .catch(() => setDestaques([]));
  }, []);

  const onBuscar = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (termo) params.set('termo', termo);
    if (cidade) params.set('cidade', cidade);
    navigate(`/buscar?${params.toString()}`);
  };

  return (
    <>
      <section className="px-6 py-16 text-center">
        <span className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-3 py-1 text-xs text-cyan-700">
          💙 Beleza para todos
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-5xl leading-tight text-ink-900 md:text-6xl">
          Encontre o profissional
          <br /> certo para o seu cabelo
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-ink-500">
          Conectamos você a cabeleireiros especializados em todos os tipos de cabelo,
          com atendimento inclusivo e acolhedor.
        </p>

        <form
          onSubmit={onBuscar}
          className="mx-auto mt-8 flex max-w-3xl flex-col gap-2 rounded-2xl border border-cream-300/80 bg-white p-2 shadow-sm md:flex-row md:items-center"
        >
          <div className="flex flex-1 items-center gap-2 px-3">
            <span className="text-ink-400">🔍</span>
            <input
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
              placeholder="O que você procura?"
              className="w-full bg-transparent py-2 text-sm text-ink-900 outline-none placeholder:text-ink-400"
            />
          </div>
          <div className="h-px w-full bg-cream-200 md:h-8 md:w-px" />
          <div className="flex flex-1 items-center gap-2 px-3">
            <span className="text-ink-400">📍</span>
            <input
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Localização"
              className="w-full bg-transparent py-2 text-sm text-ink-900 outline-none placeholder:text-ink-400"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-coral-500 px-6 py-3 text-sm font-medium text-white hover:bg-coral-600"
          >
            🔍 Buscar
          </button>
        </form>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl text-ink-900">Especialidades</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {especialidades.slice(0, 6).map((e) => (
              <Link
                key={e.id || e.nome}
                to={`/buscar?especialidades=${encodeURIComponent(e.id || e.nome)}`}
                className="flex flex-col items-center gap-2 rounded-xl border border-cream-300/60 bg-white px-3 py-5 text-center transition hover:border-coral-300"
              >
                <span className="text-3xl">{e.emoji || '✨'}</span>
                <span className="text-sm text-ink-700">{e.nome}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl text-ink-900">Em destaque</h2>
              <p className="text-sm text-ink-500">Profissionais mais bem avaliados</p>
            </div>
            <Link to="/buscar" className="text-sm text-coral-500 hover:underline">
              Ver todos &rsaquo;
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destaques.map((p) => (
              <ProfessionalCard key={p.id} profissional={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl text-ink-900">Como funciona</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {[
              { n: '01', t: 'Busque', d: 'Encontre profissionais por especialidade, localização ou tipo de atendimento inclusivo.' },
              { n: '02', t: 'Agende', d: 'Escolha o serviço, data e horário que funcionam para você.' },
              { n: '03', t: 'Aproveite', d: 'Receba o atendimento e avalie o profissional para ajudar a comunidade.' },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <div className="font-display text-5xl text-coral-300">{s.n}</div>
                <h3 className="mt-3 text-xl text-ink-900">{s.t}</h3>
                <p className="mt-2 text-sm text-ink-500">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
