// src/services/profileDetail/types.ts
// 🎯 プロフィール詳細サービスの型定義 - 契約書

import { FirestoreUser } from '@my-types/firestore';

/**
 * プロフィール詳細の型
 * FirestoreUserと同じ構造（エイリアス）
 */
export type ProfileDetail = FirestoreUser;

export interface ProfileDetailResponse {
  success: boolean;      // 処理が成功したかどうか
  data?: ProfileDetail;  // 成功時のデータ
  error?: string;        // エラー時のメッセージ
}

/**
 * 🎯 プロフィール詳細サービスのインターフェース
 * どんな実装も必ずこの機能を提供する約束
 */
export interface ProfileDetailService {
  // モックモードの切り替え
  setMockMode(enabled: boolean): void;

  // 現在のモードを確認
  isMockMode(): boolean;

  // プロフィール詳細を取得
  getProfileDetail(uid: string): Promise<ProfileDetailResponse>;

  // プロフィール詳細を更新
  updateProfileDetail(uid: string, data: Partial<ProfileDetail>): Promise<ProfileDetailResponse>;

  // プロフィール画像をアップロード
  uploadProfileImage(uid: string, file: File, imageIndex: number): Promise<{ imageUrl: string }>;

  // いいねを送信
  sendLike(uid: string): Promise<{ success: boolean; error?: string }>;

  // いいね済みかチェック
  checkIfLiked(currentUserId: string, targetUserId: string): Promise<boolean>;
} 
