import { useNavigate } from 'react-router';
import { Book, Cross, Heart, Clock, Users, Church, Sparkles } from 'lucide-react';
import { AuthModalControl } from '../../../shared/components/AuthModalControl';
import { PrayerMusicPlayer } from '../../../shared/components/PrayerMusicPlayer';
import { SiteSettingsControl } from '../../../shared/components/SiteSettingsControl';

const actionButtonBase =
  'flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5bd68] sm:w-auto';

export function ChurchHome() {
  const navigate = useNavigate();
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
    {
      title: 'Curiosidades',
      description: 'Histórias e símbolos da fé católica',
      icon: Sparkles,
      path: '/curiosidades',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent text-church-text font-sans">
      <img src="/images/rosarium-church.jpg" alt="" aria-hidden="true" className="fixed inset-0 z-[-2] h-full w-full object-cover object-center" />
      <div className="fixed inset-0 z-[-1] bg-[rgba(34,18,11,.32)]" aria-hidden="true" />
      {/* Identidade da página */}
      <header className="absolute inset-x-0 top-0 z-50 bg-transparent transition-all">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 md:py-5">
          <div className="flex cursor-pointer items-center gap-3 text-[#f0cf83] transition-colors hover:text-white">
            <Cross className="h-7 w-7 stroke-[1.5] drop-shadow-md" />
            <h1 className="font-serif text-2xl font-semibold tracking-wide text-white drop-shadow-md md:text-3xl">Rosarium</h1>
          </div>
          <div className="flex items-center gap-2">
            <AuthModalControl />
            <SiteSettingsControl />
          </div>
        </div>
      </header>

      <section className="relative isolate flex min-h-[clamp(26rem,58vh,40rem)] items-end overflow-hidden bg-[#2d180f]/20">
        <img src="/images/rosarium-church.jpg" alt="Interior de uma igreja com vitrais e altar" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(30,15,9,.7)_0%,rgba(30,15,9,.28)_38%,transparent_72%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(30,15,9,.76)_0%,transparent_58%)]" />
        <div className="mx-auto w-full max-w-6xl px-5 pb-12 pt-24 sm:px-6 md:pb-16">
          <div className="max-w-[30rem] text-white">
            <h2 className="font-serif text-5xl leading-[.95] text-white sm:text-6xl md:text-7xl">Rosarium</h2>
          </div>
        </div>
      </section>

      <section aria-labelledby="start-heading" className="relative border-t border-white/15 bg-[rgba(30,15,9,.86)] py-10 text-white sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-12">
            <div className="max-w-2xl">
              <h3 id="start-heading" className="mb-3 font-serif text-3xl text-white md:text-4xl">Comece por aqui</h3>
              <p className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">Reze o terço, acompanhe a liturgia e encontre palavras para o seu momento de oração.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <button onClick={() => navigate('/rosario')} className={`${actionButtonBase} bg-[#c99b43] text-[#24150e] hover:bg-[#e2bd6d]`}><Cross className="h-4 w-4" />Começar o Rosário</button>
              <button onClick={() => navigate('/santos/9999')} className={`${actionButtonBase} border border-white/45 bg-black/15 text-white backdrop-blur-sm hover:border-white/70 hover:bg-black/30`}><Users className="h-4 w-4" />Ver o Santo do Dia</button>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-4 border-t border-white/15 pt-6">
            <PrayerMusicPlayer />
            <div>
              <p className="mb-1 text-sm font-semibold text-[#f0cf83]">Som para oração</p>
              <p className="max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">Toque uma música contemplativa enquanto você reza ou permanece em silêncio.</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="explore-heading" className="relative border-t border-white/20 bg-[rgba(16,8,5,.9)] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 max-w-2xl text-white">
            <h3 id="explore-heading" className="font-serif text-3xl text-white md:text-4xl">Explore o Rosarium</h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70">Escolha um caminho para continuar sua oração, acompanhar a Igreja ou conhecer melhor a fé.</p>
          </div>
          <div className="space-y-10">
            {[
              { title: 'Quero rezar', description: 'Encontre uma oração guiada para permanecer em presença.', items: mainSections.slice(0, 3) },
              { title: 'Quero acompanhar a liturgia', description: 'Veja as leituras e a oração das horas para viver o dia com a Igreja.', items: secondarySections.slice(0, 2) },
              { title: 'Quero conhecer a fé', description: 'Descubra vidas, símbolos e histórias que atravessam a tradição católica.', items: secondarySections.slice(2) },
            ].map((group) => (
              <div key={group.title} className="border-t border-white/15 pt-8 first:border-t-0 first:pt-0">
                <div className="mb-4 flex flex-col gap-1 text-white sm:flex-row sm:items-baseline sm:gap-4">
                  <h4 className="font-serif text-2xl">{group.title}</h4>
                  <p className="text-sm text-white/70">{group.description}</p>
                </div>
                <div className={`grid gap-x-8 gap-y-2 ${group.items.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                  {group.items.map((section) => {
                    const Icon = section.icon;
                    return <button key={section.path} type="button" onClick={() => navigate(section.path)} className="group flex min-h-20 items-center gap-4 border-t border-white/15 py-4 text-left text-white transition-colors hover:border-[#e5bd68]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5bd68] focus-visible:ring-offset-2 focus-visible:ring-offset-[#24140d]">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#c99b43]/20 text-[#e5bd68] transition-colors group-hover:bg-[#c99b43]/30"><Icon className="h-5 w-5" /></span>
                      <span><span className="block font-serif text-lg group-hover:text-[#f0cf83]">{section.title}</span><span className="mt-1 block text-sm leading-relaxed text-white/70">{section.description}</span></span>
                    </button>;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Minimalista e Elegante */}
      <div className="relative overflow-hidden bg-transparent py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#c99b43]/15 text-[#e5bd68]">
            <Cross className="h-5 w-5 opacity-80" />
          </div>
          <h2 className="mb-5 font-serif text-2xl italic leading-snug text-[#f0cf83] md:text-3xl">
            {'"A oração é a elevação da alma a Deus ou o pedido a Deus dos bens convenientes."'}
          </h2>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">
            — Santa Teresinha do Menino Jesus
          </p>
        </div>
      </div>

      <footer className="relative bg-[#24140d]/80 py-8">
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
