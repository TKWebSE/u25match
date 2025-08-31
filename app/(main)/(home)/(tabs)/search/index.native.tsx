import EmptyState from '@components/common/EmptyState';
import UnifiedUserCard, { User } from '@components/common/mobile/UnifiedUserCard';
import { getProfilePath } from '@constants/routes';
import { MaterialIcons } from '@expo/vector-icons';
import { useCardSize } from '@hooks/useCardSize';
import { reactionUsers } from '@mock/exploreUserMock';
import { getUserImageUrl, mockReactions } from '@mock/reactionsMock';
import { getUsersByCategory } from '@mock/searchMock';
import { colors, spacing } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchScreen = () => {
  const router = useRouter();

  // 統一カードサイズを取得
  const gridCardSize = useCardSize('grid');
  const swiperCardSize = useCardSize('swiper');

  // 検索モーダルの状態管理
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // リアクションデータをメモ化（パフォーマンス向上）
  const { likeReactions, footprintReactions } = useMemo(() => {
    const likes = mockReactions.filter(r => r.type === 'like' || r.type === 'super_like');
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

  // 検索カテゴリの定義（モックデータを使用）
  const searchCategories = [
    { key: 'recommended', title: '⭐ おすすめ', icon: 'star', users: getUsersByCategory('recommended') },
    { key: 'online', title: '🟢 オンライン', icon: 'circle', users: getUsersByCategory('online') },
    { key: 'nearby', title: '📍 近くの人', icon: 'location-on', users: getUsersByCategory('nearby') },
    { key: 'beginner', title: '🌱 ビギナー', icon: 'new-releases', users: getUsersByCategory('beginner') },
    { key: 'popular', title: '🔥 人気', icon: 'whatshot', users: getUsersByCategory('popular') },
    { key: 'age18-20', title: '🎂 18-20歳', icon: 'cake', users: getUsersByCategory('age18-20') },
    { key: 'age21-25', title: '🎉 21-25歳', icon: 'celebration', users: getUsersByCategory('age21-25') },
    { key: 'student', title: '🎓 学生', icon: 'school', users: getUsersByCategory('student') },
    { key: 'working', title: '💼 社会人', icon: 'work', users: getUsersByCategory('working') },
    { key: 'sports', title: '⚽ スポーツ好き', icon: 'sports', users: getUsersByCategory('sports') },
    { key: 'music', title: '🎵 音楽好き', icon: 'music-note', users: getUsersByCategory('music') },
    { key: 'travel', title: '✈️ 旅行好き', icon: 'flight', users: getUsersByCategory('travel') },
  ];

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


  // 選択されたカテゴリのユーザーを取得
  const getSelectedCategoryUsers = () => {
    if (!selectedCategory) return [];
    const category = searchCategories.find(cat => cat.key === selectedCategory);
    return category ? category.users : [];
  };

  // 統一カードを使用したレンダリング（メモ化）
  const renderUserItem = useCallback(({ item, index }: { item: User; index: number }) => {
    return (
      <UnifiedUserCard
        key={`${item.name}-${index}`}
        user={item}
        onPress={handleCardPress}
        size={gridCardSize}
        layout="grid"
      />
    );
  }, [gridCardSize, handleCardPress]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* ロゴヘッダー */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>💕</Text>
            <Text style={styles.logo}>u25match</Text>
          </View>

          {/* 検索FAB */}
          <TouchableOpacity
            style={styles.searchFab}
            onPress={handleOpenSearchModal}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name="search"
              size={20}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        {/* 検索結果またはメインコンテンツ */}
        {isSearchActive ? (
          <View style={styles.searchResultsContainer}>
            {/* 検索結果ヘッダー */}
            <View style={styles.searchResultsHeader}>
              <Text style={styles.searchResultsTitle}>
                {searchCategories.find(cat => cat.key === selectedCategory)?.title || '検索結果'}
              </Text>
            </View>

            {/* 検索結果 */}
            {searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                renderItem={renderUserItem}
                keyExtractor={(item, index) => `search-${item.name}-${index}`}
                numColumns={2}
                contentContainerStyle={styles.gridContainer}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
                // パフォーマンス最適化
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                windowSize={10}
                initialNumToRender={6}
                getItemLayout={(data, index) => ({
                  length: gridCardSize.height,
                  offset: gridCardSize.height * Math.floor(index / 2),
                  index,
                })}
              />
            ) : (
              <View style={styles.emptyStateContainer}>
                <EmptyState
                  message="このカテゴリにはユーザーがいません"
                />
              </View>
            )}
          </View>
        ) : allUsers.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <EmptyState
              message="まだ誰かからのリアクションがありません。プロフィールを充実させてみましょう！"
            />
          </View>
        ) : (
          <FlatList
            data={allUsers}
            renderItem={renderUserItem}
            keyExtractor={(item, index) => `user-${item.name}-${index}`}
            numColumns={2}
            contentContainerStyle={styles.gridContainer}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            // パフォーマンス最適化
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={10}
            initialNumToRender={6}
            getItemLayout={(data, index) => ({
              length: gridCardSize.height,
              offset: gridCardSize.height * Math.floor(index / 2),
              index,
            })}
          />
        )}

        {/* 検索モーダル */}
        <Modal
          visible={isSearchModalVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={handleCloseSearchModal}
        >
          <SafeAreaView style={styles.modalContainer} edges={['top']}>
            {/* モーダルヘッダー */}
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseSearchModal}
                activeOpacity={0.7}
              >
                <MaterialIcons name="close" size={24} color={colors.textPrimary} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>検索</Text>
              <View style={styles.placeholder} />
            </View>

            {/* 検索カテゴリボタン */}
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>カテゴリで絞り込み</Text>
              <View style={styles.categoryGrid}>
                {searchCategories.map((category) => (
                  <TouchableOpacity
                    key={category.key}
                    style={[
                      styles.categoryButton,
                      selectedCategory === category.key && styles.categoryButtonSelected
                    ]}
                    onPress={() => handleCategorySelect(category.key)}
                    activeOpacity={0.7}
                  >
                    <MaterialIcons
                      name={category.icon as any}
                      size={28}
                      color={selectedCategory === category.key ? '#FFFFFF' : colors.primary}
                    />
                    <Text style={[
                      styles.categoryButtonText,
                      selectedCategory === category.key && styles.categoryButtonTextSelected
                    ]}>
                      {category.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

          </SafeAreaView>
        </Modal>
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
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
    position: 'relative',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchFab: {
    position: 'absolute',
    right: spacing.lg,
    top: spacing.sm,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  logoIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1.2,
    textAlign: 'center',
    textTransform: 'lowercase',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  gridContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    marginBottom: spacing.sm,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  // モーダル関連のスタイル
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  closeButton: {
    padding: spacing.sm,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  // カテゴリボタン関連のスタイル
  categoryContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.base,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    width: '48%',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  categoryButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
  categoryButtonTextSelected: {
    color: '#FFFFFF',
  },
  // 検索結果関連のスタイル
  searchResultsContainer: {
    flex: 1,
  },
  searchResultsHeader: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  searchResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});

export default SearchScreen;
