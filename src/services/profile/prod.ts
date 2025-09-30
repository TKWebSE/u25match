// src/services/profileDetail/prod.ts
// 🌐 プロフィール詳細サービスの本番実装

import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { ProfileDetail, ProfileDetailResponse, ProfileDetailService } from './types';

export class ProdProfileDetailService implements ProfileDetailService {
  private useMock: boolean = false;  // 本番モードのフラグ

  /**
   * 🔄 モックモードを切り替え
   * 本番環境では常にfalse
   * @param enabled true: モックモード、false: 本番モード
   */
  setMockMode(enabled: boolean): void {
    this.useMock = enabled;
  }

  /**
   * 🔍 現在のモードを確認
   * @returns true: モックモード、false: 本番モード
   */
  isMockMode(): boolean {
    return this.useMock;
  }

  /**
   * 👤 プロフィール詳細を取得（本番）
   * Firebaseからプロフィール情報を取得
   * @param uid 取得したいユーザーのID
   * @returns プロフィール詳細データ
   */
  async getProfileDetail(uid: string): Promise<ProfileDetailResponse> {
    try {

      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        return {
          success: false,
          error: 'ユーザーが見つかりません',
        };
      }

      const userData = userDoc.data();

      return {
        success: true,
        data: userData as ProfileDetail,
      };
    } catch (error) {
      console.error('💥 Firebaseプロフィール詳細取得エラー:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * 👤 ユニークIDでプロフィール詳細を取得（本番）
   * FirebaseからユニークIDでプロフィール情報を取得
   * @param uniqueId 取得したいユーザーのユニークID
   * @returns プロフィール詳細データ
   */
  async getProfileDetailByUniqueId(uniqueId: string): Promise<ProfileDetailResponse> {
    try {

      // TODO: ユニークIDでユーザーを検索する実装
      // 現在はuidベースの検索のみ実装されているため、一時的にエラーを返す
      return {
        success: false,
        error: 'ユニークID検索は未実装です',
      };
    } catch (error) {
      console.error('💥 FirebaseユニークID検索エラー:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * ✏️ プロフィール詳細を更新（本番）
   * Firebaseでプロフィール情報を更新
   * @param uid 更新したいユーザーのID
   * @param data 更新したいデータ
   * @returns 更新後のプロフィール詳細データ
   */
  async updateProfileDetail(uid: string, data: Partial<ProfileDetail>): Promise<ProfileDetailResponse> {
    try {

      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, data);

      // 更新後のデータを取得
      const updatedDoc = await getDoc(userDocRef);
      const updatedData = updatedDoc.data();


      return {
        success: true,
        data: updatedData as ProfileDetail,
      };
    } catch (error) {
      console.error('💥 Firebaseプロフィール詳細更新エラー:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * ❤️ いいねを送信（本番）
   * Firebaseでいいねを送信
   * @param uid いいねを送信したいユーザーのID
   * @returns 送信結果
   */
  async sendLike(uid: string): Promise<{ success: boolean; error?: string }> {
    try {

      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, {
        likeCount: increment(1)
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
} 
