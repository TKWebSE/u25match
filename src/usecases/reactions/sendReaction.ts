// src/usecases/reactions/sendReaction.ts
// リアクション送信のユースケース - いいね・スキップ・スーパーいいね送信処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { Reaction, ReactionType, reactionsStore } from '@stores/reactionsStore';

/**
 * リアクション送信に必要なデータ
 */
export interface SendReactionData {
  toUserId: string;          // リアクション対象のユーザーID
  type: ReactionType;        // リアクションの種類
}

/**
 * リアクション送信処理の結果
 */
export interface SendReactionResult {
  success: boolean;          // 送信成功フラグ
  isMatched?: boolean;       // マッチしたかどうか（成功時）
  matchId?: string;          // マッチID（マッチした場合）
  error?: string;            // エラーメッセージ（失敗時のみ）
}

/**
 * リアクションを送信するユースケース
 * 
 * フロー:
 * 1. リアクション制限チェック
 * 2. ローディング開始・エラークリア
 * 3. サービス層でリアクション送信
 * 4. リアクション情報をストアに追加
 * 5. マッチした場合はマッチ情報も追加
 * 6. 使用回数を更新
 * 7. 結果をUIに返却
 * 
 * @param fromUserId - リアクションを送信するユーザーID
 * @param data - リアクションデータ（対象ユーザー・種類）
 * @returns リアクション送信結果（成功/失敗・マッチ情報・エラー）
 */
export const sendReaction = async (fromUserId: string, data: SendReactionData): Promise<SendReactionResult> => {
  const { toUserId, type } = data;

  try {
    // リアクション制限チェック
    if (type === 'like' && !reactionsStore.getState().canSendLike()) {
      return {
        success: false,
        error: '本日のいいね上限に達しています'
      };
    }

    if (type === 'super_like' && !reactionsStore.getState().canSendSuperLike()) {
      return {
        success: false,
        error: '本日のスーパーいいね上限に達しています'
      };
    }

    // 自分自身にリアクション禁止
    if (fromUserId === toUserId) {
      return {
        success: false,
        error: '自分自身にリアクションはできません'
      };
    }

    // ローディング開始・エラークリア
    reactionsStore.getState().setLoading(true);
    reactionsStore.getState().clearError();

    // サービス層でリアクション送信
    const result = await serviceRegistry.reactions.sendReaction({
      fromUserId,
      toUserId,
      type,
    });

    // リアクション情報をストアに追加
    const reaction: Reaction = {
      id: result.reactionId,
      fromUserId,
      toUserId,
      type,
      timestamp: new Date(),
      isMatched: result.isMatched,
    };

    reactionsStore.getState().addSentReaction(reaction);

    // マッチした場合はマッチ情報も追加
    if (result.isMatched && result.matchId) {
      reactionsStore.getState().addMatch({
        id: result.matchId,
        userId1: fromUserId,
        userId2: toUserId,
        matchedAt: new Date(),
        isActive: true,
      });
    }

    // 使用回数を更新
    if (type === 'like') {
      reactionsStore.getState().incrementDailyLikes();
    } else if (type === 'super_like') {
      reactionsStore.getState().incrementSuperLikes();
    }

    reactionsStore.getState().setLoading(false);

    return {
      success: true,
      isMatched: result.isMatched,
      matchId: result.matchId
    };

  } catch (error: any) {
    console.error('リアクション送信エラー:', error);

    // エラー処理（ストアにエラー情報を設定）
    reactionsStore.getState().setLoading(false);
    reactionsStore.getState().setError(error.message || 'リアクションの送信に失敗しました');

    // UIに結果を返却
    return {
      success: false,
      error: error.message || 'リアクションの送信に失敗しました'
    };
  }
};
