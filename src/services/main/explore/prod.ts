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
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
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
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
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
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
} 
