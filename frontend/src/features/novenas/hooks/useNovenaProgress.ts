import { useState, useEffect, useCallback, useRef } from "react";
import { api } from "../../../shared/services/api";

export type SyncStatus = 'idle' | 'syncing' | 'saved' | 'error';

export function useNovenaProgress(novenaId: string) {
  const getInitialProgress = () => {
    const saved = localStorage.getItem(`novena_progress_${novenaId}`);
    return saved ? JSON.parse(saved) : [];
  };

  const [completedDays, setCompletedDays] = useState<number[]>(getInitialProgress);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const isInitialMount = useRef(true);

  const serverDaysRef = useRef<number[]>([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem("@Rosarium:token");
        if (!token) return;

        const pendingSyncStr = localStorage.getItem(`novena_sync_pending_${novenaId}`);
        
        if (pendingSyncStr) {
          try {
            setSyncStatus('syncing');
            const pendingSync = JSON.parse(pendingSyncStr);
            const { data } = await api.post(`/novenas/progress/${novenaId}`, { 
              completedDays: pendingSync.completedDays,
              localUpdatedAt: pendingSync.localUpdatedAt
            });
            
            localStorage.removeItem(`novena_sync_pending_${novenaId}`);
            setCompletedDays(data.completedDays);
            serverDaysRef.current = data.completedDays;
            localStorage.setItem(`novena_progress_${novenaId}`, JSON.stringify(data.completedDays));
            if (data.updatedAt) localStorage.setItem(`novena_progress_updatedAt_${novenaId}`, data.updatedAt);
            setSyncStatus('saved');
            setTimeout(() => setSyncStatus('idle'), 3000);
            return;
          } catch (syncError: any) {

            if (syncError.response && syncError.response.status === 409) {
              const serverData = syncError.response.data;
              localStorage.removeItem(`novena_sync_pending_${novenaId}`);
              
              setCompletedDays(serverData.completedDays);
              serverDaysRef.current = serverData.completedDays;
              localStorage.setItem(`novena_progress_${novenaId}`, JSON.stringify(serverData.completedDays));
              if (serverData.updatedAt) localStorage.setItem(`novena_progress_updatedAt_${novenaId}`, serverData.updatedAt);
              setSyncStatus('saved');
              setTimeout(() => setSyncStatus('idle'), 3000);
              return;
            }

            setSyncStatus('error');
            throw syncError;
          }
        }

        const { data } = await api.get(`/novenas/progress/${novenaId}`);
        if (data && data.completedDays) {
          setCompletedDays(data.completedDays);
          serverDaysRef.current = data.completedDays;
          localStorage.setItem(`novena_progress_${novenaId}`, JSON.stringify(data.completedDays));
          if (data.updatedAt) localStorage.setItem(`novena_progress_updatedAt_${novenaId}`, data.updatedAt);
        }
      } catch (error) {
        console.error("Failed to fetch novena progress from backend:", error);
      }
    };
    fetchProgress();
  }, [novenaId]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    localStorage.setItem(`novena_progress_${novenaId}`, JSON.stringify(completedDays));

    const syncWithBackend = async () => {
      try {
        const token = localStorage.getItem("@Rosarium:token");
        if (!token) return;

        setSyncStatus('syncing');

        const now = new Date().toISOString();

        localStorage.setItem(`novena_sync_pending_${novenaId}`, JSON.stringify({
          completedDays,
          localUpdatedAt: now
        }));

        const { data } = await api.post(`/novenas/progress/${novenaId}`, {
          completedDays,
          localUpdatedAt: now
        });

        serverDaysRef.current = data.completedDays;
        if (data.updatedAt) localStorage.setItem(`novena_progress_updatedAt_${novenaId}`, data.updatedAt);
        localStorage.removeItem(`novena_sync_pending_${novenaId}`);
        
        setSyncStatus('saved');
        setTimeout(() => setSyncStatus('idle'), 3000);

      } catch (error: any) {

        if (error.response && error.response.status === 409) {
          const serverData = error.response.data;
          setCompletedDays(serverData.completedDays);
          serverDaysRef.current = serverData.completedDays;
          localStorage.setItem(`novena_progress_${novenaId}`, JSON.stringify(serverData.completedDays));
          if (serverData.updatedAt) localStorage.setItem(`novena_progress_updatedAt_${novenaId}`, serverData.updatedAt);
          localStorage.removeItem(`novena_sync_pending_${novenaId}`);
          setSyncStatus('saved');
          setTimeout(() => setSyncStatus('idle'), 3000);
          return;
        }

        console.error("Failed to sync novena progress with backend. Offline fallback activated.", error);
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
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day].sort()
    );
  }, []);

  const isDayCompleted = (day: number) => completedDays.includes(day);

  const progressPercentage = (totalDays: number) => {
    return Math.round((completedDays.length / totalDays) * 100);
  };

  return { completedDays, toggleDay, isDayCompleted, progressPercentage, syncStatus };
}
