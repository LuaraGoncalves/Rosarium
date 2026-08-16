import type { SyncStatus } from '../hooks/useNovenaProgress';

export function getNovenaProgressStatus(syncStatus: SyncStatus, isAuthenticated: boolean) {
  if (!isAuthenticated) {
    return {
      text: 'Salvo neste dispositivo. Entre para salvar seu progresso na conta.',
      className: 'border-church-border-hover bg-church-bg-secondary text-church-text/60',
    };
  }

  if (syncStatus === 'syncing') {
    return {
      text: 'Sincronizando seu progresso...',
      className: 'border-church-border-hover bg-church-bg-secondary text-church-accent',
    };
  }

  if (syncStatus === 'saved') {
    return {
      text: 'Progresso salvo na sua conta.',
      className: 'border-church-accent-hover/40 bg-church-bg-secondary text-church-accent-hover',
    };
  }

  if (syncStatus === 'error') {
    return {
      text: 'Salvo neste dispositivo. A sincronização será tentada novamente depois.',
      className: 'border-red-300/40 bg-red-950/10 text-red-300',
    };
  }

  return {
    text: 'Conectado. Seu progresso será salvo na conta.',
    className: 'border-church-border-hover bg-church-bg-secondary text-church-text/60',
  };
}
