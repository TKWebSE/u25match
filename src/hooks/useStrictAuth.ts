import { useAuth } from '@/src/contexts/AuthContext';

export function useStrictAuth() {
  const { user } = useAuth();

  if (!user) {
    throw new Error('ログインしていないため、この画面にはアクセスできません。');
  }

  return user;
}
