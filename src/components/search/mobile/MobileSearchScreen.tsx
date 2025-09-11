// src/components/search/mobile/MobileSearchScreen.tsx
// モバイル版検索画面のメインコンポーネント

import { getProfilePath } from '@constants/routes';
import { reactionUsers } from '@mock/exploreUserMock';
import { getUserImageUrl, mockReactions } from '@mock/reactionsMock';
import { getUsersByCategory } from '@mock/searchMock';
import { colors } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from '../../../my-types/search';
import SearchHeader from './SearchHeader';
import SearchModal from './SearchModal';
import SearchResults from './SearchResults';
import UserGrid from './UserGrid';

const MobileSearchScreen = () => {
  const router = useRouter();

  // 検索モーダルの状態管理
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // リアクションデータをメモ化（パフォーマンス向上）
  const { likeReactions, footprintReactions } = useMemo(() => {
    const likes = mockReactions.filter(r => r.type === 'like');
    const footprints = mockReactions.filter(r => r.type === 'footprint');
    return { likeReactions: likes, footprintReactions: footprints };
  }, []);

  // いいねのユーザーリスト
  const likesUsers = useMemo(() => {
    return likeReactions.map((reaction, index) => {
      const userIndex = (reaction.id.charCodeAt(0) + index) % reactionUsers.length;
      const user = { ...reactionUsers[userIndex] };
      user.imageUrl = getUserImageUrl(reaction.id);
      return user;
    });
  }, [likeReactions]);

  // 足あとのユーザーリスト
  const footprintsUsers = useMemo(() => {
    return footprintReactions.map((reaction, index) => {
      const userIndex = (reaction.id.charCodeAt(0) + index) % reactionUsers.length;
      const user = { ...reactionUsers[userIndex] };
      user.imageUrl = getUserImageUrl(reaction.id);
      return user;
    });
  }, [footprintReactions]);

  // 全ユーザーを結合
  const allUsers = useMemo(() => {
    return [...likesUsers, ...footprintsUsers];
  }, [likesUsers, footprintsUsers]);

  // カードタップハンドラーをメモ化
  const handleCardPress = useCallback((user: User) => {
    const userId = user.name.toLowerCase().replace(/\s+/g, '-');
    router.push(getProfilePath(userId) as any);
  }, [router]);

  // カテゴリ選択ハンドラー
  const handleCategorySelect = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    // モーダルを閉じて検索結果を表示
    setIsSearchModalVisible(false);
    setIsSearchActive(true);
    setSearchResults(getUsersByCategory(categoryKey));
  };

  // 検索モーダルを開く
  const handleOpenSearchModal = () => {
    setIsSearchModalVisible(true);
  };

  // 検索モーダルを閉じる
  const handleCloseSearchModal = () => {
    setIsSearchModalVisible(false);
    setSelectedCategory(null);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* ヘッダー */}
        <SearchHeader onSearchPress={handleOpenSearchModal} />

        {/* 検索結果またはメインコンテンツ */}
        {isSearchActive ? (
          <SearchResults
            selectedCategory={selectedCategory}
            searchResults={searchResults}
            onCardPress={handleCardPress}
          />
        ) : (
          <UserGrid
            users={allUsers}
            onCardPress={handleCardPress}
            emptyMessage="まだ誰かからのリアクションがありません。プロフィールを充実させてみましょう！"
          />
        )}

        {/* 検索モーダル */}
        <SearchModal
          visible={isSearchModalVisible}
          selectedCategory={selectedCategory}
          onClose={handleCloseSearchModal}
          onCategorySelect={handleCategorySelect}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default MobileSearchScreen;
