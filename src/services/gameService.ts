import { api } from '../api/client';

export async function getGames() {

    const response = await api.get('/api/games');

    return response.data;
}

export async function createGame(data:any) {
    const response = await api.post('/api/games', data);
    return response.data;
}

export async function getGameById(id: string){
    const response = await api.get(`/api/games/${id}`);
    return response.data;
}

export async function updateGame(id: string, data: {titulo: string, nota: number, status: string}) {
    const response = await api.put(`/api/games/${id}`, data);
    return response.data;
}
