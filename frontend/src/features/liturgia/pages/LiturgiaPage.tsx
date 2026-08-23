import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Church, BookOpen, Calendar, ChevronDown } from 'lucide-react';
import { FeatureIntroCard, FeaturePageHeader } from '../../../shared/components/FeaturePageShell';

export function LiturgiaPage() {
  const navigate = useNavigate();
  const [tempoAberto, setTempoAberto] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-church-bg text-church-text font-sans">
      <FeaturePageHeader
        icon={Church}
        title="Liturgia"
        subtitle="Leituras do dia, calendário e tempos litúrgicos em uma navegação mais serena."
        onBack={() => navigate('/igreja')}
      />

      <FeatureIntroCard
        imageSrc="https://images.unsplash.com/photo-1696261803446-e9847baf4a6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRob2xpYyUyMGNodXJjaCUyMGFsdGFyJTIwc3RhdHVlfGVufDF8fHx8MTc3MzQwOTg2MHww&ixlib=rb-4.1.0&q=80&w=1080"
        imageAlt="Interior da Igreja"
        title="A oração oficial da Igreja"
      >
          <p>
            A Liturgia das Horas é a oração pública e comum do Povo de Deus. Nela, Cristo mesmo
            &quot;continua a exercer sua função sacerdotal&quot;, reunindo a Igreja em louvor a Deus
            e intercessão pelo mundo.
          </p>
      </FeatureIntroCard>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
          <div className="rounded-[1.5rem] bg-church-bg-secondary p-6 shadow-md shadow-church-bg-darker/10 md:p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-church-bg text-church-accent-hover shadow-sm">
              <BookOpen className="w-7 h-7 text-church-accent-hover" />
            </div>
            <h3 className="text-xl font-serif text-church-accent mb-3">Liturgia Hoje</h3>
            <p className="text-church-text/60 mb-6">
              Acompanhe as leituras e orações do dia de hoje segundo o calendário litúrgico da
              Igreja.
            </p>
            <button
              onClick={() => navigate('/liturgia/hoje')}
              className="w-full rounded-full bg-church-bg py-3 font-medium text-church-accent shadow-sm transition-colors hover:bg-church-bg-darker"
            >
              Ver Liturgia de Hoje
            </button>
          </div>

          <div className="rounded-[1.5rem] bg-church-bg-secondary p-6 shadow-md shadow-church-bg-darker/10 md:p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-church-bg text-church-accent-hover shadow-sm">
              <Calendar className="w-7 h-7 text-church-accent-hover" />
            </div>
            <h3 className="text-xl font-serif text-church-accent mb-3">Calendário Litúrgico</h3>
            <p className="text-church-text/60 mb-6">
              Explore o calendário com as festas, solenidades e tempos litúrgicos do ano.
            </p>
            <button
              onClick={() => navigate('/liturgia/calendario')}
              className="w-full rounded-full bg-church-bg py-3 font-medium text-church-accent shadow-sm transition-colors hover:bg-church-bg-darker"
            >
              Ver Calendário
            </button>
          </div>
        </div>

        <div className="rounded-[1.5rem] bg-church-bg-secondary p-6 shadow-md shadow-church-bg-darker/10 md:p-8">
          <h3 className="text-2xl font-serif text-church-accent mb-8">Tempos Litúrgicos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[
              {
                tempo: 'Advento',
                desc: 'Preparação para o Natal',
                cor: 'Roxo',
                periodo: '4 domingos antes do Natal - 24/12',
              },
              {
                tempo: 'Natal',
                desc: 'Celebração do nascimento de Jesus',
                cor: 'Branco',
                periodo: '25/12 - Batismo do Senhor',
              },
              {
                tempo: 'Quaresma',
                desc: 'Preparação para a Páscoa',
                cor: 'Roxo',
                periodo: 'Quarta-feira de Cinzas - Quinta-feira Santa',
              },
              {
                tempo: 'Páscoa',
                desc: 'Celebração da Ressurreição',
                cor: 'Branco',
                periodo: 'Domingo de Páscoa - Pentecostes',
              },
              {
                tempo: 'Tempo Comum',
                desc: 'Crescimento na vida cristã',
                cor: 'Verde',
                periodo: 'Após o Natal - Cristo Rei',
              },
              {
                tempo: 'Solenidades',
                desc: 'Festas especiais do ano',
                cor: 'Variável',
                periodo: 'Datas próprias - ao longo do ano',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-church-bg p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:p-6"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="text-xl font-serif text-church-accent-hover">{item.tempo}</h4>
                  <button
                    type="button"
                    onClick={() =>
                      setTempoAberto((tempoAtual) =>
                        tempoAtual === item.tempo ? null : item.tempo,
                      )
                    }
                    className="mt-1 rounded-full border border-church-border-hover bg-church-bg-secondary/70 p-1 text-church-text/50 transition-all hover:border-church-accent-hover/50 hover:text-church-accent"
                    aria-expanded={tempoAberto === item.tempo}
                    aria-label={`Ver período de ${item.tempo}`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        tempoAberto === item.tempo ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
                <p className="text-church-text/80 mb-3">{item.desc}</p>
                {tempoAberto === item.tempo && (
                  <p className="mb-3 rounded-md border border-church-border-hover/70 bg-church-bg-secondary/60 px-3 py-2 text-xs text-church-text/55">
                    {item.periodo}
                  </p>
                )}
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium border border-church-border-hover bg-church-bg-darker text-church-text/60">
                  Cor litúrgica: <span className="text-church-accent">{item.cor}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
