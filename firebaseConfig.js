// firebaseConfig.js
import Constants from 'expo-constants';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// DEVモードの判定
const isDev = Constants.expoConfig?.extra?.isDev;

// 🎯 条件分岐を外に出して、常にexportできるようにする
let app, auth, db;

if (isDev) {
  console.log('🎭 DEVモード: モック設定を使用しています');
  
  // モック用のダミーユーザー
  const mockUser = {
    uid: 'mock-user-123',
    email: 'test@example.com',
    displayName: 'テストユーザー',
    photoURL: null,
    emailVerified: true,
  };

  // モック認証オブジェクト
  auth = {
    currentUser: mockUser,
    onAuthStateChanged: (callback) => {
      setTimeout(() => callback(mockUser), 100);
      return () => {};
    },
  };

  // モックFirestoreオブジェクト
  db = {
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
  app = {
    name: 'mock-app',
    options: {},
  };

} else {
  console.log('🔥 本番モード: 実際のFirebase設定を使用しています');
  
  const {
    firebaseApiKey,
    firebaseAuthDomain,
    firebaseProjectId,
    firebaseStorageBucket,
    firebaseMessagingSenderId,
    firebaseAppId,
    firebaseMeasurementId,
  } = Constants.expoConfig.extra;

  const firebaseConfig = {
    apiKey: firebaseApiKey,
    authDomain: firebaseAuthDomain,
    projectId: firebaseProjectId,
    storageBucket: firebaseStorageBucket,
    messagingSenderId: firebaseMessagingSenderId,
    appId: firebaseAppId,
    measurementId: firebaseMeasurementId,
  };

  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
}

// 🚀 条件分岐の外でexport
export { app, auth, db };


