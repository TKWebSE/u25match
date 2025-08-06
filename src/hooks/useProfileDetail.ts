import { ProfileDetail, profileDetailService } from '@services/profile';
import { getOnlineStatus } from '@utils/getOnlineStatus';
import { useEffect, useState } from 'react';

/**
 * プロフィール詳細画面のビジネスロジックを管理するカスタムフック
 * 
 * このフックは以下の責務を持ちます：
 * - プロフィールデータの取得と管理
 * - ローディング・エラー状態の管理
 * - いいね機能の処理
 * - オンライン状態の計算
 */
interface UseProfileDetailReturn {
  // 状態
  profile: ProfileDetail | null;        // プロフィール詳細データ
  loading: boolean;                     // ローディング状態
  error: string | null;                 // エラーメッセージ
  liked: boolean;                       // いいね済みかどうか
  onlineStatus: string;                 // オンライン状態（"オンライン"、"オフライン"など）

  // アクション
  loadProfileDetail: () => Promise<void>; // プロフィール詳細を再取得
  handleLike: () => Promise<void>;        // いいねボタンの処理
  retry: () => Promise<void>;             // エラー時の再試行
}

/**
 * プロフィール詳細のビジネスロジックを管理するカスタムフック
 * 
 * @param identifier - プロフィールのユーザーIDまたはユニークID
 * @returns プロフィール詳細の状態とアクション
 * 
 * @example
 * ```typescript
 * const {
 *   profile,
 *   loading,
 *   error,
 *   liked,
 *   onlineStatus,
 *   handleLike,
 *   retry,
 * } = useProfileDetail('user123');
 * ```
 */
export const useProfileDetail = (identifier: string): UseProfileDetailReturn => {
  // プロフィール詳細データの状態管理
  const [profile, setProfile] = useState<ProfileDetail | null>(null);

  // ローディング状態の管理
  const [loading, setLoading] = useState(true);

  // エラー状態の管理
  const [error, setError] = useState<string | null>(null);

  // いいね状態の管理
  const [liked, setLiked] = useState(false);

  // オンライン状態の管理
  const [onlineStatus, setOnlineStatus] = useState('読み込み中...');

  /**
   * プロフィール詳細データを取得する
   * 
   * この関数は以下の処理を行います：
   * 1. ローディング状態を開始
   * 2. エラー状態をリセット
   * 3. APIからプロフィールデータを取得
   * 4. オンライン状態を計算
   * 5. 成功時はデータを保存、失敗時はエラーを設定
   * 6. ローディング状態を終了
   */
  const loadProfileDetail = async () => {
    try {
      // ローディング開始
      setLoading(true);
      setError(null);

      console.log('🔍 プロフィール詳細を取得中...', { identifier });

      // APIからプロフィールデータを取得（ユニークIDかどうかを判定）
      const response = identifier.includes('-')
        ? await profileDetailService.getProfileDetailByUniqueId(identifier)
        : await profileDetailService.getProfileDetail(identifier);

      console.log('📋 プロフィール詳細レスポンス:', response);

      if (response.success && response.data) {
        // 成功時：データを保存し、オンライン状態を計算
        setProfile(response.data);
        const status = getOnlineStatus(response.data.lastActiveAt);
        setOnlineStatus(status);
        console.log('✅ プロフィール詳細取得成功');
      } else {
        // 失敗時：エラーメッセージを設定
        const errorMessage = response.error || 'プロフィールの取得に失敗しました';
        console.error('❌ プロフィール詳細取得失敗:', errorMessage);
        setError(errorMessage);
      }
    } catch (err) {
      // 例外発生時：エラーメッセージを設定
      const errorMessage = 'プロフィールの取得中にエラーが発生しました';
      console.error('💥 プロフィール詳細取得エラー:', err);
      setError(errorMessage);
    } finally {
      // ローディング終了
      setLoading(false);
    }
  };

  /**
   * いいねボタンを押した時の処理
   * 
   * この関数は以下の処理を行います：
   * 1. APIにいいねリクエストを送信
   * 2. 成功時はプロフィールのいいねカウントを即座に更新
   * 3. ボタン押下時にいいね状態を更新
   */
  const handleLike = async () => {
    try {
      // ボタン押下時に即座にいいね状態を更新
      setLiked(true);

      // APIにいいねリクエストを送信
      const response = await profileDetailService.sendLike(identifier);

      if (response.success) {
        // プロフィールのいいねカウントを即座に更新
        if (profile) {
          setProfile({
            ...profile,
            likeCount: profile.likeCount + 1,
          });
        }
      } else {
        console.error('Like error:', response.error);
      }
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  /**
   * エラー時の再試行処理
   * 
   * プロフィール詳細の取得を再実行します
   */
  const retry = async () => {
    await loadProfileDetail();
  };

  // コンポーネントマウント時にプロフィール詳細を取得
  useEffect(() => {
    loadProfileDetail();
  }, [identifier]);

  // フックの戻り値
  return {
    profile,
    loading,
    error,
    liked,
    onlineStatus,
    loadProfileDetail,
    handleLike,
    retry,
  };
}; 
