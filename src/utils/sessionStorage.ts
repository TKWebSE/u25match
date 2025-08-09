import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * シンプルなセッション管理ユーティリティ
 * 
 * このユーティリティは以下の責務を持ちます：
 * - プロフィール作成状態の管理
 */

// ストレージキー
const KEYS = {
  /** プロフィール作成完了フラグ - ユーザーがプロフィールを作成したかどうか */
  PROFILE_CREATED: 'profile_created',
} as const;

/**
 * プロフィール作成完了状態を保存
 */
export const saveProfileCreated = async (created: boolean) => {
  try {
    await AsyncStorage.setItem(KEYS.PROFILE_CREATED, JSON.stringify(created));
  } catch (error) {
    console.error('プロフィール作成状態の保存に失敗:', error);
  }
};

/**
 * プロフィール作成完了状態を取得
 */
export const getProfileCreated = async () => {
  try {
    const created = await AsyncStorage.getItem(KEYS.PROFILE_CREATED);
    return created ? JSON.parse(created) : false;
  } catch (error) {
    console.error('プロフィール作成状態の取得に失敗:', error);
    return false;
  }
};

/**
 * 全データをクリア（ログアウト時）
 */
export const clearAllSessionData = async () => {
  try {
    await AsyncStorage.multiRemove(Object.values(KEYS));
  } catch (error) {
    console.error('セッションデータのクリアに失敗:', error);
  }
};
