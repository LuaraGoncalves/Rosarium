import { useNavigate } from "react-router";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useLiturgia } from "../hooks/useLiturgia";

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
          onClick={() => navigate("/liturgia")}
          className="bg-church-bg-secondary border border-church-border-hover text-church-accent px-6 py-2 rounded-lg"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-church-bg text-church-text font-sans pb-24">
      <header className="bg-church-bg/95 border-b border-church-border backdrop-blur-md sticky top-0 z-50 py-6 transition-all">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-4">
            <button
              onClick={() => navigate("/liturgia")}
              className="flex items-center gap-2 text-church-accent hover:text-church-accent-hover transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar à Liturgia
            </button>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <BookOpen className="w-8 h-8 text-church-accent-hover" />
            <h1 className="text-3xl text-center font-serif text-church-accent">Liturgia de Hoje</h1>
            <p className="text-church-text/60 mt-1">{liturgia.data} • {liturgia.liturgia}</p>
            <span className="inline-block px-3 py-1 mt-2 rounded-full text-xs font-medium border border-church-border-hover bg-church-bg-secondary text-church-text/80">
              Cor litúrgica: <span className="text-church-accent">{liturgia.cor}</span>
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-12 text-lg leading-relaxed text-church-text/90">
        
        {/* Primeira Leitura */}
        {liturgia.primeiraLeitura && (
          <div className="bg-church-bg-secondary p-8 rounded-2xl border border-church-border-hover">
            <h3 className="text-[#C89B3C] font-serif mb-2 uppercase text-sm tracking-wider text-center">Primeira Leitura</h3>
            <p className="text-center font-serif text-church-accent mb-6">{liturgia.primeiraLeitura.referencia}</p>
            <div className="whitespace-pre-line text-justify">
              {liturgia.primeiraLeitura.texto}
            </div>
            <p className="mt-6 font-semibold italic">Palavra do Senhor.</p>
            <p className="italic text-church-text/60">Graças a Deus.</p>
          </div>
        )}

        {/* Salmo */}
        {liturgia.salmo && (
          <div className="bg-church-bg-secondary p-8 rounded-2xl border border-church-border-hover">
            <h3 className="text-[#C89B3C] font-serif mb-2 uppercase text-sm tracking-wider text-center">Salmo Responsorial</h3>
            <p className="text-center font-serif text-church-accent mb-6">{liturgia.salmo.referencia}</p>
            <div className="text-center font-semibold italic mb-6 text-church-accent-hover">
              R. {liturgia.salmo.refrao}
            </div>
            <div className="whitespace-pre-line text-center">
              {liturgia.salmo.texto}
            </div>
          </div>
        )}

        {/* Segunda Leitura */}
        {liturgia.segundaLeitura && liturgia.segundaLeitura.texto && (
          <div className="bg-church-bg-secondary p-8 rounded-2xl border border-church-border-hover">
            <h3 className="text-[#C89B3C] font-serif mb-2 uppercase text-sm tracking-wider text-center">Segunda Leitura</h3>
            <p className="text-center font-serif text-church-accent mb-6">{liturgia.segundaLeitura.referencia}</p>
            <div className="whitespace-pre-line text-justify">
              {liturgia.segundaLeitura.texto}
            </div>
            <p className="mt-6 font-semibold italic">Palavra do Senhor.</p>
            <p className="italic text-church-text/60">Graças a Deus.</p>
          </div>
        )}

        {/* Evangelho */}
        {liturgia.evangelho && (
          <div className="bg-church-bg-secondary p-8 rounded-2xl border border-[#C89B3C]/30 shadow-[0_0_15px_rgba(200,155,60,0.1)]">
            <h3 className="text-[#C89B3C] font-serif mb-2 uppercase text-sm tracking-wider text-center">Evangelho</h3>
            <p className="text-center font-serif text-church-accent mb-6">{liturgia.evangelho.referencia}</p>
            
            <div className="mb-6 text-center italic text-church-text/80">
              <p>O Senhor esteja convosco.</p>
              <p className="font-semibold text-church-text">Ele está no meio de nós.</p>
              <p className="mt-2">Proclamação do Evangelho de Jesus Cristo segundo {liturgia.evangelho.referencia.split(' ')[0]}.</p>
              <p className="font-semibold text-church-text">Glória a vós, Senhor.</p>
            </div>

            <div className="whitespace-pre-line text-justify">
              {liturgia.evangelho.texto}
            </div>
            
            <p className="mt-8 font-semibold italic text-center text-church-accent">Palavra da Salvação.</p>
            <p className="italic text-church-text/60 text-center">Glória a vós, Senhor.</p>
          </div>
        )}

      </div>
    </div>
  );
}
