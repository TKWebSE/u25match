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
  success: boolean;          // 解除成功フラグ
  error?: string;            // エラーメッセージ（失敗時のみ）
}

/**
 * マッチを解除するユースケース
 * 
 * フロー:
 * 1. マッチ存在確認
 * 2. ローディング開始・エラークリア
 * 3. サービス層でマッチ解除
 * 4. ストアからマッチを削除
 * 5. 関連するリアクションも更新
 * 6. 結果をUIに返却
 * 
 * @param userId - 解除を実行するユーザーID
 * @param data - マッチ解除データ（マッチID・理由）
 * @returns マッチ解除結果（成功/失敗・エラー）
 */
export const unmatch = async (userId: string, data: UnmatchData): Promise<UnmatchResult> => {
  const { matchId, reason } = data;

  try {
    // マッチ存在確認
    const currentMatches = reactionsStore.getState().matches;
    const targetMatch = currentMatches.find(m => m.id === matchId);

    if (!targetMatch) {
      return {
        success: false,
        error: '指定されたマッチが見つかりません'
      };
    }

    // ユーザーがマッチの当事者か確認
    if (targetMatch.userId1 !== userId && targetMatch.userId2 !== userId) {
      return {
        success: false,
        error: 'このマッチを解除する権限がありません'
      };
    }

    // ローディング開始・エラークリア
    reactionsStore.getState().setLoading(true);
    reactionsStore.getState().clearError();

    // サービス層でマッチ解除
    await serviceRegistry.reactions.unmatch({
      matchId,
      userId,
      reason,
    });

    // ストアからマッチを削除
    reactionsStore.getState().removeMatch(matchId);

    // 関連するリアクションのマッチ状態も更新
    const sentReactions = reactionsStore.getState().sentReactions;
    const updatedSentReactions = sentReactions.map(r => {
      const otherUserId = targetMatch.userId1 === userId ? targetMatch.userId2 : targetMatch.userId1;
      if (r.toUserId === otherUserId && r.isMatched) {
        return { ...r, isMatched: false };
      }
      return r;
    });
    reactionsStore.getState().setSentReactions(updatedSentReactions);

    const receivedReactions = reactionsStore.getState().receivedReactions;
    const updatedReceivedReactions = receivedReactions.map(r => {
      const otherUserId = targetMatch.userId1 === userId ? targetMatch.userId2 : targetMatch.userId1;
      if (r.fromUserId === otherUserId && r.isMatched) {
        return { ...r, isMatched: false };
      }
      return r;
    });
    reactionsStore.getState().setReceivedReactions(updatedReceivedReactions);

    reactionsStore.getState().setLoading(false);

    return { success: true };

  } catch (error: any) {
    console.error('マッチ解除エラー:', error);

    // エラー処理（ストアにエラー情報を設定）
    reactionsStore.getState().setLoading(false);
    reactionsStore.getState().setError(error.message || 'マッチの解除に失敗しました');

    // UIに結果を返却
    return {
      success: false,
      error: error.message || 'マッチの解除に失敗しました'
    };
  }
};
