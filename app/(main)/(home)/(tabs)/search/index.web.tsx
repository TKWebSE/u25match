// app/(main)/(home)/(tabs)/search/index.web.tsx
// Web版検索画面のメインコンポーネント

import SearchModal from '@/src/components/search/mobile/SearchModal';
import WebUserGrid from '@/src/components/search/web/WebUserGrid';
import { premiumSearchCategories } from '@/src/constants/search/searchCategories';
import { searchByCategory } from '@/src/usecases/search/searchByCategory';
import { getMembershipType } from '@/src/utils/membership/membershipUtils';
import { showErrorToast } from '@/src/utils/showToast';
import { MaterialIcons } from '@expo/vector-icons';
import { useStrictAuth } from '@hooks/auth';
import { useProfile } from '@hooks/profile';
import { User } from '@my-types/app/search';
import { colors, spacing } from '@styles/globalStyles';
import { ensurePremium } from '@utils/membership/guards';
import { getCategoryTitle } from '@utils/searchUtils';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SearchScreen = () => {
  const router = useRouter();
  const user = useStrictAuth();
  const { profile } = useProfile(user.uid);//ストアから取りたいけど、どうしよう？

  // 会員種別の判定
  const membershipType = getMembershipType(profile || undefined);


  // 検索モーダルの状態管理
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('recommended');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // リアクションデータを取得
  useEffect(() => {
    const fetchDefaultCategoryData = async () => {
      try {
        const users = await searchByCategory(selectedCategory || 'recommended');
        setSearchResults(users);
      } catch (error: any) {
        showErrorToast(error.message || 'デフォルトカテゴリーのデータ取得に失敗しました');
      }
    }
    fetchDefaultCategoryData();
  }, [selectedCategory]);

  // カテゴリ選択ハンドラー
  const handleCategorySelect = (categoryKey: string) => {
    // プレミアム限定カテゴリのチェック
    const isPremiumCategory = (premiumSearchCategories as readonly string[]).includes(categoryKey);

    if (isPremiumCategory && !ensurePremium(profile || undefined)) return;

    setSelectedCategory(categoryKey);
    // モーダルを閉じて検索結果を表示
    setIsSearchModalVisible(false);
    setIsSearchActive(true);
  };

  // 検索モーダルを開く
  const handleOpenSearchModal = () => {
    console.log('🔍 虫眼鏡ボタンがクリックされました');
    console.log('🔍 現在の会員種別:', membershipType);

    // 無料会員でもモーダルを直接開く（制限はモーダル内で行う）
    setIsSearchModalVisible(true);
  };

  // 検索モーダルを閉じる
  const handleCloseSearchModal = () => {
    setIsSearchModalVisible(false);
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

      {/* 検索結果ヘッダー（検索アクティブ時のみ表示） */}
      {isSearchActive && (
        <View style={styles.searchResultsHeader}>
          <Text style={styles.searchResultsTitle}>
            {getCategoryTitle(selectedCategory)}
          </Text>
        </View>
      )}

      {/* 検索結果またはメインコンテンツ */}
      {isSearchActive ? (
        <WebUserGrid
          users={searchResults}
          emptyMessage="このカテゴリにはユーザーがいません"
        />
      ) : (
        <WebUserGrid
          users={searchResults}
          emptyMessage="このカテゴリにはユーザーがいません"
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
  searchResultsHeader: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    marginBottom: spacing.base,
  },
  searchResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});

export default SearchScreen;
