import {
    Text,
    View,
} from 'react-native';

import {
    useEffect,
    useState,
} from 'react';

import { getGames } from '@/src/services/gameService';

export default function Games() {

    const [games, setGames] = useState([]);

    useEffect(() => {

        async function loadGames() {
            try {
                const data = await getGames();
                console.log(data);
                setGames(data);
            } catch (error) {
                console.log(error);
            }
        }

        loadGames();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 24,
            }}
            >
            <Text>
                {JSON.stringify(
                games,
                null,
                2
                )}
            </Text>
        </View>
    );
}