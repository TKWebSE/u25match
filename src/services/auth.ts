// services/auth.ts
import Constants from 'expo-constants';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

// DEVモードの場合はモック認証を使用
const isDev = Constants.expoConfig?.extra?.isDev;

if (isDev) {
  // モック認証サービスを再エクスポート
  export * from './auth.mock';
} else {
  // 実際のFirebase認証サービス
  export const signUp = (email: string, password: string) => {
    console.log('Signing up with email:', email);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  export const logIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result; // 必要に応じて result.user とか返す
    } catch (error) {
      throw new Error("ログインできませんでした");
    }
  };

  export const logOut = () => {
    return signOut(auth);
  };
}
