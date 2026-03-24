import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router";
import { Book, Cross, Heart, Clock, Users, Church, UserCircle, LogOut } from "lucide-react";
import { ThemeToggle } from "../../../shared/components/ThemeToggle";
import { useAuth } from "../../auth/hooks/useAuth";
export function ChurchHome() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const contemplativeMode = true;
    const firstName = user?.name?.split(' ')[0] || 'Usuário';
    const mainSections = [
        {
            title: "Santo Rosário",
            description: "Medite nos mistérios da vida de Jesus e Maria",
            icon: Cross,
            path: "/rosario",
            image: "https://images.unsplash.com/photo-1624147210060-4c159a6c70d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3NhcnklMjBiZWFkcyUyMHByYXllcnxlbnwxfHx8fDE3NzMzMDQ3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
            title: "Novenas",
            description: "Nove dias de oração e devoção",
            icon: Heart,
            path: "/novenas",
            image: "https://images.unsplash.com/photo-1559536454-5a69386e8075?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBpbnRlcmlvciUyMGNhbmRsZXN8ZW58MXx8fHwxNzczNDA5ODYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
            title: "Orações",
            description: "Coleção de orações para cada momento",
            icon: Book,
            path: "/oracoes",
            image: "https://images.unsplash.com/photo-1616428882609-7443facdbe81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWJsZSUyMG9wZW4lMjBib29rJTIwY2h1cmNofGVufDF8fHx8MTc3MzQwOTg2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
        },
    ];
    const secondarySections = [
        {
            title: "Breviário",
            description: "Liturgia das Horas Diária",
            icon: Clock,
            path: "/breviario",
        },
        {
            title: "Liturgia Diária",
            description: "Leituras e Evangelho do dia",
            icon: Church,
            path: "/liturgia",
        },
        {
            title: "Santos",
            description: "História e vida dos santos",
            icon: Users,
            path: "/santos",
        },
    ];
    return (_jsxs("div", { className: "min-h-screen bg-church-bg linen-bg text-church-text font-sans", children: [_jsx("header", { className: "bg-church-header border-b border-church-border backdrop-blur-md sticky top-0 z-50 transition-all", children: _jsxs("div", { className: "max-w-6xl mx-auto px-6 py-5 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2.5 text-church-accent hover:text-church-accent-hover transition-colors cursor-pointer", children: [_jsx(Cross, { className: "w-5 h-5 stroke-[1.5]" }), _jsx("h1", { className: "text-xl font-serif tracking-wide", children: "Rosarium" })] }), _jsxs("nav", { className: "hidden md:flex items-center gap-8 text-sm font-medium text-church-text-secondary", children: [_jsx("button", { onClick: () => navigate("/rosario"), className: "hover:text-church-accent transition-colors", children: "Ros\u00E1rio" }), _jsx("button", { onClick: () => navigate("/novenas"), className: "hover:text-church-accent transition-colors", children: "Novenas" }), _jsx("button", { onClick: () => navigate("/oracoes"), className: "hover:text-church-accent transition-colors", children: "Ora\u00E7\u00F5es" }), _jsx(ThemeToggle, {}), _jsx("div", { className: "h-6 w-px bg-church-border mx-2" }), isAuthenticated ? (_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("span", { className: "text-sm font-medium italic text-church-accent-hover", children: ["Paz e bem, ", firstName] }), _jsx("button", { onClick: logout, className: "hover:text-red-500 transition-colors opacity-70 hover:opacity-100", title: "Sair", children: _jsx(LogOut, { className: "w-4 h-4" }) })] })) : (_jsx("button", { onClick: () => navigate("/auth/login"), className: "flex items-center gap-2 hover:text-church-accent transition-colors", title: "Entrar", children: _jsx(UserCircle, { className: "w-5 h-5" }) }))] })] }) }), _jsxs("div", { className: "relative pt-20 pb-24 md:pt-32 md:pb-40 px-6 flex flex-col items-center text-center overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0 z-0 bg-church-bg", children: [_jsx("img", { src: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Sagrados_corazones_de_Jes%C3%BAs_y_Mar%C3%ADa_%28Sacred_Hearts_of_Jesus_and_Mary%29%2C_workshop_of_Vicente_L%C3%B3pez_Porta%C3%B1a.jpg", alt: "Sagrado Cora\u00E7\u00E3o de Jesus e Maria", className: "w-full h-full object-cover opacity-30 dark:opacity-60", style: { objectPosition: 'center 25%' } }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-church-bg/80 via-church-bg/50 to-church-bg" })] }), _jsxs("div", { className: "relative z-10 max-w-5xl mx-auto flex flex-col items-center", children: [_jsx("span", { className: "font-medium tracking-[0.2em] text-xs uppercase mb-6 px-4 py-1.5 rounded-sm border bg-church-bg-secondary/80 backdrop-blur-sm border-church-border text-church-accent-hover", children: "Ref\u00FAgio Espiritual" }), _jsx("h2", { className: "text-4xl md:text-6xl font-serif mb-8 max-w-3xl leading-[1.15] text-church-accent-hover", children: "Encontre paz e prop\u00F3sito atrav\u00E9s da ora\u00E7\u00E3o di\u00E1ria" }), _jsx("p", { className: "text-lg md:text-xl font-light max-w-2xl mb-12 leading-relaxed text-church-text-secondary", children: "Uma cole\u00E7\u00E3o serena de devo\u00E7\u00F5es, novenas e liturgias para guiar sua jornada de f\u00E9, onde quer que voc\u00EA esteja." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 w-full sm:w-auto", children: [_jsxs("button", { onClick: () => navigate("/rosario"), className: "px-8 py-3.5 rounded-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2 text-sm bg-church-bg-secondary border-b-2 border-r-2 border-church-bg-darker hover:bg-church-border text-church-text", children: [_jsx(Cross, { className: "w-4 h-4 text-church-accent" }), " Rezar o Ros\u00E1rio"] }), _jsxs("button", { onClick: () => navigate("/oracoes"), className: "px-8 py-3.5 rounded-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2 text-sm bg-church-bg border-b-2 border-r-2 border-church-bg-darker hover:bg-church-bg-secondary text-church-accent", children: [_jsx(Book, { className: "w-4 h-4 text-church-accent-hover" }), " Ver Ora\u00E7\u00F5es"] })] })] })] }), _jsxs("div", { className: "py-24 border-y bg-church-bg-tertiary border-church-border relative", children: [_jsx("div", { className: "absolute inset-0 linen-bg pointer-events-none" }), _jsxs("div", { className: "max-w-6xl mx-auto px-6 relative z-10", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h3", { className: "text-2xl md:text-3xl font-serif mb-4 text-church-accent uppercase tracking-wider", children: "Devo\u00E7\u00F5es Principais" }), _jsx("div", { className: "w-12 h-px mx-auto bg-church-accent/50" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: mainSections.map((section, index) => {
                                    const Icon = section.icon;
                                    return (_jsxs("div", { onClick: () => navigate(section.path), className: "group cursor-pointer rounded-t-full overflow-hidden border transition-all duration-500 hover:-translate-y-1 flex flex-col h-full bg-church-bg border-church-border hover:border-church-border-hover shadow-[0_8px_30px_rgb(0,0,0,0.12)]", children: [_jsxs("div", { className: "relative h-64 overflow-hidden bg-church-bg-secondary border-b-4 border-church-bg-darker", children: [_jsx("img", { src: section.image, alt: section.title, className: "w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ease-out" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-church-bg via-transparent to-transparent" })] }), _jsxs("div", { className: "p-8 flex flex-col flex-grow items-center text-center relative z-10", children: [_jsx("div", { className: "w-12 h-12 rounded-sm flex items-center justify-center mb-5 shadow-sm border bg-church-bg-secondary border-church-border-hover text-church-accent-hover group-hover:text-church-accent rotate-45 transform", children: _jsx(Icon, { className: "w-5 h-5 stroke-[1.5] -rotate-45" }) }), _jsx("h4", { className: "text-xl font-serif mb-3 text-church-text group-hover:text-church-accent-hover", children: section.title }), _jsx("p", { className: "text-sm leading-relaxed flex-grow text-church-text-muted", children: section.description })] })] }, index));
                                }) })] })] }), _jsxs("div", { className: "py-24 relative overflow-hidden bg-church-bg border-y-8 border-double border-church-border", children: [_jsx("div", { className: "absolute inset-0 linen-bg pointer-events-none" }), _jsxs("div", { className: "max-w-3xl mx-auto px-6 text-center relative z-10", children: [_jsx(Cross, { className: "w-6 h-6 mx-auto mb-8 opacity-60 text-church-accent" }), _jsx("h2", { className: "text-2xl md:text-4xl font-serif mb-8 leading-snug text-church-accent-hover italic", children: "\"A ora\u00E7\u00E3o \u00E9 a eleva\u00E7\u00E3o da alma a Deus ou o pedido a Deus dos bens convenientes.\"" }), _jsx("p", { className: "font-medium tracking-wide uppercase text-sm text-church-text-muted", children: "\u2014 Santa Teresinha do Menino Jesus" })] })] }), _jsxs("div", { className: "py-24 bg-church-bg-tertiary relative", children: [_jsx("div", { className: "absolute inset-0 linen-bg pointer-events-none" }), _jsxs("div", { className: "max-w-6xl mx-auto px-6 relative z-10", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h3", { className: "text-2xl md:text-3xl font-serif mb-4 text-church-accent uppercase tracking-wider", children: "Recursos Di\u00E1rios" }), _jsx("p", { className: "text-sm text-church-text-secondary", children: "Acompanhe a Igreja em sua liturgia" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8", children: secondarySections.map((section, index) => {
                                    const Icon = section.icon;
                                    return (_jsxs("div", { onClick: () => navigate(section.path), className: "rounded-sm p-6 border cursor-pointer transition-all group flex items-center gap-6 bg-church-bg border-l-4 border-y border-r border-church-border border-l-church-accent-hover hover:bg-church-bg-secondary hover:border-church-border-hover hover:border-l-church-accent", children: [_jsx("div", { className: "w-12 h-12 rounded-none flex items-center justify-center flex-shrink-0 shadow-sm border transition-colors duration-300 bg-church-bg-secondary text-church-accent-hover border-church-border-hover group-hover:text-church-accent", children: _jsx(Icon, { className: "w-5 h-5 stroke-[1.5]" }) }), _jsxs("div", { children: [_jsx("h4", { className: "text-lg font-serif mb-1 text-church-text group-hover:text-church-accent-hover", children: section.title }), _jsx("p", { className: "text-sm text-church-text-muted", children: section.description })] })] }, index));
                                }) })] })] }), _jsx("footer", { className: "py-12 bg-church-bg relative", children: _jsxs("div", { className: "max-w-6xl mx-auto px-6 flex flex-col items-center justify-center gap-6 relative z-10", children: [_jsx("div", { className: "flex items-center gap-2 opacity-60 text-church-accent-hover", children: _jsx(Cross, { className: "w-4 h-4 stroke-[1.5]" }) }), _jsx("p", { className: "text-sm font-serif italic text-church-text-secondary", children: "\"Orai sem cessar\"" }), _jsxs("p", { className: "text-xs tracking-wide text-church-text-muted", children: ["\u00A9 ", new Date().getFullYear(), " ROSARIUM"] })] }) })] }));
}
