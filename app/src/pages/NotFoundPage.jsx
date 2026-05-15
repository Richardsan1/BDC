import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-24 text-center">
      <p className="font-display text-6xl text-coral-300">404</p>
      <h1 className="mt-3 text-2xl text-ink-900">Página não encontrada</h1>
      <p className="mt-2 text-sm text-ink-500">
        A página que você buscou não existe ou foi movida.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-lg bg-coral-500 px-4 py-2 text-sm text-white hover:bg-coral-600"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
