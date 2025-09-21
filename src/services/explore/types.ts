// src/services/main/explore/types.ts
// 🎯 探索サービスの型定義 - 契約書

export interface UserRecommendation {
  uid: string;
  name: string;
  age: number;
  bio: string;
  images: string[];
  tags: string[];
  distance: number;
  compatibility: number;
}

export interface SearchResult {
  users: UserRecommendation[];
  total: number;
  hasMore: boolean;
}

export interface ExploreResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * 🎯 探索サービスのインターフェース
 * どんな実装も必ずこの機能を提供する約束
 */
export interface ExploreService {
  // ユーザーを検索
  searchUsers(query: string): Promise<ExploreResponse>;

  // おすすめユーザーを取得
  getRecommendedUsers(userId: string): Promise<ExploreResponse>;

  // 近くのユーザーを取得
  getNearbyUsers(location: { lat: number; lng: number }): Promise<ExploreResponse>;

  // ユーザー一覧を取得
  getUserList(params: { page: number; limit: number; filters?: any }): Promise<{ users: UserRecommendation[]; hasMore: boolean }>;
} 
