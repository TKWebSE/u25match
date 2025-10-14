// src/usecases/reactions/getMatches.ts
// マッチ取得のユースケース - マッチ一覧取得・管理処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { Match, reactionsStore } from '@stores/reactionsStore';

/**
 * マッチ取得処理の結果
 */
export interface GetMatchesResult {
  matches: Match[];         // マッチ一覧
}

/**
 * マッチ一覧を取得するユースケース
 * 
 * フロー:
 * 1. ローディング開始
 * 2. サービス層でマッチ取得
 * 3. マッチ情報をストアに設定
 * 4. アクティブ・非アクティブの整理
 * 5. エラー時は呼び出し元にスロー
 * 
 * @param userId - 対象のユーザーID
 * @returns マッチ取得結果（マッチ一覧）
 * @throws エラーが発生した場合は例外をスロー
 */
export const getMatches = async (userId: string): Promise<GetMatchesResult> => {
  const store = reactionsStore.getState();

  try {
    // ローディング開始
    store.setLoading(true);

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
    store.setMatches(sortedMatches);

    return {
      matches: sortedMatches
    };

  } catch (error: any) {
    console.error('マッチ取得エラー:', error);
    // エラーを呼び出し元に再スロー
    throw error;
  } finally {
    store.setLoading(false);
  }
};
