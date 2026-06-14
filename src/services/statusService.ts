import { api } from '../api/client';

export async function getStatus() {
    const response = await api.get('/api/status-options');

    return response.data;
}