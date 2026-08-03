import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { authApi } from '../services/auth.api';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { user } = await authApi.register(name, email, password);

      localStorage.setItem('@Rosarium:user', JSON.stringify(user));
      navigate('/');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Erro ao realizar cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-church-bg px-4 py-10">
      <div className="w-full max-w-md rounded-lg border border-church-border bg-church-bg-secondary p-6 shadow-sm sm:p-8">
        <h1 className="mb-2 text-center text-2xl font-semibold text-church-accent sm:text-3xl">
          Criar Conta
        </h1>
        <p className="mb-6 text-center text-sm text-church-text-secondary sm:mb-8">
          Junte-se ao Rosarium para vivenciar sua fé.
        </p>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-church-text-secondary">
              Nome
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-church-border bg-church-bg px-3 py-3 text-church-text outline-none transition-colors placeholder:text-church-text-muted focus:border-church-accent"
              placeholder="Seu nome completo"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-church-text-secondary">
              E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-church-border bg-church-bg px-3 py-3 text-church-text outline-none transition-colors placeholder:text-church-text-muted focus:border-church-accent"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-church-text-secondary">
              Senha
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-church-border bg-church-bg px-3 py-3 text-church-text outline-none transition-colors placeholder:text-church-text-muted focus:border-church-accent"
              placeholder="Min. 6 caracteres"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-md bg-church-accent px-4 py-3 text-white transition-colors hover:bg-church-accent-hover disabled:opacity-50 dark:text-church-bg"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm leading-relaxed">
          <span className="text-church-text-secondary">Já tem uma conta? </span>
          <Link
            to="/auth/login"
            className="font-medium text-church-accent hover:text-church-accent-hover"
          >
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}
