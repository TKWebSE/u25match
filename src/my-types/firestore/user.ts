// src/my-types/firestore/user.ts
// Firestoreのユーザー情報の型定義

/**
 * Firestoreに保存されるユーザープロフィール情報（完全版）
 * 
 * 保存場所: users/{uid}
 * 
 * サブコレクション:
 * - sentLikes/{targetUserId} - 送信したいいね（FirestoreSentLike）
 * - receivedLikes/{fromUserId} - 受信したいいね（FirestoreReceivedLike）
 * 
 * 用途:
 * - Firestoreとのデータのやり取り（サービス層）
 * - プロフィール詳細画面（全情報が必要）
 * - プロフィール編集画面（全フィールドにアクセス）
 * - profileStoreでの状態管理
 * 
 * 注意:
 * - サブコレクションは自動取得されません（別途アクセスが必要）
 * - 軽量な表示のみの場合は @my-types/app/search の User を使用してください
 */
export interface FirestoreUser {
  uid: string;                    // ユーザーID
  name: string;                   // ユーザー名
  gender: 'male' | 'female' | 'other'; // 性別（必須）
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
  remainingLikes?: number;        // 残いいね数
  remainingBoosts?: number;       // 残ブースト数
  remainingPoints?: number;       // 残ポイント数
  membershipType?: 'free' | 'premium' | 'vip' | 'admin'; // 会員種別
  createdAt?: Date;               // 作成日時
  updatedAt?: Date;               // 更新日時
}

