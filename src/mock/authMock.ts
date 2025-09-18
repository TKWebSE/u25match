import { AuthUser, ExtendedUser } from '../my-types/user';

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
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
};

/**
 * Dev環境用のモックユーザーデータ（既存 - 段階的に削除予定）
 * 
 * このモックデータは以下の特徴を持ちます：
 * - 開発環境でのテスト用
 * - 完全なユーザー情報を含む
 * - 設定画面で表示される全てのプロパティを持つ
 */
export const mockUser: ExtendedUser = {
  // Firebase Userの基本プロパティ
  uid: 'my-user-id',
  email: 'tanaka.hanako@example.com',
  displayName: '田中 花子',
  image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
  emailVerified: true,
  isAnonymous: false,
  metadata: {
    creationTime: '2024-01-15T00:00:00.000Z',
    lastSignInTime: '2024-01-20T00:00:00.000Z',
  },
  providerData: [],
  refreshToken: 'mock-refresh-token',
  tenantId: null,
  phoneNumber: null,
  providerId: 'password',
  delete: async () => { },
  getIdToken: async () => 'mock-id-token',
  getIdTokenResult: async () => ({
    authTime: '2024-01-20T00:00:00.000Z',
    issuedAtTime: '2024-01-20T00:00:00.000Z',
    signInProvider: 'password',
    token: 'mock-id-token',
    claims: {},
    expirationTime: '2024-01-21T00:00:00.000Z',
  }),
  reload: async () => { },
  toJSON: () => ({}),

  // 拡張プロパティ
  age: 25,
  location: '東京都渋谷区',
  isVerified: true,
} as unknown as ExtendedUser;
