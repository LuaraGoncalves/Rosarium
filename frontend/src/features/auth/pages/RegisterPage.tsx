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
      const { user, token } = await authApi.register(name, email, password);

      localStorage.setItem('@Rosarium:token', token);
      localStorage.setItem('@Rosarium:user', JSON.stringify(user));
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Erro ao realizar cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-100px)] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm dark:bg-[#1C1C1C]">
        <h1 className="mb-2 text-center text-2xl font-bold font-display text-[#8B4513] dark:text-[#D4A373]">
          Criar Conta
        </h1>
        <p className="mb-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Junte-se ao Rosarium para vivenciar sua fé.
        </p>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Nome</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-[#8B4513] dark:border-neutral-700 dark:bg-neutral-800 dark:focus:border-[#D4A373]"
              placeholder="Seu nome completo"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-[#8B4513] dark:border-neutral-700 dark:bg-neutral-800 dark:focus:border-[#D4A373]"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Senha</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-[#8B4513] dark:border-neutral-700 dark:bg-neutral-800 dark:focus:border-[#D4A373]"
              placeholder="Min. 6 caracteres"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-md bg-[#8B4513] px-4 py-2 text-white transition-colors hover:bg-[#6b350e] disabled:opacity-50 dark:bg-[#D4A373] dark:text-black dark:hover:bg-[#b0875f]"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-neutral-500 dark:text-neutral-400">Já tem uma conta? </span>
          <Link to="/auth/login" className="font-medium text-[#8B4513] hover:underline dark:text-[#D4A373]">
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}
