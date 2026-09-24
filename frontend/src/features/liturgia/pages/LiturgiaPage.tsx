import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, BookOpen, CalendarDays, ChevronDown, Church, Clock3 } from 'lucide-react';
import { FeaturePageHeader } from '../../../shared/components/FeaturePageShell';

const liturgicalTimes = [
  {
    tempo: 'Advento',
    desc: 'Preparação para o Natal',
    cor: 'Roxo',
    periodo: '4 domingos antes do Natal - 24/12',
    swatch: 'bg-[#7b5c9e]',
  },
  {
    tempo: 'Natal',
    desc: 'Celebração do nascimento de Jesus',
    cor: 'Branco',
    periodo: '25/12 - Batismo do Senhor',
    swatch: 'bg-[#f0e8d5]',
  },
  {
    tempo: 'Quaresma',
    desc: 'Preparação para a Páscoa',
    cor: 'Roxo',
    periodo: 'Quarta-feira de Cinzas - Quinta-feira Santa',
    swatch: 'bg-[#7b5c9e]',
  },
  {
    tempo: 'Páscoa',
    desc: 'Celebração da Ressurreição',
    cor: 'Branco',
    periodo: 'Domingo de Páscoa - Pentecostes',
    swatch: 'bg-[#f0e8d5]',
  },
  {
    tempo: 'Tempo Comum',
    desc: 'Crescimento na vida cristã',
    cor: 'Verde',
    periodo: 'Após o Natal - Cristo Rei',
    swatch: 'bg-[#6f8b63]',
  },
  {
    tempo: 'Solenidades',
    desc: 'Festas especiais do ano',
    cor: 'Variável',
    periodo: 'Datas próprias - ao longo do ano',
    swatch: 'bg-[#c99b43]',
  },
];

