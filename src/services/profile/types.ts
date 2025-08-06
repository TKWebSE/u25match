// src/services/profileDetail/types.ts
// 🎯 プロフィール詳細サービスの型定義 - 契約書

export interface ProfileDetail {
  uid: string;                    // ユーザーID
  name: string;                   // ユーザー名
  age: number;                    // 年齢
  location: string;               // 居住地
  lastActiveAt: Date;             // 最終アクティブ時刻
  isOnline: boolean;              // オンライン状態
  likeCount: number;              // いいね数
  bio: string;                    // 自己紹介
  images: string[];               // プロフィール画像URL配列
  tags: Array<{                   // 興味タグ配列
    id: string;
    name: string;
    imageUrl: string;
  }>;
  details: {                      // 詳細情報
    height: number;
    occupation: string;
    education: string;
    interests: string[];
    languages: string[];
    smoking: boolean;
    drinking: string;
    relationshipGoal: string;
  };
  isVerified?: boolean;           // 本人確認済みフラグ
  isEditable?: boolean;           // 編集可能フラグ
  createdAt?: Date;               // 作成日時
  updatedAt?: Date;               // 更新日時
}

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

  // ユニークIDでプロフィール詳細を取得
  getProfileDetailByUniqueId(uniqueId: string): Promise<ProfileDetailResponse>;

  // プロフィール詳細を更新
  updateProfileDetail(uid: string, data: Partial<ProfileDetail>): Promise<ProfileDetailResponse>;

  // いいねを送信
  sendLike(uid: string): Promise<{ success: boolean; error?: string }>;
} 
