import { api } from '../api/client';

export async function getGames() {

    const response = await api.get('/api/games');

    return response.data;
}

export async function createGame(data:any) {
    
    const response = await api.post('/api/games', data);

    return response.data;
}
