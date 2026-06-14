import { getGames } from '@/src/services/gameService';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    useCallback,
    useState
} from 'react';

export default function Games() {

    const [games, setGames] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    async function loadGames() {
        try {
            const data = await getGames();
            setGames(data);
        } catch (error) {
            console.log(error);
        } finally {
            setRefreshing(false);
        }
    }

    useFocusEffect(useCallback(() => { loadGames();}, [])
);

    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push('/add-game')}
                >
                <Text style={styles.addButtonText}>
                    + Novo jogo
                </Text>
            </TouchableOpacity>

            <FlatList
                refreshing={refreshing}
                onRefresh={() => {
                    setRefreshing(true);
                    loadGames();
                }}
                data={games}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.title}>
                            {item.titulo}
                        </Text>

                        <Text>
                            {item.plataforma}
                        </Text>

                        <Text>
                            {item.status}
                        </Text>

                        <Text>
                            Nota: {item.nota}
                        </Text>
                    </View>          
                )}
            />    
        </View>
    );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  addButton: {
    backgroundColor: '#111',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 16,
    alignItems: 'center',
    },

  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    },
});