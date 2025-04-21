// src/components/search/web/WebSearchScreen.tsx
// Web版検索画面のメインコンポーネント

import { MaterialIcons } from '@expo/vector-icons';
import { useProfile } from '@hooks/useProfile';
import { useStrictAuth } from '@hooks/useStrictAuth';
import { reactionUsers } from '@mock/exploreUserMock';
import { getUserImageUrl, mockReactions } from '@mock/reactionsMock';
import { getUsersByCategory } from '@mock/searchMock';
import { User } from '@my-types/search';
import { colors, spacing } from '@styles/globalStyles';
import { getMembershipType } from '@utils/membershipUtils';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import SearchModal from '../mobile/SearchModal';
import WebUserGrid from './WebUserGrid';

const WebSearchScreen = () => {
  const router = useRouter();
  const user = useStrictAuth();
  const { profile } = useProfile(user.uid);

  // 会員種別の判定
  const membershipType = getMembershipType(profile || undefined);

  // デバッグ用：会員種別をコンソールに表示
  console.log('🔍 WebSearchScreen - 会員種別:', membershipType);
  console.log('🔍 WebSearchScreen - プロフィール:', profile);

  // 検索モーダルの状態管理
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // リアクションデータからユーザーリストを生成（いいねのみ表示）
  const getReactionUsers = () => {
    const likeReactions = mockReactions.filter(r => r.type === 'like' || r.type === 'super_like');

    return likeReactions.map((reaction, index) => {
      const userIndex = (reaction.id.charCodeAt(0) + index) % reactionUsers.length;
      const user = { ...reactionUsers[userIndex] };
      user.imageUrl = getUserImageUrl(reaction.id);
      return user;
    });
  };

  const filteredUsers = useMemo(() => getReactionUsers(), []);

  // カードタップハンドラーをメモ化
  const handleCardPress = useCallback((user: User) => {
    const userId = user.name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/profile/${userId}` as any);
  }, [router]);

  // カテゴリ選択ハンドラー
  const handleCategorySelect = (categoryKey: string) => {
    // プレミアム限定カテゴリのチェック
    const premiumCategories = ['student', 'working', 'marriage'];
    const isPremiumCategory = premiumCategories.includes(categoryKey);

    if (isPremiumCategory && membershipType !== 'premium') {
      Alert.alert(
        'プレミアム会員限定機能',
        'この検索機能をご利用いただくには、プレミアム会員への登録が必要です。',
        [
          {
            text: 'OK',
            onPress: () => {
              // アラートを閉じるだけ
            }
          }
        ]
      );
      return;
    }

    setSelectedCategory(categoryKey);
    // モーダルを閉じて検索結果を表示
    setIsSearchModalVisible(false);
    setIsSearchActive(true);
    setSearchResults(getUsersByCategory(categoryKey));
  };

  // 検索モーダルを開く
  const handleOpenSearchModal = () => {
    // 無料会員の場合は制限メッセージを表示
    if (membershipType !== 'premium') {
      Alert.alert(
        '検索機能について',
        '検索機能の一部はプレミアム会員限定です。\n無料会員でも基本的な検索はご利用いただけます。',
        [
          {
            text: 'OK',
            onPress: () => {
              setIsSearchModalVisible(true);
            }
          }
        ]
      );
    } else {
      setIsSearchModalVisible(true);
    }
  };

  // 検索モーダルを閉じる
  const handleCloseSearchModal = () => {
    setIsSearchModalVisible(false);
    setSelectedCategory(null);
  };

  return (
    <View style={styles.container}>
      {/* 虫眼鏡アイコン */}
      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleOpenSearchModal}
        activeOpacity={0.7}
      >
        <MaterialIcons name="search" size={40} color={colors.primary} />
      </TouchableOpacity>

      {/* 検索結果またはメインコンテンツ */}
      {isSearchActive ? (
        <WebUserGrid
          users={searchResults}
          emptyMessage="このカテゴリにはユーザーがいません"
        />
      ) : (
        <WebUserGrid
          users={filteredUsers}
          emptyMessage="まだ誰かからのいいねがありません。プロフィールを充実させてみましょう！"
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    position: 'relative',
  },
  searchButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.background,
    borderWidth: 3,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    ...({
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    } as any),
  },
});

export default WebSearchScreen;
