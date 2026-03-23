import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Cross, Eye, EyeOff } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../shared/components/ui/accordion";
import { oracoesDoRosario } from "../data/oracoes";
import { misteriosDoRosario } from "../data/misterios";

export function RosarioPage() {
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
            <Cross className="w-8 h-8 text-church-accent-hover" />
            <h1 className="text-4xl text-center font-serif text-church-accent">Santo Rosário</h1>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-church-bg-secondary rounded-2xl p-8 mb-8 border border-church-border-hover shadow-none">
          
          <div className="overflow-hidden h-64 mb-8 rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1624147210060-4c159a6c70d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3NhcnklMjBiZWFkcyUyMHByYXllcnxlbnwxfHx8fDE3NzMzMDQ3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Rosário"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="bg-church-bg border border-church-border rounded-lg p-4 mb-8 text-church-accent text-sm md:text-base text-center shadow-sm">
            <span className="font-medium block mb-1">Se possível, segure o terço em suas mãos.</span>
            <span className="text-church-text/60">A oração com o terço físico ajuda na concentração, no ritmo e na meditação dos mistérios.</span>
          </div>

          <div className="mb-8">
            <p className="text-church-text/80 text-lg leading-relaxed text-center italic font-serif">
              O Santo Rosário é uma oração contemplativa que nos convida a meditar
              nos principais mistérios da vida de Jesus Cristo e de Maria
              Santíssima. É uma poderosa arma espiritual e um caminho de
              santificação.
            </p>
          </div>

          <div className="bg-church-bg rounded-xl p-6 border border-church-border">
            <h3 className="text-xl font-serif mb-4 text-church-accent-hover">
              Como rezar o Rosário:
            </h3>
            
            <Accordion type="single" collapsible className="w-full text-church-text">
              {oracoesDoRosario.map((oracao) => (
                <AccordionItem value={oracao.id} key={oracao.id} className="border-b border-church-border last:border-0">
                  <AccordionTrigger className="hover:no-underline py-3 text-left transition-all duration-300 font-medium hover:text-church-accent text-church-text">
                    {oracao.titulo}
                  </AccordionTrigger>
                  <AccordionContent className="transition-all duration-300">
                    <div className="bg-church-bg-darker p-4 rounded-lg border border-church-border text-sm mt-2 mb-4 shadow-inner text-church-text">
                      {oracao.conteudo.map((item, idx) => (
                        <div key={idx} className={idx > 0 ? "mt-4" : ""}>
                          <p className="mb-2 font-medium text-church-accent-hover">{item.subtitulo}</p>
                          <p className="italic leading-relaxed text-lg">{item.texto}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
          </div>
        </div>

        <div className="space-y-6">
          {misteriosDoRosario.map((categoria, index) => (
            <div
              key={index}
              className="bg-church-bg-secondary rounded-2xl p-8 border border-church-border-hover shadow-none"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-serif text-church-accent-hover">
                  {categoria.tipo}
                </h2>
                <span className="bg-church-bg px-4 py-2 rounded-full text-sm border border-church-border text-church-accent/80">
                  {categoria.dia}
                </span>
              </div>
              
              <Accordion type="single" collapsible className="w-full text-church-text">
                {categoria.lista.map((misterio, idx) => (
                  <AccordionItem value={`mist-${index}-${idx}`} key={idx} className="border-b border-church-border-hover last:border-0">
                    <AccordionTrigger className="hover:no-underline py-3 text-left transition-all duration-300 text-lg hover:text-church-accent text-church-text">
                      {misterio.titulo}
                    </AccordionTrigger>
                    <AccordionContent className="transition-all duration-300">
                      <div className="bg-church-bg p-5 rounded-lg border border-church-border text-sm mt-2 mb-4 italic leading-relaxed text-lg shadow-inner text-church-text/90">
                        {misterio.leitura}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
