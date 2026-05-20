import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { bookings, users } from '../lib/api';

export default function UserDashboard() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [aba, setAba] = useState('agendamentos');
  const [agendamentos, setAgendamentos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!usuario) {
      navigate('/entrar', { replace: true });
      return;
    }

    carregarDados();
  }, [usuario, navigate, aba]);

  const carregarDados = async () => {
    setCarregando(true);
    try {
      if (aba === 'agendamentos') {
        const data = await bookings.listar();
        setAgendamentos(data || []);
      } else {
        const data = await users.listarFavoritos();
        setFavoritos(data || []);
      }
    } catch (err) {
      console.error('Erro ao carregar:', err);
    } finally {
      setCarregando(false);
    }
  };

  const cancelarAgendamento = async (id) => {
    if (!confirm('Tem certeza que deseja cancelar este agendamento?')) return;
    
    try {
      await bookings.cancelar(id);
      setAgendamentos(agendamentos.filter(a => a.id !== id));
    } catch (err) {
      console.error('Erro ao cancelar:', err);
      alert('Erro ao cancelar agendamento');
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="border-b border-cream-300 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-ink-900">Meu Perfil</h1>
              <p className="text-sm text-ink-500">{usuario?.email}</p>
            </div>
            <button
              onClick={logout}
              className="rounded-lg bg-coral-500 px-4 py-2 text-sm text-white hover:bg-coral-600"
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Abas */}
      <div className="border-b border-cream-300 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setAba('agendamentos')}
              className={`py-4 font-medium transition-colors ${
                aba === 'agendamentos'
                  ? 'border-b-2 border-coral-500 text-coral-600'
                  : 'text-ink-500 hover:text-ink-900'
              }`}
            >
              📅 Meus Agendamentos ({agendamentos.length})
            </button>
            <button
              onClick={() => setAba('favoritos')}
              className={`py-4 font-medium transition-colors ${
                aba === 'favoritos'
                  ? 'border-b-2 border-coral-500 text-coral-600'
                  : 'text-ink-500 hover:text-ink-900'
              }`}
            >
              ❤️ Meus Favoritos ({favoritos.length})
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="mx-auto max-w-4xl px-6 py-8">
        {carregando ? (
          <div className="rounded-2xl border border-cream-300/60 bg-white p-6 text-center text-ink-500">
            Carregando...
          </div>
        ) : aba === 'agendamentos' ? (
          <div>
            {agendamentos.length === 0 ? (
              <div className="rounded-2xl border border-cream-300/60 bg-white p-8 text-center">
                <p className="text-ink-500">Nenhum agendamento realizado ainda</p>
                <Link
                  to="/buscar"
                  className="mt-4 inline-block rounded-lg bg-coral-500 px-6 py-2 text-white hover:bg-coral-600"
                >
                  Buscar Profissionais
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {agendamentos.map((agendamento) => (
                  <div
                    key={agendamento.id}
                    className="rounded-xl border border-cream-300/60 bg-white p-5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-ink-900">
                            {agendamento.servico_nome || 'Serviço'}
                          </h3>
                        </div>
                        <p className="mt-2 text-sm text-ink-700">
                          <strong>Profissional:</strong>{' '}
                          <Link
                            to={`/profissional/${agendamento.profissional_id}`}
                            className="text-coral-600 hover:text-coral-700 underline"
                          >
                            {agendamento.profissional_nome || 'Profissional'}
                          </Link>
                        </p>
                        <p className="mt-1 text-sm text-ink-500">
                          📅 {new Date(agendamento.data_hora).toLocaleDateString('pt-BR')}
                        </p>
                        <p className="text-sm text-ink-500">
                          🕐 {new Date(agendamento.data_hora).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      {agendamento.status !== 'cancelado' && (
                        <button
                          onClick={() => cancelarAgendamento(agendamento.id)}
                          className="rounded-lg bg-red-100 px-3 py-1.5 text-xs text-red-700 hover:bg-red-200 ml-4"
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {favoritos.length === 0 ? (
              <div className="rounded-2xl border border-cream-300/60 bg-white p-8 text-center">
                <p className="text-ink-500">Ainda não há favoritos</p>
                <Link
                  to="/buscar"
                  className="mt-4 inline-block rounded-lg bg-coral-500 px-6 py-2 text-white hover:bg-coral-600"
                >
                  Buscar Profissionais
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {favoritos.map((profissional) => (
                  <div
                    key={profissional.id}
                    className="rounded-xl border border-cream-300/60 bg-white p-5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-ink-900">
                          {profissional.nome}
                        </h3>
                        <p className="mt-1 text-sm text-ink-500">
                          📍 {profissional.cidade}
                        </p>
                        <p className="text-sm text-ink-500">
                          ⭐ {profissional.avaliacao_media || 'Sem avaliações'}
                        </p>
                      </div>
                      <Link
                        to={`/profissional/${profissional.id}`}
                        className="rounded-lg bg-coral-500 px-4 py-2 text-sm text-white hover:bg-coral-600"
                      >
                        Ver Perfil
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="mt-8 border-t border-cream-300 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <Link to="/" className="text-sm text-ink-500 hover:text-coral-500">
            ‹ Voltar para Home
          </Link>
        </div>
      </div>
    </div>
  );
}
