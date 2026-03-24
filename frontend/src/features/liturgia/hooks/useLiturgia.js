import { useState, useEffect } from 'react';
export function useLiturgia() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchLiturgia() {
            try {
                setLoading(true);
                const response = await fetch('https://liturgia.up.railway.app/');
                if (!response.ok) {
                    throw new Error('Falha ao obter dados da liturgia diária');
                }
                const json = await response.json();
                setData(json);
                setError(null);
            }
            catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao carregar orações da API');
                console.error("Erro no fetch da liturgia", err);
            }
            finally {
                setLoading(false);
            }
        }
        fetchLiturgia();
    }, []);
    return { data, loading, error };
}
