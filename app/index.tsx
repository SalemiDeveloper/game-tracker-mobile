import { useState } from 'react';

import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { api } from '../src/api/client';

export default function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {

    try {

      const response = await api.post(
        '/api/login',
        {
          email,
          password,
        }
      );

      Alert.alert(
        'Login OK',
        response.data.access_token
      );

    } catch (error: any) {

      Alert.alert(
        'Erro',
        error.response?.data?.message
          ?? 'Erro ao fazer login'
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Game Tracker 🎮
      </Text>

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