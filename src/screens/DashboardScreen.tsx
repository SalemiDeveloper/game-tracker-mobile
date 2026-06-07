import { router } from 'expo-router';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { removeToken } from '../storage/authStorage';

export default function DashboardScreen() {

    async function handleLogout() {
        await removeToken();
        router.replace('/login');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Dashboard 🎮
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