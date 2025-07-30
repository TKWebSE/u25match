// firebaseConfig.mock.js - 画面テスト用のモック設定
import Constants from 'expo-constants';

// モック用のダミーユーザー
const mockUser = {
  uid: 'mock-user-123',
  email: 'test@example.com',
  displayName: 'テストユーザー',
  photoURL: null,
  emailVerified: true,
};

// モック認証オブジェクト
const auth = {
  currentUser: mockUser,
  onAuthStateChanged: (callback) => {
    // すぐにモックユーザーでコールバックを実行
    setTimeout(() => callback(mockUser), 100);
    // アンサブスクライブ関数を返す
    return () => {};
  },
};

// モックFirestoreオブジェクト
const db = {
  collection: () => ({
    doc: () => ({
      get: () => Promise.resolve({
        exists: true,
        data: () => ({ name: 'テストデータ' }),
      }),
      set: () => Promise.resolve(),
      update: () => Promise.resolve(),
      delete: () => Promise.resolve(),
    }),
    add: () => Promise.resolve({ id: 'mock-doc-id' }),
    where: () => ({
      get: () => Promise.resolve({
        docs: [],
        forEach: () => {},
      }),
    }),
  }),
};

// モックアプリ
const app = {
  name: 'mock-app',
  options: {},
};

export { app, auth, db };