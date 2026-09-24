import { useEffect, useState, type ReactNode } from 'react';
import { Cross } from 'lucide-react';

type AppStartupLoaderProps = {
  children: ReactNode;
};

const brandImage = '/images/rosarium-church.jpg';

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });
}

export function AppStartupLoader({ children }: AppStartupLoaderProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    let timer: number | undefined;
    const startedAt = performance.now();

    Promise.all([preloadImage(brandImage), document.fonts?.ready ?? Promise.resolve()]).then(() => {
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, 650 - elapsed);
      timer = window.setTimeout(() => {
        if (active) setReady(true);
      }, remaining);
    });

    return () => {
      active = false;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  if (ready) return <>{children}</>;

  return (
    <main
      className="fixed inset-0 z-[200] flex min-h-screen items-center justify-center overflow-hidden bg-[#24140d] text-white"
      aria-label="Carregando o Rosarium"
      aria-live="polite"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(126,83,46,.28),transparent_48%)]" />
      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="rosarium-loading-mark relative flex h-24 w-24 items-center justify-center rounded-full border border-[#e5bd68]/40 bg-[#6d452d]/45 shadow-[0_0_45px_rgba(229,189,104,.16)]">
          <div className="absolute inset-3 rounded-full border border-[#e5bd68]/20" aria-hidden="true" />
          <Cross className="h-10 w-10 text-[#f0cf83] drop-shadow-[0_0_12px_rgba(240,207,131,.38)]" strokeWidth={1.4} />
        </div>
        <p className="mt-7 font-serif text-3xl tracking-wide text-[#f0cf83]">Rosarium</p>
        <p className="mt-3 max-w-xs text-sm leading-6 text-white/65">
          Prepare o coração. Sua oração está começando.
        </p>
        <span className="mt-7 h-1 w-1 rounded-full bg-[#f0cf83] shadow-[0_0_0_5px_rgba(240,207,131,.12)]" aria-hidden="true" />
      </div>
    </main>
  );
}
