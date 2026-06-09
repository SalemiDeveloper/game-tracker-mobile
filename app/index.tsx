import { router } from 'expo-router';
import { useEffect } from 'react';

import { getToken } from '@/src/storage/authStorage';

export default function Home() {

  useEffect(() => {

    async function checkAuth() {

      const token = await getToken();

      if (token) {
        router.replace('/(tabs)/dashboard');
      } else {
        router.replace('/login');
      }
    }

    checkAuth();

  }, []);

  return null;
}