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
    <header className="sticky top-0 z-50 border-b border-church-border bg-church-header py-3 backdrop-blur-md transition-all">
      <div className={`mx-auto px-4 ${maxWidthClassName}`}>
        <button
          onClick={onBack}
          className="mb-3 flex items-center gap-2 rounded-full px-1 text-sm font-medium text-church-accent transition-colors hover:text-church-accent-hover"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </button>

        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-church-bg-secondary text-church-accent-hover shadow-sm">
            <Icon className="h-5 w-5 stroke-[1.5]" />
          </span>
          <div>
            <h1 className="font-serif text-2xl leading-tight text-church-accent md:text-3xl">
              {title}
            </h1>
            {subtitle && <p className="mt-1 text-sm text-church-text-muted">{subtitle}</p>}
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
        className={`overflow-hidden bg-church-bg-secondary shadow-xl shadow-church-bg-darker/10 ${
          compact ? 'rounded-[1.35rem]' : 'rounded-[1.75rem]'
        }`}
      >
        <div
          className={`grid ${
            compact ? 'md:grid-cols-[0.88fr_1.12fr]' : 'md:grid-cols-[0.92fr_1.08fr]'
          }`}
        >
          <div
            className={`relative overflow-hidden bg-church-bg-tertiary ${
              compact ? '' : 'min-h-56'
            }`}
            style={compact ? { height: 'clamp(19rem, 30vw, 24rem)' } : undefined}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-church-bg/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-church-bg-secondary/45" />
          </div>
          <div className={`flex flex-col justify-center ${compact ? 'p-4 md:p-5' : 'p-6 md:p-8'}`}>
            {title && (
              <h2
                className={`font-serif text-church-accent-hover ${
                  compact ? 'mb-3 text-2xl' : 'mb-4 text-2xl md:text-3xl'
                }`}
              >
                {title}
              </h2>
            )}
            <div
              className={`${compact ? 'space-y-3' : 'space-y-4'} leading-relaxed text-church-text-secondary`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
