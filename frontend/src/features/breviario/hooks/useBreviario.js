import { useState, useEffect } from 'react';
import { api } from '@/shared/services/api';
export function useBreviario() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchBreviario() {
            try {
                setLoading(true);
                const response = await api.get('/liturgia/hoje');
                setData(response.data);
                setError(null);
            }
            catch (err) {
                setError(err.message || 'Erro ao carregar a Liturgia e Breviário do Backend');
                console.error("Erro no fetch do breviario", err);
            }
            finally {
                setLoading(false);
            }
        }
        fetchBreviario();
    }, []);
    return { data, loading, error };
}
