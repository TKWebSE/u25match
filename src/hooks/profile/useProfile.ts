import { myProfileMock } from '@mock/myProfileMock';
import { ProfileUser } from '@my-types/user';
import { useEffect, useState } from 'react';

/**
 * プロフィール情報を取得するカスタムフック
 * 
 * このフックは以下の責務を持ちます：
 * - ユーザーのプロフィール情報の取得
 * - Dev環境でのモックデータ提供
 * - ローディング状態の管理
 * 
 * @param uid - ユーザーのUID
 * @returns プロフィール情報とローディング状態
 * 
 * @example
 * ```typescript
 * const { profile, loading } = useProfile('user-uid');
 * if (profile) {
 *   console.log('年齢:', profile.age);
 * }
 * ```
 */
export const useProfile = (uid: string) => {
  const [profile, setProfile] = useState<ProfileUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);

        // Dev環境ではモックデータを使用
        if (__DEV__) {
          // myProfileMockからデータを取得
          const mockProfile: ProfileUser = {
            uid: myProfileMock.uid,
            age: myProfileMock.age,
            location: myProfileMock.location,
            isVerified: myProfileMock.isVerified,
            remainingLikes: myProfileMock.remainingLikes,
            remainingBoosts: myProfileMock.remainingBoosts,
            remainingPoints: myProfileMock.remainingPoints,
            membershipType: myProfileMock.membershipType,
            planName: myProfileMock.planName,
          };

          // 少し遅延を入れてローディング状態をシミュレート
          setTimeout(() => {
            setProfile(mockProfile);
            setLoading(false);
          }, 500);
          return;
        }

        // 本番環境では実際のAPI呼び出し
        // TODO: 実際のプロフィール取得APIを実装
        setProfile(null);
        setLoading(false);
      } catch (error) {
        console.error('プロフィール取得エラー:', error);
        setProfile(null);
        setLoading(false);
      }
    };

    if (uid) {
      loadProfile();
    }
  }, [uid]);

  return { profile, loading };
};
