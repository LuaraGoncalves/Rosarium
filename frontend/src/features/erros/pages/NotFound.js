import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router";
import { Home } from "lucide-react";
export function NotFound() {
    const navigate = useNavigate();
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center p-8", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-9xl text-white mb-4", children: "404" }), _jsx("p", { className: "text-3xl text-slate-300 mb-8", children: "P\u00E1gina n\u00E3o encontrada" }), _jsxs("button", { onClick: () => navigate("/"), className: "flex items-center gap-2 bg-white/20 hover:bg-white/30 \n            text-white px-6 py-3 rounded-lg transition-colors mx-auto", children: [_jsx(Home, { className: "w-5 h-5" }), "Voltar para o in\u00EDcio"] })] }) }));
}
