import { router } from 'expo-router';
import {
    useEffect,
    useState,
} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { getGames } from '../services/gameService';
import { removeToken } from '../storage/authStorage';


export default function DashboardScreen() {

    const [games, setGames] = useState<any[]>([]);

    async function loadGames() {
        try {
            const data = await getGames();
            setGames(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleLogout() {
        await removeToken();
        router.replace('/login');
    }

    useEffect(() =>{ loadGames();}, []);

    const totalGames = games.length;
    const playing = games.filter(game => game.status === 'jogando').length;
    const finished = games.filter(game => game.status === 'zerei').length;
    const platinum = games.filter(game => game.status === 'platinei').length;
    const backlog = games.filter(game => game.status === 'vou_jogar').length;

    const porcent = games.filter(game => game.status === '100_porcento').length;
    const abandonei = games.filter(game => game.status === 'abandonei').length;

    const finalizados = finished + platinum + porcent;

    const averageRating = games.length ? (
        games.reduce(
          (acc, game) => acc + Number(game.nota), 0
        ) 
    / games.length) .toFixed(1) : '0';

    const totalHours = games.reduce((acc, game) => acc + Number(game.horas_jogadas ?? 0), 0);

    return (
        <View
        style={{
            flex: 1,
            padding: 20,
            paddingTop: 40,
            gap: 16,
        }}
        >
            <Text
                style={{
                    fontSize: 28,
                    fontWeight: 700,
                }}
            >
                Dashboard 🎮
            </Text>

            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 12,
                }}
            >
                <View style={styles.card}>
                    <Text>Total</Text>
                    <Text style={styles.number}>
                        {totalGames}
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text>Jogando</Text>
                    <Text style={styles.number}>
                        {playing}
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text>Vou jogar</Text>
                    <Text style={styles.number}>
                        {backlog}
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text>Finalizados (zerados + 100% + platinas)</Text>
                    <Text style={styles.number}>
                        {finalizados}
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text>Média</Text>
                    <Text style={styles.number}>
                        {averageRating}
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text>Horas</Text>
                    <Text style={styles.number}>
                        {totalHours}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },

  button: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  card: {
    width: '48%',
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 12,
    gap: 8,
  },

  number: {
    fontSize: 24,
    fontWeight: '700',
  },
});