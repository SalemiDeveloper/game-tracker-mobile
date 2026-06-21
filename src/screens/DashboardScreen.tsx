import { router } from 'expo-router';
import {
    useEffect,
    useState,
} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
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
        <View style={styles.container}>
            <Text style={styles.title}>
                Dashboard 🎮
            </Text>

            <Text>
                Total de jogos:
                {totalGames}
            </Text>

            <Text>
                Jogando:
                {playing}
            </Text>

            <Text>
                Finalizados:
                {finalizados}
            </Text>

            <Text>
                Platinados:
                {platinum}
            </Text>

            <Text>
                Quero jogar:
                {backlog}
            </Text>

            <Text>
                Média:
                {averageRating}
            </Text>

            <Text>
                Horas jogadas:
                {totalHours}
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogout}
                >

                <Text style={styles.buttonText}>
                    Sair
                </Text>

            </TouchableOpacity>
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
});