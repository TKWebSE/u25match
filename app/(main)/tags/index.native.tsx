import EmptyState from '@components/common/EmptyState';
import { tagCategories, TagCategory, tagDataMap } from '@constants/tagDataMap';
import { useCardSize } from '@hooks/useCardSize';
import { colors, spacing } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabBar, TabView } from 'react-native-tab-view';

// User型はUnifiedUserCardからインポート済み
const { width: screenWidth } = Dimensions.get('window');

// タグの型定義
interface Tag {
  id: string;
  name: string;
  imageUrl: string;
  userCount: number;
  category: TagCategory;
}

// 実際のタグデータから動的に生成
const generateTagsFromDataMap = (): Tag[] => {
  return Object.entries(tagDataMap).map(([key, data], index) => ({
    id: key,
    name: data.description,
    imageUrl: '',
    userCount: Math.floor(Math.random() * 200) + 50, // 50-250のランダムな人数
    category: data.category,
  }));
};

const TagsScreen = () => {
  const router = useRouter();

  // タブの状態管理
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'all', title: 'すべて' },
    { key: 'food', title: '🍽️ 食べ物' },
    { key: 'hobby', title: '🎮 趣味' },
    { key: 'entertainment', title: '🎵 エンタメ' },
    { key: 'pets', title: '🐾 ペット' },
  ]);

  // 統一カードサイズを取得
  const gridCardSize = useCardSize('grid');

  // タグデータをメモ化（パフォーマンス向上）
  const { allTags, categorizedTags } = useMemo(() => {
    const all = generateTagsFromDataMap();
    const categorized = Object.keys(tagCategories).reduce((acc, category) => {
      acc[category as TagCategory] = all.filter(tag => tag.category === category);
      return acc;
    }, {} as Record<TagCategory, Tag[]>);
    return { allTags: all, categorizedTags: categorized };
  }, []);

  // タグタップハンドラーをメモ化
  const handleTagPress = useCallback((tag: Tag) => {
    console.log('タグがタップされました:', tag.name);
    // TODO: タグ詳細画面への遷移を実装
  }, []);

  // タグアイテムのレンダリング（メモ化）
  const renderTagItem = useCallback(({ item, index }: { item: Tag; index: number }) => {
    const tagImage = tagDataMap[item.id as keyof typeof tagDataMap]?.image || require('@assets/tag-images/cat.jpg');

    return (
      <TouchableOpacity
        key={`${item.name}-${index}`}
        style={styles.tagItem}
        onPress={() => handleTagPress(item)}
        activeOpacity={0.8}
      >
        <View style={styles.imageContainer}>
          <Image source={tagImage} style={styles.tagImage} />
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{item.userCount}人</Text>
          </View>
        </View>
        <View style={styles.tagContent}>
          <Text style={styles.tagName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }, [handleTagPress]);

  // すべてのタグタブのレンダリング
  const renderAllTab = useCallback(() => {
    if (allTags.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <EmptyState
            message="タグがありません。"
          />
        </View>
      );
    }

    return (
      <FlatList
        data={allTags}
        renderItem={renderTagItem}
        keyExtractor={(item, index) => `all-${item.id}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        // パフォーマンス最適化
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={6}
      />
    );
  }, [allTags, renderTagItem]);

  // カテゴリタブのレンダリング
  const renderCategoryTab = useCallback((category: TagCategory) => {
    const categoryTags = categorizedTags[category];

    if (categoryTags.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <EmptyState
            message={`${tagCategories[category]}のタグがありません。`}
          />
        </View>
      );
    }

    return (
      <FlatList
        data={categoryTags}
        renderItem={renderTagItem}
        keyExtractor={(item, index) => `${category}-${item.id}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        // パフォーマンス最適化
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={6}
      />
    );
  }, [categorizedTags, renderTagItem]);

  // シーン定義
  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case 'all':
        return renderAllTab();
      case 'food':
        return renderCategoryTab('food');
      case 'hobby':
        return renderCategoryTab('hobby');
      case 'entertainment':
        return renderCategoryTab('entertainment');
      case 'pets':
        return renderCategoryTab('pets');
      default:
        return renderAllTab();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: screenWidth }}
          animationEnabled={true}
          swipeEnabled={true}
          lazy={false}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={styles.tabBar}
              tabStyle={styles.tabStyle}
              indicatorStyle={styles.tabIndicator}
              activeColor={colors.primary}
              inactiveColor={colors.textSecondary}
              scrollEnabled={false}
              pressColor="transparent"
              pressOpacity={0.8}
              indicatorContainerStyle={styles.indicatorContainer}
            />
          )}
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
  tabBar: {
    backgroundColor: colors.background,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    position: 'relative',
  },
  tabStyle: {
    paddingVertical: 12,
  },
  tabIndicator: {
    backgroundColor: colors.primary,
    height: 3,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    zIndex: 1,
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
  tagItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    width: '48%',
    marginBottom: spacing.base,
    minHeight: 180,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  tagImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  countBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 32,
    alignItems: 'center',
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
  tagContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  tagName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2d3748',
    textAlign: 'center',
    lineHeight: 20,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
});

export default TagsScreen;
