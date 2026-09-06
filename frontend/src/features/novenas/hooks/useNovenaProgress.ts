import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { api } from '../../../shared/services/api';
import { AUTH_CHANGED_EVENT } from '../../auth/hooks/useAuth';

export type SyncStatus = 'idle' | 'syncing' | 'saved' | 'error';

function normalizeCompletedDays(value: unknown): number[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return [...new Set(value.filter((day): day is number => Number.isInteger(day) && day > 0))].sort(
    (firstDay, secondDay) => firstDay - secondDay
  );
}

function mergeCompletedDays(...daysGroups: number[][]): number[] {
  return normalizeCompletedDays(daysGroups.flat());
}

function areCompletedDaysEqual(firstDays: number[], secondDays: number[]) {
  return (
    firstDays.length === secondDays.length &&
    firstDays.every((day, index) => day === secondDays[index])
  );
}

function parseStoredNumberArray(value: string | null): number[] {
  if (!value || value === 'undefined') {
    return [];
  }

  try {
    return normalizeCompletedDays(JSON.parse(value));
  } catch {
    return [];
  }
}

function parsePendingSync(value: string | null) {
  if (!value || value === 'undefined') {
    return null;
  }

  try {
    const parsedValue = JSON.parse(value) as { completedDays?: unknown; localUpdatedAt?: unknown };
    const completedDays = normalizeCompletedDays(parsedValue.completedDays);
    const localUpdatedAt =
      typeof parsedValue.localUpdatedAt === 'string'
        ? parsedValue.localUpdatedAt
        : new Date().toISOString();

    return { completedDays, localUpdatedAt };
  } catch {
    return null;
  }
}

