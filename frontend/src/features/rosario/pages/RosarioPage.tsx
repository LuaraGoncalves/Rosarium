import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { BookOpen, CalendarDays, Cross, ListChecks } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../shared/components/ui/accordion';
import { FeatureIntroCard, FeaturePageHeader } from '../../../shared/components/FeaturePageShell';
import { oracoesDoRosario } from '../data/oracoes';
import { misteriosDoRosario } from '../data/misterios';
import { getRosario, RosarioMysteryGroup, RosarioPrayer } from '../services/rosario.api';

const weekdayMystery: Record<number, string> = {
  0: 'Mistérios Gloriosos',
  1: 'Mistérios Gozosos',
  2: 'Mistérios Dolorosos',
  3: 'Mistérios Gloriosos',
  4: 'Mistérios Luminosos',
  5: 'Mistérios Dolorosos',
  6: 'Mistérios Gozosos',
};

const preparationSteps = [
  'Escolha o mistério',
  'Leia a meditação',
  'Reze uma dezena por vez',
];

function splitStepTitle(title: string) {
  const match = title.match(/^(\d+)\.\s(.+)$/);

  if (!match) {
    return { number: null, label: title };
  }

  return { number: match[1], label: match[2] };
}

function getMysteryKey(mystery: RosarioMysteryGroup) {
  return mystery.slug ?? mystery.tipo;
}

