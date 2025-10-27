// src/usecases/reactions/getReactions.ts
// リアクション取得のユースケース - 受信したリアクション（いいね・足跡）一覧取得処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { reactionsStore } from '@stores/reactionsStore';

/**
 * 受信したリアクション一覧を取得するユースケース
 * 
 * フロー:
 * 1. ローディング開始
 * 2. サービス層でリアクション取得
 * 3. いいねと足跡をストアに設定
 * 4. エラー時はエラーをスロー
 * 
 * 用途:
 * - 自分のプロフィールにいいねをくれた人の一覧表示
 * - 自分のプロフィールを見に来た人（足跡）の一覧表示
 * 
 * @param userId - 対象のユーザーID
 * @returns true: リアクション取得成功, false: リアクション取得失敗
 * @throws エラーが発生した場合はエラーをスロー
 */
export const getReactions = async (userId: string): Promise<boolean> => {
  const store = reactionsStore.getState();

  try {
    // ローディング開始
    store.setLoading(true);

    // サービス層でリアクション取得
    const result = await serviceRegistry.reactions.getReactions(userId);

    // ストアに保存
    store.setLikes(result.reactions.likes);
    store.setFootprints(result.reactions.footprints);

    return true;

  } catch (error: any) {
    throw error;
  } finally {
    store.setLoading(false);
  }
};
