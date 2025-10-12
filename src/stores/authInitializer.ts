// src/stores/authInitializer.ts
// Firebase認証状態の初期化と監視

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from './authStore';
import { initializeProfile } from './profileInitializer';

/**
 * アプリ起動時にFirebase認証状態を監視開始
 * ログイン状態の永続化を実現
 */
export const initializeAuth = (): (() => void) => {
  console.log('🔥 認証状態の監視を開始...');

  // Firebase認証状態の変更を監視
  const unsubscribe = serviceRegistry.auth.onAuthStateChanged(async (user) => {
    console.log('🔥 認証状態変更:', user ? `${user.uid} (${user.email})` : 'ログアウト');

    const authStoreState = authStore.getState();

    if (user) {
      // ログイン状態: ストアにユーザー情報を設定
      authStoreState.setUser(user as any); // TODO: 型変換を適切に実装
      authStoreState.setLoading(false); // ローディング終了
      console.log('✅ ログイン状態をストアに反映完了');

      // プロフィール情報を取得・保存
      await initializeProfile(user);
    } else {
      // ログアウト状態: ストアをクリア
      authStoreState.setUser(null);
      authStoreState.setLoading(false); // ローディング終了
      console.log('✅ ログアウト状態をストアに反映完了');

      // プロフィール情報もクリア
      await initializeProfile(null);
    }
  });

  // クリーンアップ関数を返す
  return unsubscribe;
};

/**
 * アプリ終了時に監視を停止
 */
export const cleanupAuth = (unsubscribe: (() => void) | null) => {
  if (unsubscribe) {
    console.log('🔥 認証状態の監視を停止');
    unsubscribe();
  }
};
