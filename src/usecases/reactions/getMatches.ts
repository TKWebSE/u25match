// src/usecases/reactions/getMatches.ts
// マッチ取得のユースケース - マッチ一覧取得・管理処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { Match, reactionsStore } from '@stores/reactionsStore';

/**
 * マッチ取得処理の結果
 */
export interface GetMatchesResult {
  success: boolean;          // 取得成功フラグ
  matches?: Match[];         // マッチ一覧（成功時）
  error?: string;            // エラーメッセージ（失敗時のみ）
}

/**
 * マッチ一覧を取得するユースケース
 * 
 * フロー:
 * 1. ローディング開始・エラークリア
 * 2. サービス層でマッチ取得
 * 3. マッチ情報をストアに設定
 * 4. アクティブ・非アクティブの整理
 * 5. 結果をUIに返却
 * 
 * @param userId - 対象のユーザーID
 * @returns マッチ取得結果（成功/失敗・マッチ一覧・エラー）
 */
export const getMatches = async (userId: string): Promise<GetMatchesResult> => {
  try {
    // ローディング開始・エラークリア
    reactionsStore.getState().setLoading(true);
    reactionsStore.getState().clearError();

    // サービス層でマッチ取得
    const result = await serviceRegistry.reactions.getMatches(userId);

    // データ変換
    const matches: Match[] = result.matches.map(m => ({
      id: m.id,
      userId1: m.userId1,
      userId2: m.userId2,
      matchedAt: new Date(m.matchedAt),
      isActive: m.isActive,
      lastActivity: m.lastActivity ? new Date(m.lastActivity) : undefined,
    }));

    // 最終活動日時でソート（新しい順）
    const sortedMatches = matches.sort((a, b) => {
      const aTime = a.lastActivity || a.matchedAt;
      const bTime = b.lastActivity || b.matchedAt;
      return bTime.getTime() - aTime.getTime();
    });

    // マッチ情報をストアに設定
    reactionsStore.getState().setMatches(sortedMatches);

    reactionsStore.getState().setLoading(false);

    return {
      success: true,
      matches: sortedMatches
    };

  } catch (error: any) {
    console.error('マッチ取得エラー:', error);

    // エラー処理（ストアにエラー情報を設定）
    reactionsStore.getState().setLoading(false);
    reactionsStore.getState().setError(error.message || 'マッチの取得に失敗しました');

    // UIに結果を返却
    return {
      success: false,
      error: error.message || 'マッチの取得に失敗しました'
    };
  }
};
