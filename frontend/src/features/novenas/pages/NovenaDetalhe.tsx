import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, ArrowUpRight, Heart, CheckCircle, Circle } from 'lucide-react';
import { novenasData } from '../data/novenas';
import { useNovenaProgress } from '../hooks/useNovenaProgress';
import { useAuth } from '../../auth/hooks/useAuth';
import { getNovenaProgressStatus } from '../utils/progressStatus';
import { FeaturePageHeader } from '../../../shared/components/FeaturePageShell';

export function NovenaDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const novena = novenasData.find((n) => n.id === id);
  const { isAuthenticated } = useAuth();
  const { completedDays, progressPercentage, syncStatus } = useNovenaProgress(id || '');

  if (!novena) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-church-bg text-church-text">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-church-accent mb-4">Novena não encontrada</h2>
          <button
            onClick={() => navigate('/novenas')}
            className="mx-auto flex items-center gap-2 text-church-text-secondary hover:text-church-accent"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para Novenas
          </button>
        </div>
      </div>
    );
  }

  const percentage = progressPercentage(novena.duracao);
  const progressStatus = getNovenaProgressStatus(syncStatus, isAuthenticated);

  return (
    <div className="min-h-screen bg-church-bg text-church-text font-sans">
      <FeaturePageHeader
        icon={Heart}
        title={novena.titulo}
        subtitle={novena.descricao}
        onBack={() => navigate('/novenas')}
        maxWidthClassName="max-w-3xl"
      />

      <div className="mx-auto max-w-3xl px-4 pt-8">
        <div className="rounded-[1.5rem] bg-church-bg-secondary p-5 shadow-md shadow-church-bg-darker/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-church-accent/80">Progresso</span>
            <span className="text-church-accent-hover font-medium">
              {percentage}% ({completedDays.length}/{novena.duracao})
            </span>
          </div>
          <div className="w-full bg-church-bg-darker h-2 rounded-full overflow-hidden border border-church-border mt-2">
            <div
              className="bg-church-accent-hover h-full transition-all duration-500 opacity-80"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className={`mt-4 rounded-md border px-3 py-2 text-xs ${progressStatus.className}`}>
            {progressStatus.text}
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-church-text-muted">Seu caminho de oração</p>
            <h2 className="font-serif text-3xl text-church-accent md:text-4xl">Nove dias, um passo de cada vez</h2>
          </div>
          <span className="hidden text-sm text-church-text-muted sm:block">{novena.duracao} dias</span>
        </div>

        <ol className="relative space-y-7 before:absolute before:bottom-8 before:left-5 before:top-8 before:w-px before:bg-church-border md:space-y-10 md:before:left-1/2">
          {novena.dias.map((diaInfo, index) => {
            const isCompleted = completedDays.includes(diaInfo.dia);
            const isLeft = index % 2 === 0;

            return (
              <li
                key={diaInfo.dia}
                className="relative pl-12 md:grid md:grid-cols-[1fr_3rem_1fr] md:gap-6 md:pl-0"
              >
                <span
                  className={`absolute left-0 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-church-bg bg-church-accent text-white shadow-sm md:static md:col-start-2 md:row-start-1 md:h-12 md:w-12 md:justify-self-center ${isCompleted ? 'bg-church-accent-hover' : ''}`}
                  aria-hidden="true"
                >
                  {diaInfo.dia}
                </span>

                <button
                  type="button"
                  onClick={() => navigate(`/novenas/${novena.id}/dia/${diaInfo.dia}`)}
                  className={`group w-full rounded-2xl border p-5 text-left shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-church-accent md:p-6 ${isLeft ? 'md:col-start-1 md:row-start-1 md:text-right' : 'md:col-start-3 md:row-start-1'} ${isCompleted ? 'border-church-accent-hover/30 bg-church-bg-darker/55' : 'border-church-border bg-church-bg-secondary hover:-translate-y-0.5 hover:shadow-md hover:shadow-church-bg-darker/10'}`}
                >
                  <div className={`flex items-start gap-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isCompleted ? 'bg-church-bg text-church-accent-hover' : 'bg-church-bg text-church-accent'}`}>
                      {isCompleted ? <CheckCircle className="h-5 w-5" aria-hidden="true" /> : <Circle className="h-5 w-5" aria-hidden="true" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block font-serif text-xl leading-tight ${isCompleted ? 'text-church-text/55 line-through decoration-church-accent/30' : 'text-church-accent group-hover:text-church-accent-hover'}`}>
                        Dia {diaInfo.dia}: {diaInfo.titulo}
                      </span>
                      <span className="mt-2 block text-sm leading-relaxed text-church-text/60">{diaInfo.meditacao}</span>
                    </span>
                    <ArrowUpRight className="mt-1 hidden h-4 w-4 shrink-0 text-church-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block" aria-hidden="true" />
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}
