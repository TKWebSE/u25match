// src/hooks/useStrictAuth.ts
import { useAuth } from '@/src/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export function useStrictAuth() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/(auth)/loginScreen');  // ログイン画面に強制遷移
    }
  }, [user, router]);

  if (!user) {
    // ユーザーがいない間は何も表示しない（またはローディングなど）
    return null;
  }

  return user;  // user が必ず存在することが保証される
}
