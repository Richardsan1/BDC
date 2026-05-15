import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import ProfessionalCard from '../components/ProfessionalCard';
import { search, users } from '../lib/api';
import { especialidadesMock, profissionaisMock } from '../lib/mockData';

const AVALIACOES_OPCOES = [3, 4, 4.5];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [termo, setTermo] = useState(searchParams.get('termo') || '');
  const [cidade, setCidade] = useState(searchParams.get('cidade') || '');
  const [especialidades, setEspecialidades] = useState(especialidadesMock);
  const [especialidadesSel, setEspecialidadesSel] = useState(
    (searchParams.get('especialidades') || '').split(',').filter(Boolean)
  );
  const [avaliacaoMin, setAvaliacaoMin] = useState(
    parseFloat(searchParams.get('avaliacao_min')) || 0
  );
  const [inclusivo, setInclusivo] = useState(searchParams.get('inclusivo') === 'true');

  const [resultados, setResultados] = useState(profissionaisMock);
  const [carregando, setCarregando] = useState(false);
  const [ordenar, setOrdenar] = useState('relevancia');

  useEffect(() => {
    users
      .especialidades()
      .then((data) => Array.isArray(data) && data.length && setEspecialidades(data))
      .catch(() => {});
  }, []);

  const params = useMemo(
    () => ({
      termo: termo || undefined,
      cidade: cidade || undefined,
      especialidades: especialidadesSel.length ? especialidadesSel.join(',') : undefined,
      avaliacao_min: avaliacaoMin || undefined,
      inclusivo: inclusivo || undefined,
      ordenar,
    }),
    [termo, cidade, especialidadesSel, avaliacaoMin, inclusivo, ordenar]
  );

  useEffect(() => {
    setCarregando(true);
    search
      .buscar(params)
      .then((data) => {
        const lista = Array.isArray(data) ? data : data?.resultados;
        if (lista) setResultados(lista);
      })
      .catch(() => {
        const filtrados = profissionaisMock.filter((p) => {
          if (inclusivo && !p.inclusivo) return false;
          if (avaliacaoMin && p.avaliacao < avaliacaoMin) return false;
          if (termo) {
            const t = termo.toLowerCase();
            const match =
              p.nome.toLowerCase().includes(t) ||
              p.subtitulo?.toLowerCase().includes(t) ||
              p.tags?.some((tag) => tag.toLowerCase().includes(t));
            if (!match) return false;
          }
          if (cidade && !p.cidade?.toLowerCase().includes(cidade.toLowerCase())) return false;
          return true;
        });
        setResultados(filtrados);
      })
      .finally(() => setCarregando(false));
  }, [params]);

  const aplicarBusca = (e) => {
    e?.preventDefault();
    const next = new URLSearchParams();
    if (termo) next.set('termo', termo);
    if (cidade) next.set('cidade', cidade);
    if (especialidadesSel.length) next.set('especialidades', especialidadesSel.join(','));
    if (avaliacaoMin) next.set('avaliacao_min', String(avaliacaoMin));
    if (inclusivo) next.set('inclusivo', 'true');
    setSearchParams(next);
  };

  const toggleEsp = (id) => {
    setEspecialidadesSel((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <form
        onSubmit={aplicarBusca}
        className="flex flex-col gap-2 rounded-2xl border border-cream-300/80 bg-white p-2 shadow-sm md:flex-row md:items-center"
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
        <button className="rounded-xl bg-coral-500 px-6 py-3 text-sm font-medium text-white hover:bg-coral-600">
          🔍 Buscar
        </button>
      </form>

      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-5 rounded-2xl border border-cream-300/60 bg-white p-5">
          <div className="flex items-center gap-2 text-sm font-medium text-ink-900">
            <span>⚙</span> Filtros
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-wide text-ink-400">Especialidade</p>
            <div className="flex flex-wrap gap-2">
              {especialidades.map((e) => {
                const id = e.id || e.nome;
                const ativo = especialidadesSel.includes(id);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleEsp(id)}
                    className={`rounded-full px-3 py-1 text-xs transition ${
                      ativo
                        ? 'bg-coral-500 text-white'
                        : 'border border-cream-300 text-ink-700 hover:border-coral-300'
                    }`}
                  >
                    {e.nome} {ativo && '×'}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-wide text-ink-400">Avaliação mínima</p>
            <div className="flex gap-2">
              {AVALIACOES_OPCOES.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setAvaliacaoMin(avaliacaoMin === v ? 0 : v)}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    avaliacaoMin === v
                      ? 'border-coral-500 bg-coral-50 text-coral-700'
                      : 'border-cream-300 text-ink-700'
                  }`}
                >
                  ★ {v}+
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={inclusivo}
              onChange={(e) => setInclusivo(e.target.checked)}
              className="h-4 w-4 rounded border-cream-300 text-coral-500 focus:ring-coral-500"
            />
            <span className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-2 py-0.5 text-xs text-cyan-700">
              💙 Atendimento Inclusivo
            </span>
          </label>

          <button
            type="button"
            onClick={aplicarBusca}
            className="w-full rounded-lg border border-cream-300 px-3 py-2 text-sm text-ink-700 hover:border-coral-300"
          >
            Aplicar filtros
          </button>
        </aside>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-ink-700">
              <strong>{resultados.length}</strong> profissionais encontrados
              {carregando && <span className="ml-2 text-ink-400">carregando...</span>}
            </p>
            <select
              value={ordenar}
              onChange={(e) => setOrdenar(e.target.value)}
              className="rounded-lg border border-cream-300 bg-white px-3 py-1.5 text-sm text-ink-700"
            >
              <option value="relevancia">Mais relevantes</option>
              <option value="avaliacao">Melhor avaliados</option>
              <option value="preco_asc">Menor preço</option>
              <option value="preco_desc">Maior preço</option>
            </select>
          </div>

          {resultados.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-cream-300 bg-white p-12 text-center text-ink-500">
              Nenhum profissional encontrado. Tente ajustar os filtros.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {resultados.map((p) => (
                <ProfessionalCard key={p.id} profissional={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
