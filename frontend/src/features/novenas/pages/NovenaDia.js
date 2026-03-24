import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, CheckCircle, Circle } from "lucide-react";
import { novenasData } from "../data/novenas";
import { useNovenaProgress } from "../hooks/useNovenaProgress";
import { useEffect } from "react";
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
        return _jsx("div", { className: "min-h-screen bg-stone-950 text-stone-200", children: "Novena ou dia n\u00E3o encontrado." });
    }
    const diaInfo = novena.dias.find(d => d.dia === numDia);
    if (!diaInfo) {
        return _jsx("div", { className: "min-h-screen bg-stone-950 text-stone-200", children: "Dia inv\u00E1lido." });
    }
    const completed = isDayCompleted(numDia);
    const isLastDay = numDia === novena.duracao;
    const handleComplete = () => {
        if (!completed)
            toggleDay(numDia);
        if (isLastDay) {
            navigate(`/novenas/${id}`);
        }
        else {
            navigate(`/novenas/${id}/dia/${numDia + 1}`);
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-church-bg text-church-text font-sans pb-32", children: [_jsx("header", { className: "bg-church-bg/95 border-b border-church-border backdrop-blur-md sticky top-0 z-50 py-6 transition-all", children: _jsxs("div", { className: "max-w-3xl mx-auto px-4", children: [_jsx("div", { className: "mb-4", children: _jsxs("button", { onClick: () => navigate(`/novenas/${id}`), className: "flex items-center gap-2 text-church-accent hover:text-church-accent-hover transition-colors", children: [_jsx(ArrowLeft, { className: "w-5 h-5" }), "Voltar para ", novena.titulo] }) }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h1", { className: "text-3xl font-serif text-church-accent-hover", children: ["Dia ", diaInfo.dia] }), _jsxs("span", { className: "bg-church-bg-secondary text-church-accent/80 px-3 py-1 rounded-full text-sm border border-church-border-hover", children: [diaInfo.dia, " de ", novena.duracao] })] }), _jsx("h2", { className: "text-xl font-serif mt-2 text-church-text/70", children: diaInfo.titulo })] }) }), _jsxs("div", { className: "max-w-2xl mx-auto px-4 py-12", children: [novena.id === "divina-misericordia" && (_jsxs("div", { className: "bg-church-bg-secondary border border-church-border-hover rounded-lg p-4 mb-8 text-church-accent text-sm md:text-base text-center shadow-sm", children: [_jsx("span", { className: "font-medium block mb-1", children: "Se poss\u00EDvel, segure o ter\u00E7o em suas m\u00E3os." }), "A ora\u00E7\u00E3o com o ter\u00E7o f\u00EDsico ajuda na concentra\u00E7\u00E3o, no ritmo e na medita\u00E7\u00E3o dos mist\u00E9rios."] })), _jsxs("div", { className: "space-y-12", children: [_jsxs("section", { className: "p-6 rounded-2xl bg-church-bg-secondary border border-church-border-hover shadow-none", children: [_jsxs("h3", { className: "text-sm uppercase tracking-wider mb-4 font-bold flex items-center gap-2 text-church-accent-hover/80", children: [_jsx("span", { className: "w-8 h-px bg-[#C89B3C]/30" }), "Ora\u00E7\u00E3o Inicial", _jsx("span", { className: "w-8 h-px bg-[#C89B3C]/30" })] }), _jsx("div", { className: "whitespace-pre-line leading-relaxed italic text-lg text-church-text", children: novena.oracaoInicial })] }), _jsxs("section", { className: "p-6 rounded-2xl bg-church-bg-secondary border border-church-border-hover shadow-none", children: [_jsxs("h3", { className: "text-sm uppercase tracking-wider mb-4 font-bold flex items-center gap-2 text-church-accent-hover/80", children: [_jsx("span", { className: "w-8 h-px bg-[#C89B3C]/30" }), "Ora\u00E7\u00E3o Principal", _jsx("span", { className: "w-8 h-px bg-[#C89B3C]/30" })] }), _jsx("div", { className: "whitespace-pre-line leading-relaxed italic text-lg text-church-text", children: novena.oracaoPrincipal })] }), _jsxs("section", { className: "p-8 rounded-2xl bg-church-bg-tertiary border border-church-border relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 left-0 w-1 h-full bg-[#D4AF37]/50" }), _jsx("h3", { className: "text-sm uppercase tracking-wider mb-2 font-bold text-church-accent/80", children: "Medita\u00E7\u00E3o do Dia" }), _jsxs("p", { className: "text-lg md:text-xl mb-8 leading-relaxed font-serif text-church-text", children: ["\"", diaInfo.meditacao, "\""] }), _jsx("h3", { className: "text-sm uppercase tracking-wider mb-4 font-bold text-church-accent/80", children: "Ora\u00E7\u00E3o do Dia" }), _jsx("div", { className: "whitespace-pre-line leading-relaxed italic text-xl text-church-text/90", children: diaInfo.oracao })] }), _jsxs("section", { className: "p-6 rounded-2xl bg-church-bg-secondary border border-church-border-hover shadow-none mb-12", children: [_jsxs("h3", { className: "text-sm uppercase tracking-wider mb-4 font-bold flex items-center gap-2 text-church-accent-hover/80", children: [_jsx("span", { className: "w-8 h-px bg-[#C89B3C]/30" }), "Ora\u00E7\u00E3o Final", _jsx("span", { className: "w-8 h-px bg-[#C89B3C]/30" })] }), _jsx("div", { className: "whitespace-pre-line leading-relaxed italic text-lg text-church-text", children: novena.oracaoFinal })] })] })] }), _jsx("div", { className: "fixed bottom-0 left-0 right-0 p-4 bg-church-bg/95 backdrop-blur-md border-t border-church-border", children: _jsxs("div", { className: "max-w-2xl mx-auto flex gap-4", children: [_jsxs("button", { onClick: () => toggleDay(numDia), className: `flex-1 py-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-all border
              ${completed
                                ? "bg-church-bg-secondary text-church-accent border-church-border-hover hover:bg-[#423A33]"
                                : "bg-church-bg-darker text-church-text/50 border-church-border hover:bg-church-bg-secondary"}`, children: [completed ? _jsx(CheckCircle, { className: "w-5 h-5" }) : _jsx(Circle, { className: "w-5 h-5" }), completed ? "Marcado como Concluído" : "Marcar como Concluído"] }), _jsx("button", { onClick: handleComplete, className: "flex-1 py-4 rounded-xl font-medium transition-colors shadow-none bg-[#C89B3C]/80 hover:bg-[#C89B3C] text-[#1E1A17]", children: isLastDay ? "Finalizar Novena" : "Próximo Dia" })] }) })] }));
}
