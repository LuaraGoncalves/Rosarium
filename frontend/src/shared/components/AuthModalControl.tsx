import { FormEvent, useState } from 'react';
import { LogOut, UserCircle } from 'lucide-react';
import { authApi } from '../../features/auth/services/auth.api';
import { notifyAuthChanged, useAuth } from '../../features/auth/hooks/useAuth';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

type AuthMode = 'login' | 'register';

export function AuthModalControl() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const firstName = user?.name?.split(' ')[0] || 'fiel';
  const isRegister = mode === 'register';

  const resetFeedback = () => {
    setError('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetFeedback();
    setLoading(true);

    try {
      const response = isRegister
        ? await authApi.register(name, email, password)
        : await authApi.login(email, password);

      localStorage.setItem('@Rosarium:user', JSON.stringify(response.user));
      notifyAuthChanged();
      setIsOpen(false);
      setPassword('');
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : 'Não foi possível entrar agora. Confira seus dados e tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative flex min-h-11 min-w-11 items-center justify-center rounded-md border border-church-border bg-church-bg-secondary/95 p-2 text-church-text-muted shadow-sm backdrop-blur transition-colors hover:border-church-border-hover hover:text-church-accent"
        title={isAuthenticated ? `Conta de ${firstName}` : 'Entrar'}
        aria-label={isAuthenticated ? `Conta de ${firstName}` : 'Entrar'}
      >
        <UserCircle className="h-5 w-5" aria-hidden="true" />
        {isAuthenticated && (
          <span
            className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border border-church-bg-secondary bg-church-accent shadow-sm"
            aria-hidden="true"
          />
        )}
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md border-church-border bg-church-bg-secondary p-0 text-church-text shadow-2xl shadow-church-bg-darker/25">
          <div className="overflow-hidden rounded-lg">
            <div className="bg-church-bg px-6 pb-5 pt-6">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl text-church-accent">
                  {isAuthenticated
                    ? `Paz e bem, ${firstName}`
                    : isRegister
                      ? 'Criar sua conta'
                      : 'Entrar no Rosarium'}
                </DialogTitle>
                <DialogDescription className="text-church-text-secondary">
                  {isAuthenticated
                    ? 'Sua conta está conectada para salvar seu progresso espiritual.'
                    : 'Acesse sua conta sem sair da página atual.'}
                </DialogDescription>
              </DialogHeader>
            </div>

            {isAuthenticated ? (
              <div className="space-y-4 px-6 pb-6 pt-5">
                <div className="rounded-2xl bg-church-bg px-4 py-3">
                  <p className="text-sm font-semibold text-church-text">{user?.name}</p>
                  <p className="text-sm text-church-text-muted">{user?.email}</p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-church-border bg-church-bg px-4 py-3 text-sm font-semibold text-church-text transition-colors hover:border-church-border-hover hover:text-church-accent"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Sair da conta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-6 pt-5">
                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {isRegister && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-church-text-secondary">
                      Nome
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="w-full rounded-2xl border border-church-border bg-church-bg px-4 py-3 text-church-text outline-none transition-colors placeholder:text-church-text-muted focus:border-church-accent"
                      placeholder="Seu nome completo"
                    />
                  </div>
                )}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-church-text-secondary">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-2xl border border-church-border bg-church-bg px-4 py-3 text-church-text outline-none transition-colors placeholder:text-church-text-muted focus:border-church-accent"
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
                    minLength={isRegister ? 6 : undefined}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-2xl border border-church-border bg-church-bg px-4 py-3 text-church-text outline-none transition-colors placeholder:text-church-text-muted focus:border-church-accent"
                    placeholder={isRegister ? 'Mínimo de 6 caracteres' : 'Sua senha'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-church-accent px-4 py-3 text-sm font-semibold text-church-bg-secondary shadow-sm transition-colors hover:bg-church-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Aguarde...' : isRegister ? 'Criar conta' : 'Entrar'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMode(isRegister ? 'login' : 'register');
                    resetFeedback();
                  }}
                  className="w-full text-center text-sm font-medium text-church-accent transition-colors hover:text-church-accent-hover"
                >
                  {isRegister ? 'Já tenho uma conta' : 'Criar uma conta'}
                </button>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
