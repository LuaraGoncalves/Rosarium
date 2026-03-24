import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("div", { className: "min-h-screen bg-church-bg text-church-text font-sans", children: [_jsx("header", { className: "bg-church-bg/95 border-b border-church-border backdrop-blur-md sticky top-0 z-50 py-6 transition-all", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [_jsx("div", { className: "mb-4", children: _jsxs("button", { onClick: () => navigate("/igreja"), className: "flex items-center gap-2 text-church-accent hover:text-church-accent-hover transition-colors", children: [_jsx(ArrowLeft, { className: "w-5 h-5" }), "Voltar"] }) }), _jsxs("div", { className: "flex items-center justify-center gap-3", children: [_jsx(Clock, { className: "w-8 h-8 text-church-accent-hover" }), _jsx("h1", { className: "text-4xl text-center font-serif text-church-accent", children: "Brevi\u00E1rio" })] })] }) }), _jsxs("div", { className: "max-w-5xl mx-auto px-4 py-12", children: [_jsxs("div", { className: "bg-church-bg-secondary rounded-2xl p-8 mb-12 border border-church-border-hover shadow-none", children: [_jsx("div", { className: "overflow-hidden h-64 mb-8 rounded-xl", children: _jsx("img", { src: "https://images.unsplash.com/photo-1709541658608-dfe38af68925?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFpbmVkJTIwZ2xhc3MlMjBjaHVyY2glMjB3aW5kb3d8ZW58MXx8fHwxNzczMzI2MDI0fDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Vitral de Igreja", className: "w-full h-full object-cover" }) }), _jsx("h2", { className: "text-2xl font-serif text-church-accent-hover mb-4", children: "A Liturgia das Horas" }), _jsx("p", { className: "text-church-text/80 leading-relaxed mb-4", children: "O Brevi\u00E1rio, tamb\u00E9m conhecido como Liturgia das Horas, \u00E9 a ora\u00E7\u00E3o oficial da Igreja que santifica as diferentes horas do dia. Composto principalmente de salmos, hinos e leituras b\u00EDblicas, ele nos convida a rezar com toda a Igreja ao longo do dia." }), _jsx("p", { className: "text-church-text/80 leading-relaxed italic font-serif", children: "\"Sete vezes ao dia eu te louvo\" - Salmo 119:164" })] }), loading && (_jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-church-text/60 italic font-serif", children: "Carregando a Liturgia das Horas de hoje..." }) })), error && (_jsx("div", { className: "text-center py-12 bg-red-500/10 rounded-xl border border-red-500/20 mb-12", children: _jsxs("p", { className: "text-red-400 font-serif", children: ["Erro ao carregar o brevi\u00E1rio: ", error] }) })), !loading && !error && breviario && (_jsxs("div", { className: "mb-12 bg-church-bg-secondary rounded-xl p-6 border border-church-border-hover text-center", children: [_jsxs("h3", { className: "text-xl font-serif text-church-accent mb-2", children: ["Hoje: ", breviario.data] }), _jsxs("p", { className: "text-church-text/80", children: [breviario.tempo, " - ", breviario.semana] })] })), _jsx("div", { className: "space-y-6", children: horas.map((hora) => {
                            const Icon = hora.icon;
                            return (_jsx("div", { onClick: () => navigate(`/breviario/${hora.id}`), className: "bg-church-bg-secondary rounded-xl p-6 border border-church-border-hover \n                  hover:border-[#C89B3C]/50 transition-all cursor-pointer group shadow-none", children: _jsxs("div", { className: "flex items-start gap-6", children: [_jsx("div", { className: "w-16 h-16 bg-church-bg border border-church-border-hover rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform", children: _jsx(Icon, { className: "w-8 h-8 text-church-accent-hover" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-2xl font-serif text-church-accent mb-2 group-hover:text-church-accent-hover transition-colors", children: hora.nome }), _jsx("p", { className: "text-church-text/60 mb-2", children: hora.horario }), _jsx("p", { className: "text-church-text/80", children: hora.descricao })] }), _jsx("button", { onClick: (e) => {
                                                e.stopPropagation();
                                                navigate(`/breviario/${hora.id}`);
                                            }, className: "bg-church-bg hover:bg-church-bg-darker text-church-accent border border-church-border-hover px-6 py-2 rounded-lg transition-colors", children: "Rezar" })] }) }, hora.id));
                        }) }), _jsxs("div", { className: "mt-12 bg-church-bg-secondary rounded-2xl p-8 border border-church-border-hover", children: [_jsx("h3", { className: "text-xl font-serif text-church-accent mb-6", children: "Estrutura de cada Hora" }), _jsxs("ul", { className: "space-y-4 text-church-text/80", children: [_jsxs("li", { className: "pl-4 border-l-2 border-[#C89B3C]", children: [_jsx("div", { className: "font-semibold text-church-accent-hover mb-1", children: "Invoca\u00E7\u00E3o inicial e Hino" }), "\"Vinde, \u00F3 Deus, em meu aux\u00EDlio. Socorrei-me sem demora.\" Seguido de um hino apropriado para o momento do dia."] }), _jsxs("li", { className: "pl-4 border-l-2 border-[#C89B3C]", children: [_jsx("div", { className: "font-semibold text-church-accent-hover mb-1", children: "Salmodia" }), "Dois a tr\u00EAs salmos com suas respectivas ant\u00EDfonas, muitas vezes conclu\u00EDdos com o \"Gl\u00F3ria ao Pai\"."] }), _jsxs("li", { className: "pl-4 border-l-2 border-[#C89B3C]", children: [_jsx("div", { className: "font-semibold text-church-accent-hover mb-1", children: "Leitura b\u00EDblica ou patr\u00EDstica" }), "Uma passagem curta das Escrituras ou dos Padres da Igreja."] }), _jsxs("li", { className: "pl-4 border-l-2 border-[#C89B3C]", children: [_jsx("div", { className: "font-semibold text-church-accent-hover mb-1", children: "Respons\u00F3rio" }), "Um c\u00E2ntico curto ou verso em resposta \u00E0 leitura."] }), _jsxs("li", { className: "pl-4 border-l-2 border-[#C89B3C]", children: [_jsx("div", { className: "font-semibold text-church-accent-hover mb-1", children: "C\u00E2ntico Evang\u00E9lico" }), "C\u00E2ntico de Zacarias (Benedictus) nas Laudes, C\u00E2ntico de Maria (Magnificat) nas V\u00E9speras, ou C\u00E2ntico de Sime\u00E3o nas Completas."] }), _jsxs("li", { className: "pl-4 border-l-2 border-[#C89B3C]", children: [_jsx("div", { className: "font-semibold text-church-accent-hover mb-1", children: "Preces e Pai Nosso" }), "Preces de intercess\u00E3o pela Igreja e pelo mundo, conclu\u00EDdas com a ora\u00E7\u00E3o que Jesus nos ensinou."] }), _jsxs("li", { className: "pl-4 border-l-2 border-[#C89B3C]", children: [_jsx("div", { className: "font-semibold text-church-accent-hover mb-1", children: "Ora\u00E7\u00E3o conclusiva e b\u00EAn\u00E7\u00E3o" }), "Ora\u00E7\u00E3o pr\u00F3pria do dia ou da semana, finalizando com a b\u00EAn\u00E7\u00E3o (\"O Senhor nos aben\u00E7oe, nos livre de todo o mal e nos conduza \u00E0 vida eterna. Am\u00E9m.\")"] })] })] })] })] }));
}
