import { Link } from 'react-router';

export default function Logo({ admin = false }) {
  return (
    <Link to="/" className="inline-flex items-center gap-2 font-display text-2xl text-ink-900">
      <span>Beleza</span>
      <span className="text-coral-500">Inclusiva</span>
      {admin && (
        <span className="ml-1 rounded bg-ink-900 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-cream-100">
          ADMIN
        </span>
      )}
    </Link>
  );
}
