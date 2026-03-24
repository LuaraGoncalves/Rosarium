import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { authApi } from '../services/auth.api';
export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { user, token } = await authApi.login(email, password);
            localStorage.setItem('@Rosarium:token', token);
            localStorage.setItem('@Rosarium:user', JSON.stringify(user));
            navigate('/');
        }
        catch (err) {
            setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "flex min-h-[calc(100vh-100px)] items-center justify-center p-4", children: _jsxs("div", { className: "w-full max-w-md rounded-xl bg-white p-8 shadow-sm dark:bg-[#1C1C1C]", children: [_jsx("h1", { className: "mb-2 text-center text-2xl font-bold font-display text-[#8B4513] dark:text-[#D4A373]", children: "Bem-vindo de volta" }), _jsx("p", { className: "mb-8 text-center text-sm text-neutral-500 dark:text-neutral-400", children: "Entre para salvar suas ora\u00E7\u00F5es e progresso." }), error && (_jsx("div", { className: "mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400", children: error })), _jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "E-mail" }), _jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-[#8B4513] dark:border-neutral-700 dark:bg-neutral-800 dark:focus:border-[#D4A373]", placeholder: "seu@email.com" })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium", children: "Senha" }), _jsx("input", { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-[#8B4513] dark:border-neutral-700 dark:bg-neutral-800 dark:focus:border-[#D4A373]", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022" })] }), _jsx("button", { type: "submit", disabled: loading, className: "mt-4 w-full rounded-md bg-[#8B4513] px-4 py-2 text-white transition-colors hover:bg-[#6b350e] disabled:opacity-50 dark:bg-[#D4A373] dark:text-black dark:hover:bg-[#b0875f]", children: loading ? 'Entrando...' : 'Entrar' })] }), _jsxs("div", { className: "mt-6 text-center text-sm", children: [_jsx("span", { className: "text-neutral-500 dark:text-neutral-400", children: "N\u00E3o tem uma conta? " }), _jsx(Link, { to: "/auth/register", className: "font-medium text-[#8B4513] hover:underline dark:text-[#D4A373]", children: "Cadastre-se" })] })] }) }));
}
