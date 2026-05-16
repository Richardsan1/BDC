import { Link } from 'react-router';
import Tag from './Tag';

export default function ProfessionalCard({ profissional }) {
  const {
    id,
    nome,
    iniciais,
    subtitulo,
    cidade,
    avaliacao,
    totalAvaliacoes,
    inclusivo,
    tags = [],
    precoMin,
    precoMax,
  } = profissional;

  return (
    <Link
      to={`/profissional/${id}`}
      className="group block overflow-hidden rounded-2xl border border-cream-300/60 bg-white transition hover:border-coral-300 hover:shadow-sm"
    >
      <div className="relative flex h-48 items-center justify-center bg-cream-200">
        {inclusivo && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-cyan-50 px-2.5 py-1 text-xs text-cyan-700">
            💙 Inclusivo
          </span>
        )}
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink-400 hover:text-coral-500"
          title="Salvar"
        >
          ♡
        </button>
        <span className="font-display text-5xl text-ink-300">{iniciais}</span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg leading-tight text-ink-900">{nome}</h3>
            <p className="text-sm text-ink-500">{subtitulo}</p>
          </div>
          <div className="whitespace-nowrap text-sm">
            <span className="text-amber-500">★</span> {avaliacao}{' '}
            {totalAvaliacoes && <span className="text-ink-400">({totalAvaliacoes})</span>}
          </div>
        </div>
        {cidade && (
          <div className="mt-1 flex items-center gap-1 text-xs text-ink-500">
            <span>📍</span>
            {cidade}
          </div>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {tags.slice(0, 3).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
          {precoMin && precoMax && (
            <span className="ml-auto text-xs text-ink-500">
              R$ {precoMin}–{precoMax}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
