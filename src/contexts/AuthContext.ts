// contexts/AuthContext.tsx
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '../../firebaseConfig';

// Contextが持つ値の型定義
type AuthContextType = {
  user: any | null;      // ログインしているユーザー情報（nullなら未ログイン）
  loading: boolean;      // 認証状態の読み込み中かどうかのフラグ
};

// Contextの初期値は undefined にしておく（Provider未使用時の判定に使う）
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Providerコンポーネント（Contextの値を下の子コンポーネントに渡す役割）
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // user状態管理
  const [user, setUser] = useState<any | null>(null);
  // 認証状態の読み込み中フラグ
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebaseの認証状態監視開始
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);      // 認証ユーザー情報をセット
      setLoading(false);  // 読み込み終了
    });

    // クリーンアップ関数で監視解除
    return unsubscribe;
  }, []);

  // Contextに値をセットして、子コンポーネントに渡す
  return (
    <AuthContext.Provider value= {{ user, loading }
}>
  { children }
  </AuthContext.Provider>
  );
};

// Contextを安全に使うためのカスタムフック
export const useAuth = () => {
  const context = useContext(AuthContext);
  // Providerが使われていなければエラーを投げる（安全対策）
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
