import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Book,
  Cross,
  Heart,
  Clock,
  Users,
  Church,
  Menu,
  X,
} from 'lucide-react';
import { AuthModalControl } from '../../../shared/components/AuthModalControl';
import { ThemeToggle } from '../../../shared/components/ThemeToggle';

const actionButtonBase =
  'flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg sm:w-auto';

const sectionShell = 'relative overflow-hidden px-4 sm:px-6';

export function ChurchHome() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mainSections = [
    {
      title: 'Santo Rosário',
      description: 'Medite nos mistérios da vida de Jesus e Maria',
      icon: Cross,
      path: '/rosario',
      image:
        'https://images.unsplash.com/photo-1624147210060-4c159a6c70d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3NhcnklMjBiZWFkcyUyMHByYXllcnxlbnwxfHx8fDE3NzMzMDQ3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Novenas',
      description: 'Nove dias de oração e devoção',
      icon: Heart,
      path: '/novenas',
      image:
        'https://images.unsplash.com/photo-1559536454-5a69386e8075?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBpbnRlcmlvciUyMGNhbmRsZXN8ZW58MXx8fHwxNzczNDA5ODYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Orações',
      description: 'Coleção de orações para cada momento',
      icon: Book,
      path: '/oracoes',
      image:
        'https://images.unsplash.com/photo-1616428882609-7443facdbe81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWJsZSUyMG9wZW4lMjBib29rJTIwY2h1cmNofGVufDF8fHx8MTc3MzQwOTg2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const secondarySections = [
    {
      title: 'Breviário',
      description: 'Liturgia das Horas Diária',
      icon: Clock,
      path: '/breviario',
    },
    {
      title: 'Liturgia Diária',
      description: 'Leituras e Evangelho do dia',
      icon: Church,
      path: '/liturgia',
    },
    {
      title: 'Santos',
      description: 'História e vida dos santos',
      icon: Users,
      path: '/santos',
    },
  ];

  const menuSections = [...mainSections, ...secondarySections];

  return (
    <div className="min-h-screen bg-church-bg linen-bg text-church-text font-sans">
      {/* Navbar Suave */}
      <header className="bg-church-header border-b border-church-border backdrop-blur-md sticky top-0 z-50 transition-all">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 pr-20 sm:px-6 sm:pr-24">
          <div className="flex items-center gap-2.5 text-church-accent hover:text-church-accent-hover transition-colors cursor-pointer">
            <Cross className="w-5 h-5 stroke-[1.5]" />
            <h1 className="text-xl font-serif">Rosarium</h1>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-md border border-church-border bg-church-bg-secondary/90 p-2 text-church-accent shadow-sm transition-colors hover:border-church-border-hover hover:bg-church-bg-secondary hover:text-church-accent-hover"
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 stroke-2" />
            ) : (
              <Menu className="h-5 w-5 stroke-2" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute right-4 top-[calc(100%+0.75rem)] z-50 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-3xl bg-church-bg-secondary shadow-2xl shadow-church-bg-darker/20">
            <div className="border-b border-church-border bg-church-bg px-5 py-4">
              <p className="font-serif text-xl text-church-accent">Explorar Rosarium</p>
              <p className="text-sm text-church-text-muted">
                Atalhos tranquilos para continuar sua oração.
              </p>
            </div>

            <div className="border-b border-church-border p-3">
              <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-church-text-muted">
                Ambiente
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-3 rounded-2xl bg-church-bg px-3 py-3">
                  <AuthModalControl />
                  <div>
                    <p className="text-sm font-semibold text-church-text">Conta</p>
                    <p className="text-xs text-church-text-muted">Entrar</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-church-bg px-3 py-3">
                  <ThemeToggle />
                  <div>
                    <p className="text-sm font-semibold text-church-text">Tema</p>
                    <p className="text-xs text-church-text-muted">Cores</p>
                  </div>
                </div>
              </div>
            </div>

            <nav className="grid gap-2 p-3 text-sm font-medium text-church-text-secondary">
              {menuSections.map((section) => {
                const Icon = section.icon;

                return (
                  <button
                    key={section.path}
                    onClick={() => {
                      navigate(section.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-church-bg hover:text-church-accent"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-church-bg text-church-accent-hover">
                      <Icon className="h-4 w-4 stroke-[1.5]" />
                    </span>
                    <span>
                      <span className="block text-church-text">{section.title}</span>
                      <span className="block text-xs text-church-text-muted">
                        {section.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        {isMobileMenuOpen && (
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default bg-transparent"
            aria-label="Fechar menu"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </header>

      {/* Hero Section Minimalista e Claro com Imagem de Fundo */}
      <section
        className={`${sectionShell} isolate border-b border-church-border bg-church-bg py-8 sm:py-10 md:py-14`}
      >
        <div className="absolute inset-0 -z-20 bg-church-bg">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Sagrados_corazones_de_Jes%C3%BAs_y_Mar%C3%ADa_%28Sacred_Hearts_of_Jesus_and_Mary%29%2C_workshop_of_Vicente_L%C3%B3pez_Porta%C3%B1a.jpg"
            alt="Sagrado Coração de Jesus e Maria"
            className="h-full w-full object-cover opacity-20"
            style={{ objectPosition: 'center 25%' }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--church-bg-secondary)_0%,transparent_34%),linear-gradient(115deg,var(--church-bg-primary)_0%,rgba(247,239,229,0.88)_46%,var(--church-bg-primary)_100%)]"></div>
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10 text-center md:text-left">
            <div className="mb-5 flex justify-center md:justify-start">
              <span className="rounded-full border border-church-border bg-church-bg-secondary/85 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-church-accent-hover shadow-sm backdrop-blur-sm">
                Refúgio espiritual
              </span>
            </div>

            <h2 className="mx-auto mb-4 max-w-3xl font-serif text-4xl leading-[1.08] text-church-accent sm:text-5xl md:mx-0 md:text-6xl">
              Encontre um ritmo sereno para rezar todos os dias
            </h2>

            <p className="mx-auto mb-7 max-w-2xl text-base font-light leading-relaxed text-church-text-secondary sm:text-lg md:mx-0">
              Rosários, novenas, orações e liturgia reunidos em uma experiência simples, clara e
              recolhida para acompanhar sua vida de fé.
            </p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row md:justify-start">
              <button
                onClick={() => navigate('/rosario')}
                className={`${actionButtonBase} bg-church-accent text-church-bg-secondary hover:bg-church-accent-hover`}
              >
                <Cross className="h-4 w-4" /> Rezar o Rosário
              </button>
              <button
                onClick={() => navigate('/oracoes')}
                className={`${actionButtonBase} border border-church-border bg-church-bg-secondary/90 text-church-accent hover:border-church-border-hover hover:bg-church-bg`}
              >
                <Book className="h-4 w-4" /> Ver Orações
              </button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-church-accent/10 blur-2xl"></div>
            <div className="overflow-hidden rounded-[1.75rem] border border-church-border bg-church-bg-secondary shadow-2xl shadow-church-bg-darker/20">
              <div className="relative aspect-[4/3]">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Sagrados_corazones_de_Jes%C3%BAs_y_Mar%C3%ADa_%28Sacred_Hearts_of_Jesus_and_Mary%29%2C_workshop_of_Vicente_L%C3%B3pez_Porta%C3%B1a.jpg"
                  alt="Sagrado Coração de Jesus e Maria"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: 'center 25%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-church-bg/85 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                  <p className="font-serif text-xl italic text-church-accent">
                    “Orai sem cessar”
                  </p>
                  <p className="text-sm text-church-text-secondary">1 Tessalonicenses 5,17</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Devotions - Cards Minimalistas */}
      <div className="relative border-y border-church-border bg-church-bg-tertiary py-10 sm:py-12 md:py-14">
        <div className="absolute inset-0 linen-bg pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h3 className="mb-3 font-serif text-2xl text-church-accent md:text-3xl">
              Devoções principais
            </h3>
            <p className="text-sm text-church-text-secondary">
              Escolha uma prática para começar agora, sem distrações e com passos simples.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {mainSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={index}
                  onClick={() => navigate(section.path)}
                  className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-church-bg shadow-md shadow-church-bg-darker/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-church-bg-darker/20"
                >
                  <div className="relative h-36 overflow-hidden bg-church-bg-secondary sm:h-40 md:h-44">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-church-bg via-church-bg/10 to-transparent"></div>
                  </div>
                  <div className="relative z-10 flex flex-grow flex-col items-start p-5 text-left">
                    <div className="-mt-10 mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-church-bg-secondary text-church-accent-hover shadow-lg shadow-church-bg-darker/15 transition-colors group-hover:text-church-accent">
                      <Icon className="h-5 w-5 stroke-[1.5]" />
                    </div>
                    <h4 className="mb-2 font-serif text-xl text-church-text group-hover:text-church-accent-hover">
                      {section.title}
                    </h4>
                    <p className="flex-grow text-sm leading-relaxed text-church-text-muted">
                      {section.description}
                    </p>
                    <span className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-church-accent-hover">
                      Abrir
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Seção de Citação / Inspiração Limpa */}
      <div className="relative overflow-hidden border-y border-church-border bg-church-bg py-10 sm:py-12">
        <div className="absolute inset-0 linen-bg pointer-events-none"></div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-church-bg-secondary text-church-accent shadow-sm">
            <Cross className="h-5 w-5 opacity-75" />
          </div>
          <h2 className="mb-5 font-serif text-2xl italic leading-snug text-church-accent-hover md:text-3xl">
            {'"A oração é a elevação da alma a Deus ou o pedido a Deus dos bens convenientes."'}
          </h2>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-church-text-muted">
            — Santa Teresinha do Menino Jesus
          </p>
        </div>
      </div>

      {/* Secondary Resources - Ícones Sutis */}
      <div className="py-10 sm:py-12 md:py-14 bg-church-bg-tertiary relative">
        <div className="absolute inset-0 linen-bg pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h3 className="mb-3 font-serif text-2xl text-church-accent md:text-3xl">
              Recursos diários
            </h3>
            <p className="text-sm text-church-text-secondary">Acompanhe a Igreja em sua liturgia</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {secondarySections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={index}
                  onClick={() => navigate(section.path)}
                  className="group flex cursor-pointer flex-col items-start gap-4 rounded-2xl bg-church-bg p-5 shadow-sm shadow-church-bg-darker/10 transition-all hover:-translate-y-0.5 hover:bg-church-bg-secondary hover:shadow-lg hover:shadow-church-bg-darker/15 sm:flex-row sm:items-center"
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-church-bg-secondary text-church-accent-hover shadow-sm transition-colors duration-300 group-hover:text-church-accent">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif mb-1 text-church-text group-hover:text-church-accent-hover">
                      {section.title}
                    </h4>
                    <p className="text-sm text-church-text-muted">{section.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Minimalista e Elegante */}
      <footer className="py-8 bg-church-bg relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center gap-4 relative z-10">
          <div className="flex items-center gap-2 opacity-60 text-church-accent-hover">
            <Cross className="w-4 h-4 stroke-[1.5]" />
          </div>
          <p className="text-sm font-serif italic text-church-text-secondary">
            {'"Orai sem cessar"'}
          </p>

          <p className="text-xs text-church-text-muted">© {new Date().getFullYear()} ROSARIUM</p>
        </div>
      </footer>
    </div>
  );
}
