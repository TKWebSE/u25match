// src/services/main/explore/prod.ts
// 🌐 探索サービスの本番実装

import { ExploreResponse, ExploreService } from './types';

export class ProdExploreService implements ExploreService {
  /**
   * 🔍 ユーザーを検索（本番）
   * @param query 検索クエリ
   * @returns 検索結果
   */
  async searchUsers(query: string): Promise<ExploreResponse> {
    try {
      const response = await fetch(`/api/explore/search?q=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error(`Failed to search users: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error: any) {
      throw new Error(error.message || 'ユーザー検索に失敗しました');
    }
  }

  /**
   * 💡 おすすめユーザーを取得（本番）
   * @param userId ユーザーID
   * @returns おすすめユーザー一覧
   */
  async getRecommendedUsers(userId: string): Promise<ExploreResponse> {
    try {
      const response = await fetch(`/api/explore/recommendations/${userId}`);

      if (!response.ok) {
        throw new Error(`Failed to get recommendations: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error: any) {
      throw new Error(error.message || 'おすすめユーザー取得に失敗しました');
    }
  }

  /**
   * 📍 近くのユーザーを取得（本番）
   * @param location 位置情報
   * @returns 近くのユーザー一覧
   */
  async getNearbyUsers(location: { lat: number; lng: number }): Promise<ExploreResponse> {
    try {
      const response = await fetch('/api/explore/nearby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(location),
      });

      if (!response.ok) {
        throw new Error(`Failed to get nearby users: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error: any) {
      throw new Error(error.message || '近くのユーザー取得に失敗しました');
    }
  }

  /**
   * 📋 ユーザー一覧を取得（本番）
   * @param params ページ・件数・フィルター
   * @returns ユーザー一覧とhasMoreフラグ
   */
  async getUserList(params: { page: number; limit: number; filters?: any }): Promise<{ users: any[]; hasMore: boolean }> {
    try {
      const queryParams = new URLSearchParams({
        page: params.page.toString(),
        limit: params.limit.toString(),
        ...(params.filters && { filters: JSON.stringify(params.filters) }),
      });

      const response = await fetch(`/api/explore/users?${queryParams}`);

      if (!response.ok) {
        throw new Error(`Failed to get user list: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        users: data.users || [],
        hasMore: data.hasMore || false,
      };
    } catch (error: any) {
      throw new Error(error.message || 'ユーザー一覧の取得に失敗しました');
    }
  }
} 
