import { useParams, useNavigate } from 'react-router';
import { CheckCircle, Circle, Heart } from 'lucide-react';
import { novenasData } from '../data/novenas';
import { useNovenaProgress } from '../hooks/useNovenaProgress';
import { useEffect } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { getNovenaProgressStatus } from '../utils/progressStatus';
import { FeaturePageHeader } from '../../../shared/components/FeaturePageShell';

export function NovenaDia() {
  const { id, dia } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dia]);

  const numDia = Number(dia);
  const novena = novenasData.find((n) => n.id === id);
  const { isAuthenticated } = useAuth();
  const { isDayCompleted, toggleDay, syncStatus } = useNovenaProgress(id || '');

  if (!novena || !dia) {
    return (
      <div className="min-h-screen bg-church-bg p-6 text-church-text">
        Novena ou dia não encontrado.
      </div>
    );
  }

  const diaInfo = novena.dias.find((d) => d.dia === numDia);
  if (!diaInfo) {
    return <div className="min-h-screen bg-church-bg p-6 text-church-text">Dia inválido.</div>;
  }

  const completed = isDayCompleted(numDia);
  const isLastDay = numDia === novena.duracao;
  const progressStatus = getNovenaProgressStatus(syncStatus, isAuthenticated);

  const handleComplete = () => {
    if (!completed) toggleDay(numDia);

    if (isLastDay) {
      navigate(`/novenas/${id}`);
    } else {
      navigate(`/novenas/${id}/dia/${numDia + 1}`);
    }
  };

  return (
    <div className="min-h-screen bg-church-bg text-church-text font-sans pb-40 sm:pb-32">
      <FeaturePageHeader
        icon={Heart}
        title={`Dia ${diaInfo.dia} - ${diaInfo.titulo}`}
        subtitle={`${diaInfo.dia} de ${novena.duracao} • ${novena.titulo}`}
        backLabel="Voltar para a novena"
        onBack={() => navigate(`/novenas/${id}`)}
        maxWidthClassName="max-w-3xl"
      />

      <div className="mx-auto max-w-3xl px-4 pt-6">
        <div className="rounded-[1.5rem] bg-church-bg-secondary p-4 shadow-md shadow-church-bg-darker/10">
          <p className={`mt-4 rounded-md border px-3 py-2 text-xs ${progressStatus.className}`}>
            {progressStatus.text}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        {novena.id === 'divina-misericordia' && (
          <div className="mb-8 rounded-[1.5rem] bg-church-bg-secondary p-4 text-center text-sm text-church-accent shadow-md shadow-church-bg-darker/10 md:text-base">
            <span className="font-medium block mb-1">
              Se possível, segure o terço em suas mãos.
            </span>
            A oração com o terço físico ajuda na concentração, no ritmo e na meditação dos
            mistérios.
          </div>
        )}

        <div className="space-y-10 md:space-y-12">
          {/* Oração Inicial */}
          <section className="rounded-[1.5rem] bg-church-bg-secondary p-5 shadow-md shadow-church-bg-darker/10 md:p-6">
            <h3 className="text-sm uppercase mb-4 font-bold flex items-center gap-2 text-church-accent-hover/80">
              <span className="w-8 h-px bg-church-accent-hover/30"></span>
              Oração Inicial
              <span className="w-8 h-px bg-church-accent-hover/30"></span>
            </h3>
            <div className="whitespace-pre-line leading-relaxed italic text-lg text-church-text">
              {novena.oracaoInicial}
            </div>
          </section>

          {/* Oração Principal da Novena */}
          <section className="rounded-[1.5rem] bg-church-bg-secondary p-5 shadow-md shadow-church-bg-darker/10 md:p-6">
            <h3 className="text-sm uppercase mb-4 font-bold flex items-center gap-2 text-church-accent-hover/80">
              <span className="w-8 h-px bg-church-accent-hover/30"></span>
              Oração Principal
              <span className="w-8 h-px bg-church-accent-hover/30"></span>
            </h3>
            <div className="whitespace-pre-line leading-relaxed italic text-lg text-church-text">
              {novena.oracaoPrincipal}
            </div>
          </section>

          {/* Meditação e Oração do Dia */}
          <section className="relative overflow-hidden rounded-[1.5rem] bg-church-bg-tertiary p-6 shadow-lg shadow-church-bg-darker/10 md:p-8">
            <h3 className="text-sm uppercase mb-2 font-bold text-church-accent/80">
              Meditação do Dia
            </h3>
            <p className="text-lg md:text-xl mb-8 leading-relaxed font-serif text-church-text">
              {diaInfo.meditacao}
            </p>

            <h3 className="text-sm uppercase mb-4 font-bold text-church-accent/80">
              Oração do Dia
            </h3>
            <div className="whitespace-pre-line leading-relaxed italic text-xl text-church-text/90">
              {diaInfo.oracao}
            </div>
          </section>

          {/* Oração Final */}
          <section className="mb-12 rounded-[1.5rem] bg-church-bg-secondary p-5 shadow-md shadow-church-bg-darker/10 md:p-6">
            <h3 className="text-sm uppercase mb-4 font-bold flex items-center gap-2 text-church-accent-hover/80">
              <span className="w-8 h-px bg-church-accent-hover/30"></span>
              Oração Final
              <span className="w-8 h-px bg-church-accent-hover/30"></span>
            </h3>
            <div className="whitespace-pre-line leading-relaxed italic text-lg text-church-text">
              {novena.oracaoFinal}
            </div>
          </section>
        </div>
      </div>

      {/* Botão Fixo Embaixo para Concluir */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-church-border bg-church-bg/95 p-4 backdrop-blur-md">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={() => toggleDay(numDia)}
            className={`flex-1 rounded-full py-4 flex items-center justify-center gap-2 font-medium transition-all
              ${
                completed
                  ? 'bg-church-bg-secondary text-church-accent hover:bg-church-bg-darker'
                  : 'bg-church-bg-darker text-church-text/50 hover:bg-church-bg-secondary'
              }`}
          >
            {completed ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
            {completed ? 'Marcado como Concluído' : 'Marcar como Concluído'}
          </button>

          <button
            onClick={handleComplete}
            className="flex-1 rounded-full bg-church-accent py-4 font-medium text-church-bg shadow-sm transition-colors hover:bg-church-accent-hover"
          >
            {isLastDay ? 'Finalizar Novena' : 'Próximo Dia'}
          </button>
        </div>
      </div>
    </div>
  );
}
