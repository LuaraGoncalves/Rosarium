import { type KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  CalendarDays,
  MapPin,
  Tag,
  Shield,
  Clock,
  BookHeart,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useSanto } from '../hooks/useSanto';
import { FeaturePageHeader } from '../../../shared/components/FeaturePageShell';

export function SantoDetalhePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { santo, loading, error } = useSanto(id);
  const [activeParagraphIndex, setActiveParagraphIndex] = useState(0);
  const paragraphRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const historiaParagraphs =
    santo?.historia
      ?.split(/\n{2,}|\r?\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean) ?? [];
  const hasHistoria = historiaParagraphs.length > 0;
  const activeParagraphLabel = hasHistoria
    ? `Trecho ${activeParagraphIndex + 1} de ${historiaParagraphs.length}`
    : 'Sem trechos para acompanhar';

  useEffect(() => {
    setActiveParagraphIndex(0);
    paragraphRefs.current = [];
  }, [santo?.id]);

  useEffect(() => {
    if (!hasHistoria && activeParagraphIndex !== 0) {
      setActiveParagraphIndex(0);
      return;
    }

    if (activeParagraphIndex > historiaParagraphs.length - 1) {
      setActiveParagraphIndex(Math.max(historiaParagraphs.length - 1, 0));
    }
  }, [activeParagraphIndex, hasHistoria, historiaParagraphs.length]);

  const moveActiveParagraph = (direction: 'previous' | 'next') => {
    if (!hasHistoria) return;

    setActiveParagraphIndex((currentIndex) => {
      const nextIndex =
        direction === 'previous'
          ? Math.max(currentIndex - 1, 0)
          : Math.min(currentIndex + 1, historiaParagraphs.length - 1);

      paragraphRefs.current[nextIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      return nextIndex;
    });
  };

  const handleHistoriaKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveActiveParagraph('previous');
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveActiveParagraph('next');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-church-text/60 font-serif text-lg">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        <p className="font-serif text-lg">{error}</p>
      </div>
    );
  }

  if (!santo) {
    return (
      <div className="min-h-screen bg-church-bg text-church-text flex flex-col items-center justify-center p-4">
        <p className="text-red-400 font-serif text-xl mb-6">Santo não encontrado.</p>
        <button
          onClick={() => navigate('/santos')}
          className="bg-church-bg-secondary border border-church-border-hover hover:border-church-accent transition-colors text-church-accent px-6 py-2 rounded-lg font-medium"
        >
          Voltar para a lista de Santos
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-church-bg text-church-text font-sans pb-24">
      <FeaturePageHeader
        icon={BookHeart}
        title={santo.nome}
        subtitle={santo.descricaoCurta || 'História e testemunho de fé.'}
        backLabel="Voltar aos Santos"
        onBack={() => navigate('/santos')}
      />

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-10">
        {/* Header Content with Image and Title */}
        <div className="mb-8 flex flex-col items-center gap-6 rounded-[1.75rem] bg-church-bg-secondary p-6 shadow-xl shadow-church-bg-darker/10 md:mb-10 md:flex-row md:items-start md:gap-8 md:p-10">
          {/* Image - Smaller & Circular */}
          <div className="shrink-0">
            {santo.imagemUrl ? (
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-lg ring-2 ring-church-accent-hover/30 bg-church-bg border-4 border-church-bg-secondary">
                <img
                  src={santo.imagemUrl}
                  alt={santo.nome}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-lg ring-2 ring-church-accent-hover/30 bg-church-bg-tertiary border-4 border-church-bg-secondary flex items-center justify-center">
                <p className="text-church-text/40 font-serif italic text-sm">Sem imagem</p>
              </div>
            )}
          </div>

          {/* Title and Phrase */}
          <div className="flex-1 text-center md:text-left flex flex-col justify-center py-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-church-accent mb-4">
              {santo.nome}
            </h1>
            {santo.descricaoCurta && (
              <p className="text-lg md:text-xl text-church-text/80 italic font-serif mb-5 leading-relaxed">
                {santo.descricaoCurta}
              </p>
            )}
            {santo.fraseMarcante && (
              <blockquote className="mt-2 rounded-lg border border-church-border/70 bg-church-bg/40 px-5 py-3 font-serif text-lg italic text-church-text/90 shadow-sm">
                "{santo.fraseMarcante}"
              </blockquote>
            )}
          </div>
        </div>

        {/* Ficha de Detalhes and History Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Sidebar - Ficha */}
          <div className="lg:col-span-4">
            <div className="rounded-[1.5rem] bg-church-bg-secondary p-5 shadow-md shadow-church-bg-darker/10 md:p-8 lg:sticky lg:top-24">
              <h3 className="text-xs md:text-sm uppercase text-church-accent font-semibold mb-6 flex items-center gap-2 pb-4 border-b border-church-border/70">
                Ficha do Santo
              </h3>

              <ul className="space-y-6">
                {santo.diaFesta && (
                  <li className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-church-text/60">
                      <CalendarDays className="w-4 h-4 text-church-accent-hover" />
                      <span className="text-[11px] md:text-xs uppercase font-semibold">
                        Dia Festivo
                      </span>
                    </div>
                    <p className="text-church-text font-serif text-lg pl-6">{santo.diaFesta}</p>
                  </li>
                )}

                {santo.categoria && (
                  <li className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-church-text/60">
                      <Tag className="w-4 h-4 text-church-accent-hover" />
                      <span className="text-[11px] md:text-xs uppercase font-semibold">
                        Categoria
                      </span>
                    </div>
                    <p className="text-church-text font-serif text-lg pl-6">{santo.categoria}</p>
                  </li>
                )}

                {santo.padroeiroDe && (
                  <li className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-church-text/60">
                      <Shield className="w-4 h-4 text-church-accent-hover" />
                      <span className="text-[11px] md:text-xs uppercase font-semibold">
                        Padroeiro(a) de
                      </span>
                    </div>
                    <p className="text-church-text font-serif text-base leading-relaxed pl-6">
                      {santo.padroeiroDe}
                    </p>
                  </li>
                )}

                {santo.intercessao && (
                  <li className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-church-text/60">
                      <BookHeart className="w-4 h-4 text-church-accent-hover" />
                      <span className="text-[11px] md:text-xs uppercase font-semibold">
                        Intercessão
                      </span>
                    </div>
                    <p className="text-church-text font-serif text-base leading-relaxed pl-6">
                      {santo.intercessao}
                    </p>
                  </li>
                )}

                {(santo.origem || santo.seculo) && (
                  <li className="pt-5 mt-4 border-t border-church-border/50">
                    <div className="flex flex-col gap-5">
                      {santo.origem && (
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2 text-church-text/60">
                            <MapPin className="w-4 h-4 text-church-accent-hover" />
                            <span className="text-[11px] md:text-xs uppercase font-semibold">
                              Origem
                            </span>
                          </div>
                          <p className="text-church-text font-serif text-base pl-6">
                            {santo.origem}
                          </p>
                        </div>
                      )}
                      {santo.seculo && (
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2 text-church-text/60">
                            <Clock className="w-4 h-4 text-church-accent-hover" />
                            <span className="text-[11px] md:text-xs uppercase font-semibold">
                              Época
                            </span>
                          </div>
                          <p className="text-church-text font-serif text-base pl-6">
                            {santo.seculo}
                          </p>
                        </div>
                      )}
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Main Content - History */}
          <div className="lg:col-span-8">
            <div className="min-h-full rounded-[1.5rem] bg-church-bg-secondary p-4 shadow-md shadow-church-bg-darker/10 md:p-10">
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h2 className="flex items-center gap-4 font-serif text-2xl text-church-accent md:text-3xl">
                  História
                  <div className="h-px bg-church-border/60 flex-1 mt-1 md:w-24"></div>
                </h2>
                {hasHistoria && (
                  <div className="flex items-center justify-between gap-3 rounded-full border border-church-border/70 bg-church-bg px-3 py-2 text-sm text-church-text-muted shadow-inner md:justify-end">
                    <span className="min-w-24 text-center font-medium">{activeParagraphLabel}</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveActiveParagraph('previous')}
                        disabled={activeParagraphIndex === 0}
                        className="rounded-full p-1.5 text-church-accent transition-colors hover:bg-church-bg-secondary disabled:cursor-not-allowed disabled:text-church-text-muted/45"
                        aria-label="Voltar para o trecho anterior"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveActiveParagraph('next')}
                        disabled={activeParagraphIndex === historiaParagraphs.length - 1}
                        className="rounded-full p-1.5 text-church-accent transition-colors hover:bg-church-bg-secondary disabled:cursor-not-allowed disabled:text-church-text-muted/45"
                        aria-label="Avançar para o próximo trecho"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="mx-auto max-w-[76ch] rounded-sm border border-church-border/70 bg-church-bg/70 px-5 py-7 shadow-[0_18px_45px_rgba(79,45,31,0.08)] md:px-10 md:py-10">
                <header className="mb-8 border-b border-church-border/70 pb-5 text-center">
                  <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-church-text-muted">
                    Historia do Santo
                  </p>
                  <h3 className="font-serif text-2xl font-semibold uppercase leading-snug text-church-accent md:text-3xl">
                    {santo.nome}
                  </h3>
                </header>

                <article
                  className="font-serif text-[1.02rem] leading-[1.75] text-church-text/90 outline-none [hyphens:auto] focus-visible:ring-2 focus-visible:ring-church-accent/35 md:text-[1.08rem] md:leading-[1.8]"
                  tabIndex={hasHistoria ? 0 : undefined}
                  aria-label="História com acompanhamento por trecho. Use as setas para cima e para baixo."
                  onKeyDown={handleHistoriaKeyDown}
                >
                  {historiaParagraphs.length > 0 ? (
                    historiaParagraphs.map((paragraph, index) => (
                      <p
                        key={`${paragraph.slice(0, 24)}-${index}`}
                        ref={(element) => {
                          paragraphRefs.current[index] = element;
                        }}
                        onClick={() => setActiveParagraphIndex(index)}
                        className={`mb-3 cursor-pointer rounded-xl px-3 py-2 text-justify transition-colors [text-align-last:auto] [text-indent:1.25cm] last:mb-0 ${
                          activeParagraphIndex === index
                            ? 'bg-church-accent/10 text-church-text shadow-inner ring-1 ring-church-accent/25'
                            : 'hover:bg-church-bg-secondary/70'
                        }`}
                        aria-current={activeParagraphIndex === index ? 'true' : undefined}
                      >
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className="text-center italic text-church-text-muted">
                      A historia deste santo ainda nao esta disponivel.
                    </p>
                  )}
                </article>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
