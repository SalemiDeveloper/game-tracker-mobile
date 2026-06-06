import {
  useEffect,
  useState
} from 'react';

import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { api } from '../src/api/client';
import {
  getToken,
  removeToken,
  saveToken
} from '../src/storage/authStorage';

export default function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    async function loadToken() {
      const token = await getToken();
      if (token) {
        setLogged(true);
      }
    }

    loadToken();
  }, []);

  async function handleLogin() {

    try {
      const response = await api.post(
        '/api/login',
        {
          email,
          password,
        }
      );

      const token = response.data.access_token;
      await saveToken(token);

      Alert.alert('Sucesso', 'Login realizado');

    } catch (error: any) {

      Alert.alert(
        'Erro',
        error.response?.data?.message
          ?? 'Erro ao fazer login'
      );
    }
  }

  async function handleLogout() {
    await removeToken();
    setLogged(false);
  }

  return (
    <View style={styles.container}>

      {logged ? (
        <>
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
        </>
      ) : (
        <>
          <Text style={styles.title}>Game Tracker 🎮</Text>

          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Senha"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </TouchableOpacity>
        </>
      )}

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
    marginBottom: 30,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },

  button: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});