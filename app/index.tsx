// app/index.tsx
// ルートパス（/）へのアクセス時のリダイレクト処理
import { ENTRY_SCREEN_PATH, EXPLORE_SCREEN_PATH } from '@constants/routes';
import { useAuthStore } from '@stores/authStore';
import { Redirect } from 'expo-router';

export default function Index() {
  const { user } = useAuthStore();

  // 認証済みユーザーはメイン画面へ
  if (user) {
    return <Redirect href={EXPLORE_SCREEN_PATH as any} />;
  }

  // 未認証ユーザーはエントリー画面へ
  return <Redirect href={ENTRY_SCREEN_PATH as any} />;
}
