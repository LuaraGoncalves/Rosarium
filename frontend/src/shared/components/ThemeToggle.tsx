import { Moon, Sun } from 'lucide-react';
import { Theme, useTheme } from '../../app/providers/ThemeProvider';

export const themes: Array<{
  value: Theme;
  label: string;
  swatchClassName: string;
  icon: typeof Sun;
}> = [
  {
    value: 'light',
    label: 'Claro',
    swatchClassName: 'bg-[#F7EFE5]',
    icon: Sun,
  },
  {
    value: 'brown',
    label: 'Contemplativo',
    swatchClassName: 'bg-[#624239]',
    icon: Moon,
  },
];

export function getThemeOption(theme: Theme) {
  return themes.find((option) => option.value === theme) ?? themes[0];
}

export function getNextThemeOption(theme: Theme) {
  const currentIndex = themes.findIndex((option) => option.value === theme);
  return themes[((currentIndex === -1 ? 0 : currentIndex) + 1) % themes.length] ?? themes[0];
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const currentTheme = getThemeOption(theme);
  const nextTheme = getNextThemeOption(theme);
  const Icon = currentTheme.icon;

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme.value)}
      className="relative flex min-h-11 min-w-11 items-center justify-center rounded-md border border-church-border bg-church-bg-secondary p-2 text-church-text-muted shadow-sm transition-colors hover:border-church-border-hover hover:text-church-accent"
      title={`Tema atual: ${currentTheme.label}. Clique para mudar para ${nextTheme.label}.`}
      aria-label={`Tema atual: ${currentTheme.label}. Clique para mudar para ${nextTheme.label}.`}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
      <span
        className={`absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border border-church-bg-secondary shadow-sm ${currentTheme.swatchClassName}`}
        aria-hidden="true"
      />
    </button>
  );
}
