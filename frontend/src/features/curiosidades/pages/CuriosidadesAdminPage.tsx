import { FormEvent, useState } from 'react';
import { BookOpen, Save } from 'lucide-react';
import { useNavigate } from 'react-router';
import { FeaturePageHeader } from '../../../shared/components/FeaturePageShell';
import { curiosidadesApi } from '../services/curiosidades.api';

export function CuriosidadesAdminPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ titulo: '', conteudo: '', fonte: '', fonteUrl: '', imagemUrl: '', santoId: '' });
  const [message, setMessage] = useState('');
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await curiosidadesApi.create({ ...form, santoId: form.santoId ? Number(form.santoId) : null });
      setForm({ titulo: '', conteudo: '', fonte: '', fonteUrl: '', imagemUrl: '', santoId: '' });
      setMessage('Curiosidade cadastrada com sucesso.');
    } catch {
      setMessage('Não foi possível cadastrar. Verifique seu acesso e os campos preenchidos.');
    }
  };
  const field = (key: keyof typeof form, placeholder: string, multiline = false) => multiline
    ? <textarea required={key !== 'imagemUrl' && key !== 'santoId'} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} rows={6} className="w-full rounded-xl border border-church-border bg-church-bg px-4 py-3 outline-none focus:border-church-accent" />
    : <input required={key !== 'imagemUrl' && key !== 'santoId'} type={key === 'fonteUrl' || key === 'imagemUrl' ? 'url' : key === 'santoId' ? 'number' : 'text'} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} className="w-full rounded-xl border border-church-border bg-church-bg px-4 py-3 outline-none focus:border-church-accent" />;
  return <div className="min-h-screen bg-church-bg text-church-text"><FeaturePageHeader icon={BookOpen} title="Nova curiosidade" subtitle="Cadastre um conteúdo revisado e sua fonte." onBack={() => navigate('/curiosidades')} /><main className="mx-auto max-w-3xl px-4 py-8"><form onSubmit={submit} className="space-y-5 rounded-2xl bg-church-bg-secondary p-6 shadow-md"><label className="block space-y-2"><span>Título</span>{field('titulo', 'Ex.: O manto de Nossa Senhora de Guadalupe')}</label><label className="block space-y-2"><span>Conteúdo</span>{field('conteudo', 'Escreva a curiosidade...', true)}</label><div className="grid gap-5 md:grid-cols-2"><label className="block space-y-2"><span>Fonte</span>{field('fonte', 'Ex.: Arquidiocese de São Paulo')}</label><label className="block space-y-2"><span>Link da fonte</span>{field('fonteUrl', 'https://...')}</label></div><div className="grid gap-5 md:grid-cols-2"><label className="block space-y-2"><span>ID do santo (opcional)</span>{field('santoId', 'Ex.: 12')}</label><label className="block space-y-2"><span>Imagem (opcional)</span>{field('imagemUrl', 'https://...')}</label></div><button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-church-accent px-5 py-3 font-medium text-white hover:bg-church-accent-hover"><Save className="h-4 w-4" />Salvar curiosidade</button>{message && <p className="text-sm text-church-text-muted">{message}</p>}</form></main></div>;
}
