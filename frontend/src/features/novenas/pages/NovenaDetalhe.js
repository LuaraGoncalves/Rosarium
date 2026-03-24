import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, CheckCircle, Circle } from "lucide-react";
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
        return (_jsx("div", { className: "min-h-screen bg-stone-50 flex items-center justify-center text-stone-800", children: _jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-2xl font-serif text-amber-900 mb-4", children: "Novena n\u00E3o encontrada" }), _jsxs("button", { onClick: () => navigate("/novenas"), className: "text-stone-600 hover:text-amber-900 flex items-center gap-2 mx-auto", children: [_jsx(ArrowLeft, { className: "w-4 h-4" }), " Voltar para Novenas"] })] }) }));
    }
    const percentage = progressPercentage(novena.duracao);
    return (_jsxs("div", { className: "min-h-screen bg-church-bg text-church-text font-sans", children: [_jsx("header", { className: "bg-church-bg/95 border-b border-church-border backdrop-blur-md sticky top-0 z-50 py-6 transition-all", children: _jsxs("div", { className: "max-w-3xl mx-auto px-4", children: [_jsx("div", { className: "mb-4", children: _jsxs("button", { onClick: () => navigate("/novenas"), className: "flex items-center gap-2 text-church-accent hover:text-church-accent-hover transition-colors", children: [_jsx(ArrowLeft, { className: "w-5 h-5" }), "Voltar"] }) }), _jsx("h1", { className: "text-3xl font-serif text-church-accent-hover", children: novena.titulo }), _jsx("p", { className: "mt-2 text-church-text/70", children: novena.descricao }), _jsxs("div", { className: "mt-6 flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-church-accent/80", children: "Progresso" }), _jsxs("span", { className: "text-church-accent-hover font-medium", children: [percentage, "% (", completedDays.length, "/", novena.duracao, ")"] })] }), _jsx("div", { className: "w-full bg-church-bg-darker h-2 rounded-full overflow-hidden border border-church-border mt-2", children: _jsx("div", { className: "bg-[#C89B3C] h-full transition-all duration-500 opacity-80", style: { width: `${percentage}%` } }) })] }) }), _jsx("div", { className: "max-w-3xl mx-auto px-4 py-8", children: _jsx("div", { className: "grid gap-4", children: novena.dias.map((diaInfo) => {
                        const isCompleted = completedDays.includes(diaInfo.dia);
                        return (_jsxs("div", { onClick: () => navigate(`/novenas/${novena.id}/dia/${diaInfo.dia}`), className: `p-5 rounded-xl border transition-all cursor-pointer flex items-center gap-4 shadow-sm
                  ${isCompleted
                                ? "bg-church-bg-darker border-[#2C1F1A] opacity-40 hover:opacity-70"
                                : "bg-church-bg-secondary border-church-border-hover hover:border-[#D4AF37]/50"}`, children: [_jsx("div", { className: "flex-shrink-0", children: isCompleted ? (_jsx(CheckCircle, { className: "w-6 h-6 text-church-accent-hover/50" })) : (_jsx(Circle, { className: "w-6 h-6 text-church-text/30" })) }), _jsxs("div", { children: [_jsxs("h3", { className: `font-medium transition-colors duration-700 
                    ${isCompleted ? "text-church-text/40 line-through decoration-[#F5E6D3]/20" : "text-church-text"}`, children: ["Dia ", diaInfo.dia, " - ", diaInfo.titulo] }), _jsx("p", { className: "text-sm mt-1 line-clamp-1 text-church-text/60", children: diaInfo.meditacao })] })] }, diaInfo.dia));
                    }) }) })] }));
}
