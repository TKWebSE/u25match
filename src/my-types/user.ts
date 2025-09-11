import { User as FirebaseUser } from 'firebase/auth';

/**
 * アプリ内で使用するユーザー型（既存）
 */
export interface User {
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline: boolean;
  lastActiveAt: Date;
}

/**
 * 認証専用のシンプルなユーザー型
 * 
 * この型は認証に必要な最小限の情報のみを含みます：
 * - Firebase Authから取得できる基本情報（uid, email）
 * - Firestoreから取得するプロフィール情報（displayName, photoURL）
 * - 認証状態の管理に必要な情報のみ
 */
export interface AuthUser {
  /** ユーザーの一意識別子（Firebase Authから取得） */
  uid: string;
  /** ユーザーのメールアドレス（Firebase Authから取得） */
  email: string | null;
  /** ユーザーの表示名（Firestoreから取得、初期はnull） */
  displayName: string | null;
  /** ユーザーのプロフィール画像URL（Firestoreから取得、初期はnull） */
  photoURL: string | null;
}

/**
 * プロフィール専用のユーザー型
 * 
 * この型はプロフィール情報に特化した情報を含みます：
 * - 年齢、出身地、認証状態など
 * - 認証とは独立した情報
 * - 残いいね数、残ブースト数、残ポイント数など
 */
export interface ProfileUser {
  /** ユーザーの一意識別子 */
  uid: string;
  /** ユーザーの年齢 */
  age?: number;
  /** ユーザーの出身地 */
  location?: string;
  /** 本人確認済みかどうか */
  isVerified?: boolean;
  /** 残いいね数 */
  remainingLikes?: number;
  /** 残ブースト数 */
  remainingBoosts?: number;
  /** 残ポイント数 */
  remainingPoints?: number;
  /** 会員種別 */
  membershipType?: 'free' | 'premium';
  /** プラン名（有料会員の場合） */
  planName?: string;
}

/**
 * Firebase User型を拡張した型定義（既存 - 段階的に削除予定）
 * 
 * @deprecated 新しいAuthUserとProfileUserの使用を推奨
 */
export interface ExtendedUser extends FirebaseUser {
  age?: number;
  location?: string;
  isVerified?: boolean;
} 
