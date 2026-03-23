import { useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {

    const storedUser = localStorage.getItem('@Rosarium:user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Falha ao parsear usuário salvo');
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('@Rosarium:token');
    localStorage.removeItem('@Rosarium:user');
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    logout
  };
}
