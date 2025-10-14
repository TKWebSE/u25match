// src/usecases/reactions/unmatch.ts
// マッチ解除のユースケース - マッチ解除・ブロック処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { reactionsStore } from '@stores/reactionsStore';

/**
 * マッチ解除に必要なデータ
 */
export interface UnmatchData {
  matchId: string;           // マッチID
  reason?: string;           // 解除理由（オプション）
}

/**
 * マッチ解除処理の結果
 */
export interface UnmatchResult {
  // 成功時は何も返さない（void同等）
}

/**
 * マッチを解除するユースケース
 * 
 * フロー:
 * 1. マッチ存在確認（存在しない場合はエラースロー）
 * 2. ローディング開始
 * 3. サービス層でマッチ解除
 * 4. ストアからマッチを削除
 * 5. 関連するリアクションも更新
 * 6. エラー時は呼び出し元にスロー
 * 
 * @param userId - 解除を実行するユーザーID
 * @param data - マッチ解除データ（マッチID・理由）
 * @returns マッチ解除結果（成功時は空のオブジェクト）
 * @throws マッチが見つからない、権限がない、またはその他のエラーが発生した場合は例外をスロー
 */
export const unmatch = async (userId: string, data: UnmatchData): Promise<UnmatchResult> => {
  const { matchId, reason } = data;
  const store = reactionsStore.getState();

  try {
    // マッチ存在確認
    const currentMatches = store.matches;
    const targetMatch = currentMatches.find(m => m.id === matchId);

    if (!targetMatch) {
      throw new Error('指定されたマッチが見つかりません');
    }

    // ユーザーがマッチの当事者か確認
    if (targetMatch.userId1 !== userId && targetMatch.userId2 !== userId) {
      throw new Error('このマッチを解除する権限がありません');
    }

    // ローディング開始
    store.setLoading(true);

    // サービス層でマッチ解除
    await serviceRegistry.reactions.unmatch({
      matchId,
      userId,
      reason,
    });

    // ストアからマッチを削除
    store.removeMatch(matchId);

    // 関連するリアクションのマッチ状態も更新
    const sentReactions = store.sentReactions;
    const updatedSentReactions = sentReactions.map(r => {
      const otherUserId = targetMatch.userId1 === userId ? targetMatch.userId2 : targetMatch.userId1;
      if (r.toUserId === otherUserId && r.isMatched) {
        return { ...r, isMatched: false };
      }
      return r;
    });
    store.setSentReactions(updatedSentReactions);

    const receivedReactions = store.receivedReactions;
    const updatedReceivedReactions = receivedReactions.map(r => {
      const otherUserId = targetMatch.userId1 === userId ? targetMatch.userId2 : targetMatch.userId1;
      if (r.fromUserId === otherUserId && r.isMatched) {
        return { ...r, isMatched: false };
      }
      return r;
    });
    store.setReceivedReactions(updatedReceivedReactions);

    return {};

  } catch (error: any) {
    console.error('マッチ解除エラー:', error);
    // エラーを呼び出し元に再スロー
    throw error;
  } finally {
    store.setLoading(false);
  }
};
