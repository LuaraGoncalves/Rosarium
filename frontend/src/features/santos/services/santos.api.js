import { api } from '@/shared/services/api';
export const santosApi = {
    async getTodosSantos() {
        const response = await api.get('/santos');
        return response.data;
    },
    async getSantoDoDia() {
        try {
            const response = await api.get('/santos/hoje');
            return response.data;
        }
        catch (error) {
            return null;
        }
    },
    async getSantoById(id) {
        const response = await api.get(`/santos/${id}`);
        return response.data;
    }
};
