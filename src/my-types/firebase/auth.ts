// src/my-types/firebase/auth.ts
// Firebase Authentication関連の型定義

/**
 * Firebase Auth認証専用のユーザー型
 * 
 * この型を使う理由：
 * - Firebase Authenticationの認証情報のみを扱う
 * - authStoreで管理される最小限の認証状態
 * - プロフィール詳細情報（FirestoreUser）とは分離
 * 
 * プロフィール情報が必要な場合は FirestoreUser（@my-types/firestore）を使用してください
 */
export interface AuthUser {
  /** ユーザーの一意識別子（Firebase Authから取得） */
  uid: string;
  /** ユーザーのメールアドレス（Firebase Authから取得） */
  email: string | null;
  /** ユーザーの表示名（Firestoreから取得、初期はnull） */
  displayName: string | null;
  /** ユーザーのプロフィール画像URL（Firestoreから取得、初期はnull） */
  image: string | null;
  /** メールアドレスの認証状態 */
  emailVerified?: boolean;
}

