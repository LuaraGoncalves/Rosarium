import { api } from '@/shared/services/api';
export const authApi = {
    async login(email, password) {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },
    async register(name, email, password) {
        const response = await api.post('/auth/register', { name, email, password });
        return response.data;
    }
};
