// firebaseConfig.ts
// Firebase設定ファイル - モックモードと本番モードの切り替えを管理
import { getDevModeInfo, isDevMode } from '@utils/devMode';
import Constants from 'expo-constants';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';

// DEVモードの判定 - 開発環境かどうかを判定
const isDev = isDevMode();
const devModeInfo = getDevModeInfo();

// デバッグ用ログ出力
console.log('🔧 Firebase設定のDEVモード判定:', {
  isDev,
  isDevModeResult: isDevMode(),
  devModeInfo,
});

// 🎯 Firebaseインスタンスの宣言
// 条件分岐の外で宣言することで、常にexportできるようにする
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

// 開発モード（モック）の場合
if (isDev) {
  console.log('🎭 DEVモード: モック設定を使用しています');
  console.log('✅ DEVモード条件分岐に入りました');

  // モック用のダミーユーザー - テスト用の固定ユーザー情報
  const mockUser = {
    uid: 'mock-user-123',
    email: 'test@example.com',
    displayName: 'テストユーザー',
    image: null,
    emailVerified: true,
  };

  // モック認証オブジェクト - Firebase Authのモック実装
  auth = {
    // 現在のユーザー（常にモックユーザー）
    currentUser: mockUser,

    // 認証状態変更リスナー - モックユーザーを返す
    onAuthStateChanged: (callback: any) => {
      console.log('🎭 モック認証状態変更リスナーが呼ばれました');
      // 100ms後にモックユーザーを返す（実際のFirebaseの動作を模倣）
      setTimeout(() => callback(mockUser), 100);
      return () => {
        console.log('🎭 モック認証リスナーがクリーンアップされました');
      };
    },

    // ログイン機能のモック
    signInWithEmailAndPassword: async (email: string, password: string) => {
      console.log('🎭 モックログイン:', { email, password });
      return Promise.resolve({ user: mockUser } as any);
    },

    // ユーザー作成機能のモック
    createUserWithEmailAndPassword: async (email: string, password: string) => {
      console.log('🎭 モックユーザー作成:', { email, password });
      return Promise.resolve({ user: mockUser } as any);
    },

    // ログアウト機能のモック
    signOut: async () => {
      console.log('🎭 モックログアウト');
      return Promise.resolve();
    },
  } as unknown as Auth;

  // モックFirestoreオブジェクト - Firestoreのモック実装
  db = {
    // コレクション取得のモック
    collection: (collectionName: string) => ({
      // ドキュメント取得のモック
      doc: (docId?: string) => ({
        // ドキュメント取得のモック
        get: () => Promise.resolve({
          exists: true,
          data: () => ({
            name: 'テストデータ',
            email: 'test@example.com',
            displayName: 'テストユーザー',
            createdAt: new Date(),
          }),
          id: docId || 'mock-doc-id',
        }),

        // ドキュメント作成・更新のモック
        set: (data: any) => {
          console.log('🎭 モックFirestore set:', { collectionName, docId, data });
          return Promise.resolve();
        },

        // ドキュメント更新のモック
        update: (data: any) => {
          console.log('🎭 モックFirestore update:', { collectionName, docId, data });
          return Promise.resolve();
        },

        // ドキュメント削除のモック
        delete: () => {
          console.log('🎭 モックFirestore delete:', { collectionName, docId });
          return Promise.resolve();
        },
      }),

      // ドキュメント追加のモック
      add: (data: any) => {
        console.log('🎭 モックFirestore add:', { collectionName, data });
        return Promise.resolve({ id: 'mock-doc-id' });
      },

      // クエリ機能のモック
      where: (field: string, op: string, value: any) => ({
        get: () => Promise.resolve({
          docs: [],
          forEach: (callback: any) => { },
          empty: true,
        }),
        // ネストしたクエリのモック
        where: (field: string, op: string, value: any) => ({
          get: () => Promise.resolve({
            docs: [],
            forEach: (callback: any) => { },
            empty: true,
          }),
        }),
      }),
    }),
  } as unknown as Firestore;

  // モックStorageオブジェクト - Firebase Storageのモック実装
  storage = {
    // refメソッドのモック
    ref: (path?: string) => ({
      // アップロードメソッドのモック
      put: async (file: any) => {
        console.log('🎭 モックStorage put:', { path, file });
        return Promise.resolve({
          ref: { fullPath: path || 'mock-path' },
          metadata: {},
        });
      },
      // ダウンロードURLメソッドのモック
      getDownloadURL: async () => {
        console.log('🎭 モックStorage getDownloadURL:', { path });
        return Promise.resolve(`https://mock-storage.com/${path || 'mock-image.jpg'}`);
      },
    }),
  } as unknown as FirebaseStorage;

  // モックアプリインスタンス
  app = {
    name: 'mock-app',
    options: {},
  } as FirebaseApp;

  // 本番モード（実際のFirebase）の場合
} else {
  console.log('🔥 本番モード: 実際のFirebase設定を使用しています');
  console.log('✅ 本番モード条件分岐に入りました');

  // 環境変数からFirebase設定を取得
  const {
    firebaseApiKey,
    firebaseAuthDomain,
    firebaseProjectId,
    firebaseStorageBucket,
    firebaseMessagingSenderId,
    firebaseAppId,
    firebaseMeasurementId,
  } = Constants.expoConfig?.extra || {};

  // 本番環境の設定値チェック - 必須項目が設定されているか確認
  if (!firebaseApiKey || !firebaseProjectId) {
    console.error('❌ Firebase設定が不完全です:', {
      firebaseApiKey: !!firebaseApiKey,
      firebaseProjectId: !!firebaseProjectId,
    });
    throw new Error('Firebase設定が不完全です。環境変数を確認してください。');
  }

  // Firebase設定オブジェクトの作成
  const firebaseConfig = {
    apiKey: firebaseApiKey,
    authDomain: firebaseAuthDomain,
    projectId: firebaseProjectId,
    storageBucket: firebaseStorageBucket,
    messagingSenderId: firebaseMessagingSenderId,
    appId: firebaseAppId,
    measurementId: firebaseMeasurementId,
  };

  // デバッグ用ログ出力（機密情報は含まない）
  console.log('🔥 Firebase設定:', {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
  });

  // Firebaseアプリの初期化（既存のアプリがある場合は取得、ない場合は新規作成）
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

  // AuthとFirestoreインスタンスの取得
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

// 🚀 条件分岐の外でexport - 常に利用可能なFirebaseインスタンスを提供
export { app, auth, db, storage };

