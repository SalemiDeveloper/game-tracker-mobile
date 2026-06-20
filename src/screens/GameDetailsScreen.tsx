import {
    Text,
    View,
} from 'react-native';

import {
    useEffect,
    useState,
} from 'react';

import { router, useLocalSearchParams, } from 'expo-router';
import { TouchableOpacity, } from 'react-native';
import { deleteGame, getGameById } from '../services/gameService';
import { formatStatus } from '../utils/formatStatus';

export default function GameDetailsScreen() {
    const { id } = useLocalSearchParams();
    const [game, setGame] = useState<any>(null);

    async function handleDelete() {
        try {
            await deleteGame(id as string);
            router.back;
        } catch (error) {
            console.log(error);
        }
    }

    async function loadGame() {
        try {
            const response = await getGameById(id as string);
            setGame(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { loadGame(); }, []);

    if (!game) {
        return (
            <Text>
                Carregando...
            </Text>
        )
    }

    return (

        <View
            style={{
            flex: 1,
            padding: 24,
            gap: 16,
            marginTop: 20,
            }}
        >

            <Text
            style={{
                fontSize: 28,
                fontWeight: '700',
            }}
            >
            {game.titulo}
            </Text>

            <View
            style={{
                backgroundColor:
                '#f2f2f2',

                padding: 16,

                borderRadius: 12,

                gap: 8,
            }}
            >

            <Text
                style={{
                fontSize: 18,
                }}
            >
                Nota:
                {' '}
                {game.nota}
            </Text>

            <Text
                style={{
                fontSize: 18,
                }}
            >
                Status:
                {' '}
                {formatStatus(game.status)}
            </Text>

            </View>

            <TouchableOpacity
            style={{
                backgroundColor: '#222',
                padding: 16,
                borderRadius: 12,
                alignItems: 'center',
            }}
            onPress={() =>
                router.push({
                    pathname: '/game/edit/[id]',
                    params: { id: game.id.toString(),},
                })
            }
            >
                <Text
                    style={{
                        color: '#fff',
                        fontWeight: '600',
                    }}
                >
                    Editar Jogo
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    backgroundColor:
                    '#af0101',

                    padding: 16,

                    borderRadius: 12,

                    alignItems:
                    'center',
                }}
                onPress={handleDelete}
            >

                <Text
                    style={{
                    color: '#fff',
                    fontWeight: '600',
                    }}
                >
                    Excluir jogo
                </Text>

            </TouchableOpacity>
        </View>

        
    );
}