export function RosarioPage() {
  const navigate = useNavigate();
  const todaysMysteryName = weekdayMystery[new Date().getDay()];
  const localTodaysMystery =
    misteriosDoRosario.find((categoria) => categoria.tipo === todaysMysteryName) ??
    misteriosDoRosario[0];
  const [prayers, setPrayers] = useState<RosarioPrayer[]>(oracoesDoRosario);
  const [mysteries, setMysteries] = useState<RosarioMysteryGroup[]>(misteriosDoRosario);
  const [todaysMystery, setTodaysMystery] = useState<RosarioMysteryGroup | undefined>(
    localTodaysMystery
  );
  const [selectedMystery, setSelectedMystery] = useState<RosarioMysteryGroup | undefined>(
    localTodaysMystery
  );
  const [activeMeditation, setActiveMeditation] = useState('');
  const [isLoadingRosario, setIsLoadingRosario] = useState(true);
  const [apiNotice, setApiNotice] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadRosario() {
      try {
        const data = await getRosario();

        if (!isMounted) return;

        setPrayers(data.oracoes);
        setMysteries(data.misterios);
        setTodaysMystery(data.misterioHoje);
        setSelectedMystery(data.misterioHoje);
        setApiNotice('');
      } catch {
        if (!isMounted) return;

        setApiNotice('Não foi possível carregar o Rosário pelo backend. Mostrando conteúdo local.');
      } finally {
        if (isMounted) {
          setIsLoadingRosario(false);
        }
      }
    }

    loadRosario();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedMysteryKey = selectedMystery ? getMysteryKey(selectedMystery) : '';
  const todaysMysteryKey = todaysMystery ? getMysteryKey(todaysMystery) : '';
  const isShowingTodaysMystery = selectedMysteryKey === todaysMysteryKey;

  return (
    <div className="min-h-screen bg-church-bg text-church-text font-sans">
      <FeaturePageHeader
        icon={Cross}
        title="Santo Rosário"
        subtitle="Um caminho simples para meditar os mistérios de Cristo com Maria."
        onBack={() => navigate('/igreja')}
      />

      <FeatureIntroCard
        imageSrc="https://images.unsplash.com/photo-1624147210060-4c159a6c70d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3NhcnklMjBiZWFkcyUyMHByYXllcnxlbnwxfHx8fDE3NzMzMDQ3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
        imageAlt="Rosário"
        title="Reze com serenidade"
      >
        <p className="max-w-2xl font-serif text-xl italic leading-relaxed text-church-text/85">
          O Rosário fica mais simples quando a tela acompanha a oração: escolha o mistério,
          contemple uma passagem e siga o roteiro no seu ritmo.
        </p>

        <div className="flex flex-col gap-2 sm:flex-row">
          {preparationSteps.map((step, index) => (
            <div
              key={step}
              className="flex items-center gap-3 rounded-full bg-church-bg px-4 py-2.5 text-sm text-church-text shadow-sm"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-church-bg-secondary font-serif text-base font-semibold text-church-accent">
                {index + 1}
              </span>
              <span className="font-medium leading-snug">{step}</span>
            </div>
          ))}
        </div>
      </FeatureIntroCard>

      <main className="mx-auto max-w-5xl px-4 py-8 md:py-12">
        {(isLoadingRosario || apiNotice) && (
          <div className="mb-5 rounded-2xl border border-church-border bg-church-bg-secondary px-4 py-3 text-sm text-church-text-muted shadow-sm">
            {isLoadingRosario ? 'Carregando conteúdo do Rosário...' : apiNotice}
          </div>
        )}

        <section className="mb-6 rounded-[1.75rem] bg-church-bg-secondary p-5 shadow-lg shadow-church-bg-darker/10 md:p-6">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-serif text-3xl leading-tight text-church-accent">
                Escolha o mistério
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-church-text-muted">
                O indicado para hoje já vem selecionado, mas você pode trocar se desejar rezar
                outro conjunto.
              </p>
            </div>
            {todaysMystery && (
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-church-bg px-3 py-2 text-sm font-semibold text-church-accent-hover shadow-sm">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Hoje: {todaysMystery.tipo.replace('Mistérios ', '')}
              </span>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {mysteries.map((categoria) => {
              const mysteryKey = getMysteryKey(categoria);
              const isSelected = mysteryKey === selectedMysteryKey;
              const isToday = mysteryKey === todaysMysteryKey;

              return (
                <button
                  type="button"
                  key={mysteryKey}
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelectedMystery(categoria);
                    setActiveMeditation('');
                  }}
                  className={`rounded-2xl p-4 text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-church-accent ${
                    isSelected
                      ? 'bg-church-accent text-white shadow-md shadow-church-bg-darker/15'
                      : 'bg-church-bg text-church-text shadow-sm hover:-translate-y-0.5 hover:shadow-md'
                  }`}
                >
                  <span
                    className={`mb-3 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      isSelected ? 'bg-white/15 text-white' : 'bg-church-bg-secondary text-church-accent'
                    }`}
                  >
                    {isToday ? 'Hoje' : categoria.dia}
                  </span>
                  <h3
                    className={`font-serif text-2xl leading-tight ${
                      isSelected ? 'text-white' : 'text-church-accent-hover'
                    }`}
                  >
                    {categoria.tipo.replace('Mistérios ', '')}
                  </h3>
                  <p
                    className={`mt-1 text-sm ${
                      isSelected ? 'text-white/80' : 'text-church-text-muted'
                    }`}
                  >
                    {categoria.dia}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {selectedMystery && (
          <section className="mb-6 rounded-[1.75rem] bg-church-bg-secondary p-5 shadow-lg shadow-church-bg-darker/10 md:p-6">
            <div className="mb-5 flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-church-bg text-church-accent-hover shadow-sm">
                <BookOpen className="h-5 w-5 stroke-[1.5]" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-serif text-2xl text-church-accent">
                  Meditações dos {selectedMystery.tipo.toLowerCase()}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-church-text-muted">
                  Abra uma meditação por vez. Leia com calma, faça silêncio e reze a dezena.
                </p>
              </div>
            </div>

            {isShowingTodaysMystery && (
              <p className="mb-4 inline-flex rounded-full bg-church-bg px-3 py-1.5 text-sm font-semibold text-church-accent-hover shadow-sm">
                Mistério indicado para hoje
              </p>
            )}

            <Accordion
              type="single"
              collapsible
              value={activeMeditation}
              onValueChange={setActiveMeditation}
              className="w-full text-church-text"
            >
              {selectedMystery.lista.map((misterio, index) => (
                <AccordionItem
                  value={`selected-mystery-${index}`}
                  key={misterio.titulo}
                  className="border-b border-church-border last:border-0"
                >
                  <AccordionTrigger className="hover:no-underline py-4 text-left transition-colors hover:text-church-accent">
                    <span className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-church-bg font-serif text-base font-semibold text-church-accent">
                        {index + 1}
                      </span>
                      <span className="text-base font-semibold text-church-text">
                        {misterio.titulo.replace(/^\d+\.\s/, '')}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="max-w-3xl rounded-2xl bg-church-bg p-4 font-serif text-lg italic leading-relaxed text-church-text/90 shadow-inner">
                      {misterio.leitura}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        <section className="rounded-[1.75rem] bg-church-bg-secondary p-5 shadow-lg shadow-church-bg-darker/10 md:p-6">
          <Accordion type="single" collapsible className="w-full text-church-text">
            <AccordionItem value="roteiro-completo" className="border-0">
              <AccordionTrigger className="hover:no-underline text-left">
                <span className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-church-bg text-church-accent-hover shadow-sm">
                    <ListChecks className="h-5 w-5 stroke-[1.5]" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="font-serif text-2xl text-church-accent">
                      Abrir roteiro completo
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-church-text-muted">
                      Use esta parte quando quiser acompanhar todas as orações do Rosário.
                    </p>
                  </div>
                </span>
              </AccordionTrigger>

              <AccordionContent>
                <Accordion type="single" collapsible className="mt-2 w-full text-church-text">
                  {prayers.map((oracao) => {
                    const step = splitStepTitle(oracao.titulo);

                    return (
                      <AccordionItem
                        value={oracao.id}
                        key={oracao.id}
                        className="border-b border-church-border last:border-0"
                      >
                        <AccordionTrigger className="hover:no-underline py-4 text-left transition-colors hover:text-church-accent">
                          <span className="flex items-center gap-3">
                            {step.number && (
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-church-bg font-serif text-base font-semibold text-church-accent">
                                {step.number}
                              </span>
                            )}
                            <span className="text-base font-semibold text-church-text">
                              {step.label}
                            </span>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="max-w-3xl rounded-2xl bg-church-bg p-4 text-church-text shadow-inner">
                            {oracao.conteudo.map((item) => (
                              <div key={`${oracao.id}-${item.subtitulo}`} className="space-y-2">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-church-accent-hover">
                                  {item.subtitulo}
                                </p>
                                <p className="font-serif text-lg italic leading-relaxed text-church-text/90">
                                  {item.texto}
                                </p>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
    </div>
  );
}
