import { Settings, X } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

export function SiteSettingsControl() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex min-h-11 min-w-11 items-center justify-center rounded-md border border-white/30 bg-black/20 p-2 text-white shadow-sm backdrop-blur transition-colors hover:border-[#e5bd68] hover:bg-black/35 hover:text-[#f0cf83] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5bd68]"
        aria-label={isOpen ? 'Fechar configurações' : 'Abrir configurações'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Settings className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-14 z-[70] w-64 rounded-xl border border-white/20 bg-[rgba(36,20,13,.96)] p-4 text-white shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="mb-3 border-b border-white/15 pb-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e5bd68]">
              Preferências
            </p>
            <p className="mt-1 font-serif text-lg text-white">Configurações</p>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div>
              <p className="text-sm font-semibold text-white">Tema</p>
              <p className="text-xs leading-relaxed text-white/60">
                Alterne entre claro e contemplativo.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
