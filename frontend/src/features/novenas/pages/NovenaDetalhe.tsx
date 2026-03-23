import { useParams, useNavigate } from "react-router";
import { ArrowLeft, CheckCircle, Circle, Eye, EyeOff } from "lucide-react";
import { novenasData } from "../data/novenas";
import { useNovenaProgress } from "../hooks/useNovenaProgress";
import { useState } from "react";

export function NovenaDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contemplativeMode, setContemplativeMode] = useState(false);
  
  const novena = novenasData.find(n => n.id === id);
  const { completedDays, progressPercentage } = useNovenaProgress(id || "");

  if (!novena) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center text-stone-800">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-amber-900 mb-4">Novena não encontrada</h2>
          <button 
            onClick={() => navigate("/novenas")}
            className="text-stone-600 hover:text-amber-900 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para Novenas
          </button>
        </div>
      </div>
    );
  }

  const percentage = progressPercentage(novena.duracao);

  return (
    <div className="min-h-screen bg-church-bg text-church-text font-sans">
      <header className="bg-church-bg/95 border-b border-church-border backdrop-blur-md sticky top-0 z-50 py-6 transition-all">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-4">
            <button
              onClick={() => navigate("/novenas")}
              className="flex items-center gap-2 text-church-accent hover:text-church-accent-hover transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
          </div>
          <h1 className="text-3xl font-serif text-church-accent-hover">
            {novena.titulo}
          </h1>
          <p className="mt-2 text-church-text/70">
            {novena.descricao}
          </p>
          
          <div className="mt-6 flex items-center justify-between text-sm">
            <span className="text-church-accent/80">Progresso</span>
            <span className="text-church-accent-hover font-medium">{percentage}% ({completedDays.length}/{novena.duracao})</span>
          </div>
          <div className="w-full bg-church-bg-darker h-2 rounded-full overflow-hidden border border-church-border mt-2">
            <div 
              className="bg-[#C89B3C] h-full transition-all duration-500 opacity-80" 
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="grid gap-4">
          {novena.dias.map((diaInfo) => {
            const isCompleted = completedDays.includes(diaInfo.dia);
            
            return (
              <div 
                key={diaInfo.dia}
                onClick={() => navigate(`/novenas/${novena.id}/dia/${diaInfo.dia}`)}
                className={`p-5 rounded-xl border transition-all cursor-pointer flex items-center gap-4 shadow-sm
                  ${isCompleted
                    ? "bg-church-bg-darker border-[#2C1F1A] opacity-40 hover:opacity-70"
                    : "bg-church-bg-secondary border-church-border-hover hover:border-[#D4AF37]/50"
                  }`}
              >
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-church-accent-hover/50" />
                  ) : (
                    <Circle className="w-6 h-6 text-church-text/30" />
                  )}
                </div>
                <div>
                  <h3 className={`font-medium transition-colors duration-700 
                    ${isCompleted ? "text-church-text/40 line-through decoration-[#F5E6D3]/20" : "text-church-text"}`}>
                    Dia {diaInfo.dia} - {diaInfo.titulo}
                  </h3>
                  <p className="text-sm mt-1 line-clamp-1 text-church-text/60">
                    {diaInfo.meditacao}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
