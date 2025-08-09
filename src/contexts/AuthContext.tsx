/**
 * 認証状態管理のためのReact Context
 * 
 * このコンテキストは以下の責務を持ちます：
 * - Firebase Authの状態管理
 * - アプリ全体での認証情報の共有
 * - Dev環境でのモックユーザー切り替え
 * - ログイン・ログアウト・サインアップ機能の提供
 * - プロフィール情報の保持と管理
 * 
 * @example
 * ```typescript
 * const { user, userProfile, login, logout } = useAuth();
 * if (user) {
 *   console.log('ログイン済み:', user.email);
 *   console.log('プロフィール:', userProfile?.displayName);
 * }
 * ```
 */
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { auth } from '../../firebaseConfig';
import { mockAuthUser } from '../mock/authMock';
import { getUserProfile } from '../services/firestoreUserProfile';
import { AuthUser } from '../types/user';

/**
 * 認証コンテキストの型定義
 * 
 * この型は以下の情報を提供します：
 * - ユーザー情報（AuthUser型 - 認証に必要な最小限の情報のみ）
 * - プロフィール情報（Firestoreから取得した詳細情報）
 * - ローディング状態
 * - エラー情報
 * - 認証関連の操作関数
 */
type AuthContextType = {
  /** ログインしているユーザー情報（nullなら未ログイン） */
  user: AuthUser | null;
  /** ユーザーのプロフィール情報（Firestoreから取得、画面遷移後も保持） */
  userProfile: any | null;
  /** 認証状態の読み込み中かどうかのフラグ */
  loading: boolean;
  /** エラーメッセージ */
  error: string | null;
  /** ログイン関数 */
  login: (email: string, password: string) => Promise<void>;
  /** サインアップ関数 */
  signup: (email: string, password: string) => Promise<void>;
  /** ログアウト関数 */
  logout: () => Promise<void>;
  /** エラーをクリアする関数 */
  clearError: () => void;
  /** プロフィール情報を更新する関数 */
  refreshUserProfile: () => Promise<void>;
};

/**
 * 認証コンテキストのインスタンス
 * 
 * 初期値は undefined にしておく（Provider未使用時の判定に使う）
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * 認証プロバイダーコンポーネント
 * 
 * このコンポーネントは以下の責務を持ちます：
 * - 認証状態の管理
 * - Dev環境でのモックユーザー切り替え
 * - Firebase Authの状態監視
 * - プロフィール情報の取得と保持
 * - 子コンポーネントへの認証情報提供
 * 
 * @param children - 子コンポーネント
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  /** 認証状態の管理 */
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * プロフィール情報を取得・更新する関数
   * 
   * この関数は以下の責務を持ちます：
   * - Firestoreから最新のプロフィール情報を取得
   * - AuthContextのプロフィール情報を更新
   * - 画面遷移後も保持される情報を提供
   */
  const refreshUserProfile = async () => {
    if (!user?.uid) return;

    try {
      const profile = await getUserProfile(user.uid);
      setUserProfile(profile);
      console.log('🔐 プロフィール情報を更新しました:', profile);
    } catch (error) {
      console.error('🔐 プロフィール情報の取得に失敗しました:', error);
    }
  };

  /**
   * Firebaseの認証状態監視を開始
   * 
   * このuseEffectは以下の処理を行います：
   * - Dev環境でのモックユーザー設定
   * - Firebase Authの状態監視
   * - Firestoreからのプロフィール情報取得（一度だけ）
   * - エラーハンドリング
   * - クリーンアップ処理
   */
  useEffect(() => {
    console.log('🔐 AuthProvider: 認証状態監視を開始します');

    // Dev環境ではモックユーザーを使用
    const isDev = __DEV__;
    if (isDev) {
      console.log('🔐 AuthProvider: Dev環境のため、モックユーザーを使用します');
      setUser(mockAuthUser);
      setUserProfile({
        displayName: mockAuthUser.displayName,
        photoURL: mockAuthUser.photoURL,
        age: 25,
        bio: 'Dev環境用のモックプロフィール',
        location: '東京都',
        // 他のプロフィール情報
      });
      setLoading(false);
      setError(null);
      return;
    }

    // Firebaseの認証状態監視開始
    // ユーザーのログイン・ログアウト状態の変更を監視する
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔐 AuthProvider: 認証状態が変更されました', {
        user: user ? { uid: user.uid, email: user.email } : null
      });

      if (user) {
        // Firebase Userから基本認証情報を取得
        const authUser: AuthUser = {
          uid: user.uid,
          email: user.email,
          displayName: null,  // Firebase Authでは設定されない
          photoURL: null,     // Firebase Authでは設定されない
        };

        try {
          // Firestoreからプロフィール情報を取得（一度だけ）
          const userProfile = await getUserProfile(user.uid);
          if (userProfile) {
            authUser.displayName = userProfile.displayName || null;
            authUser.photoURL = userProfile.photoURL || null;
            setUserProfile(userProfile); // ← プロフィール情報を保持（画面遷移後も使用可能）
            console.log('🔐 AuthProvider: Firestoreからプロフィール情報を取得しました', {
              displayName: authUser.displayName,
              photoURL: authUser.photoURL,
              profile: userProfile
            });
          } else {
            console.log('🔐 AuthProvider: Firestoreにプロフィール情報がありません');
            setUserProfile(null);
          }
        } catch (error) {
          console.error('🔐 AuthProvider: Firestoreからのプロフィール取得エラー:', error);
          // エラーが発生しても基本認証情報は使用可能
          setUserProfile(null);
        }

        setUser(authUser);
      } else {
        setUser(null);
        setUserProfile(null); // ← ログアウト時にプロフィール情報もクリア
      }

      setLoading(false);
      setError(null);
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

  /**
   * ログイン関数
   * 
   * メールアドレスとパスワードを使用してログインを実行します。
   * Dev環境では実際のFirebase Authは使用されません。
   * 
   * @param email - ユーザーのメールアドレス
   * @param password - ユーザーのパスワード
   * @throws {Error} ログインに失敗した場合
   */
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

  /**
   * サインアップ関数
   * 
   * 新しいアカウントを作成します。
   * Dev環境では実際のFirebase Authは使用されません。
   * 
   * @param email - ユーザーのメールアドレス
   * @param password - ユーザーのパスワード
   * @throws {Error} アカウント作成に失敗した場合
   */
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

  /**
   * ログアウト関数
   * 
   * 現在のユーザーをログアウトします。
   * Dev環境では実際のFirebase Authは使用されません。
   * 
   * @throws {Error} ログアウトに失敗した場合
   */
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

  /**
   * エラーをクリアする関数
   * 
   * エラーメッセージをリセットします。
   */
  const clearError = () => {
    setError(null);
  };

  /**
   * コンテキストに値をセットして、子コンポーネントに渡す
   * 
   * このオブジェクトには以下の情報が含まれます：
   * - ユーザー情報
   * - プロフィール情報（画面遷移後も保持）
   * - ローディング状態
   * - エラー情報
   * - 認証関連の操作関数
   */
  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    error,
    login,
    signup,
    logout,
    clearError,
    refreshUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * 認証コンテキストを安全に使うためのカスタムフック
 * 
 * このフックは以下の責務を持ちます：
 * - 認証コンテキストの取得
 * - Provider未使用時のエラー処理
 * - 型安全な認証情報の提供
 * 
 * @returns 認証コンテキストの値
 * @throws {Error} AuthProviderが使用されていない場合
 * 
 * @example
 * ```typescript
 * const { user, userProfile, login, logout } = useAuth();
 * ```
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  // Providerが使われていなければエラーを投げる（安全対策）
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
