import { useEffect, useState } from 'react';
import { BookOpen, ExternalLink, Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { FeaturePageHeader } from '../../../shared/components/FeaturePageShell';
import { curiosidadesApi } from '../services/curiosidades.api';
import type { Curiosidade } from '../types/curiosidade';

export function CuriosidadesPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Curiosidade[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    curiosidadesApi.list(search).then(setItems).finally(() => setLoading(false));
  }, [search]);

  return <div className="min-h-screen bg-church-bg text-church-text font-sans pb-24">
    <FeaturePageHeader icon={BookOpen} title="Curiosidades" subtitle="Histórias e detalhes que ajudam a conhecer melhor a fé." onBack={() => navigate('/igreja')} />
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3 rounded-2xl border border-church-border bg-church-bg-secondary px-4 py-3">
        <Search className="h-5 w-5 text-church-text-muted" />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar curiosidade" className="w-full bg-transparent text-church-text outline-none placeholder:text-church-text-muted" />
      </div>
      {loading ? <p className="text-church-text-muted">Carregando...</p> : items.length === 0 ? <p className="text-church-text-muted">Nenhuma curiosidade encontrada.</p> : <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => <article key={item.id} className="overflow-hidden rounded-2xl bg-church-bg-secondary shadow-md">
          {item.imagemUrl && <img src={item.imagemUrl} alt="" className="h-48 w-full object-cover" />}
          <div className="p-6"><p className="mb-2 text-sm text-church-accent-hover">{item.santo?.nome || 'Rosarium'}</p><h2 className="mb-3 font-serif text-2xl text-church-accent">{item.titulo}</h2><p className="whitespace-pre-line leading-relaxed text-church-text/85">{item.conteudo}</p><a href={item.fonteUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-church-accent hover:text-church-accent-hover">Fonte: {item.fonte}<ExternalLink className="h-4 w-4" /></a></div>
        </article>)}
      </div>}
    </main>
  </div>;
}
