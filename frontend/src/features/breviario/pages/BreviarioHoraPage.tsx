import { useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useBreviario, BreviarioData } from "../hooks/useBreviario";

export function BreviarioHoraPage() {
  const navigate = useNavigate();
  const { hora } = useParams<{ hora: string }>();
  const { data: breviario, loading, error } = useBreviario();

  const tituloHora = hora ? hora.charAt(0).toUpperCase() + hora.slice(1).replace("-", " ") : "Hora não encontrada";

  if (loading) {
    return (
      <div className="min-h-screen bg-church-bg text-church-text font-sans flex items-center justify-center">
        <p className="text-church-text/60 italic font-serif">Carregando a oração...</p>
      </div>
    );
  }

  if (error || !breviario) {
    return (
      <div className="min-h-screen bg-church-bg text-church-text font-sans flex flex-col items-center justify-center p-4">
        <p className="text-red-400 font-serif mb-4">Erro ao carregar o breviário.</p>
        <button
          onClick={() => navigate("/breviario")}
          className="bg-church-bg-secondary border border-church-border-hover text-church-accent px-6 py-2 rounded-lg"
        >
          Voltar
        </button>
      </div>
    );
  }

  let horaData: any = null;
  if (hora === 'oficio') horaData = breviario.oficio;
  if (hora === 'laudes') horaData = breviario.laudes;
  if (hora === 'hora-media') horaData = breviario.hora_media;
  if (hora === 'vesperas') horaData = breviario.vesperas;
  if (hora === 'completas') horaData = breviario.completas;

  return (
    <div className="min-h-screen bg-church-bg text-church-text font-sans pb-24">
      <header className="bg-church-bg/95 border-b border-church-border backdrop-blur-md sticky top-0 z-50 py-6 transition-all">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-4">
            <button
              onClick={() => navigate("/breviario")}
              className="flex items-center gap-2 text-church-accent hover:text-church-accent-hover transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar ao Breviário
            </button>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-serif text-church-accent">{tituloHora}</h1>
            <p className="text-church-text/60 mt-2">{breviario.data} • {breviario.tempo}</p>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 text-lg leading-relaxed text-church-text/90">
        
        {!horaData ? (
          <div className="text-center py-12">
            <p className="text-church-text/60 italic font-serif">Conteúdo para {tituloHora} não disponível no momento.</p>
          </div>
        ) : (
          <>
            {/* Invocação */}
            {horaData.invitatorio && (
              <div className="bg-church-bg-secondary p-6 rounded-xl border border-church-border-hover">
                <h3 className="text-[#C89B3C] font-serif mb-2 uppercase text-sm tracking-wider">Invitatório</h3>
                <p className="italic">{horaData.invitatorio}</p>
              </div>
            )}

            {/* Hino */}
            {horaData.hino && (
              <div className="mb-8">
                <h3 className="text-[#C89B3C] font-serif mb-4 uppercase text-sm tracking-wider text-center">Hino</h3>
                <div className="text-center whitespace-pre-line italic text-church-text/80">
                  {horaData.hino}
                </div>
              </div>
            )}

            {/* Salmodia */}
            {horaData.salmodia && horaData.salmodia.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-[#C89B3C] font-serif uppercase text-sm tracking-wider text-center border-b border-church-border-hover pb-2">Salmodia</h3>
                {horaData.salmodia.map((salmo: string, index: number) => (
                  <div key={index} className="bg-church-bg-secondary p-6 rounded-xl border border-church-border-hover">
                    <p>{salmo}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Leituras */}
            {(horaData.leitura1 || horaData.leitura) && (
              <div className="my-8">
                <h3 className="text-[#C89B3C] font-serif mb-4 uppercase text-sm tracking-wider text-center border-b border-church-border-hover pb-2">Leitura</h3>
                <div className="bg-church-bg p-6 rounded-xl border border-church-border-hover">
                  <p>{horaData.leitura1 || horaData.leitura}</p>
                </div>
              </div>
            )}

            {horaData.leitura2 && (
              <div className="my-8">
                <h3 className="text-[#C89B3C] font-serif mb-4 uppercase text-sm tracking-wider text-center border-b border-church-border-hover pb-2">Segunda Leitura</h3>
                <div className="bg-church-bg p-6 rounded-xl border border-church-border-hover">
                  <p>{horaData.leitura2}</p>
                </div>
              </div>
            )}

            {/* Cânticos Evangélicos */}
            {horaData.benedictus && (
              <div className="my-8 text-center">
                <h3 className="text-[#C89B3C] font-serif mb-4 uppercase text-sm tracking-wider text-center">Benedictus</h3>
                <p className="italic">{horaData.benedictus}</p>
              </div>
            )}

            {horaData.magnificat && (
              <div className="my-8 text-center">
                <h3 className="text-[#C89B3C] font-serif mb-4 uppercase text-sm tracking-wider text-center">Magnificat</h3>
                <p className="italic">{horaData.magnificat}</p>
              </div>
            )}

            {horaData.nunc_dimittis && (
              <div className="my-8 text-center">
                <h3 className="text-[#C89B3C] font-serif mb-4 uppercase text-sm tracking-wider text-center">Cântico de Simeão</h3>
                <p className="italic">{horaData.nunc_dimittis}</p>
              </div>
            )}

            {/* Preces */}
            {horaData.preces && horaData.preces.length > 0 && (
              <div className="my-8">
                <h3 className="text-[#C89B3C] font-serif mb-4 uppercase text-sm tracking-wider text-center border-b border-church-border-hover pb-2">Preces</h3>
                <ul className="space-y-3">
                  {horaData.preces.map((prece: string, index: number) => (
                    <li key={index} className="pl-4 border-l-2 border-[#C89B3C]">{prece}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Oração Conclusiva */}
            {horaData.oracao && (
              <div className="mt-12 text-center bg-church-bg-secondary p-8 rounded-xl border border-church-border-hover">
                <h3 className="text-[#C89B3C] font-serif mb-4 uppercase text-sm tracking-wider">Oração</h3>
                <p>{horaData.oracao}</p>
                <p className="mt-6 text-church-text/60 italic">Amém.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
