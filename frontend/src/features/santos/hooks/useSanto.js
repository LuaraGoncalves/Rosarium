import { useEffect, useState } from "react";
import { api } from "@/shared/services/api";
export function useSanto(id) {
    const [santo, setSanto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!id)
            return;
        const fetchSanto = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/santos/${id}`);
                setSanto(res.data);
            }
            catch (err) {
                setError(err.message || "Erro ao buscar santo");
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchSanto();
    }, [id]);
    return { santo, loading, error };
}
