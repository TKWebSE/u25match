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
        throw new Error('ユーザーが見つかりません');
      }

      const userData = userDoc.data();

      return {
        success: true,
        data: userData as ProfileDetail,
      };
    } catch (error: any) {
      throw new Error(error.message || 'プロフィール詳細の取得に失敗しました');
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
    } catch (error: any) {
      throw new Error(error.message || 'プロフィール詳細の更新に失敗しました');
    }
  }

  /**
   * 📷 プロフィール画像をアップロード（本番）
   * Firebase Storageに画像をアップロード
   * @param uid ユーザーID
   * @param file アップロードファイル
   * @param imageIndex 画像インデックス
   * @returns アップロード結果
   */
  async uploadProfileImage(uid: string, file: File, imageIndex: number): Promise<{ imageUrl: string }> {
    // TODO: Firebase Storageへのアップロード実装
    throw new Error('画像アップロード機能は未実装です');
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
    } catch (error: any) {
      throw new Error(error.message || 'いいねの送信に失敗しました');
    }
  }
} 
