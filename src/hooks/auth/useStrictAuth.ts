import { useAuthStore } from '@stores/authStore';

/**
 * 厳格な認証チェックを行うカスタムフック
 * 
 * このフックは以下の責務を持ちます：
 * - ユーザーがログインしているかチェック
 * - 未ログインの場合はエラーをスロー
 * - ログイン済みの場合はユーザー情報を返す
 * 
 * @returns 認証済みユーザー情報（未ログインの場合はエラーをスロー）
 * 
 * @example
 * ```typescript
 * const user = useStrictAuth(); // ログインしていない場合はエラー
 * console.log(user.email); // 安全にアクセス可能
 * ```
 * 
 * @throws {Error} ユーザーがログインしていない場合
 */
export function useStrictAuth() {
  const { user } = useAuthStore();

  // ユーザーがログインしていない場合はエラーをスロー
  if (!user) {
    throw new Error('ログインしていないため、この画面にはアクセスできません。');
  }

  // 認証済みユーザー情報を返す
  return user;
}
