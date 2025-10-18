// src/services/main/reactions/prod.ts
// 🌐 リアクションサービスの本番実装

import { collection, doc, getDocs, query, serverTimestamp, where, writeBatch } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { GetReactionsResponse, Reaction, ReactionsResponse, ReactionsService } from './types';

export class ProdReactionsService implements ReactionsService {
  /**
   * 👣 足あとを残す（本番）
   * viewHistoryコレクションに閲覧記録を保存
   * 
   * @param currentUserId 閲覧者のユーザーID
   * @param targetUserId 閲覧対象のユーザーID
   * @returns 送信結果
   */
  async leaveFootprint(targetUserId: string): Promise<ReactionsResponse> {
    try {
      const viewHistoryRef = collection(db, 'viewHistory');
      const docRef = doc(viewHistoryRef);

      const batch = writeBatch(db);
      batch.set(docRef, {
        viewerId: 'current_user', // TODO: 実際のログインユーザーIDに置き換え
        viewedUserId: targetUserId,
        viewedAt: serverTimestamp(),
      });

      await batch.commit();

      return {
        success: true,
        data: { id: docRef.id },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * 📋 リアクション履歴を取得（本番）
   * 受信したいいねと足跡の一覧を取得
   * 
   * フロー:
   * 1. users/{userId}/receivedLikes サブコレクションからいいねを取得
   * 2. viewHistory コレクションから自分が閲覧された記録（足跡）を取得
   * 3. 両方を統合して返す
   * 
   * @param userId 対象ユーザーID（自分のID）
   * @returns 受信したリアクション一覧（いいね・足跡）
   */
  async getReactions(userId: string): Promise<GetReactionsResponse> {
    try {
      const receivedReactions: Reaction[] = [];

      // 1. 受信したいいねを取得（サブコレクション）
      const receivedLikesRef = collection(db, 'users', userId, 'receivedLikes');
      const likesSnapshot = await getDocs(receivedLikesRef);

      likesSnapshot.forEach((doc) => {
        const data = doc.data();
        receivedReactions.push({
          id: doc.id,
          fromUserId: data.fromUserId,
          toUserId: userId,
          type: 'like',
          timestamp: data.timestamp?.toDate?.() || new Date(data.timestamp),
        });
      });

      // 2. 足跡を取得（viewHistoryコレクションから自分が見られた記録）
      const viewHistoryRef = collection(db, 'viewHistory');
      const viewHistoryQuery = query(
        viewHistoryRef,
        where('viewedUserId', '==', userId)
      );
      const viewHistorySnapshot = await getDocs(viewHistoryQuery);

      viewHistorySnapshot.forEach((doc) => {
        const data = doc.data();
        receivedReactions.push({
          id: doc.id,
          fromUserId: data.viewerId,
          toUserId: userId,
          type: 'footprint',
          timestamp: data.viewedAt?.toDate?.() || new Date(data.viewedAt),
        });
      });

      // タイムスタンプでソート（新しい順）
      receivedReactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

      return {
        received: receivedReactions,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'リアクション取得に失敗しました'
      );
    }
  }
} 
