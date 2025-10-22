// src/services/main/reactions/prod.ts
// 🌐 リアクションサービスの本番実装

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { GetReactionsResponse, Reaction, ReactionsService } from './types';

export class ProdReactionsService implements ReactionsService {
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
      // 並列で2つのクエリを実行
      const [likesSnapshot, viewHistorySnapshot] = await Promise.all([
        // 1. 受信したいいねを取得（サブコレクション）
        getDocs(collection(db, 'users', userId, 'receivedLikes')),

        // 2. 足跡を取得（viewHistoryコレクションから自分が見られた記録）
        getDocs(query(
          collection(db, 'viewHistory'),
          where('viewedUserId', '==', userId)
        ))
      ]);

      // いいねデータを処理
      const likes: Reaction[] = [];
      likesSnapshot.forEach((doc) => {
        const data = doc.data();
        likes.push({
          id: doc.id,
          fromUserId: data.fromUserId,
          toUserId: userId,
          timestamp: data.timestamp?.toDate?.() || new Date(data.timestamp),
        });
      });

      // 足跡データを処理
      const footprints: Reaction[] = [];
      viewHistorySnapshot.forEach((doc) => {
        const data = doc.data();
        footprints.push({
          id: doc.id,
          fromUserId: data.viewerId,
          toUserId: userId,
          timestamp: data.viewedAt?.toDate?.() || new Date(data.viewedAt),
        });
      });

      return {
        reactions: {
          likes,
          footprints,
        }
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'リアクション取得に失敗しました'
      );
    }
  }
} 
