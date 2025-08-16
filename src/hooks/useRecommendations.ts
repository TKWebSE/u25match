import { mockRecommendationUsers } from '@mock/recommendationsMock';
import { useCallback, useState } from 'react';

/**
 * 推奨ユーザーの表示と操作を管理するカスタムフック
 * カードの表示、いいね・パスの処理、インデックス管理を行う
 */
export const useRecommendations = () => {
  // 現在表示中のカードのインデックス
  const [currentIndex, setCurrentIndex] = useState(0);
  // 推奨ユーザーのリスト
  const [users, setUsers] = useState(mockRecommendationUsers);
  // いいねしたユーザーのIDリスト
  const [likedUsers, setLikedUsers] = useState<string[]>([]);
  // パスしたユーザーのIDリスト
  const [passedUsers, setPassedUsers] = useState<string[]>([]);

  // 表示するカードの数（現在のカード + 後ろのカード2枚）
  const visibleCards = 3;
  const startIndex = Math.max(0, currentIndex);
  const endIndex = Math.min(users.length, startIndex + visibleCards);

  // 表示するカードの配列
  const visibleUsers = users.slice(startIndex, endIndex);

  // 現在のカードを取得
  const currentUser = users[currentIndex];

  // デバッグログ：状態の変化を追跡
  console.log(`🔄 useRecommendations - currentIndex: ${currentIndex}, liked: ${likedUsers.length}, passed: ${passedUsers.length}, currentUser: ${currentUser?.name || 'none'}`);

  /**
   * ユーザーにいいねする処理
   * @param userId いいねするユーザーのID
   */
  const handleLike = useCallback((userId: string) => {
    // currentUserが存在し、現在のカードのIDと一致する場合のみ処理
    if (currentUser && userId === currentUser.id) {
      console.log(`❤️ handleLike実行: ${currentUser.name} (ID: ${userId})`);
      setLikedUsers(prev => [...prev, userId]);
      setCurrentIndex(prev => {
        const newIndex = prev + 1;
        console.log(`📈 currentIndex更新: ${prev} → ${newIndex}`);
        return newIndex;
      });
    } else {
      console.log(`⚠️ handleLike無効: currentUser=${currentUser?.name}, userId=${userId}`);
    }
  }, [currentUser]);

  /**
   * ユーザーをパスする処理
   * @param userId パスするユーザーのID
   */
  const handlePass = useCallback((userId: string) => {
    // currentUserが存在し、現在のカードのIDと一致する場合のみ処理
    if (currentUser && userId === currentUser.id) {
      console.log(`👋 handlePass実行: ${currentUser.name} (ID: ${userId})`);
      setPassedUsers(prev => [...prev, userId]);
      setCurrentIndex(prev => {
        const newIndex = prev + 1;
        console.log(`📈 currentIndex更新: ${prev} → ${newIndex}`);
        return newIndex;
      });
    } else {
      console.log(`⚠️ handlePass無効: currentUser=${currentUser?.name}, userId=${userId}`);
    }
  }, [currentUser]);

  return {
    currentIndex,
    users,
    likedUsers,
    passedUsers,
    visibleCards,
    startIndex,
    endIndex,
    visibleUsers,
    currentUser,
    handleLike,
    handlePass,
  };
};
