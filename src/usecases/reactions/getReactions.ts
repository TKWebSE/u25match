// src/usecases/reactions/getReactions.ts
// リアクション取得のユースケース - 受信したリアクション（いいね・足跡）一覧取得処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { Reaction, reactionsStore } from '@stores/reactionsStore';

/**
 * リアクション取得処理の結果
 */
export interface GetReactionsResult {
  reactions: {
    likes: Reaction[];           // 受信したいいね（like）
    footprints: Reaction[];      // 受信した足跡（footprint）
  };
}

/**
 * 受信したリアクション一覧を取得するユースケース
 * 
 * フロー:
 * 1. ローディング開始
 * 2. サービス層でリアクション取得
 * 3. いいねと足跡をストアに設定
 * 4. エラー時は呼び出し元にスロー
 * 
 * 用途:
 * - 自分のプロフィールにいいねをくれた人の一覧表示
 * - 自分のプロフィールを見に来た人（足跡）の一覧表示
 * 
 * @param userId - 対象のユーザーID
 * @returns リアクション取得結果（いいね・足跡の一覧）
 * @throws エラーが発生した場合は例外をスロー
 */
export const getReactions = async (userId: string): Promise<GetReactionsResult> => {
  const store = reactionsStore.getState();

  try {
    // ローディング開始
    store.setLoading(true);

    // サービス層でリアクション取得
    const result = await serviceRegistry.reactions.getReactions(userId);

    // ストアに直接保存（変換不要）
    store.setLikes(result.reactions.likes);
    store.setFootprints(result.reactions.footprints);

    return {
      reactions: {
        likes: result.reactions.likes,
        footprints: result.reactions.footprints,
      }
    };

  } catch (error: any) {
    throw error;
  } finally {
    store.setLoading(false);
  }
};
