import { useNavigate } from "react-router";
import { ArrowLeft, Users, Star, Calendar, Book } from "lucide-react";
import { useSantos } from '../hooks/useSantos'

export function SantosPage() {
  const navigate = useNavigate();

  const { santos, santoDoDia } = useSantos();

  const outrosSantos = santos.filter(s => s.id !== santoDoDia?.id);

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
            <Users className="w-8 h-8 text-church-accent-hover" />
            <h1 className="text-4xl text-center font-serif text-church-accent">
              História dos Santos
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-church-bg-secondary rounded-2xl p-8 mb-12 border border-church-border-hover shadow-none">
          <div className="overflow-hidden h-64 mb-8 rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1637331664385-17bbf6be1d93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRob2xpYyUyMHNhaW50JTIwc3RhdHVlfGVufDF8fHx8MTc3MzQwOTg2Mnww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Estátua de Santo"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-serif text-church-accent-hover mb-4">
            Testemunhas da Fé
          </h2>
          <p className="text-church-text/80 leading-relaxed mb-4">
            Os santos são homens e mulheres que viveram a fé cristã de maneira
            heroica. Suas vidas nos inspiram e suas intercessões nos ajudam em
            nosso caminho de santidade. Eles são exemplos vivos de como seguir
            Cristo em todas as circunstâncias.
          </p>
        </div>

        {santoDoDia && (
          <div className="mb-16">
            <h2 className="text-2xl font-serif text-church-accent-hover mb-6 flex items-center gap-2">
              <Star className="w-6 h-6" /> Santo do Dia
            </h2>
            <div 
              onClick={() => navigate(`/santos/${santoDoDia.id}`)}
              className="bg-church-bg-secondary rounded-2xl overflow-hidden border border-[#D4AF37]/30 transition-all hover:border-[#D4AF37]/70 cursor-pointer shadow-none group"
            >
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto overflow-hidden relative bg-church-bg-tertiary flex items-center justify-center">
                  {santoDoDia.imagemUrl ? (
                    <img
                      src={santoDoDia.imagemUrl}
                      alt={santoDoDia.nome}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Users className="w-20 h-20 text-church-text-muted opacity-30" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 md:from-transparent to-transparent"></div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  {santoDoDia.diaFesta && (
                    <div className="flex items-center gap-2 text-church-text/60 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{santoDoDia.diaFesta}</span>
                    </div>
                  )}
                  <h3 className="text-3xl font-serif text-church-accent mb-2 group-hover:text-church-accent-hover transition-colors">
                    {santoDoDia.nome}
                  </h3>
                  <p className="text-xl text-church-text/80 italic font-serif mb-6">
                    {santoDoDia.descricaoCurta}
                  </p>
                  
                  {/* Detailed attributes clearly listed */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-sm text-church-text/80">
                    {santoDoDia.padroeiroDe && (
                      <div>
                        <strong className="text-church-accent block mb-1">Padroeiro:</strong>
                        <span className="line-clamp-2">{santoDoDia.padroeiroDe}</span>
                      </div>
                    )}
                    {santoDoDia.intercessao && (
                      <div>
                        <strong className="text-church-accent block mb-1">Intercessão:</strong>
                        <span className="line-clamp-2">{santoDoDia.intercessao}</span>
                      </div>
                    )}
                  </div>
                  <button className="self-start bg-church-bg hover:bg-church-bg-darker text-church-accent border border-church-border-hover px-6 py-2 rounded-lg transition-colors flex items-center gap-2">
                    <Book className="w-4 h-4" />
                    Ler História Completa
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-serif text-church-accent mb-6">Conheça outros Santos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {outrosSantos.map((santo) => (
              <div
                key={santo.id}
                onClick={() => navigate(`/santos/${santo.id}`)}
                className="bg-church-bg-secondary rounded-xl overflow-hidden border border-church-border-hover transition-all hover:border-[#D4AF37]/50 group cursor-pointer shadow-none flex flex-col"
              >
                <div className="h-48 overflow-hidden relative shrink-0 bg-church-bg-tertiary flex items-center justify-center">
                  {santo.imagemUrl ? (
                    <img
                      src={santo.imagemUrl}
                      alt={santo.nome}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Users className="w-16 h-16 text-church-text-muted opacity-30" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-serif text-white mb-1">
                      {santo.nome}
                    </h3>
                    {santo.diaFesta && (
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{santo.diaFesta}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1 text-sm">
                  <p className="text-church-text/90 italic font-serif mb-3 line-clamp-2">
                    {santo.descricaoCurta || santo.historia}
                  </p>
                  <div className="space-y-2 mb-6 text-church-text/70">
                    {santo.padroeiroDe && (
                      <p><strong className="text-church-accent">Padroeiro:</strong> <span className="line-clamp-1">{santo.padroeiroDe}</span></p>
                    )}
                    {santo.intercessao && (
                      <p><strong className="text-church-accent">Intercede:</strong> <span className="line-clamp-1">{santo.intercessao}</span></p>
                    )}
                  </div>
                  <button className="text-church-accent hover:text-church-accent-hover font-medium flex items-center gap-2 transition-colors mt-auto">
                    <Book className="w-4 h-4" />
                    Ler História
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
