import { api } from '@/src/api/client';
import { getGames } from '@/src/services/gameService';
import { formatStatus } from '@/src/utils/formatStatus';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
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
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [statusOptions, setStatusOptions] = useState<string[]>([]);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('recent');

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

    async function loadStatus() {
        try {
            const response = await api.get('/api/status-options');
            setStatusOptions(response.data);

        } catch (error: any) {
            console.log(error);
        }
    }

    useFocusEffect(useCallback(() => { loadGames(); loadStatus();}, []));

    const filteredGames = games.filter((game) => {
        const matchesStatus = selectedStatus === 'all' || game.status === selectedStatus;
        const matchesSearch = game.titulo.toLowerCase().includes(search.toLowerCase());

      return ( matchesStatus && matchesSearch );
    }).sort((a, b) => {
            switch (sortBy) {

        case 'highest_rating':
          return (Number(b.nota) - Number(a.nota));

        case 'lowest_rating':
          return (Number(a.nota) - Number(b.nota));

        case 'alphabetical':
          return a.titulo.localeCompare(b.titulo);

        case 'most_hours':
          return (Number(b.horas_jogadas ?? 0) - Number(a.horas_jogadas ?? 0));

        case'recent':
        default:
          return (new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
    });

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

            <Picker
                selectedValue={selectedStatus}
                onValueChange={setSelectedStatus}
            >

                <Picker.Item
                    label="Todos"
                    value="all"
                />

                {statusOptions.map(
                    (item) => (
                        <Picker.Item
                            key={item}
                            label={formatStatus(item)}
                            value={item}
                        />    
                    )
                )}
            </Picker>

            <Picker
                selectedValue={sortBy}
                onValueChange={setSortBy}
            >
                <Picker.Item 
                    label="Mais recentes"
                    value="recent"
                />

                <Picker.Item 
                    label="Maior nota"
                    value="highest_rating"
                />

                <Picker.Item 
                    label="Menor nota"
                    value="lowest_rating"
                />

                <Picker.Item 
                    label="A - Z"
                    value="alphabetical"
                />

                <Picker.Item 
                    label="Mais horas"
                    value="most_hours"
                />
            </Picker>

            <TextInput
                placeholder='Buscar jogo'
                value={search}
                onChangeText={setSearch}
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 12,
                }}
            />

            <FlatList
                refreshing={refreshing}
                onRefresh={() => {
                    setRefreshing(true);
                    loadGames();
                }}
                // data={games}
                data={filteredGames}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    //<View style={styles.card}>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                            router.push({
                                pathname: '/game/[id]',
                                params: {id: item.id.toString(),},
                            })
                        }
                        >
                        <Text style={styles.title}>
                            {item.titulo}
                        </Text>

                        <Text>
                            {item.plataforma}
                        </Text>

                        <Text>
                            {formatStatus(item.status)}
                        </Text>

                        <Text>
                            Nota: {item.nota}
                        </Text>
                    </TouchableOpacity>
                    //</View>          
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