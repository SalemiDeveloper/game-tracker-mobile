import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    useEffect,
    useState,
} from 'react';

import { getGames } from '@/src/services/gameService';

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

    useEffect(() => { loadGames(); }, []);

    return (
        <View style={styles.container}>

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
});