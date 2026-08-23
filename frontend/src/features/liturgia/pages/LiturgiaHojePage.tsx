import { useNavigate } from 'react-router';
import { BookOpen } from 'lucide-react';
import { useLiturgia } from '../hooks/useLiturgia';
import { FeaturePageHeader } from '../../../shared/components/FeaturePageShell';

export function LiturgiaHojePage() {
  const navigate = useNavigate();
  const { data: liturgia, loading, error } = useLiturgia();

  if (loading) {
    return (
      <div className="min-h-screen bg-church-bg text-church-text font-sans flex items-center justify-center">
        <p className="text-church-text/60 italic font-serif">Carregando a Liturgia Diária...</p>
      </div>
    );
  }

  if (error || !liturgia) {
    return (
      <div className="min-h-screen bg-church-bg text-church-text font-sans flex flex-col items-center justify-center p-4">
        <p className="text-red-400 font-serif mb-4">Erro ao carregar a Liturgia Diária.</p>
        <button
          onClick={() => navigate('/liturgia')}
          className="bg-church-bg-secondary border border-church-border-hover text-church-accent px-6 py-2 rounded-lg"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-church-bg text-church-text font-sans pb-24">
      <FeaturePageHeader
        icon={BookOpen}
        title="Liturgia de Hoje"
        subtitle={`${liturgia.data} • ${liturgia.liturgia} • Cor litúrgica: ${liturgia.cor}`}
        backLabel="Voltar à Liturgia"
        onBack={() => navigate('/liturgia')}
        maxWidthClassName="max-w-3xl"
      />

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-8 md:space-y-12 text-base md:text-lg leading-relaxed text-church-text/90">
        {/* Primeira Leitura */}
        {liturgia.primeiraLeitura && (
          <div className="rounded-[1.5rem] bg-church-bg-secondary p-6 shadow-md shadow-church-bg-darker/10 md:p-8">
            <h3 className="text-church-accent-hover font-serif mb-2 uppercase text-sm text-center">
              Primeira Leitura
            </h3>
            <p className="text-center font-serif text-church-accent mb-6">
              {liturgia.primeiraLeitura.referencia}
            </p>
            <div className="whitespace-pre-line text-justify">{liturgia.primeiraLeitura.texto}</div>
            <p className="mt-6 font-semibold italic">Palavra do Senhor.</p>
            <p className="italic text-church-text/60">Graças a Deus.</p>
          </div>
        )}

        {/* Salmo */}
        {liturgia.salmo && (
          <div className="rounded-[1.5rem] bg-church-bg-secondary p-6 shadow-md shadow-church-bg-darker/10 md:p-8">
            <h3 className="text-church-accent-hover font-serif mb-2 uppercase text-sm text-center">
              Salmo Responsorial
            </h3>
            <p className="text-center font-serif text-church-accent mb-6">
              {liturgia.salmo.referencia}
            </p>
            <div className="text-center font-semibold italic mb-6 text-church-accent-hover">
              R. {liturgia.salmo.refrao}
            </div>
            <div className="whitespace-pre-line text-center">{liturgia.salmo.texto}</div>
          </div>
        )}

        {/* Segunda Leitura */}
        {liturgia.segundaLeitura && liturgia.segundaLeitura.texto && (
          <div className="rounded-[1.5rem] bg-church-bg-secondary p-6 shadow-md shadow-church-bg-darker/10 md:p-8">
            <h3 className="text-church-accent-hover font-serif mb-2 uppercase text-sm text-center">
              Segunda Leitura
            </h3>
            <p className="text-center font-serif text-church-accent mb-6">
              {liturgia.segundaLeitura.referencia}
            </p>
            <div className="whitespace-pre-line text-justify">{liturgia.segundaLeitura.texto}</div>
            <p className="mt-6 font-semibold italic">Palavra do Senhor.</p>
            <p className="italic text-church-text/60">Graças a Deus.</p>
          </div>
        )}

        {/* Evangelho */}
        {liturgia.evangelho && (
          <div className="rounded-[1.5rem] bg-church-bg-secondary p-6 shadow-xl shadow-church-bg-darker/15 md:p-8">
            <h3 className="text-church-accent-hover font-serif mb-2 uppercase text-sm text-center">
              Evangelho
            </h3>
            <p className="text-center font-serif text-church-accent mb-6">
              {liturgia.evangelho.referencia}
            </p>

            <div className="mb-6 text-center italic text-church-text/80">
              <p>O Senhor esteja convosco.</p>
              <p className="font-semibold text-church-text">Ele está no meio de nós.</p>
              <p className="mt-2">
                Proclamação do Evangelho de Jesus Cristo segundo{' '}
                {liturgia.evangelho.referencia.split(' ')[0]}.
              </p>
              <p className="font-semibold text-church-text">Glória a vós, Senhor.</p>
            </div>

            <div className="whitespace-pre-line text-justify">{liturgia.evangelho.texto}</div>

            <p className="mt-8 font-semibold italic text-center text-church-accent">
              Palavra da Salvação.
            </p>
            <p className="italic text-church-text/60 text-center">Glória a vós, Senhor.</p>
          </div>
        )}
      </div>
    </div>
  );
}
