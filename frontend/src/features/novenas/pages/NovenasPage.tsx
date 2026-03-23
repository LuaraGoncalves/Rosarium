import { useNavigate } from "react-router";
import { ArrowLeft, Heart, Calendar, CheckCircle } from "lucide-react";
import { novenasData } from "../data/novenas";
import { useNovenaProgress } from "../hooks/useNovenaProgress";

function NovenaCard({ novena }: { novena: any }) {
  const navigate = useNavigate();
  const { completedDays, progressPercentage } = useNovenaProgress(novena.id);
  const percentage = progressPercentage(novena.duracao);

  return (
    <div
      onClick={() => navigate(`/novenas/${novena.id}`)}
      className="bg-church-bg-secondary rounded-xl p-6 border border-church-border-hover 
        hover:border-[#C89B3C]/50 transition-all cursor-pointer 
        hover:-translate-y-1 group shadow-none"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-church-bg border border-church-border-hover rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
          <Heart className="w-6 h-6 text-church-accent-hover" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-serif text-church-accent mb-2 group-hover:text-church-accent-hover transition-colors">
            {novena.titulo}
          </h3>
          <p className="text-church-text/60 text-sm mb-3 line-clamp-2">
            {novena.descricao}
          </p>
          <div className="flex items-center gap-4 text-sm text-church-text/40">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{novena.duracao} dias</span>
            </div>
            {completedDays.length > 0 && (
              <div className="flex items-center gap-1 text-church-accent font-medium">
                <CheckCircle className="w-4 h-4" />
                <span>{completedDays.length}/{novena.duracao} concluídos</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Barra de progresso minimalista */}
      <div className="w-full bg-church-bg h-1.5 rounded-full mt-4 overflow-hidden border border-church-border-hover">
        <div 
          className="bg-[#C89B3C] h-full transition-all duration-500 opacity-80" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function NovenasPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-church-bg text-church-text font-sans">
      <header className="bg-church-bg/95 border-b border-church-border backdrop-blur-md sticky top-0 z-50 py-6 transition-all">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => navigate("/igreja")}
            className="flex items-center gap-2 text-church-accent hover:text-church-accent-hover mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
          <div className="flex items-center justify-center gap-3">
            <Heart className="w-8 h-8 text-church-accent-hover" />
            <h1 className="text-4xl text-center font-serif text-church-accent">Novenas</h1>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-church-bg-secondary rounded-2xl p-8 mb-12 border border-church-border-hover shadow-none">
          <div className="overflow-hidden h-64 mb-8 rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1559536454-5a69386e8075?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBpbnRlcmlvciUyMGNhbmRsZXN8ZW58MXx8fHwxNzczNDA5ODYyfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Velas na Igreja"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-church-text/80 text-lg leading-relaxed text-center italic font-serif">
            As novenas são orações feitas durante nove dias consecutivos,
            buscando a intercessão de Jesus, Maria ou dos santos. Esta prática
            antiga da Igreja nos ajuda a perseverar na oração e demonstrar nossa
            fé e confiança em Deus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {novenasData.map((novena) => (
            <NovenaCard key={novena.id} novena={novena} />
          ))}
        </div>
      </div>
    </div>
  );
}
