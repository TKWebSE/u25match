import { useAuth } from '@contexts/AuthContext';

export function useStrictAuth() {
  const { user } = useAuth();

  if (!user) {
    throw new Error('ログインしていないため、この画面にはアクセスできません。');
  }

  return user;
}
