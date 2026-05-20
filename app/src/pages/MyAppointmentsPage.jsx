import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { bookings } from '../lib/api';

export default function MyAppointmentsPage() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!usuario) {
      navigate('/entrar', { replace: true });
      return;
    }

    carregarAgendamentos();
  }, [usuario, navigate]);

  const carregarAgendamentos = async () => {
    setCarregando(true);
    try {
      const data = await bookings.listar();
      setAgendamentos(data || []);
    } catch (err) {
      console.error('Erro ao carregar agendamentos:', err);
    } finally {
      setCarregando(false);
    }
  };

  const cancelarAgendamento = async (id) => {
    if (!confirm('Tem certeza que deseja cancelar este agendamento?')) return;

    try {
      await bookings.cancelar(id);
      setAgendamentos(agendamentos.filter((a) => a.id !== id));
    } catch (err) {
      console.error('Erro ao cancelar:', err);
      alert('Erro ao cancelar agendamento');
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="border-b border-cream-300 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link to="/" className="text-sm text-ink-500 hover:text-coral-500 mb-4 inline-block">
            ‹ Voltar para Home
          </Link>
          <h1 className="text-3xl font-bold text-ink-900">Meus Agendamentos</h1>
          <p className="mt-2 text-sm text-ink-500">Visualize e gerencie todos os seus agendamentos</p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="mx-auto max-w-4xl px-6 py-8">
        {carregando ? (
          <div className="rounded-2xl border border-cream-300/60 bg-white p-6 text-center text-ink-500">
            Carregando agendamentos...
          </div>
        ) : agendamentos.length === 0 ? (
          <div className="rounded-2xl border border-cream-300/60 bg-white p-8 text-center">
            <p className="text-ink-500 mb-4">Você ainda não tem agendamentos realizados</p>
            <Link
              to="/buscar"
              className="inline-block rounded-lg bg-coral-500 px-6 py-2 text-white hover:bg-coral-600"
            >
              Buscar Profissionais
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {agendamentos.map((agendamento) => (
              <div
                key={agendamento.id}
                className="rounded-xl border border-cream-300/60 bg-white p-6 hover:border-coral-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-ink-900">
                      {agendamento.servico_nome || 'Serviço'}
                    </h3>

                    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                      <div>
                        <p className="text-xs text-ink-500 uppercase tracking-wide">Profissional</p>
                        <Link
                          to={`/profissional/${agendamento.profissional_id}`}
                          className="text-base font-medium text-coral-600 hover:text-coral-700 underline"
                        >
                          {agendamento.profissional_nome || 'Profissional'}
                        </Link>
                      </div>

                      <div>
                        <p className="text-xs text-ink-500 uppercase tracking-wide">Data</p>
                        <p className="text-base font-medium text-ink-900">
                          📅 {new Date(agendamento.data_hora).toLocaleDateString('pt-BR')}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-ink-500 uppercase tracking-wide">Horário</p>
                        <p className="text-base font-medium text-ink-900">
                          🕐 {new Date(agendamento.data_hora).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-ink-500 uppercase tracking-wide">Tipo de Serviço</p>
                        <p className="text-base font-medium text-ink-900">
                          ✂️ {agendamento.servico_nome || 'Serviço'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {agendamento.status !== 'cancelado' && (
                    <button
                      onClick={() => cancelarAgendamento(agendamento.id)}
                      className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 transition-colors whitespace-nowrap"
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
    </div>
  );
}
