import { api } from '@/src/api/client';
import { router } from 'expo-router';
import { useEffect } from 'react';

import {
  getToken,
  removeToken
} from '@/src/storage/authStorage';

export default function Home() {

  useEffect(() => {

    async function checkAuth() {

      const token = await getToken();

      if (!token) {
        router.replace('/login');
        return;
      }

      try {
        await api.get('/api/games');
        router.replace('/(tabs)/dashboard');
      } catch (error: any) {
          if (error.response?.status === 401) {
              await removeToken();
              router.replace('/login');
              return;
          }

          router.replace('/login');
      }
    }

    checkAuth();

  }, []);

  return null;
}