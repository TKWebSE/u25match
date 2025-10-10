// src/services/viewHistory/prod.ts
// 閲覧履歴サービスの本番実装 - Firestoreへのバッチ書き込み

import { collection, doc, getFirestore, writeBatch } from 'firebase/firestore';
import { ViewHistoryService, ViewedProfile } from './types';

export class ProdViewHistoryService implements ViewHistoryService {
  private db = getFirestore();

  /**
   * 閲覧履歴をFirestoreにバッチ保存
   * 
   * クライアント側でキャッシュされた閲覧履歴を
   * まとめてFirestoreに書き込むことでDB負荷を軽減
   * 
   * @param views 閲覧履歴の配列（viewerId, targetId, viewedAt）
   */
  async saveBatch(views: ViewedProfile[]): Promise<void> {
    const batch = writeBatch(this.db);
    const viewHistoryRef = collection(this.db, 'viewHistory');

    // 各閲覧履歴をバッチに追加
    views.forEach((view) => {
      const docRef = doc(viewHistoryRef);
      batch.set(docRef, {
        viewerId: view.viewerId,      // 閲覧したユーザー
        targetId: view.targetId,      // 閲覧されたユーザー
        viewedAt: view.viewedAt,      // タイムスタンプ（ミリ秒）
        createdAt: new Date(view.viewedAt), // Firestore用のDate型
      });
    });

    // 一括でFirestoreに書き込み
    await batch.commit();
  }
}

