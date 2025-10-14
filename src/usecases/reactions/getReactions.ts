// src/usecases/reactions/getReactions.ts
// リアクション取得のユースケース - 送信・受信リアクション一覧取得処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { Reaction, reactionsStore } from '@stores/reactionsStore';

/**
 * リアクション取得処理の結果
 */
export interface GetReactionsResult {
  sentReactions: Reaction[];          // 送信したリアクション
  receivedReactions: Reaction[];      // 受信したリアクション
}

/**
 * リアクション一覧を取得するユースケース
 * 
 * フロー:
 * 1. ローディング開始
 * 2. サービス層でリアクション取得
 * 3. 送信・受信リアクションをストアに設定
 * 4. 本日の使用回数を更新
 * 5. エラー時は呼び出し元にスロー
 * 
 * @param userId - 対象のユーザーID
 * @returns リアクション取得結果（送信・受信リアクション一覧）
 * @throws エラーが発生した場合は例外をスロー
 */
export const getReactions = async (userId: string): Promise<GetReactionsResult> => {
  const store = reactionsStore.getState();

  try {
    // ローディング開始
    store.setLoading(true);

    // サービス層でリアクション取得
    const result = await serviceRegistry.reactions.getReactions(userId);

    // データ変換
    const sentReactions: Reaction[] = result.sent.map(r => ({
      id: r.id,
      fromUserId: r.fromUserId,
      toUserId: r.toUserId,
      type: r.type as any,
      timestamp: new Date(r.timestamp),
      isMatched: r.isMatched,
    }));

    const receivedReactions: Reaction[] = result.received.map(r => ({
      id: r.id,
      fromUserId: r.fromUserId,
      toUserId: r.toUserId,
      type: r.type as any,
      timestamp: new Date(r.timestamp),
      isMatched: r.isMatched,
    }));

    // 送信・受信リアクションをストアに設定
    store.setSentReactions(sentReactions);
    store.setReceivedReactions(receivedReactions);

    // 本日の使用回数を計算・更新
    const today = new Date().toDateString();
    const todayLikes = sentReactions.filter(r =>
      r.type === 'like' && r.timestamp.toDateString() === today
    ).length;
    const todaySuperLikes = sentReactions.filter(r =>
      r.type === 'super_like' && r.timestamp.toDateString() === today
    ).length;

    store.setDailyLikesUsed(todayLikes);
    store.setSuperLikesUsed(todaySuperLikes);

    // 制限情報も更新（プレミアム状態に応じて）
    if (result.limits) {
      store.setDailyLikesLimit(result.limits.dailyLikes);
      store.setSuperLikesLimit(result.limits.superLikes);
    }

    return {
      sentReactions,
      receivedReactions
    };

  } catch (error: any) {
    console.error('リアクション取得エラー:', error);
    // エラーを呼び出し元に再スロー
    throw error;
  } finally {
    store.setLoading(false);
  }
};
