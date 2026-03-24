import { jsx as _jsx } from "react/jsx-runtime";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../app/providers/ThemeProvider";
export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    return (_jsx("button", { onClick: () => setTheme(theme === "light" ? "dark" : "light"), className: "p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors", title: theme === "light" ? "Mudar para Modo Contemplativo" : "Mudar para Modo Oficial", children: theme === "light" ? (_jsx(Moon, { className: "w-5 h-5 text-church-text-muted" })) : (_jsx(Sun, { className: "w-5 h-5 text-church-text-muted" })) }));
}
