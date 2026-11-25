import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'brown';

const themeMetaColors: Record<Theme, string> = {
  light: '#F7EFE5',
  brown: '#51352C',
};

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'brown';
}

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(storageKey);

    if (isTheme(storedTheme)) {
      return storedTheme;
    }

    localStorage.setItem(storageKey, defaultTheme);
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'brown', 'wine', 'dark');

    root.classList.add(theme);
    if (theme !== 'light') {
      root.classList.add('dark');
    }

    root.style.colorScheme = theme === 'light' ? 'light' : 'dark';

    const themeColorMeta = window.document.querySelector('meta[name="theme-color"]');
    themeColorMeta?.setAttribute('content', themeMetaColors[theme]);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
