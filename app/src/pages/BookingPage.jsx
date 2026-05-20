import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';
import { bookings, payments, users } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const PASSOS = ['Serviço', 'Data', 'Horário', 'Confirmação', 'Pagamento'];

const HORARIOS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

function StepIndicator({ passo }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {PASSOS.map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
              i + 1 <= passo
                ? 'bg-coral-500 text-white'
                : 'border border-cream-300 bg-white text-ink-400'
            }`}
          >
            {i + 1}
          </span>
          {i < PASSOS.length - 1 && (
            <span className={`h-px w-8 ${i + 1 < passo ? 'bg-coral-500' : 'bg-cream-300'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function BookingPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const servicoIdInicial = searchParams.get('servicoId');
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [profissional, setProfissional] = useState(null);
  const [carregandoProf, setCarregandoProf] = useState(true);
  const [passo, setPasso] = useState(1);
  const [servicoSel, setServicoSel] = useState(servicoIdInicial || null);
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    setCarregandoProf(true);
    users.perfil(id).then((d) => d && setProfissional(d)).catch(() => setProfissional(null)).finally(() => setCarregandoProf(false));
  }, [id]);

  const servico = useMemo(
    () => profissional?.servicos?.find((s) => s.id === servicoSel),
    [profissional, servicoSel]
  );

  const proximoHabilitado =
    (passo === 1 && servico) ||
    (passo === 2 && data) ||
    (passo === 3 && hora) ||
    passo === 4 ||
    passo === 5;

  const avancar = async () => {
    if (passo === 4) {
      if (!usuario) {
        navigate('/entrar', { state: { from: { pathname: window.location.pathname } } });
        return;
      }
      setEnviando(true);
      setErro('');
      try {
        const resp = await bookings.criar({
          profissionalId: profissional.id,
          servicoId: servico.id,
          data,
          hora,
        });
        if (!resp?.id) throw new Error('Falha ao criar agendamento');
        setBookingId(resp.id);
        setPasso(5);
      } catch (e) {
        setErro(e?.message || 'Erro ao criar agendamento');
        return;
      } finally {
        setEnviando(false);
      }
      return;
    }

    if (passo === 5) {
      // Agendamento já foi criado no passo 4
      // Apenas redireciona para home com sucesso
      navigate('/', { replace: true });
      return;
    }
    setPasso(passo + 1);
  };

  const voltar = () => {
    if (passo === 1) navigate(-1);
    else setPasso(passo - 1);
  };

  if (carregandoProf) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-8">
        <div className="mt-6 rounded-2xl border border-cream-300/60 bg-white p-6 text-center text-ink-500">Carregando...</div>
      </div>
    );
  }

  if (!profissional) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-8">
        <Link to="/buscar" className="text-sm text-ink-500 hover:text-coral-500">
          ‹ Voltar à busca
        </Link>
        <div className="mt-6 rounded-2xl border border-cream-300/60 bg-white p-6 text-center text-ink-500">Profissional não encontrado</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <Link to={`/profissional/${id}`} className="text-sm text-ink-500 hover:text-coral-500">
        ‹ Voltar ao perfil
      </Link>
      <h1 className="mt-3 font-display text-3xl text-ink-900">Agenda com {profissional.nome}</h1>
      <div className="mt-5">
        <StepIndicator passo={passo} />
      </div>

      <div className="mt-6 rounded-2xl border border-cream-300/60 bg-white p-6">
        {passo === 1 && (
          <>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-ink-900">
              <span>✂</span> Escolha o serviço
            </div>
            <div className="space-y-2">
              {(profissional.servicos || []).map((s) => (
                <button
                  key={s.id}
                  onClick={() => setServicoSel(s.id)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                    servicoSel === s.id
                      ? 'border-coral-500 bg-coral-50'
                      : 'border-cream-300 bg-white hover:border-coral-300'
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium text-ink-900">{s.nome}</p>
                    <p className="text-xs text-ink-500">{s.duracao}</p>
                  </div>
                  <span className="text-sm font-semibold text-ink-900">R$ {s.preco}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {passo === 2 && (
          <>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-ink-900">
              <span>📅</span> Escolha a data
            </div>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full rounded-lg border border-cream-300 bg-white px-3 py-2 text-sm"
            />
          </>
        )}

        {passo === 3 && (
          <>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-ink-900">
              <span>🕐</span> Escolha o horário
            </div>
            <div className="grid grid-cols-3 gap-2">
              {HORARIOS.map((h) => (
                <button
                  key={h}
                  onClick={() => setHora(h)}
                  className={`rounded-lg border px-3 py-2 text-sm ${
                    hora === h
                      ? 'border-coral-500 bg-coral-50 text-coral-700'
                      : 'border-cream-300 text-ink-700 hover:border-coral-300'
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </>
        )}

        {passo === 4 && (
          <>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-ink-900">
              <span>✓</span> Confirme seu agendamento
            </div>
            <dl className="space-y-2 text-sm text-ink-700">
              <div className="flex justify-between border-b border-cream-200 pb-2">
                <dt className="text-ink-500">Profissional</dt>
                <dd>{profissional.nome}</dd>
              </div>
              <div className="flex justify-between border-b border-cream-200 pb-2">
                <dt className="text-ink-500">Serviço</dt>
                <dd>{servico?.nome}</dd>
              </div>
              <div className="flex justify-between border-b border-cream-200 pb-2">
                <dt className="text-ink-500">Data</dt>
                <dd>{data}</dd>
              </div>
              <div className="flex justify-between border-b border-cream-200 pb-2">
                <dt className="text-ink-500">Horário</dt>
                <dd>{hora}</dd>
              </div>
              <div className="flex justify-between pt-2 text-base font-semibold text-ink-900">
                <dt>Total</dt>
                <dd>R$ {servico?.preco}</dd>
              </div>
            </dl>
          </>
        )}

        {passo === 5 && (
          <>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-ink-900">
              <span>💳</span> Confirmação
            </div>
            <p className="text-sm text-ink-700">
              Agendamento de <strong>{servico?.nome}</strong> com <strong>{profissional.nome}</strong> confirmado!
            </p>
            <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              ✓ O pagamento de <strong>R$ {servico?.preco}</strong> será realizado no local no dia {data} às {hora}.
            </p>
          </>
        )}

        {erro && <p className="mt-3 text-sm text-coral-700">{erro}</p>}

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={voltar}
            disabled={enviando}
            className="text-sm text-ink-500 hover:text-coral-500"
          >
            ‹ Voltar
          </button>
          <button
            disabled={!proximoHabilitado || enviando}
            onClick={avancar}
            className="rounded-lg bg-coral-500 px-6 py-2 text-sm font-medium text-white hover:bg-coral-600 disabled:cursor-not-allowed disabled:bg-coral-200"
          >
            {enviando ? 'Processando...' : passo === 5 ? 'Finalizar agendamento' : 'Continuar'}
          </button>
        </div>
      </div>
    </div>
  );
}
