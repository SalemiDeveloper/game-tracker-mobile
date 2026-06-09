import { api } from '../api/client';

export async function getGames() {

    const response = await api.get('/api/games');

    return response.data;
}
