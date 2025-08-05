// src/services/profile/mock.ts
// 🎭 プロフィールサービスのモック実装

import { mockProfileUser } from '@mock/profileDetailMock';
import { BaseService } from '../base/BaseService';
import { ProfileDetail, ProfileDetailResponse, ProfileDetailService } from './types';

export class MockProfileService extends BaseService implements ProfileDetailService {
  private useMock: boolean = true;  // モックモードのフラグ

  /**
   * 🔄 モックモードを切り替え
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
   * 👤 プロフィール詳細を取得（モック）
   * @param uid ユーザーID
   * @returns プロフィール詳細
   */
  async getProfileDetail(uid: string): Promise<ProfileDetailResponse> {
    await this.simulateNetworkDelay();
    return {
      success: true,
      data: {
        ...mockProfileUser,
        uid, // 渡されたuidで上書き
      },
    };
  }

  /**
   * ✏️ プロフィール詳細を更新（モック）
   * @param uid ユーザーID
   * @param data 更新するプロフィール情報
   * @returns 更新結果
   */
  async updateProfileDetail(uid: string, data: Partial<ProfileDetail>): Promise<ProfileDetailResponse> {
    await this.simulateNetworkDelay();
    return {
      success: true,
      data: {
        ...mockProfileUser,
        ...data,
        uid,
      },
    };
  }

  /**
   * ❤️ いいねを送信（モック）
   * @param uid 対象ユーザーID
   * @returns いいね送信結果
   */
  async sendLike(uid: string): Promise<{ success: boolean; error?: string }> {
    await this.simulateNetworkDelay();
    return { success: true };
  }
} 
