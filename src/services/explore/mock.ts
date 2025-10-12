// src/services/main/explore/mock.ts
// 🎭 探索サービスのモック実装

import { ExploreTabType } from '@constants/exploreTabs';
import { reactionUsers, tabUsers } from '@mock/exploreUserMock';
import { BaseService } from '../core/BaseService';
import { ExploreResponse, ExploreService } from './types';

export class MockExploreService extends BaseService implements ExploreService {
  /**
   * 🔍 ユーザーを検索（モック）
   * @param query 検索クエリ
   * @returns 検索結果
   */
  async searchUsers(query: string): Promise<ExploreResponse> {
    await this.simulateNetworkDelay();
    // クエリに基づいてモックデータをフィルタリング
    const filteredUsers = reactionUsers.filter(user =>
      user.name.includes(query) || user.location.includes(query)
    );
    return {
      success: true,
      data: {
        users: filteredUsers,
        total: filteredUsers.length,
        hasMore: false,
      },
    };
  }

  /**
   * 💡 おすすめユーザーを取得（モック）
   * @param userId ユーザーID
   * @returns おすすめユーザー一覧
   */
  async getRecommendedUsers(userId: string): Promise<ExploreResponse> {
    await this.simulateNetworkDelay();
    // モックデータから上位の相性スコアを持つユーザーを返す
    const recommendedUsers = reactionUsers
      .filter(user => user.name !== userId)
      .slice(0, 3);
    return {
      success: true,
      data: {
        users: recommendedUsers,
        total: recommendedUsers.length,
        hasMore: false,
      },
    };
  }

  /**
   * 📍 近くのユーザーを取得（モック）
   * @param location 位置情報
   * @returns 近くのユーザー一覧
   */
  async getNearbyUsers(location: { lat: number; lng: number }): Promise<ExploreResponse> {
    await this.simulateNetworkDelay();
    // 距離が近いユーザーを返す
    const nearbyUsers = reactionUsers.slice(0, 5);
    return {
      success: true,
      data: {
        users: nearbyUsers,
        total: nearbyUsers.length,
        hasMore: false,
      },
    };
  }

  /**
   * 📋 ユーザー一覧を取得（モック）
   * @param params 件数・フィルター
   * @returns ユーザー一覧とhasMoreフラグ
   */
  async getUserList(params: { limit: number; filters?: any }): Promise<{ users: any[]; hasMore: boolean }> {
    await this.simulateNetworkDelay();
    const { limit, filters } = params;

    // フィルターでタブが指定されている場合はタブ別データを返す(0からlimitまでのtoDataを返す)
    if (filters?.tab && filters.tab in tabUsers) {
      const tabType = filters.tab as ExploreTabType;
      const tabData = tabUsers[tabType];
      const users = tabData.slice(0, limit);
      return { users, hasMore: false };
    }

    // フィルターがない場合は従来通りreactionUsersを返す
    const users = reactionUsers.slice(0, limit);
    return { users, hasMore: false };
  }
} 
