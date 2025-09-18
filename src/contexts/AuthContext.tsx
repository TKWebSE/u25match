/**
 * 認証状態管理のためのReact Context
 * 
 * 責務：
 * - 認証状態の管理と共有（user, userProfile）
 * - services/authからの状態変更通知を受信
 * 
 * 注意：認証処理は各画面でservices/authを直接使用
 */
import { myProfileMock } from '@mock/myProfileMock';
import { AuthUser } from '@my-types/user';
import { onAuthStateChanged } from '@services/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  /** 現在ログイン中のユーザー（nullなら未ログイン） */
  user: AuthUser | null;
  /** プロフィール詳細情報 */
  userProfile: any | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);

  // services/authの状態監視を開始
  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      setUser(user);
      setUserProfile(user ? myProfileMock : null);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    userProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * 認証状態を取得するカスタムフック
 * @returns {user, userProfile}
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
