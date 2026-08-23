import { useNavigate } from 'react-router';
import { Heart, Calendar, CheckCircle } from 'lucide-react';
import { novenasData } from '../data/novenas';
import { useNovenaProgress } from '../hooks/useNovenaProgress';
import { useAuth } from '../../auth/hooks/useAuth';
import { getNovenaProgressStatus } from '../utils/progressStatus';
import { FeatureIntroCard, FeaturePageHeader } from '../../../shared/components/FeaturePageShell';

function NovenaCard({
  novena,
  isAuthenticated,
}: {
  novena: (typeof novenasData)[number];
  isAuthenticated: boolean;
}) {
  const navigate = useNavigate();
  const { completedDays, progressPercentage, syncStatus } = useNovenaProgress(novena.id);
  const percentage = progressPercentage(novena.duracao);
  const progressStatus = getNovenaProgressStatus(syncStatus, isAuthenticated);

  return (
    <div
      onClick={() => navigate(`/novenas/${novena.id}`)}
      className="group cursor-pointer rounded-[1.5rem] bg-church-bg-secondary p-5 shadow-md shadow-church-bg-darker/10 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-church-bg-darker/15 sm:p-6"
    >
      <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-church-bg text-church-accent-hover shadow-sm transition-transform group-hover:scale-105">
          <Heart className="w-6 h-6 text-church-accent-hover" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-serif text-church-accent mb-2 group-hover:text-church-accent-hover transition-colors">
            {novena.titulo}
          </h3>
          <p className="text-church-text/60 text-sm mb-3 line-clamp-2">{novena.descricao}</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-church-text/40">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{novena.duracao} dias</span>
            </div>
            {completedDays.length > 0 && (
              <div className="flex items-center gap-1 text-church-accent font-medium">
                <CheckCircle className="w-4 h-4" />
                <span>
                  {completedDays.length}/{novena.duracao} concluídos
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Barra de progresso minimalista */}
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-church-bg shadow-inner">
        <div
          className="bg-church-accent-hover h-full transition-all duration-500 opacity-80"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className={`mt-4 rounded-md border px-3 py-2 text-xs ${progressStatus.className}`}>
        {progressStatus.text}
      </p>
    </div>
  );
}

export function NovenasPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-church-bg text-church-text font-sans">
      <FeaturePageHeader
        icon={Heart}
        title="Novenas"
        subtitle="Nove dias de oração com progresso salvo para acompanhar sua perseverança."
        onBack={() => navigate('/igreja')}
      />

      <FeatureIntroCard
        imageSrc="https://images.unsplash.com/photo-1559536454-5a69386e8075?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBpbnRlcmlvciUyMGNhbmRsZXN8ZW58MXx8fHwxNzczNDA5ODYyfDA&ixlib=rb-4.1.0&q=80&w=1080"
        imageAlt="Velas na Igreja"
        title="Perseverar na oração"
      >
          <p className="font-serif text-base italic leading-relaxed text-church-text/80 md:text-lg">
            As novenas são orações feitas durante nove dias consecutivos, buscando a intercessão de
            Jesus, Maria ou dos santos. Esta prática antiga da Igreja nos ajuda a perseverar na
            oração e demonstrar nossa fé e confiança em Deus.
          </p>
      </FeatureIntroCard>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {novenasData.map((novena) => (
            <NovenaCard key={novena.id} novena={novena} isAuthenticated={isAuthenticated} />
          ))}
        </div>
      </div>
    </div>
  );
}
