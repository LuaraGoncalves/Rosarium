import { LucideIcon, ArrowLeft } from 'lucide-react';
import { ReactNode } from 'react';

type FeaturePageHeaderProps = {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  backLabel?: string;
  onBack: () => void;
  maxWidthClassName?: string;
};

type FeatureIntroCardProps = {
  imageSrc: string;
  imageAlt: string;
  title?: string;
  children: ReactNode;
  maxWidthClassName?: string;
  compact?: boolean;
};

export function FeaturePageHeader({
  title,
  subtitle,
  icon: Icon,
  backLabel = 'Voltar',
  onBack,
  maxWidthClassName = 'max-w-5xl',
}: FeaturePageHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-[rgba(24,12,7,.84)] py-4 text-white backdrop-blur-md transition-all">
      <div className={`mx-auto px-4 ${maxWidthClassName}`}>
        <button
          onClick={onBack}
          className="mb-3 flex items-center gap-2 rounded-md px-1 text-sm font-medium text-white/70 transition-colors hover:text-[#f0cf83] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5bd68]"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </button>

        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#c99b43]/15 text-[#e5bd68] shadow-sm">
            <Icon className="h-5 w-5 stroke-[1.5]" />
          </span>
          <div>
            <h1 className="font-liturgical text-2xl leading-tight text-white md:text-3xl">
              {title}
            </h1>
            {subtitle && <p className="mt-1 text-sm text-white/60">{subtitle}</p>}
          </div>
        </div>
      </div>
    </header>
  );
}

export function FeatureIntroCard({
  imageSrc,
  imageAlt,
  title,
  children,
  maxWidthClassName = 'max-w-5xl',
  compact = false,
}: FeatureIntroCardProps) {
  return (
    <section
      className={`mx-auto px-4 ${compact ? 'pt-4 md:pt-5' : 'pt-8 md:pt-10'} ${maxWidthClassName}`}
    >
      <div
        className={`overflow-hidden border border-white/10 bg-[rgba(98,66,57,.88)] shadow-xl shadow-black/20 ${
          compact ? 'rounded-[1.35rem]' : 'rounded-[1.75rem]'
        }`}
      >
        <div
          className={`grid ${
            compact ? 'md:grid-cols-[0.88fr_1.12fr]' : 'md:grid-cols-[0.92fr_1.08fr]'
          }`}
        >
          <div
            className={`relative overflow-hidden bg-[#765146] ${compact ? '' : 'min-h-56'}`}
            style={compact ? { height: 'clamp(19rem, 30vw, 24rem)' } : undefined}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#24140d]/85 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[rgba(98,66,57,.55)]" />
          </div>
          <div className={`flex flex-col justify-center ${compact ? 'p-4 md:p-5' : 'p-6 md:p-8'}`}>
            {title && (
              <h2
                className={`font-liturgical text-[#f0cf83] ${
                  compact ? 'mb-3 text-2xl' : 'mb-4 text-2xl md:text-3xl'
                }`}
              >
                {title}
              </h2>
            )}
            <div className={`${compact ? 'space-y-3' : 'space-y-4'} leading-relaxed text-white/75`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