export function LiturgiaPage() {
  const navigate = useNavigate();
  const [tempoAberto, setTempoAberto] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-church-bg text-church-text font-sans pb-20">
      <FeaturePageHeader
        icon={Church}
        title="Liturgia"
        subtitle="Leituras do dia, calendário e tempos litúrgicos em uma navegação mais serena."
        onBack={() => navigate('/igreja')}
      />

      <main>
        <section className="mx-auto max-w-5xl px-4 pt-6 md:pt-8" aria-labelledby="liturgia-intro">
          <div className="relative isolate min-h-[25rem] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#765146] shadow-xl shadow-black/20 md:min-h-[27rem]">
            <img
              src="https://images.unsplash.com/photo-1696261803446-e9847baf4a6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRob2xpYyUyMGNodXJjaCUyMGFsdGFyJTIwc3RhdHVlfGVufDF8fHx8MTc3MzQwOTg2MHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Interior de uma igreja com uma imagem de Cristo"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(25,12,7,.08)_0%,rgba(25,12,7,.18)_35%,rgba(25,12,7,.9)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 max-w-2xl p-6 md:p-9">
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#f0cf83]">
                <span className="h-px w-8 bg-[#e5bd68]" aria-hidden="true" />
                Um ritmo para cada tempo
              </p>
              <h2
                id="liturgia-intro"
                className="font-serif text-3xl leading-tight text-white md:text-5xl"
              >
                Rezar com a Igreja, todos os dias.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/75 md:text-base">
                Encontre as leituras de hoje, acompanhe o calendário e entenda os sinais de cada
                tempo litúrgico.
              </p>
            </div>
          </div>
        </section>

        <section
          className="mx-auto max-w-5xl px-4 pt-10 md:pt-14"
          aria-labelledby="liturgia-acessos"
        >
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2
                id="liturgia-acessos"
                className="font-serif text-3xl text-church-text md:text-4xl"
              >
                Comece pelo dia de hoje
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-church-text-muted md:text-base">
                Dois caminhos simples para acompanhar a oração e a vida da Igreja.
              </p>
            </div>
            <Clock3
              className="hidden h-7 w-7 shrink-0 text-church-accent md:block"
              aria-hidden="true"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-[1.15fr_.85fr] md:gap-5">
            <button
              type="button"
              onClick={() => navigate('/liturgia/hoje')}
              className="group flex min-h-52 flex-col justify-between rounded-lg border border-church-accent/40 bg-church-accent p-6 text-left text-[#38241e] shadow-lg shadow-church-bg-darker/15 transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-church-accent-hover focus-visible:ring-offset-2 focus-visible:ring-offset-church-bg md:p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#38241e]/10">
                <BookOpen className="h-6 w-6" aria-hidden="true" />
              </span>
              <span>
                <span className="mt-8 block font-serif text-2xl md:text-3xl">Liturgia de hoje</span>
                <span className="mt-2 block max-w-md text-sm leading-6 text-[#38241e]/75">
                  Leituras, salmo e Evangelho para acompanhar este dia em oração.
                </span>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                  Abrir leituras{' '}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/liturgia/calendario')}
              className="group flex min-h-52 flex-col justify-between rounded-lg border border-church-border bg-church-bg-secondary p-6 text-left shadow-md shadow-church-bg-darker/10 transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-church-accent-hover focus-visible:ring-offset-2 focus-visible:ring-offset-church-bg md:p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-church-bg text-church-accent">
                <CalendarDays className="h-6 w-6" aria-hidden="true" />
              </span>
              <span>
                <span className="mt-8 block font-serif text-2xl text-church-text">
                  Calendário litúrgico
                </span>
                <span className="mt-2 block text-sm leading-6 text-church-text-muted">
                  Festas, solenidades e tempos que acompanham o ano da Igreja.
                </span>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-church-accent">
                  Ver calendário{' '}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </button>
          </div>
        </section>

        <section
          className="mx-auto max-w-5xl px-4 pt-12 md:pt-16"
          aria-labelledby="tempos-liturgicos"
        >
          <div className="border-t border-church-border pt-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2
                  id="tempos-liturgicos"
                  className="font-serif text-3xl text-church-text md:text-4xl"
                >
                  Tempos litúrgicos
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-church-text-muted md:text-base">
                  Cada período convida a Igreja a contemplar um aspecto diferente da vida de Cristo.
                </p>
              </div>
              <Church className="hidden h-7 w-7 text-church-accent md:block" aria-hidden="true" />
            </div>

            <div className="overflow-hidden rounded-lg border border-church-border bg-church-bg-secondary">
              {liturgicalTimes.map((item, index) => {
                const isOpen = tempoAberto === item.tempo;

                return (
                  <div
                    key={item.tempo}
                    className={index > 0 ? 'border-t border-church-border' : ''}
                  >
                    <button
                      type="button"
                      onClick={() => setTempoAberto(isOpen ? null : item.tempo)}
                      className="group flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-church-bg md:px-6 md:py-5"
                      aria-expanded={isOpen}
                      aria-controls={`periodo-${item.tempo}`}
                    >
                      <span className="h-3 w-3 shrink-0 rounded-full bg-church-bg ring-4 ring-church-bg">
                        <span
                          className={`block h-3 w-3 rounded-full ${item.swatch}`}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-xl text-church-text">
                          {item.tempo}
                        </span>
                        <span className="mt-0.5 block text-sm text-church-text-muted">
                          {item.desc}
                        </span>
                      </span>
                      <span className="hidden text-right text-xs text-church-text-muted sm:block">
                        Cor litúrgica
                        <span className="mt-1 block font-medium text-church-accent">
                          {item.cor}
                        </span>
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-church-accent transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div
                        id={`periodo-${item.tempo}`}
                        className="px-4 pb-5 pl-11 md:px-6 md:pb-6 md:pl-16"
                      >
                        <p className="border-l border-church-accent/60 pl-4 text-sm leading-6 text-church-text-muted">
                          {item.periodo}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
