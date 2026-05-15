import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const TIPOS = [
  { id: 'cliente', titulo: 'Cliente', desc: 'Quero buscar e agendar profissionais.' },
  { id: 'profissional', titulo: 'Profissional', desc: 'Sou um cabeleireiro autônomo.' },
  { id: 'salao', titulo: 'Salão', desc: 'Represento um salão de beleza.' },
];

export default function RegisterPage() {
  const { registrar, login } = useAuth();
  const navigate = useNavigate();

  const [tipo, setTipo] = useState('cliente');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [enviando, setEnviando] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    setEnviando(true);
    try {
      await registrar({ email, senha, tipo, nome });
      if (tipo === 'cliente') {
        await login(email, senha);
        navigate('/');
      } else {
        setSucesso('Cadastro recebido. Aguardando aprovação da equipe.');
      }
    } catch (err) {
      setErro(err.message || 'Não foi possível cadastrar.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-6 py-16">
      <div className="text-center">
        <h1 className="font-display text-3xl text-ink-900">Crie sua conta</h1>
        <p className="mt-1 text-sm text-ink-500">Junte-se à comunidade BelezaInclusiva</p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-2xl border border-cream-300/60 bg-white p-6"
      >
        <div>
          <span className="text-sm text-ink-700">Eu sou</span>
          <div className="mt-2 grid gap-2">
            {TIPOS.map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => setTipo(t.id)}
                className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                  tipo === t.id
                    ? 'border-coral-500 bg-coral-50'
                    : 'border-cream-300 bg-white hover:border-coral-300'
                }`}
              >
                <p className="font-medium text-ink-900">{t.titulo}</p>
                <p className="text-xs text-ink-500">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="text-sm text-ink-700">Nome</span>
          <input
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="mt-1 w-full rounded-lg border border-cream-300 bg-white px-3 py-2 text-sm outline-none focus:border-coral-500"
          />
        </label>

        <label className="block">
          <span className="text-sm text-ink-700">E-mail</span>
          <input
            type="email"
            required
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
            minLength={6}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="mt-1 w-full rounded-lg border border-cream-300 bg-white px-3 py-2 text-sm outline-none focus:border-coral-500"
          />
        </label>

        {erro && (
          <p className="rounded-lg bg-coral-50 px-3 py-2 text-sm text-coral-700">{erro}</p>
        )}
        {sucesso && (
          <p className="rounded-lg bg-mint-100 px-3 py-2 text-sm text-mint-600">{sucesso}</p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-lg bg-coral-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-coral-600 disabled:bg-coral-200"
        >
          {enviando ? 'Enviando...' : 'Criar conta'}
        </button>

        <p className="text-center text-sm text-ink-500">
          Já tem conta?{' '}
          <Link to="/entrar" className="text-coral-500 hover:underline">
            Entre
          </Link>
        </p>
      </form>
    </div>
  );
}
