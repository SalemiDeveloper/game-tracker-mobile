import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { router } from 'expo-router';
import { useState } from 'react';
import { createGame } from '../services/gameService';
import { getToken } from '../storage/authStorage';

 export default function AddGameScreen() {

    const [title, setTitle] = useState('');
    const [rating, setRating] = useState('');

    async function handleSave() {
        const token =
            await getToken();

            //console.log(token);
        try {
            await createGame({titulo: title, nota: Number(rating)});

            router.back();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Adicionar Jogo
            </Text>

            <TextInput
                placeholder="Nome do jogo"
                style={styles.input}
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                placeholder="Nota"
                style={styles.input}
                value={rating}
                onChangeText={setRating}
                keyboardType="numeric"
            />

            <TouchableOpacity 
                onPress={handleSave}
                style={styles.button}>
                <Text style={styles.buttonText}>
                    Salvar
                </Text>
            </TouchableOpacity>

        </View>
    );
 }

 const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
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
    fontWeight: '600',
  },
});