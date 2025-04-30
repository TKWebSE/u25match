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
   * 🔍 ユニークIDでプロフィール詳細を取得（モック）
   * @param uniqueId ユニークID
   * @returns プロフィール詳細
   */
  async getProfileDetailByUniqueId(uniqueId: string): Promise<ProfileDetailResponse> {
    await this.simulateNetworkDelay();

    // ユニークIDに基づいてプロフィールを返す
    // 実際の実装ではデータベースから検索する
    if (uniqueId.includes('tanakahana')) {
      return {
        success: true,
        data: myProfileMock,
      };
    } else if (uniqueId.includes('sakura')) {
      return {
        success: true,
        data: mockProfileUser,
      };
    } else if (uniqueId.includes('nobuo')) {
      // のぶおさんのプロフィール
      return {
        success: true,
        data: {
          ...mockProfileUser,
          uid: 'nobuo-user-id',
          name: 'のぶお',
          age: 32,
          location: '大阪府',
          isOnline: false,
          lastActiveAt: new Date('2025-01-20T10:30:00Z'),
          likeCount: 89,
          bio: '大阪でエンジニアをしています。趣味は釣りとカメラです。',
          images: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
          ],
          tags: [
            { id: '1', name: '釣り', imageUrl: 'src/assets/mock-assets/tag-images/cat.jpg' },
            { id: '2', name: 'カメラ', imageUrl: 'src/assets/mock-assets/tag-images/coffee.jpg' },
            { id: '3', name: 'エンジニア', imageUrl: 'src/assets/mock-assets/tag-images/game.jpg' },
          ],
          details: {
            height: 175,
            occupation: 'エンジニア',
            education: '大学卒業',
            interests: ['釣り', 'カメラ', 'プログラミング'],
            languages: ['日本語', '英語'],
            smoking: false,
            drinking: '時々',
            relationshipGoal: '真剣な関係を築きたい',
          },
          isVerified: false,
        },
      };
    } else {
      // デフォルトは自分のプロフィール
      return {
        success: true,
        data: myProfileMock,
      };
    }
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
   * ❤️ いいねを送信（モック）
   * @param uid 対象ユーザーID
   * @returns いいね送信結果
   */
  async sendLike(uid: string): Promise<{ success: boolean; error?: string }> {
    await this.simulateNetworkDelay();
    return { success: true };
  }
} 
