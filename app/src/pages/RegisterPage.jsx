import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const TIPOS = [
  { id: 'cliente', titulo: 'Cliente', desc: 'Quero buscar e agendar profissionais.' },
  { id: 'profissional', titulo: 'Profissional', desc: 'Sou um cabeleireiro autônomo.' },
  { id: 'salao', titulo: 'Salão', desc: 'Represento um salão de beleza.' },
];

// Função para validar força da senha
const validarSenha = (senha) => {
  return {
    temMaiuscula: /[A-Z]/.test(senha),
    temMinuscula: /[a-z]/.test(senha),
    temNumero: /[0-9]/.test(senha),
    temEspecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(senha),
    temComprimento: senha.length >= 8,
  };
};

const validacaoCompleta = (validacao) => {
  return Object.values(validacao).every(v => v === true);
};

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

  const validacao = validarSenha(senha);
  const senhaForte = validacaoCompleta(validacao);

  const handleChangeSenha = (e) => {
    setSenha(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!senhaForte) {
      setErro('A senha deve conter maiúscula, minúscula, número e caractere especial (mínimo 8 caracteres).');
      return;
    }

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
            minLength={8}
            value={senha}
            onChange={handleChangeSenha}
            className="mt-1 w-full rounded-lg border border-cream-300 bg-white px-3 py-2 text-sm outline-none focus:border-coral-500"
          />
        </label>

        {senha && (
          <div className="space-y-2 rounded-lg bg-cream-50 p-3">
            <p className="text-xs font-medium text-ink-700">Requisitos da senha:</p>
            <div className="space-y-1.5">
              <RequisitoSenha atendido={validacao.temComprimento} texto="Mínimo 8 caracteres" />
              <RequisitoSenha atendido={validacao.temMaiuscula} texto="Uma letra maiúscula (A-Z)" />
              <RequisitoSenha atendido={validacao.temMinuscula} texto="Uma letra minúscula (a-z)" />
              <RequisitoSenha atendido={validacao.temNumero} texto="Um número (0-9)" />
              <RequisitoSenha atendido={validacao.temEspecial} texto="Um caractere especial (!@#$%...)" />
            </div>
          </div>
        )}

        {erro && (
          <p className="rounded-lg bg-coral-50 px-3 py-2 text-sm text-coral-700">{erro}</p>
        )}
        {sucesso && (
          <p className="rounded-lg bg-mint-100 px-3 py-2 text-sm text-mint-600">{sucesso}</p>
        )}

        <button
          type="submit"
          disabled={enviando || !senhaForte}
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

function RequisitoSenha({ atendido, texto }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full text-xs font-bold ${
          atendido ? 'bg-mint-100 text-mint-600' : 'bg-cream-200 text-cream-500'
        }`}
      >
        {atendido ? '✓' : '•'}
      </span>
      <span className={`text-xs ${atendido ? 'text-ink-700' : 'text-ink-500'}`}>{texto}</span>
    </div>
  );
}
