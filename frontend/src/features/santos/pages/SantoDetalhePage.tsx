import { useNavigate, useParams } from "react-router";
import { ArrowLeft, CalendarDays, MapPin, Tag, Shield, Clock, BookHeart } from "lucide-react";
import { useSanto } from "../hooks/useSanto";

export function SantoDetalhePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { santo, loading, error } = useSanto(id);

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
          onClick={() => navigate("/santos")}
          className="bg-church-bg-secondary border border-church-border-hover hover:border-church-accent transition-colors text-church-accent px-6 py-2 rounded-lg font-medium"
        >
          Voltar para a lista de Santos
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-church-bg text-church-text font-sans pb-24">
      <header className="bg-church-bg/95 border-b border-church-border sticky top-0 z-50 py-4 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4">
          <button
            onClick={() => navigate("/santos")}
            className="flex items-center gap-2 text-church-accent hover:text-church-accent-hover transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar aos Santos
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Header Content with Image and Title */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10 bg-church-bg-secondary p-8 md:p-10 rounded-2xl border border-church-border shadow-sm">
          {/* Image - Smaller & Circular */}
          <div className="shrink-0">
            {santo.imagemUrl ? (
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-lg ring-2 ring-[#D4AF37]/40 bg-church-bg border-4 border-church-bg-secondary">
                <img
                  src={santo.imagemUrl}
                  alt={santo.nome}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-lg ring-2 ring-[#D4AF37]/40 bg-church-bg-tertiary border-4 border-church-bg-secondary flex items-center justify-center">
                <p className="text-church-text/40 font-serif italic text-sm">Sem imagem</p>
              </div>
            )}
          </div>

          {/* Title and Phrase */}
          <div className="flex-1 text-center md:text-left flex flex-col justify-center py-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-church-accent mb-4">{santo.nome}</h1>
            {santo.descricaoCurta && (
              <p className="text-lg md:text-xl text-church-text/80 italic font-serif mb-5 leading-relaxed">
                {santo.descricaoCurta}
              </p>
            )}
            {santo.fraseMarcante && (
              <blockquote className="text-lg font-serif italic text-church-text/90 border-l-4 border-[#D4AF37]/60 pl-5 py-2 mt-2 bg-church-bg/30 rounded-r-lg">
                "{santo.fraseMarcante}"
              </blockquote>
            )}
          </div>
        </div>

        {/* Ficha de Detalhes and History Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - Ficha */}
          <div className="lg:col-span-4">
            <div className="bg-church-bg-secondary rounded-2xl p-6 md:p-8 border border-church-border shadow-sm lg:sticky lg:top-24">
              <h3 className="text-xs md:text-sm uppercase tracking-widest text-church-accent font-semibold mb-6 flex items-center gap-2 pb-4 border-b border-church-border/70">
                Ficha do Santo
              </h3>
              
              <ul className="space-y-6">
                {santo.diaFesta && (
                  <li className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-church-text/60">
                      <CalendarDays className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-[11px] md:text-xs uppercase font-semibold tracking-wider">Dia Festivo</span>
                    </div>
                    <p className="text-church-text font-serif text-lg pl-6">{santo.diaFesta}</p>
                  </li>
                )}

                {santo.categoria && (
                  <li className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-church-text/60">
                      <Tag className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-[11px] md:text-xs uppercase font-semibold tracking-wider">Categoria</span>
                    </div>
                    <p className="text-church-text font-serif text-lg pl-6">{santo.categoria}</p>
                  </li>
                )}

                {santo.padroeiroDe && (
                  <li className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-church-text/60">
                      <Shield className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-[11px] md:text-xs uppercase font-semibold tracking-wider">Padroeiro(a) de</span>
                    </div>
                    <p className="text-church-text font-serif text-base leading-relaxed pl-6">{santo.padroeiroDe}</p>
                  </li>
                )}

                {santo.intercessao && (
                  <li className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-church-text/60">
                      <BookHeart className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-[11px] md:text-xs uppercase font-semibold tracking-wider">Intercessão</span>
                    </div>
                    <p className="text-church-text font-serif text-base leading-relaxed pl-6">{santo.intercessao}</p>
                  </li>
                )}

                {(santo.origem || santo.seculo) && (
                  <li className="pt-5 mt-4 border-t border-church-border/50">
                    <div className="flex flex-col gap-5">
                      {santo.origem && (
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2 text-church-text/60">
                            <MapPin className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-[11px] md:text-xs uppercase font-semibold tracking-wider">Origem</span>
                          </div>
                          <p className="text-church-text font-serif text-base pl-6">{santo.origem}</p>
                        </div>
                      )}
                      {santo.seculo && (
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2 text-church-text/60">
                            <Clock className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-[11px] md:text-xs uppercase font-semibold tracking-wider">Época</span>
                          </div>
                          <p className="text-church-text font-serif text-base pl-6">{santo.seculo}</p>
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
            <div className="bg-church-bg-secondary rounded-2xl p-8 md:p-12 border border-church-border shadow-sm min-h-full">
              <h2 className="text-2xl md:text-3xl font-serif text-church-accent mb-8 flex items-center gap-4">
                História
                <div className="h-px bg-church-border/60 flex-1 mt-1"></div>
              </h2>
              <div className="text-church-text/90 font-serif leading-[1.8] text-lg whitespace-pre-line text-justify">
                {santo.historia}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
