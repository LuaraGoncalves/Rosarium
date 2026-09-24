import { FormEvent, useState } from 'react';
import { Eye, EyeOff, LogOut, UserCircle } from 'lucide-react';
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
  const [showPassword, setShowPassword] = useState(false);
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
      setShowPassword(false);
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
        className="relative flex min-h-11 min-w-11 items-center justify-center rounded-md border border-white/30 bg-black/20 p-2 text-white shadow-sm backdrop-blur transition-colors hover:border-[#e5bd68] hover:bg-black/35 hover:text-[#f0cf83]"
        title={isAuthenticated ? `Conta de ${firstName}` : 'Entrar'}
        aria-label={isAuthenticated ? `Conta de ${firstName}` : 'Entrar'}
      >
        <UserCircle className="h-5 w-5" aria-hidden="true" />
        {isAuthenticated && (
          <span
            className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border border-[#24140d] bg-[#c99b43] shadow-sm"
            aria-hidden="true"
          />
        )}
      </button>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setShowPassword(false);
          }
        }}
      >
        <DialogContent className="max-w-md border-white/20 bg-[rgba(36,20,13,.98)] p-0 text-white shadow-2xl shadow-black/50">
          <div className="overflow-hidden rounded-lg">
            <div className="border-b border-white/15 bg-[rgba(22,11,7,.72)] px-6 pb-5 pt-6">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl text-[#f0cf83]">
                  {isAuthenticated
                    ? `Paz e bem, ${firstName}`
                    : isRegister
                      ? 'Criar sua conta'
                      : 'Entrar no Rosarium'}
                </DialogTitle>
                <DialogDescription className="text-white/65">
                  {isAuthenticated
                    ? 'Sua conta está conectada para salvar seu progresso espiritual.'
                    : 'Acesse sua conta sem sair da página atual.'}
                </DialogDescription>
              </DialogHeader>
            </div>

            {isAuthenticated ? (
              <div className="space-y-4 px-6 pb-6 pt-5">
                <div className="rounded-lg border border-white/10 bg-black/20 px-4 py-3">
                  <p className="text-sm font-semibold text-white">{user?.name}</p>
                  <p className="text-sm text-white/60">{user?.email}</p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/25 bg-black/15 px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-[#e5bd68] hover:text-[#f0cf83] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5bd68]"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Sair da conta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-6 pt-5">
                {error && (
                  <div className="rounded-lg border border-red-300/30 bg-red-950/40 p-3 text-sm text-red-100">
                    {error}
                  </div>
                )}

                {isRegister && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white/75">
                      Nome
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="w-full rounded-lg border border-white/20 bg-black/20 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/40 focus:border-[#e5bd68] focus:ring-2 focus:ring-[#e5bd68]/20"
                      placeholder="Seu nome completo"
                    />
                  </div>
                )}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/75">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-lg border border-white/20 bg-black/20 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/40 focus:border-[#e5bd68] focus:ring-2 focus:ring-[#e5bd68]/20"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/75">
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={isRegister ? 6 : undefined}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full rounded-lg border border-white/20 bg-black/20 py-3 pl-4 pr-12 text-white outline-none transition-colors placeholder:text-white/40 focus:border-[#e5bd68] focus:ring-2 focus:ring-[#e5bd68]/20"
                      placeholder={isRegister ? 'Mínimo de 6 caracteres' : 'Sua senha'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-white/55 transition-colors hover:bg-white/10 hover:text-[#f0cf83] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e5bd68]"
                      aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                      aria-pressed={showPassword}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-[#c99b43] px-4 py-3 text-sm font-semibold text-[#24140d] shadow-sm transition-colors hover:bg-[#e2bd6d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5bd68] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Aguarde...' : isRegister ? 'Criar conta' : 'Entrar'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMode(isRegister ? 'login' : 'register');
                    setShowPassword(false);
                    resetFeedback();
                  }}
                  className="w-full text-center text-sm font-medium text-[#f0cf83] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5bd68]"
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
