export default function StatsCard({ icon, label, value, delta }) {
  return (
    <div className="rounded-xl border border-cream-300/60 bg-white p-4">
      <div className="flex items-start justify-between">
        <span className="text-ink-400">{icon}</span>
        {delta !== undefined && (
          <span
            className={`text-xs ${delta >= 0 ? 'text-mint-600' : 'text-coral-700'}`}
          >
            {delta >= 0 ? '↗' : '↘'} {delta >= 0 ? '+' : ''}
            {delta}%
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-semibold text-ink-900">{value}</p>
      <p className="text-xs text-ink-500">{label}</p>
    </div>
  );
}
