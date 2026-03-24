import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router";
import { ArrowLeft, Church, BookOpen, Calendar } from "lucide-react";
export function LiturgiaPage() {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "min-h-screen bg-church-bg text-church-text font-sans", children: [_jsx("header", { className: "bg-church-bg/95 border-b border-church-border backdrop-blur-md sticky top-0 z-50 py-6 transition-all", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [_jsx("div", { className: "mb-4", children: _jsxs("button", { onClick: () => navigate("/igreja"), className: "flex items-center gap-2 text-church-accent hover:text-church-accent-hover transition-colors", children: [_jsx(ArrowLeft, { className: "w-5 h-5" }), "Voltar"] }) }), _jsxs("div", { className: "flex items-center justify-center gap-3", children: [_jsx(Church, { className: "w-8 h-8 text-church-accent-hover" }), _jsx("h1", { className: "text-4xl text-center font-serif text-church-accent", children: "Liturgia das Horas" })] })] }) }), _jsxs("div", { className: "max-w-5xl mx-auto px-4 py-12", children: [_jsxs("div", { className: "bg-church-bg-secondary rounded-2xl p-8 mb-12 border border-church-border-hover shadow-none", children: [_jsx("div", { className: "overflow-hidden h-64 mb-8 rounded-xl", children: _jsx("img", { src: "https://images.unsplash.com/photo-1696261803446-e9847baf4a6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRob2xpYyUyMGNodXJjaCUyMGFsdGFyJTIwc3RhdHVlfGVufDF8fHx8MTc3MzQwOTg2MHww&ixlib=rb-4.1.0&q=80&w=1080", alt: "Interior da Igreja", className: "w-full h-full object-cover" }) }), _jsx("h2", { className: "text-2xl font-serif text-church-accent-hover mb-4", children: "A Ora\u00E7\u00E3o Oficial da Igreja" }), _jsx("p", { className: "text-church-text/80 leading-relaxed mb-4", children: "A Liturgia das Horas \u00E9 a ora\u00E7\u00E3o p\u00FAblica e comum do Povo de Deus. Nela, Cristo mesmo \"continua a exercer sua fun\u00E7\u00E3o sacerdotal\", reunindo a Igreja em louvor a Deus e intercess\u00E3o pelo mundo." })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-12", children: [_jsxs("div", { className: "bg-church-bg-secondary rounded-xl p-8 border border-church-border-hover shadow-none", children: [_jsx("div", { className: "w-14 h-14 bg-church-bg border border-church-border-hover rounded-full flex items-center justify-center mb-6", children: _jsx(BookOpen, { className: "w-7 h-7 text-church-accent-hover" }) }), _jsx("h3", { className: "text-xl font-serif text-church-accent mb-3", children: "Liturgia Hoje" }), _jsx("p", { className: "text-church-text/60 mb-6", children: "Acompanhe as leituras e ora\u00E7\u00F5es do dia de hoje segundo o calend\u00E1rio lit\u00FArgico da Igreja." }), _jsx("button", { onClick: () => navigate("/liturgia/hoje"), className: "w-full bg-church-bg hover:bg-church-bg-darker text-church-accent border border-church-border-hover py-3 rounded-lg transition-colors font-medium", children: "Ver Liturgia de Hoje" })] }), _jsxs("div", { className: "bg-church-bg-secondary rounded-xl p-8 border border-church-border-hover shadow-none", children: [_jsx("div", { className: "w-14 h-14 bg-church-bg border border-church-border-hover rounded-full flex items-center justify-center mb-6", children: _jsx(Calendar, { className: "w-7 h-7 text-church-accent-hover" }) }), _jsx("h3", { className: "text-xl font-serif text-church-accent mb-3", children: "Calend\u00E1rio Lit\u00FArgico" }), _jsx("p", { className: "text-church-text/60 mb-6", children: "Explore o calend\u00E1rio com as festas, solenidades e tempos lit\u00FArgicos do ano." }), _jsx("button", { onClick: () => navigate("/liturgia/calendario"), className: "w-full bg-church-bg hover:bg-church-bg-darker text-church-accent border border-church-border-hover py-3 rounded-lg transition-colors font-medium", children: "Ver Calend\u00E1rio" })] })] }), _jsxs("div", { className: "bg-church-bg-secondary rounded-2xl p-8 border border-church-border-hover", children: [_jsx("h3", { className: "text-2xl font-serif text-church-accent mb-8", children: "Tempos Lit\u00FArgicos" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
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
                                ].map((item, index) => (_jsxs("div", { className: "bg-church-bg rounded-xl p-6 border border-church-border-hover transition-all hover:border-[#D4AF37]/50", children: [_jsx("h4", { className: "text-xl font-serif text-church-accent-hover mb-2", children: item.tempo }), _jsx("p", { className: "text-church-text/80 mb-3", children: item.desc }), _jsxs("span", { className: "inline-block px-3 py-1 rounded-full text-xs font-medium border border-church-border-hover bg-church-bg-darker text-church-text/60", children: ["Cor lit\u00FArgica: ", _jsx("span", { className: "text-church-accent", children: item.cor })] })] }, index))) })] })] })] }));
}
