// src/usecases/reactions/getReactions.ts
// リアクション取得のユースケース - 送信・受信リアクション一覧取得処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { Reaction, reactionsStore } from '@stores/reactionsStore';

/**
 * リアクション取得処理の結果
 */
export interface GetReactionsResult {
  success: boolean;                    // 取得成功フラグ
  sentReactions?: Reaction[];          // 送信したリアクション（成功時）
  receivedReactions?: Reaction[];      // 受信したリアクション（成功時）
  error?: string;                      // エラーメッセージ（失敗時のみ）
}

/**
 * リアクション一覧を取得するユースケース
 * 
 * フロー:
 * 1. ローディング開始・エラークリア
 * 2. サービス層でリアクション取得
 * 3. 送信・受信リアクションをストアに設定
 * 4. 本日の使用回数を更新
 * 5. 結果をUIに返却
 * 
 * @param userId - 対象のユーザーID
 * @returns リアクション取得結果（成功/失敗・リアクション一覧・エラー）
 */
export const getReactions = async (userId: string): Promise<GetReactionsResult> => {
  try {
    // ローディング開始・エラークリア
    reactionsStore.getState().setLoading(true);
    reactionsStore.getState().clearError();

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
    reactionsStore.getState().setSentReactions(sentReactions);
    reactionsStore.getState().setReceivedReactions(receivedReactions);

    // 本日の使用回数を計算・更新
    const today = new Date().toDateString();
    const todayLikes = sentReactions.filter(r =>
      r.type === 'like' && r.timestamp.toDateString() === today
    ).length;
    const todaySuperLikes = sentReactions.filter(r =>
      r.type === 'super_like' && r.timestamp.toDateString() === today
    ).length;

    reactionsStore.getState().setDailyLikesUsed(todayLikes);
    reactionsStore.getState().setSuperLikesUsed(todaySuperLikes);

    // 制限情報も更新（プレミアム状態に応じて）
    if (result.limits) {
      reactionsStore.getState().setDailyLikesLimit(result.limits.dailyLikes);
      reactionsStore.getState().setSuperLikesLimit(result.limits.superLikes);
    }

    reactionsStore.getState().setLoading(false);

    return {
      success: true,
      sentReactions,
      receivedReactions
    };

  } catch (error: any) {
    console.error('リアクション取得エラー:', error);

    // エラー処理（ストアにエラー情報を設定）
    reactionsStore.getState().setLoading(false);
    reactionsStore.getState().setError(error.message || 'リアクションの取得に失敗しました');

    // UIに結果を返却
    return {
      success: false,
      error: error.message || 'リアクションの取得に失敗しました'
    };
  }
};
