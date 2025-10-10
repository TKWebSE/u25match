// src/services/profile/mock.ts
// 🎭 プロフィールサービスのモック実装

import { myProfileMock } from '@mock/myProfileMock';
import { mockProfileUser } from '@mock/profileDetailMock';
import { BaseService } from '../core/BaseService';
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

    // 自分のプロフィールかどうかを判定
    const isMyProfile = uid === 'my-user-id' || uid === 'current-user';

    // 自分のプロフィールの場合は専用モック、それ以外は通常のモック
    const profileData = isMyProfile ? myProfileMock : {
      ...mockProfileUser,
      uid, // 渡されたuidで上書き
    };

    return {
      success: true,
      data: profileData,
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

    // 自分のプロフィールかどうかを判定
    const isMyProfile = uid === 'my-user-id' || uid === 'current-user';

    // 自分のプロフィールの場合は専用モック、それ以外は通常のモック
    const baseData = isMyProfile ? myProfileMock : mockProfileUser;

    return {
      success: true,
      data: {
        ...baseData,
        ...data,
        uid,
      },
    };
  }

  /**
   * 📷 プロフィール画像をアップロード（モック）
   * @param uid ユーザーID
   * @param file アップロードファイル
   * @param imageIndex 画像インデックス
   * @returns アップロード結果
   */
  async uploadProfileImage(uid: string, file: File, imageIndex: number): Promise<{ imageUrl: string }> {
    await this.simulateNetworkDelay();
    return { imageUrl: `https://example.com/profile-images/${uid}/${imageIndex}.jpg` };
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
