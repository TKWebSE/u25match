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
    height: number;               // 身長（必須）
    weight?: number;              // 体重（オプション）
    bodyType?: string;            // 体型（オプション）
    bloodType?: string;           // 血液型（オプション）
    hometown?: string;            // 出身地（オプション）
    occupation: string;           // 職業（必須）
    education: string;            // 学歴（必須）
    income?: string;              // 年収（オプション）
    familyStructure?: string;     // 同居人（オプション）
    pets?: string[];              // ペット（オプション）
    languages: string[];          // 言語（必須）
    smoking: boolean;             // タバコ（必須）
    drinking: string;             // お酒（必須）
    children?: string;            // 子供（オプション）
    travelPreferences?: ('土日' | '平日' | '不定期')[]; // 休日（オプション）
    sleepSchedule?: string;       // 寝る時間（オプション）
    marriageTimeline?: string;    // 結婚予定（オプション）
    marriageViews?: string;       // 結婚観（オプション）
    livingTogether?: string;      // 同居希望（オプション）
    marriageHistory?: string;     // 結婚歴（オプション）
    marriageIntention?: string;   // 結婚の意思（オプション）
    wantChildren?: string;        // 子供が欲しいか（オプション）
  };
  isVerified?: boolean;           // 本人確認済みフラグ
  isEditable?: boolean;           // 編集可能フラグ
  remainingLikes?: number;        // 残いいね数
  remainingBoosts?: number;       // 残ブースト数
  remainingPoints?: number;       // 残ポイント数
  membershipType?: 'free' | 'premium'; // 会員種別
  planName?: string;              // プラン名
  membershipExpiryDate?: string;  // 会員有効期限（YYYY-MM-DD形式）
  membershipStartDate?: string;   // 会員開始日（YYYY-MM-DD形式）
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
