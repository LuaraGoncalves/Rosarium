import { useEffect, useState } from 'react';
import { santosApi } from '../services/santos.api';
export function useSantos() {
    const [santos, setSantos] = useState([]);
    const [santoDoDia, setSantoDoDia] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchSantos = async () => {
            try {
                setLoading(true);
                const [listaSantos, hojeSanto] = await Promise.all([
                    santosApi.getTodosSantos().catch(() => []),
                    santosApi.getSantoDoDia().catch(() => null)
                ]);
                setSantos(listaSantos);
                setSantoDoDia(hojeSanto);
            }
            catch (err) {
                setError(err.message || 'Erro ao buscar dados dos santos');
                console.error('Erro na API de Santos:', err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchSantos();
    }, []);
    return { santos, santoDoDia, loading, error };
}
