// firebaseConfig.js
import Constants from 'expo-constants';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// DEVモードの場合はモック設定を使用
const isDev = Constants.expoConfig?.extra?.isDev;

if (isDev) {
  console.log('🎭 DEVモード: モック設定を使用しています');
  // モック設定をインポートしてエクスポート
  const mockConfig = require('./firebaseConfig.mock.js');
  export const { app, auth, db } = mockConfig;
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

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const db = getFirestore(app);

  export { app, auth, db };
}


