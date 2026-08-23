import { useNavigate, useParams } from 'react-router';
import { Clock } from 'lucide-react';
import { useBreviario, BreviarioHoraSection } from '../hooks/useBreviario';
import { FeaturePageHeader } from '../../../shared/components/FeaturePageShell';

export function BreviarioHoraPage() {
  const navigate = useNavigate();
  const { hora } = useParams<{ hora: string }>();
  const { data: breviario, loading, error } = useBreviario();

  const titulosPorHora: Record<string, string> = {
    oficio: 'Ofício das Leituras',
    laudes: 'Laudes',
    'hora-media': 'Hora Média',
    vesperas: 'Vésperas',
    completas: 'Completas',
  };

  const tituloHora = hora ? (titulosPorHora[hora] ?? 'Hora não encontrada') : 'Hora não encontrada';

  if (loading) {
    return (
      <div className="min-h-screen bg-church-bg text-church-text font-sans flex items-center justify-center">
        <p className="text-church-text/60 italic font-serif">Carregando a oração...</p>
      </div>
    );
  }

  if (error || !breviario) {
    return (
      <div className="min-h-screen bg-church-bg text-church-text font-sans flex flex-col items-center justify-center p-4">
        <p className="text-red-400 font-serif mb-4">Erro ao carregar o breviário.</p>
        <button
          onClick={() => navigate('/breviario')}
          className="bg-church-bg-secondary border border-church-border-hover text-church-accent px-6 py-2 rounded-lg"
        >
          Voltar
        </button>
      </div>
    );
  }

  let horaData: BreviarioHoraSection | null = null;
  if (hora === 'oficio') horaData = breviario.oficio ?? null;
  if (hora === 'laudes') horaData = breviario.laudes ?? null;
  if (hora === 'hora-media') horaData = breviario.hora_media ?? null;
  if (hora === 'vesperas') horaData = breviario.vesperas ?? null;
  if (hora === 'completas') horaData = breviario.completas ?? null;

  const usaLeituraBreve = ['laudes', 'hora-media', 'vesperas', 'completas'].includes(hora ?? '');

  return (
    <div className="min-h-screen bg-church-bg text-church-text font-sans pb-24">
      <FeaturePageHeader
        icon={Clock}
        title={tituloHora}
        subtitle={`${breviario.data} • ${breviario.tempo}`}
        backLabel="Voltar ao Breviário"
        onBack={() => navigate('/breviario')}
        maxWidthClassName="max-w-3xl"
      />

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 md:space-y-8 text-base md:text-lg leading-relaxed text-church-text/90">
        {!horaData ? (
          <div className="text-center py-12">
            <p className="text-church-text/60 italic font-serif">
              Conteúdo para {tituloHora} não disponível no momento.
            </p>
          </div>
        ) : (
          <>
            {/* Introdução */}
            {horaData.introducao && (
              <div className="rounded-[1.5rem] bg-church-bg-secondary p-5 shadow-md shadow-church-bg-darker/10 md:p-6">
                <h3 className="text-church-accent-hover font-serif mb-4 uppercase text-sm">
                  Introdução
                </h3>
                <div className="whitespace-pre-line">{horaData.introducao}</div>
              </div>
            )}

            {/* Invocação */}
            {horaData.invitatorio && (
              <div className="rounded-[1.5rem] bg-church-bg-secondary p-5 shadow-md shadow-church-bg-darker/10 md:p-6">
                <h3 className="text-church-accent-hover font-serif mb-2 uppercase text-sm">
                  Invitatório
                </h3>
                <p className="italic">{horaData.invitatorio}</p>
              </div>
            )}

            {/* Hino */}
            {horaData.hino && (
              <div className="mb-8">
                <h3 className="text-church-accent-hover font-serif mb-4 uppercase text-sm text-center">
                  Hino
                </h3>
                <div className="text-center whitespace-pre-line italic text-church-text/80">
                  {horaData.hino}
                </div>
              </div>
            )}

            {/* Salmodia */}
            {horaData.salmodia && horaData.salmodia.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-church-accent-hover font-serif uppercase text-sm text-center border-b border-church-border-hover pb-2">
                  Salmodia
                </h3>
                {horaData.salmodia.map((salmo: string, index: number) => (
                  <div
                    key={index}
                    className="rounded-[1.5rem] bg-church-bg-secondary p-5 shadow-md shadow-church-bg-darker/10 md:p-6"
                  >
                    <p className="whitespace-pre-line">{salmo}</p>
                  </div>
                ))}
              </div>
            )}

            {hora === 'oficio' && horaData.versiculo && (
              <div className="my-8 text-center">
                <h3 className="text-church-accent-hover font-serif mb-4 uppercase text-sm">
                  Versículo
                </h3>
                <p className="whitespace-pre-line italic">{horaData.versiculo}</p>
              </div>
            )}

            {/* Leituras */}
            {(horaData.leitura1 || horaData.leitura) && (
              <div className="my-8">
                <h3 className="text-church-accent-hover font-serif mb-4 uppercase text-sm text-center border-b border-church-border-hover pb-2">
                  {usaLeituraBreve ? 'Leitura Breve' : 'Leitura'}
                </h3>
                <div className="rounded-[1.5rem] bg-church-bg p-5 shadow-inner md:p-6">
                  <p className="whitespace-pre-line">{horaData.leitura1 || horaData.leitura}</p>
                </div>
              </div>
            )}

            {horaData.leitura2 && (
              <div className="my-8">
                <h3 className="text-church-accent-hover font-serif mb-4 uppercase text-sm text-center border-b border-church-border-hover pb-2">
                  Segunda Leitura
                </h3>
                <div className="rounded-[1.5rem] bg-church-bg p-5 shadow-inner md:p-6">
                  <p className="whitespace-pre-line">{horaData.leitura2}</p>
                </div>
              </div>
            )}

            {hora !== 'oficio' && horaData.versiculo && (
              <div className="my-8 text-center">
                <h3 className="text-church-accent-hover font-serif mb-4 uppercase text-sm">
                  Versículo
                </h3>
                <p className="whitespace-pre-line italic">{horaData.versiculo}</p>
              </div>
            )}

            {horaData.responsorioBreve && (
              <div className="my-8">
                <h3 className="text-church-accent-hover font-serif mb-4 uppercase text-sm text-center border-b border-church-border-hover pb-2">
                  {hora === 'oficio' ? 'Responsório' : 'Responsório Breve'}
                </h3>
                <div className="rounded-[1.5rem] bg-church-bg-secondary p-5 shadow-md shadow-church-bg-darker/10 md:p-6">
                  <p className="whitespace-pre-line italic">{horaData.responsorioBreve}</p>
                </div>
              </div>
            )}

            {/* Cânticos Evangélicos */}
            {horaData.benedictus && (
              <div className="my-8 text-center">
                <h3 className="text-church-accent-hover font-serif mb-4 uppercase text-sm text-center">
                  Benedictus
                </h3>
                <p className="whitespace-pre-line italic">{horaData.benedictus}</p>
              </div>
            )}

            {horaData.magnificat && (
              <div className="my-8 text-center">
                <h3 className="text-church-accent-hover font-serif mb-4 uppercase text-sm text-center">
                  Magnificat
                </h3>
                <p className="whitespace-pre-line italic">{horaData.magnificat}</p>
              </div>
            )}

            {horaData.nunc_dimittis && (
              <div className="my-8 text-center">
                <h3 className="text-church-accent-hover font-serif mb-4 uppercase text-sm text-center">
                  Cântico de Simeão
                </h3>
                <p className="whitespace-pre-line italic">{horaData.nunc_dimittis}</p>
              </div>
            )}

            {/* Preces */}
            {horaData.preces && horaData.preces.length > 0 && (
              <div className="my-8">
                <h3 className="text-church-accent-hover font-serif mb-4 uppercase text-sm text-center border-b border-church-border-hover pb-2">
                  Preces
                </h3>
                <ul className="space-y-3">
                  {horaData.preces.map((prece: string, index: number) => (
                    <li key={index} className="rounded-2xl bg-church-bg-secondary px-4 py-3">
                      {prece}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {horaData.paiNosso && (
              <div className="my-8 rounded-[1.5rem] bg-church-bg p-5 text-center shadow-inner md:p-6">
                <h3 className="text-church-accent-hover font-serif mb-4 uppercase text-sm">
                  Pai-Nosso
                </h3>
                <p className="whitespace-pre-line">{horaData.paiNosso}</p>
              </div>
            )}

            {/* Oração Conclusiva */}
            {horaData.oracao && (
              <div className="mt-12 rounded-[1.5rem] bg-church-bg-secondary p-6 text-center shadow-md shadow-church-bg-darker/10 md:p-8">
                <h3 className="text-church-accent-hover font-serif mb-4 uppercase text-sm">
                  Oração Final
                </h3>
                <p className="whitespace-pre-line">{horaData.oracao}</p>
              </div>
            )}

            {horaData.bencao && (
              <div className="my-8 text-center">
                <h3 className="text-church-accent-hover font-serif mb-4 uppercase text-sm">
                  Bênção Final
                </h3>
                <p className="whitespace-pre-line italic">{horaData.bencao}</p>
              </div>
            )}

            {horaData.antifonaMariana && (
              <div className="my-8 rounded-[1.5rem] bg-church-bg p-5 text-center shadow-inner md:p-6">
                <h3 className="text-church-accent-hover font-serif mb-4 uppercase text-sm">
                  Antífona Mariana
                </h3>
                <p className="whitespace-pre-line italic">{horaData.antifonaMariana}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
