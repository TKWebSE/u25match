// src/services/profileDetailService.ts
import { mockProfileUser } from '@mock/profileDetailMock';

export interface ProfileDetail {
  uid: string;
  name: string;
  age: number;
  lastActiveAt: Date;
  likeCount: number;
  bio: string;
  images: string[];
  tags: string[];
  details: Record<string, string>;
}

export interface ProfileDetailResponse {
  success: boolean;
  data?: ProfileDetail;
  error?: string;
}

class ProfileDetailService {
  private useMock: boolean = true; // デフォルトでモックを使用

  /**
   * モックモードを切り替える
   */
  setMockMode(enabled: boolean) {
    this.useMock = enabled;
  }

  /**
   * モックモードかどうかを確認
   */
  isMockMode(): boolean {
    return this.useMock;
  }

  /**
   * プロフィール詳細を取得
   */
  async getProfileDetail(uid: string): Promise<ProfileDetailResponse> {
    try {
      if (this.useMock) {
        // モックデータを使用
        await this.simulateNetworkDelay();
        return {
          success: true,
          data: {
            ...mockProfileUser,
            uid, // 渡されたuidを使用
          },
        };
      } else {
        // 実際のAPIを呼び出し
        return await this.fetchFromAPI(uid);
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * プロフィール詳細を更新
   */
  async updateProfileDetail(uid: string, data: Partial<ProfileDetail>): Promise<ProfileDetailResponse> {
    try {
      if (this.useMock) {
        // モックデータを使用
        await this.simulateNetworkDelay();
        return {
          success: true,
          data: {
            ...mockProfileUser,
            ...data,
            uid,
          },
        };
      } else {
        // 実際のAPIを呼び出し
        return await this.updateFromAPI(uid, data);
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * いいねを送信
   */
  async sendLike(uid: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (this.useMock) {
        // モックデータを使用
        await this.simulateNetworkDelay();
        return { success: true };
      } else {
        // 実際のAPIを呼び出し
        return await this.sendLikeToAPI(uid);
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * ネットワーク遅延をシミュレート
   */
  private async simulateNetworkDelay(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, Math.random() * 1000 + 500); // 500-1500ms
    });
  }

  /**
   * 実際のAPIからプロフィール詳細を取得
   */
  private async fetchFromAPI(uid: string): Promise<ProfileDetailResponse> {
    // TODO: 実際のAPIエンドポイントに置き換え
    const response = await fetch(`/api/profile/${uid}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  }

  /**
   * 実際のAPIでプロフィール詳細を更新
   */
  private async updateFromAPI(uid: string, data: Partial<ProfileDetail>): Promise<ProfileDetailResponse> {
    // TODO: 実際のAPIエンドポイントに置き換え
    const response = await fetch(`/api/profile/${uid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedData = await response.json();
    return {
      success: true,
      data: updatedData,
    };
  }

  /**
   * 実際のAPIでいいねを送信
   */
  private async sendLikeToAPI(uid: string): Promise<{ success: boolean; error?: string }> {
    // TODO: 実際のAPIエンドポイントに置き換え
    const response = await fetch(`/api/profile/${uid}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { success: true };
  }
}

// シングルトンインスタンスをエクスポート
export const profileDetailService = new ProfileDetailService(); 