export function useNovenaProgress(novenaId: string) {
  type ConflictResponse = {
    completedDays: number[];
    updatedAt?: string;
  };

  const getInitialProgress = () => {
    const saved = localStorage.getItem(`novena_progress_${novenaId}`);
    return parseStoredNumberArray(saved);
  };

  const [completedDays, setCompletedDays] = useState<number[]>(getInitialProgress);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [authSyncVersion, setAuthSyncVersion] = useState(0);
  const isInitialMount = useRef(true);

  const serverDaysRef = useRef<number[]>([]);

  useEffect(() => {
    const refreshAfterAuthChange = () => {
      setAuthSyncVersion((version) => version + 1);
    };

    window.addEventListener(AUTH_CHANGED_EVENT, refreshAfterAuthChange);

    return () => {
      window.removeEventListener(AUTH_CHANGED_EVENT, refreshAfterAuthChange);
    };
  }, []);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const progressKey = `novena_progress_${novenaId}`;
        const pendingSyncKey = `novena_sync_pending_${novenaId}`;
        const localDays = parseStoredNumberArray(localStorage.getItem(progressKey));
        const pendingSync = parsePendingSync(localStorage.getItem(pendingSyncKey));

        if (pendingSync) {
          try {
            setSyncStatus('syncing');
            const pendingDays = mergeCompletedDays(localDays, pendingSync.completedDays);
            const { data } = await api.post(`/novenas/progress/${novenaId}`, {
              completedDays: pendingDays,
              localUpdatedAt: pendingSync.localUpdatedAt,
            });
            const syncedDays = mergeCompletedDays(pendingDays, data.completedDays);

            localStorage.removeItem(pendingSyncKey);
            setCompletedDays(syncedDays);
            serverDaysRef.current = syncedDays;
            localStorage.setItem(progressKey, JSON.stringify(syncedDays));
            if (data.updatedAt)
              localStorage.setItem(`novena_progress_updatedAt_${novenaId}`, data.updatedAt);
            setSyncStatus('saved');
            setTimeout(() => setSyncStatus('idle'), 3000);
            return;
          } catch (syncError: unknown) {
            if (axios.isAxiosError(syncError) && syncError.response?.status === 401) {
              setSyncStatus('idle');
              return;
            }

            if (
              axios.isAxiosError<ConflictResponse>(syncError) &&
              syncError.response?.status === 409
            ) {
              const serverData = syncError.response.data;
              const mergedDays = mergeCompletedDays(
                localDays,
                pendingSync.completedDays,
                serverData.completedDays
              );
              localStorage.removeItem(pendingSyncKey);

              setCompletedDays(mergedDays);
              serverDaysRef.current = serverData.completedDays;
              localStorage.setItem(progressKey, JSON.stringify(mergedDays));
              if (serverData.updatedAt)
                localStorage.setItem(`novena_progress_updatedAt_${novenaId}`, serverData.updatedAt);
              setSyncStatus('saved');
              setTimeout(() => setSyncStatus('idle'), 3000);
              return;
            }

            setSyncStatus('error');
            throw syncError;
          }
        } else if (localStorage.getItem(pendingSyncKey)) {
          localStorage.removeItem(pendingSyncKey);
        }

        const { data } = await api.get(`/novenas/progress/${novenaId}`);
        if (data && data.completedDays) {
          const serverDays = normalizeCompletedDays(data.completedDays);
          const mergedDays = mergeCompletedDays(localDays, serverDays);

          setCompletedDays(mergedDays);
          serverDaysRef.current = serverDays;
          localStorage.setItem(progressKey, JSON.stringify(mergedDays));
          if (data.updatedAt)
            localStorage.setItem(`novena_progress_updatedAt_${novenaId}`, data.updatedAt);

          if (!areCompletedDaysEqual(mergedDays, serverDays)) {
            const now = new Date().toISOString();
            await api.post(`/novenas/progress/${novenaId}`, {
              completedDays: mergedDays,
              localUpdatedAt: now,
            });
            serverDaysRef.current = mergedDays;
            localStorage.removeItem(pendingSyncKey);
            setSyncStatus('saved');
            setTimeout(() => setSyncStatus('idle'), 3000);
          }
        }
      } catch (error) {
        if (!axios.isAxiosError(error) || error.response?.status !== 401) {
          console.error('Failed to fetch novena progress from backend:', error);
        }
      }
    };
    fetchProgress();
  }, [authSyncVersion, novenaId]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    localStorage.setItem(`novena_progress_${novenaId}`, JSON.stringify(completedDays));

    const syncWithBackend = async () => {
      try {
        setSyncStatus('syncing');

        const now = new Date().toISOString();

        localStorage.setItem(
          `novena_sync_pending_${novenaId}`,
          JSON.stringify({
            completedDays,
            localUpdatedAt: now,
          })
        );

        const { data } = await api.post(`/novenas/progress/${novenaId}`, {
          completedDays,
          localUpdatedAt: now,
        });

        serverDaysRef.current = data.completedDays;
        if (data.updatedAt)
          localStorage.setItem(`novena_progress_updatedAt_${novenaId}`, data.updatedAt);
        localStorage.removeItem(`novena_sync_pending_${novenaId}`);

        setSyncStatus('saved');
        setTimeout(() => setSyncStatus('idle'), 3000);
      } catch (error: unknown) {
        if (axios.isAxiosError<ConflictResponse>(error) && error.response?.status === 409) {
          const serverData = error.response.data;
          setCompletedDays(serverData.completedDays);
          serverDaysRef.current = serverData.completedDays;
          localStorage.setItem(
            `novena_progress_${novenaId}`,
            JSON.stringify(serverData.completedDays)
          );
          if (serverData.updatedAt)
            localStorage.setItem(`novena_progress_updatedAt_${novenaId}`, serverData.updatedAt);
          localStorage.removeItem(`novena_sync_pending_${novenaId}`);
          setSyncStatus('saved');
          setTimeout(() => setSyncStatus('idle'), 3000);
          return;
        }

        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setSyncStatus('idle');
          return;
        }

        console.error(
          'Failed to sync novena progress with backend. Offline fallback activated.',
          error
        );
        setSyncStatus('error');
      }
    };

    const timer = setTimeout(() => {
      syncWithBackend();
    }, 500);

    return () => clearTimeout(timer);
  }, [completedDays, novenaId]);

  const toggleDay = useCallback((day: number) => {
    setCompletedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort()
    );
  }, []);

  const isDayCompleted = (day: number) => completedDays.includes(day);

  const progressPercentage = (totalDays: number) => {
    return Math.round((completedDays.length / totalDays) * 100);
  };

  return { completedDays, toggleDay, isDayCompleted, progressPercentage, syncStatus };
}
