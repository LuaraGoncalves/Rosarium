import { useState, useEffect } from 'react';
import { authApi, type AuthUser } from '../services/auth.api';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const storedUser = localStorage.getItem('@Rosarium:user');
    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as AuthUser;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const syncAuth = async () => {
      try {
        const { user: authenticatedUser } = await authApi.me();

        if (!isMounted) {
          return;
        }

        setUser(authenticatedUser);
        localStorage.setItem('@Rosarium:user', JSON.stringify(authenticatedUser));
      } catch {
        if (!isMounted) {
          return;
        }

        setUser(null);
        localStorage.removeItem('@Rosarium:token');
        localStorage.removeItem('@Rosarium:user');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    syncAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      localStorage.removeItem('@Rosarium:token');
      localStorage.removeItem('@Rosarium:user');
      setUser(null);
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    logout,
  };
}
