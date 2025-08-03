// src/services/profileDetail/prod.ts
// 🌐 プロフィール詳細サービスの本番実装

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
   * 実際のAPIからプロフィール情報を取得
   * @param uid 取得したいユーザーのID
   * @returns プロフィール詳細データ
   */
  async getProfileDetail(uid: string): Promise<ProfileDetailResponse> {
    try {
      const response = await fetch(`/api/profile/${uid}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * ✏️ プロフィール詳細を更新（本番）
   * 実際のAPIでプロフィール情報を更新
   * @param uid 更新したいユーザーのID
   * @param data 更新したいデータ
   * @returns 更新後のプロフィール詳細データ
   */
  async updateProfileDetail(uid: string, data: Partial<ProfileDetail>): Promise<ProfileDetailResponse> {
    try {
      const response = await fetch(`/api/profile/${uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.statusText}`);
      }

      const updatedData = await response.json();
      return {
        success: true,
        data: updatedData,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * ❤️ いいねを送信（本番）
   * 実際のAPIでいいねを送信
   * @param uid いいねを送信したいユーザーのID
   * @returns 送信結果
   */
  async sendLike(uid: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`/api/profile/${uid}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to send like: ${response.statusText}`);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
} 
