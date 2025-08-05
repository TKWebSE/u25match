// contexts/AuthContext.tsx
// 認証状態管理のためのReact Context
// Firebase Authの状態を管理し、アプリ全体で認証情報を共有する
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { auth } from '../../firebaseConfig';

// Contextが持つ値の型定義
// 認証状態と関連する操作を提供する
type AuthContextType = {
  user: User | null;      // ログインしているユーザー情報（nullなら未ログイン）
  loading: boolean;      // 認証状態の読み込み中かどうかのフラグ
  error: string | null;  // エラーメッセージ
  login: (email: string, password: string) => Promise<void>;    // ログイン関数
  signup: (email: string, password: string) => Promise<void>;   // サインアップ関数
  logout: () => Promise<void>;                                  // ログアウト関数
  clearError: () => void;                                       // エラーをクリアする関数
};

// Contextの初期値は undefined にしておく（Provider未使用時の判定に使う）
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Providerコンポーネント（Contextの値を下の子コンポーネントに渡す役割）
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 認証状態の管理
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Firebaseの認証状態監視を開始
  useEffect(() => {
    console.log('🔐 AuthProvider: 認証状態監視を開始します');

    // Firebaseの認証状態監視開始
    // ユーザーのログイン・ログアウト状態の変更を監視する
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('🔐 AuthProvider: 認証状態が変更されました', {
        user: user ? { uid: user.uid, email: user.email } : null
      });
      setUser(user);      // 認証ユーザー情報をセット
      setLoading(false);  // 読み込み終了
      setError(null);     // エラーをクリア
    }, (error) => {
      // 認証エラーが発生した場合の処理
      console.error('🔐 AuthProvider: 認証エラーが発生しました', error);
      setError(error.message);
      setLoading(false);
    });

    // クリーンアップ関数で監視解除
    // コンポーネントがアンマウントされる際に実行される
    return () => {
      console.log('🔐 AuthProvider: 認証状態監視を停止します');
      unsubscribe();
    };
  }, []);

  // ログイン関数 - メールアドレスとパスワードでログイン
  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      console.log('🔐 ログイン試行:', { email });

      // Firebase Authを使用してログイン
      await signInWithEmailAndPassword(auth, email, password);
      console.log('🔐 ログイン成功');
    } catch (error: any) {
      console.error('🔐 ログインエラー:', error);
      setError(error.message || 'ログインに失敗しました');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // サインアップ関数 - 新しいアカウントを作成
  const signup = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      console.log('🔐 サインアップ試行:', { email });

      // Firebase Authを使用してユーザー作成
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('🔐 サインアップ成功');
    } catch (error: any) {
      console.error('🔐 サインアップエラー:', error);
      setError(error.message || 'アカウント作成に失敗しました');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ログアウト関数 - 現在のユーザーをログアウト
  const logout = async () => {
    try {
      setError(null);
      console.log('🔐 ログアウト試行');

      // Firebase Authを使用してログアウト
      await signOut(auth);
      console.log('🔐 ログアウト成功');
    } catch (error: any) {
      console.error('🔐 ログアウトエラー:', error);
      setError(error.message || 'ログアウトに失敗しました');
      throw error;
    }
  };

  // エラーをクリアする関数 - エラーメッセージをリセット
  const clearError = () => {
    setError(null);
  };

  // Contextに値をセットして、子コンポーネントに渡す
  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Contextを安全に使うためのカスタムフック
// Providerが使われていない場合にエラーを投げる（安全対策）
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  // Providerが使われていなければエラーを投げる（安全対策）
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
