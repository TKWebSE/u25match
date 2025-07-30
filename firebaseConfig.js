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
  
  // 🔄 ES6 importで正しくモック設定を読み込み
  const mockConfig = await import('./firebaseConfig.mock.js');
  app = mockConfig.app;
  auth = mockConfig.auth;
  db = mockConfig.db;

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


