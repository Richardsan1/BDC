import { Link, NavLink, useNavigate } from 'react-router';
import Logo from './Logo';
import Avatar from './Avatar';
import { useAuth } from '../context/AuthContext';

export default function Header({ admin = false }) {
  const { usuario, sair } = useAuth();
  const navigate = useNavigate();

  const handleSair = async () => {
    await sair();
    navigate('/');
  };

  return (
    <header className="border-b border-cream-300/60 bg-cream-100/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Logo admin={admin} />
          {!admin && (
            <nav className="hidden gap-6 text-sm text-ink-700 md:flex">
              <NavLink to="/buscar" className="hover:text-coral-500">
                Buscar
              </NavLink>
              <NavLink to="/sobre" className="hover:text-coral-500">
                Sobre
              </NavLink>
              {usuario && (
                <NavLink to="/meus-agendamentos" className="hover:text-coral-500">
                  📅 Meus Agendamentos
                </NavLink>
              )}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!usuario && (
            <>
              <Link to="/entrar" className="text-sm text-ink-700 hover:text-coral-500">
                Entrar
              </Link>
              <Link
                to="/cadastrar"
                className="rounded-lg bg-coral-500 px-4 py-2 text-sm font-medium text-white hover:bg-coral-600"
              >
                Cadastrar
              </Link>
            </>
          )}
          {usuario && (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-ink-700 sm:inline">
                {usuario.tipo === 'admin' ? 'Admin' : `Olá, ${usuario.nome || usuario.email}`}
              </span>
              <Link
                to="/meu-perfil"
                title="Meu Perfil"
                className="rounded-lg hover:bg-cream-200 transition-colors"
              >
                <Avatar
                  iniciais={(usuario.nome || usuario.email || 'U').slice(0, 2).toUpperCase()}
                  size="sm"
                />
              </Link>
              <button
                onClick={handleSair}
                className="text-xs text-ink-500 hover:text-coral-500 ml-2"
                title="Sair"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
