import { useNavigate } from "react-router";
import { ArrowLeft, Church, BookOpen, Calendar } from "lucide-react";

export function LiturgiaPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-church-bg text-church-text font-sans">
      <header className="bg-church-bg/95 border-b border-church-border backdrop-blur-md sticky top-0 z-50 py-6 transition-all">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-4">
            <button
              onClick={() => navigate("/igreja")}
              className="flex items-center gap-2 text-church-accent hover:text-church-accent-hover transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Church className="w-8 h-8 text-church-accent-hover" />
            <h1 className="text-4xl text-center font-serif text-church-accent">
              Liturgia das Horas
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-church-bg-secondary rounded-2xl p-8 mb-12 border border-church-border-hover shadow-none">
          <div className="overflow-hidden h-64 mb-8 rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1696261803446-e9847baf4a6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRob2xpYyUyMGNodXJjaCUyMGFsdGFyJTIwc3RhdHVlfGVufDF8fHx8MTc3MzQwOTg2MHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Interior da Igreja"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-serif text-church-accent-hover mb-4">
            A Oração Oficial da Igreja
          </h2>
          <p className="text-church-text/80 leading-relaxed mb-4">
            A Liturgia das Horas é a oração pública e comum do Povo de Deus.
            Nela, Cristo mesmo "continua a exercer sua função sacerdotal",
            reunindo a Igreja em louvor a Deus e intercessão pelo mundo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-church-bg-secondary rounded-xl p-8 border border-church-border-hover shadow-none">
            <div className="w-14 h-14 bg-church-bg border border-church-border-hover rounded-full flex items-center justify-center mb-6">
              <BookOpen className="w-7 h-7 text-church-accent-hover" />
            </div>
            <h3 className="text-xl font-serif text-church-accent mb-3">
              Liturgia Hoje
            </h3>
            <p className="text-church-text/60 mb-6">
              Acompanhe as leituras e orações do dia de hoje segundo o
              calendário litúrgico da Igreja.
            </p>
            <button 
              onClick={() => navigate("/liturgia/hoje")}
              className="w-full bg-church-bg hover:bg-church-bg-darker text-church-accent border border-church-border-hover py-3 rounded-lg transition-colors font-medium"
            >
              Ver Liturgia de Hoje
            </button>
          </div>

          <div className="bg-church-bg-secondary rounded-xl p-8 border border-church-border-hover shadow-none">
            <div className="w-14 h-14 bg-church-bg border border-church-border-hover rounded-full flex items-center justify-center mb-6">
              <Calendar className="w-7 h-7 text-church-accent-hover" />
            </div>
            <h3 className="text-xl font-serif text-church-accent mb-3">
              Calendário Litúrgico
            </h3>
            <p className="text-church-text/60 mb-6">
              Explore o calendário com as festas, solenidades e tempos
              litúrgicos do ano.
            </p>
            <button 
              onClick={() => navigate("/liturgia/calendario")}
              className="w-full bg-church-bg hover:bg-church-bg-darker text-church-accent border border-church-border-hover py-3 rounded-lg transition-colors font-medium"
            >
              Ver Calendário
            </button>
          </div>
        </div>

        <div className="bg-church-bg-secondary rounded-2xl p-8 border border-church-border-hover">
          <h3 className="text-2xl font-serif text-church-accent mb-8">
            Tempos Litúrgicos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                tempo: "Advento",
                desc: "Preparação para o Natal",
                cor: "Roxo",
              },
              { tempo: "Natal", desc: "Celebração do nascimento de Jesus", cor: "Branco" },
              {
                tempo: "Quaresma",
                desc: "Preparação para a Páscoa",
                cor: "Roxo",
              },
              {
                tempo: "Páscoa",
                desc: "Celebração da Ressurreição",
                cor: "Branco",
              },
              {
                tempo: "Tempo Comum",
                desc: "Crescimento na vida cristã",
                cor: "Verde",
              },
              {
                tempo: "Solenidades",
                desc: "Festas especiais do ano",
                cor: "Variável",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-church-bg rounded-xl p-6 border border-church-border-hover transition-all hover:border-[#D4AF37]/50"
              >
                <h4 className="text-xl font-serif text-church-accent-hover mb-2">
                  {item.tempo}
                </h4>
                <p className="text-church-text/80 mb-3">{item.desc}</p>
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
