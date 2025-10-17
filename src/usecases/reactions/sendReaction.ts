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
  isMatched: boolean;       // マッチしたかどうか
  matchId?: string;         // マッチID（マッチした場合）
}

/**
 * リアクションを送信するユースケース
 * 
 * フロー:
 * 1. リアクション制限チェック（制限超過時はエラースロー）
 * 2. ローディング開始
 * 3. サービス層でリアクション送信
 * 4. リアクション情報をストアに追加
 * 5. マッチした場合はマッチ情報も追加
 * 6. 使用回数を更新
 * 7. エラー時は呼び出し元にスロー
 * 
 * @param fromUserId - リアクションを送信するユーザーID
 * @param data - リアクションデータ（対象ユーザー・種類）
 * @returns リアクション送信結果（マッチ情報）
 * @throws 制限超過またはその他のエラーが発生した場合は例外をスロー
 */
export const sendReaction = async (fromUserId: string, data: SendReactionData): Promise<SendReactionResult> => {
  const { toUserId, type } = data;
  const store = reactionsStore.getState();

  try {
    // リアクション制限チェック
    if (type === 'like' && !store.canSendLike()) {
      throw new Error('本日のいいね上限に達しています');
    }

    // 自分自身にリアクション禁止
    if (fromUserId === toUserId) {
      throw new Error('自分自身にリアクションはできません');
    }

    // ローディング開始
    store.setLoading(true);

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

    store.addSentReaction(reaction);

    // マッチした場合はマッチ情報も追加
    if (result.isMatched && result.matchId) {
      store.addMatch({
        id: result.matchId,
        userId1: fromUserId,
        userId2: toUserId,
        matchedAt: new Date(),
        isActive: true,
      });
    }

    // 使用回数を更新
    if (type === 'like') {
      store.incrementDailyLikes();
    } else if (type === 'super_like') {
      store.incrementSuperLikes();
    }

    return {
      isMatched: result.isMatched,
      matchId: result.matchId
    };

  } catch (error: any) {
    console.error('リアクション送信エラー:', error);
    // エラーを呼び出し元に再スロー
    throw error;
  } finally {
    store.setLoading(false);
  }
};
