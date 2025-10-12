import { AuthUser } from '@my-types/firebase';

/**
 * Dev環境用のシンプルな認証ユーザーモック
 * 
 * このモックデータは以下の特徴を持ちます：
 * - Firebase Authから取得できる基本情報（uid, email）
 * - Firestoreから取得するプロフィール情報（displayName, image）
 * - 開発環境でのテスト用
 * - 新しいAuthUser型に対応
 */
export const mockAuthUser: AuthUser = {
  uid: 'my-user-id',
  email: 'tanaka.hanako@example.com',
  displayName: '田中 花子',
  image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
};

