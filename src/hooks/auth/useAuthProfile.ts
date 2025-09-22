// src/hooks/auth/useAuthProfile.ts  
// 認証とプロフィール情報を組み合わせたカスタムフック

import { useAuthStore } from '@stores/authStore';
import { useProfileStore } from '@stores/profileStore';

/**
 * 認証情報とプロフィール情報を組み合わせて取得するカスタムフック
 * 
 * このフックは以下の責務を持ちます：
 * - 認証状態とプロフィール情報の両方を提供
 * - ログイン必須画面で便利
 * - 型安全なアクセス
 * 
 * @returns 認証情報とプロフィール情報
 * 
 * @example
 * ```typescript
 * const { user, profile, isLoading } = useAuthProfile();
 * if (isLoading) return <Loading />;
 * if (!user) return <Redirect href="/entry" />;
 * 
 * // user と profile の両方が利用可能
 * console.log(user.email, profile?.displayName);
 * ```
 */
export function useAuthProfile() {
  const { user, isLoading: authLoading, error: authError } = useAuthStore();
  const {
    currentProfile: profile,
    isLoading: profileLoading,
    error: profileError
  } = useProfileStore();

  return {
    // 認証情報
    user,
    // プロフィール情報
    profile,
    // 状態
    isLoading: authLoading || profileLoading,
    error: authError || profileError,
    // 個別の状態も提供
    authLoading,
    profileLoading,
    authError,
    profileError,
  };
}

/**
 * 厳格な認証＋プロフィールチェックを行うカスタムフック
 * 
 * @returns 認証済みユーザー情報とプロフィール情報
 * @throws {Error} ユーザーがログインしていない場合
 */
export function useStrictAuthProfile() {
  const { user, profile, isLoading, error } = useAuthProfile();

  // ユーザーがログインしていない場合はエラーをスロー
  if (!user) {
    throw new Error('ログインしていないため、この画面にはアクセスできません。');
  }

  return {
    user,
    profile, // プロフィールはnullの可能性あり（取得中など）
    isLoading,
    error,
  };
}
