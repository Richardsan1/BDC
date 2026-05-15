import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setEnviando(true);
    try {
      const usuario = await login(email, senha);
      const destino = location.state?.from?.pathname;
      if (destino) navigate(destino, { replace: true });
      else if (usuario.tipo === 'admin') navigate('/admin');
      else if (usuario.tipo === 'profissional' || usuario.tipo === 'salao') navigate('/painel');
      else navigate('/');
    } catch (err) {
      setErro(err.message || 'Não foi possível entrar.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-6 py-16">
      <div className="text-center">
        <h1 className="font-display text-3xl text-ink-900">Bem-vindo de volta</h1>
        <p className="mt-1 text-sm text-ink-500">Entre na sua conta BelezaInclusiva</p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-2xl border border-cream-300/60 bg-white p-6"
      >
        <label className="block">
          <span className="text-sm text-ink-700">E-mail</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-cream-300 bg-white px-3 py-2 text-sm outline-none focus:border-coral-500"
          />
        </label>
        <label className="block">
          <span className="text-sm text-ink-700">Senha</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="mt-1 w-full rounded-lg border border-cream-300 bg-white px-3 py-2 text-sm outline-none focus:border-coral-500"
          />
        </label>

        {erro && (
          <p className="rounded-lg bg-coral-50 px-3 py-2 text-sm text-coral-700">{erro}</p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-lg bg-coral-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-coral-600 disabled:bg-coral-200"
        >
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="text-center text-sm text-ink-500">
          Ainda não tem conta?{' '}
          <Link to="/cadastrar" className="text-coral-500 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}
