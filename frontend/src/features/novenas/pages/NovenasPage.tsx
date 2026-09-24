import { useNavigate } from 'react-router';
import { ArrowLeft, ArrowUpRight, Calendar, CheckCircle, Heart } from 'lucide-react';
import { novenasData } from '../data/novenas';
import { useNovenaProgress } from '../hooks/useNovenaProgress';
import { useAuth } from '../../auth/hooks/useAuth';
import { getNovenaProgressStatus } from '../utils/progressStatus';

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
  const statusClassName =
    syncStatus === 'saved'
      ? 'border-[#c99b43]/35 bg-[#c99b43]/10 text-[#f0cf83]'
      : syncStatus === 'error'
        ? 'border-red-300/30 bg-red-950/30 text-red-100'
        : 'border-white/15 bg-black/15 text-white/65';

  return (
    <button
      type="button"
      onClick={() => navigate(`/novenas/${novena.id}`)}
      className="group flex w-full flex-col rounded-2xl border border-white/15 bg-[rgba(36,20,13,.78)] p-5 text-left text-white shadow-lg shadow-black/15 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#e5bd68]/65 hover:bg-[rgba(46,25,16,.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5bd68] sm:p-6"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#c99b43]/15 text-[#e5bd68] transition-colors group-hover:bg-[#c99b43]/25">
          <Heart className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            Nove dias
          </span>
          <span className="block font-serif text-xl leading-tight text-white transition-colors group-hover:text-[#f0cf83]">
            {novena.titulo}
          </span>
          <span className="mt-2 block text-sm leading-relaxed text-white/65">
            {novena.descricao}
          </span>
        </span>
        <ArrowUpRight
          className="mt-1 h-5 w-5 shrink-0 text-white/45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#f0cf83]"
          aria-hidden="true"
        />
      </div>

      <span className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/55">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" aria-hidden="true" />
          {novena.duracao} dias
        </span>
        {completedDays.length > 0 && (
          <span className="flex items-center gap-1.5 font-medium text-[#f0cf83]">
            <CheckCircle className="h-4 w-4" aria-hidden="true" />
            {completedDays.length}/{novena.duracao} concluídos
          </span>
        )}
      </span>

      <span
        className="mt-4 block h-2 w-full overflow-hidden rounded-full bg-black/30"
        aria-label={`${percentage}% concluído`}
      >
        <span
          className="block h-full bg-[#c99b43] transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </span>
      <span
        className={`mt-4 block rounded-lg border px-3 py-2 text-xs leading-relaxed ${statusClassName}`}
      >
        {progressStatus.text}
      </span>
    </button>
  );
}

export function NovenasPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#24140d] font-sans text-white">
      <img
        src="/images/rosarium-church.jpg"
        alt=""
        aria-hidden="true"
        className="fixed inset-0 z-[-2] h-full w-full object-cover object-center"
      />
      <div className="fixed inset-0 z-[-1] bg-[rgba(34,18,11,.62)]" aria-hidden="true" />

      <header className="sticky top-0 z-50 border-b border-white/15 bg-[rgba(24,12,7,.84)] backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 pr-20 sm:px-6 sm:pr-24">
          <button
            type="button"
            onClick={() => navigate('/igreja')}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-md border border-white/25 text-white/80 transition-colors hover:border-[#e5bd68] hover:text-[#f0cf83] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5bd68]"
            aria-label="Voltar para a página inicial"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c99b43]/15 text-[#e5bd68]">
              <Heart className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h1 className="truncate font-serif text-2xl text-white">Novenas</h1>
              <p className="hidden text-sm text-white/60 sm:block">
                Nove dias de oração e perseverança
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <section className="max-w-3xl border-b border-white/15 py-12 sm:py-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#e5bd68]">
            Perseverar na oração
          </p>
          <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl">
            Caminhe um dia de cada vez.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            Escolha uma intenção e permaneça em oração durante nove dias. Seu progresso fica salvo
            neste dispositivo e pode ser sincronizado com sua conta.
          </p>
        </section>

        <section aria-labelledby="novenas-heading" className="py-10 sm:py-14">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 id="novenas-heading" className="font-serif text-3xl text-white sm:text-4xl">
                Escolha uma novena
              </h2>
              <p className="mt-2 text-sm text-white/60">
                Encontre a oração que acompanha este momento.
              </p>
            </div>
            <span className="hidden text-sm text-white/55 sm:block">
              {novenasData.length} opções
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {novenasData.map((novena) => (
              <NovenaCard key={novena.id} novena={novena} isAuthenticated={isAuthenticated} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
