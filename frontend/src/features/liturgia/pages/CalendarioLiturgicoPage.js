import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router";
import { ArrowLeft, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
export function CalendarioLiturgicoPage() {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    const diasLiturgicos = [
        { dia: 1, mes: 3, titulo: "Quarta-feira de Cinzas", cor: "Roxo", tipo: "Tempo da Quaresma" },
        { dia: 19, mes: 3, titulo: "São José, Esposo de Maria", cor: "Branco", tipo: "Solenidade" },
        { dia: 25, mes: 3, titulo: "Anunciação do Senhor", cor: "Branco", tipo: "Solenidade" },
        { dia: 14, mes: 4, titulo: "Domingo de Ramos", cor: "Vermelho", tipo: "Semana Santa" },
        { dia: 20, mes: 4, titulo: "Domingo da Páscoa", cor: "Branco", tipo: "Tempo Pascal" },
        { dia: 15, mes: 8, titulo: "Assunção de Nossa Senhora", cor: "Branco", tipo: "Solenidade" },
        { dia: 1, mes: 11, titulo: "Todos os Santos", cor: "Branco", tipo: "Solenidade" },
        { dia: 2, mes: 11, titulo: "Comemoração de Todos os Fiéis Defuntos", cor: "Roxo", tipo: "Comemoração" },
        { dia: 25, mes: 12, titulo: "Natal de Nosso Senhor Jesus Cristo", cor: "Branco", tipo: "Solenidade" },
    ];
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };
    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };
    const currentMonthData = diasLiturgicos.filter((d) => d.mes === currentDate.getMonth() + 1);
    return (_jsxs("div", { className: "min-h-screen bg-church-bg text-church-text font-sans pb-24", children: [_jsx("header", { className: "bg-church-bg/95 border-b border-church-border backdrop-blur-md sticky top-0 z-50 py-6 transition-all", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4", children: [_jsx("div", { className: "mb-4", children: _jsxs("button", { onClick: () => navigate("/liturgia"), className: "flex items-center gap-2 text-church-accent hover:text-church-accent-hover transition-colors", children: [_jsx(ArrowLeft, { className: "w-5 h-5" }), "Voltar \u00E0 Liturgia"] }) }), _jsxs("div", { className: "flex flex-col items-center justify-center gap-3", children: [_jsx(CalendarIcon, { className: "w-8 h-8 text-church-accent-hover" }), _jsx("h1", { className: "text-3xl text-center font-serif text-church-accent", children: "Calend\u00E1rio Lit\u00FArgico" }), _jsx("p", { className: "text-church-text/60 mt-1", children: "Solenidades, Festas e Mem\u00F3rias do Ano Lit\u00FArgico" })] })] }) }), _jsxs("div", { className: "max-w-4xl mx-auto px-4 py-12", children: [_jsxs("div", { className: "flex items-center justify-between mb-8 bg-church-bg-secondary p-4 rounded-xl border border-church-border-hover", children: [_jsx("button", { onClick: handlePrevMonth, className: "p-2 text-church-accent hover:bg-church-bg rounded-full transition-colors", children: _jsx(ChevronLeft, { className: "w-6 h-6" }) }), _jsxs("h2", { className: "text-2xl font-serif text-church-accent-hover", children: [meses[currentDate.getMonth()], " ", currentDate.getFullYear()] }), _jsx("button", { onClick: handleNextMonth, className: "p-2 text-church-accent hover:bg-church-bg rounded-full transition-colors", children: _jsx(ChevronRight, { className: "w-6 h-6" }) })] }), currentMonthData.length === 0 ? (_jsxs("div", { className: "text-center py-16 bg-church-bg-secondary rounded-xl border border-church-border-hover", children: [_jsx(CalendarIcon, { className: "w-12 h-12 text-church-text/20 mx-auto mb-4" }), _jsx("p", { className: "text-church-text/60 italic font-serif", children: "Nenhuma solenidade ou festa principal registrada para este m\u00EAs." })] })) : (_jsx("div", { className: "space-y-4", children: currentMonthData.map((dia, index) => (_jsxs("div", { className: "bg-church-bg-secondary p-6 rounded-xl border border-church-border-hover flex flex-col md:flex-row items-start md:items-center gap-6 transition-colors hover:border-[#C89B3C]/50", children: [_jsxs("div", { className: "flex-shrink-0 w-20 h-20 bg-church-bg border border-church-border-hover rounded-full flex flex-col items-center justify-center shadow-inner", children: [_jsx("span", { className: "text-2xl font-serif text-church-accent", children: dia.dia }), _jsx("span", { className: "text-xs uppercase tracking-wider text-church-text/60", children: meses[dia.mes - 1].substring(0, 3) })] }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-xl font-serif text-church-accent mb-1", children: dia.titulo }), _jsx("p", { className: "text-church-text/80", children: dia.tipo })] }), _jsx("div", { className: "flex-shrink-0", children: _jsxs("span", { className: "inline-block px-4 py-1.5 rounded-full text-sm font-medium border border-church-border-hover bg-church-bg", children: ["Cor: ", _jsx("span", { className: "text-church-accent", children: dia.cor })] }) })] }, index))) }))] })] }));
}
