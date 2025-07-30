// firebaseConfig.mock.js - モック設定（分離版）

// モック用のダミーユーザー
const mockUser = {
  uid: 'mock-user-123',
  email: 'test@example.com',
  displayName: 'テストユーザー',
  photoURL: null,
  emailVerified: true,
};

// モック認証オブジェクト
export const auth = {
  currentUser: mockUser,
  onAuthStateChanged: (callback) => {
    setTimeout(() => callback(mockUser), 100);
    return () => {};
  },
};

// モックFirestoreオブジェクト
export const db = {
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
export const app = {
  name: 'mock-app',
  options: {},
};