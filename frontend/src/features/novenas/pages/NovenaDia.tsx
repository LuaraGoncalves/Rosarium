import { useParams, useNavigate } from "react-router";
import { ArrowLeft, CheckCircle, Circle, Eye, EyeOff } from "lucide-react";
import { novenasData } from "../data/novenas";
import { useNovenaProgress } from "../hooks/useNovenaProgress";
import { useEffect, useState } from "react";

export function NovenaDia() {
  const { id, dia } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dia]);

  const numDia = Number(dia);
  const novena = novenasData.find(n => n.id === id);
  const { isDayCompleted, toggleDay } = useNovenaProgress(id || "");

  if (!novena || !dia) {
    return <div className="min-h-screen bg-stone-950 text-stone-200">Novena ou dia não encontrado.</div>;
  }

  const diaInfo = novena.dias.find(d => d.dia === numDia);
  if (!diaInfo) {
    return <div className="min-h-screen bg-stone-950 text-stone-200">Dia inválido.</div>;
  }

  const completed = isDayCompleted(numDia);
  const isLastDay = numDia === novena.duracao;

  const handleComplete = () => {
    if (!completed) toggleDay(numDia);
    
    if (isLastDay) {
      navigate(`/novenas/${id}`);
    } else {
      navigate(`/novenas/${id}/dia/${numDia + 1}`);
    }
  };

  return (
    <div className="min-h-screen bg-church-bg text-church-text font-sans pb-32">
      <header className="bg-church-bg/95 border-b border-church-border backdrop-blur-md sticky top-0 z-50 py-6 transition-all">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-4">
            <button
              onClick={() => navigate(`/novenas/${id}`)}
              className="flex items-center gap-2 text-church-accent hover:text-church-accent-hover transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar para {novena.titulo}
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-serif text-church-accent-hover">
              Dia {diaInfo.dia}
            </h1>
            <span className="bg-church-bg-secondary text-church-accent/80 px-3 py-1 rounded-full text-sm border border-church-border-hover">
              {diaInfo.dia} de {novena.duracao}
            </span>
          </div>
          <h2 className="text-xl font-serif mt-2 text-church-text/70">
            {diaInfo.titulo}
          </h2>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {novena.id === "divina-misericordia" && (
          <div className="bg-church-bg-secondary border border-church-border-hover rounded-lg p-4 mb-8 text-church-accent text-sm md:text-base text-center shadow-sm">
            <span className="font-medium block mb-1">Se possível, segure o terço em suas mãos.</span>
            A oração com o terço físico ajuda na concentração, no ritmo e na meditação dos mistérios.
          </div>
        )}
        
        <div className="space-y-12">
          {/* Oração Inicial */}
          <section className="p-6 rounded-2xl bg-church-bg-secondary border border-church-border-hover shadow-none">
            <h3 className="text-sm uppercase tracking-wider mb-4 font-bold flex items-center gap-2 text-church-accent-hover/80">
              <span className="w-8 h-px bg-[#C89B3C]/30"></span> 
              Oração Inicial 
              <span className="w-8 h-px bg-[#C89B3C]/30"></span>
            </h3>
            <div className="whitespace-pre-line leading-relaxed italic text-lg text-church-text">
              {novena.oracaoInicial}
            </div>
          </section>

          {/* Oração Principal da Novena */}
          <section className="p-6 rounded-2xl bg-church-bg-secondary border border-church-border-hover shadow-none">
            <h3 className="text-sm uppercase tracking-wider mb-4 font-bold flex items-center gap-2 text-church-accent-hover/80">
              <span className="w-8 h-px bg-[#C89B3C]/30"></span> 
              Oração Principal 
              <span className="w-8 h-px bg-[#C89B3C]/30"></span>
            </h3>
            <div className="whitespace-pre-line leading-relaxed italic text-lg text-church-text">
              {novena.oracaoPrincipal}
            </div>
          </section>

          {/* Meditação e Oração do Dia */}
          <section className="p-8 rounded-2xl bg-church-bg-tertiary border border-church-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AF37]/50"></div>
            
            <h3 className="text-sm uppercase tracking-wider mb-2 font-bold text-church-accent/80">
              Meditação do Dia
            </h3>
            <p className="text-lg md:text-xl mb-8 leading-relaxed font-serif text-church-text">
              "{diaInfo.meditacao}"
            </p>

            <h3 className="text-sm uppercase tracking-wider mb-4 font-bold text-church-accent/80">
              Oração do Dia
            </h3>
            <div className="whitespace-pre-line leading-relaxed italic text-xl text-church-text/90">
              {diaInfo.oracao}
            </div>
          </section>

          {/* Oração Final */}
          <section className="p-6 rounded-2xl bg-church-bg-secondary border border-church-border-hover shadow-none mb-12">
            <h3 className="text-sm uppercase tracking-wider mb-4 font-bold flex items-center gap-2 text-church-accent-hover/80">
              <span className="w-8 h-px bg-[#C89B3C]/30"></span> 
              Oração Final 
              <span className="w-8 h-px bg-[#C89B3C]/30"></span>
            </h3>
            <div className="whitespace-pre-line leading-relaxed italic text-lg text-church-text">
              {novena.oracaoFinal}
            </div>
          </section>
        </div>
      </div>

      {/* Botão Fixo Embaixo para Concluir */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-church-bg/95 backdrop-blur-md border-t border-church-border">
        <div className="max-w-2xl mx-auto flex gap-4">
          <button
            onClick={() => toggleDay(numDia)}
            className={`flex-1 py-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-all border
              ${completed 
                ? "bg-church-bg-secondary text-church-accent border-church-border-hover hover:bg-[#423A33]"
                : "bg-church-bg-darker text-church-text/50 border-church-border hover:bg-church-bg-secondary"
              }`}
          >
            {completed ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
            {completed ? "Marcado como Concluído" : "Marcar como Concluído"}
          </button>
          
          <button
            onClick={handleComplete}
            className="flex-1 py-4 rounded-xl font-medium transition-colors shadow-none bg-[#C89B3C]/80 hover:bg-[#C89B3C] text-[#1E1A17]"
          >
            {isLastDay ? "Finalizar Novena" : "Próximo Dia"}
          </button>
        </div>
      </div>
    </div>
  );
}
