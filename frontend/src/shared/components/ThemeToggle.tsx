import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../app/providers/ThemeProvider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="rounded-md border border-church-border bg-church-bg-secondary p-2 text-church-text-muted transition-colors hover:border-church-border-hover hover:text-church-accent"
      title={theme === 'light' ? 'Mudar para Modo Contemplativo' : 'Mudar para Modo Oficial'}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-church-text-muted" />
      ) : (
        <Sun className="w-5 h-5 text-church-text-muted" />
      )}
    </button>
  );
}
