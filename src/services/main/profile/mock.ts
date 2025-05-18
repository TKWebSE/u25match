// src/services/profileDetail/mock.ts
// 🎭 プロフィール詳細サービスのモック実装

import { mockProfileUser } from '@mock/profileDetailMock';
import { BaseService } from '../../base/BaseService';
import { ProfileDetail, ProfileDetailResponse, ProfileDetailService } from './types';

export class MockProfileDetailService extends BaseService implements ProfileDetailService {
  private useMock: boolean = true;  // モックモードのフラグ

  /**
   * 🔄 モックモードを切り替え
   * 開発時はモックデータ、本番時は実際のAPIを使用
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
   * 指定されたユーザーIDのプロフィール情報を取得
   * @param uid 取得したいユーザーのID
   * @returns プロフィール詳細データ（統一されたレスポンス形式）
   */
  async getProfileDetail(uid: string): Promise<ProfileDetailResponse> {
    // 🎭 モックモード: 開発用のダミーデータを返す
    await this.simulateNetworkDelay();
    return {
      success: true,
      data: {
        ...mockProfileUser,
        uid,  // 渡されたuidを使用
      },
    };
  }

  /**
   * 🔍 ユニークIDでプロフィール詳細を取得（モック）
   * 指定されたユニークIDのプロフィール情報を取得
   * @param uniqueId 取得したいユーザーのユニークID
   * @returns プロフィール詳細データ（統一されたレスポンス形式）
   */
  async getProfileDetailByUniqueId(uniqueId: string): Promise<ProfileDetailResponse> {
    // 🎭 モックモード: 開発用のダミーデータを返す
    await this.simulateNetworkDelay();
    return {
      success: true,
      data: {
        ...mockProfileUser,
        uid: uniqueId,  // 渡されたuniqueIdを使用
      },
    };
  }

  /**
   * ✏️ プロフィール詳細を更新（モック）
   * 指定されたユーザーのプロフィール情報を更新
   * @param uid 更新したいユーザーのID
   * @param data 更新したいデータ（部分的な更新が可能）
   * @returns 更新後のプロフィール詳細データ
   */
  async updateProfileDetail(uid: string, data: Partial<ProfileDetail>): Promise<ProfileDetailResponse> {
    // 🎭 モックモード: ダミーデータで更新をシミュレート
    await this.simulateNetworkDelay();
    return {
      success: true,
      data: {
        ...mockProfileUser,
        ...data,  // 新しいデータで上書き
        uid,
      },
    };
  }

  /**
   * ❤️ いいねを送信（モック）
   * 指定されたユーザーにいいねを送信
   * @param uid いいねを送信したいユーザーのID
   * @returns 送信結果（成功/失敗）
   */
  async sendLike(uid: string): Promise<{ success: boolean; error?: string }> {
    // 🎭 モックモード: いいね送信をシミュレート
    await this.simulateNetworkDelay();
    return { success: true };
  }
} 
