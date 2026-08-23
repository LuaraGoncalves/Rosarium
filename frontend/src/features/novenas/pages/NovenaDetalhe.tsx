import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Heart, CheckCircle, Circle } from 'lucide-react';
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

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="grid gap-4">
          {novena.dias.map((diaInfo) => {
            const isCompleted = completedDays.includes(diaInfo.dia);

            return (
              <div
                key={diaInfo.dia}
                onClick={() => navigate(`/novenas/${novena.id}/dia/${diaInfo.dia}`)}
                className={`flex cursor-pointer items-center gap-4 rounded-[1.25rem] p-4 shadow-sm transition-all md:p-5
                  ${
                    isCompleted
                      ? 'bg-church-bg-darker opacity-55 hover:opacity-75'
                      : 'bg-church-bg-secondary hover:-translate-y-0.5 hover:shadow-md hover:shadow-church-bg-darker/10'
                  }`}
              >
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-church-accent-hover/50" />
                  ) : (
                    <Circle className="w-6 h-6 text-church-text/30" />
                  )}
                </div>
                <div>
                  <h3
                    className={`font-medium transition-colors duration-700 
                    ${isCompleted ? 'text-church-text/40 line-through decoration-[#F5E6D3]/20' : 'text-church-text'}`}
                  >
                    Dia {diaInfo.dia} - {diaInfo.titulo}
                  </h3>
                  <p className="text-sm mt-1 line-clamp-1 text-church-text/60">
                    {diaInfo.meditacao}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
