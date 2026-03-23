import { useNavigate } from "react-router";
import { ArrowLeft, Clock, Sun, Sunset, Moon, Star } from "lucide-react";
import { useBreviario } from "../hooks/useBreviario";

export function BreviarioPage() {
  const navigate = useNavigate();
  const { data: breviario, loading, error } = useBreviario();

  const horas = [
    {
      id: "oficio",
      nome: "Ofício das Leituras",
      horario: "Durante a noite ou madrugada",
      icon: Star,
      descricao: "Leituras bíblicas e patrísticas",
    },
    {
      id: "laudes",
      nome: "Laudes",
      horario: "Ao amanhecer",
      icon: Sun,
      descricao: "Oração matutina de louvor",
    },
    {
      id: "hora-media",
      nome: "Hora Média (Terça, Sexta, Nona)",
      horario: "9h, 12h, 15h",
      icon: Clock,
      descricao: "Orações ao longo do dia",
    },
    {
      id: "vesperas",
      nome: "Vésperas",
      horario: "Ao entardecer",
      icon: Sunset,
      descricao: "Oração vespertina de louvor",
    },
    {
      id: "completas",
      nome: "Completas",
      horario: "Antes de dormir",
      icon: Moon,
      descricao: "Oração noturna de encerramento",
    },
  ];

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
            <Clock className="w-8 h-8 text-church-accent-hover" />
            <h1 className="text-4xl text-center font-serif text-church-accent">Breviário</h1>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-church-bg-secondary rounded-2xl p-8 mb-12 border border-church-border-hover shadow-none">
          <div className="overflow-hidden h-64 mb-8 rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1709541658608-dfe38af68925?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFpbmVkJTIwZ2xhc3MlMjBjaHVyY2glMjB3aW5kb3d8ZW58MXx8fHwxNzczMzI2MDI0fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Vitral de Igreja"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-serif text-church-accent-hover mb-4">
            A Liturgia das Horas
          </h2>
          <p className="text-church-text/80 leading-relaxed mb-4">
            O Breviário, também conhecido como Liturgia das Horas, é a oração
            oficial da Igreja que santifica as diferentes horas do dia. Composto
            principalmente de salmos, hinos e leituras bíblicas, ele nos convida
            a rezar com toda a Igreja ao longo do dia.
          </p>
          <p className="text-church-text/80 leading-relaxed italic font-serif">
            "Sete vezes ao dia eu te louvo" - Salmo 119:164
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <p className="text-church-text/60 italic font-serif">Carregando a Liturgia das Horas de hoje...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12 bg-red-500/10 rounded-xl border border-red-500/20 mb-12">
            <p className="text-red-400 font-serif">Erro ao carregar o breviário: {error}</p>
          </div>
        )}

        {!loading && !error && breviario && (
          <div className="mb-12 bg-church-bg-secondary rounded-xl p-6 border border-church-border-hover text-center">
            <h3 className="text-xl font-serif text-church-accent mb-2">
              Hoje: {breviario.data}
            </h3>
            <p className="text-church-text/80">
              {breviario.tempo} - {breviario.semana}
            </p>
          </div>
        )}

        <div className="space-y-6">
          {horas.map((hora) => {
            const Icon = hora.icon;
            return (
              <div
                key={hora.id}
                onClick={() => navigate(`/breviario/${hora.id}`)}
                className="bg-church-bg-secondary rounded-xl p-6 border border-church-border-hover 
                  hover:border-[#C89B3C]/50 transition-all cursor-pointer group shadow-none"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-church-bg border border-church-border-hover rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-church-accent-hover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-serif text-church-accent mb-2 group-hover:text-church-accent-hover transition-colors">
                      {hora.nome}
                    </h3>
                    <p className="text-church-text/60 mb-2">{hora.horario}</p>
                    <p className="text-church-text/80">{hora.descricao}</p>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/breviario/${hora.id}`);
                    }}
                    className="bg-church-bg hover:bg-church-bg-darker text-church-accent border border-church-border-hover px-6 py-2 rounded-lg transition-colors"
                  >
                    Rezar
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-church-bg-secondary rounded-2xl p-8 border border-church-border-hover">
          <h3 className="text-xl font-serif text-church-accent mb-6">
            Estrutura de cada Hora
          </h3>
          <ul className="space-y-4 text-church-text/80">
            <li className="pl-4 border-l-2 border-[#C89B3C]">
              <div className="font-semibold text-church-accent-hover mb-1">Invocação inicial e Hino</div>
              "Vinde, ó Deus, em meu auxílio. Socorrei-me sem demora." Seguido de um hino apropriado para o momento do dia.
            </li>
            <li className="pl-4 border-l-2 border-[#C89B3C]">
              <div className="font-semibold text-church-accent-hover mb-1">Salmodia</div>
              Dois a três salmos com suas respectivas antífonas, muitas vezes concluídos com o "Glória ao Pai".
            </li>
            <li className="pl-4 border-l-2 border-[#C89B3C]">
              <div className="font-semibold text-church-accent-hover mb-1">Leitura bíblica ou patrística</div>
              Uma passagem curta das Escrituras ou dos Padres da Igreja.
            </li>
            <li className="pl-4 border-l-2 border-[#C89B3C]">
              <div className="font-semibold text-church-accent-hover mb-1">Responsório</div>
              Um cântico curto ou verso em resposta à leitura.
            </li>
            <li className="pl-4 border-l-2 border-[#C89B3C]">
              <div className="font-semibold text-church-accent-hover mb-1">Cântico Evangélico</div>
              Cântico de Zacarias (Benedictus) nas Laudes, Cântico de Maria (Magnificat) nas Vésperas, ou Cântico de Simeão nas Completas.
            </li>
            <li className="pl-4 border-l-2 border-[#C89B3C]">
              <div className="font-semibold text-church-accent-hover mb-1">Preces e Pai Nosso</div>
              Preces de intercessão pela Igreja e pelo mundo, concluídas com a oração que Jesus nos ensinou.
            </li>
            <li className="pl-4 border-l-2 border-[#C89B3C]">
              <div className="font-semibold text-church-accent-hover mb-1">Oração conclusiva e bênção</div>
              Oração própria do dia ou da semana, finalizando com a bênção ("O Senhor nos abençoe, nos livre de todo o mal e nos conduza à vida eterna. Amém.")
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}