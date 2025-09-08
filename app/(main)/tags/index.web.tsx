import EmptyState from '@components/common/EmptyState';
import { useCardLayout } from '@components/explore/CardLayoutCalculator';
import { tagCategories, TagCategory, tagDataMap } from '@constants/tagDataMap';
import { colors, spacing } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

  // カードリストエリアの幅を計測（シンプル化）
  const [cardListWidth, setCardListWidth] = useState(0);

  // アクティブなタブの状態管理
  const [activeTab, setActiveTab] = useState<'all' | 'food' | 'hobby' | 'entertainment' | 'pets'>('all');

  // カードレイアウト情報を取得（カードリストエリアの幅のみ使用）
  const cardLayout = useCardLayout(cardListWidth);

  // タグデータからフィルタリング
  const getFilteredTags = () => {
    const allTags = generateTagsFromDataMap();
    if (activeTab === 'all') {
      return allTags;
    } else {
      return allTags.filter(tag => tag.category === activeTab);
    }
  };

  const filteredTags = getFilteredTags();

  const handleTagPress = (tag: Tag) => {
    console.log('タグがタップされました:', tag.name);
    // TODO: タグ詳細画面への遷移を実装
  };

  // タブ切り替えハンドラー
  const handleTabPress = (tab: 'all' | 'food' | 'hobby' | 'entertainment' | 'pets') => {
    setActiveTab(tab);
    console.log('🎯 タグ画面 Web版 タブ切り替え:', tab);
  };

  const renderEmptyComponent = () => {
    if (filteredTags.length === 0) {
      return (
        <EmptyState
          message={
            activeTab === 'all'
              ? 'タグがありません。'
              : `${tagCategories[activeTab]}のタグがありません。`
          }
        />
      );
    }
    return null;
  };

  const renderTagItem = (tag: Tag, index: number) => {
    const tagImage = tagDataMap[tag.id as keyof typeof tagDataMap]?.image || require('@assets/tag-images/cat.jpg');

    return (
      <TouchableOpacity
        key={`${tag.name}-${index}`}
        style={styles.tagItem}
        onPress={() => handleTagPress(tag)}
        activeOpacity={0.8}
      >
        <View style={styles.imageContainer}>
          <Image source={tagImage} style={styles.tagImage} />
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{tag.userCount}人</Text>
          </View>
        </View>
        <View style={styles.tagContent}>
          <Text style={styles.tagName}>{tag.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* タブ切り替えボタン */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'all' && styles.activeTabButton]}
          onPress={() => handleTabPress('all')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'all' && styles.activeTabButtonText]}>
            すべて
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'food' && styles.activeTabButton]}
          onPress={() => handleTabPress('food')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'food' && styles.activeTabButtonText]}>
            🍽️ 食べ物
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'hobby' && styles.activeTabButton]}
          onPress={() => handleTabPress('hobby')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'hobby' && styles.activeTabButtonText]}>
            🎮 趣味
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'entertainment' && styles.activeTabButton]}
          onPress={() => handleTabPress('entertainment')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'entertainment' && styles.activeTabButtonText]}>
            🎵 エンタメ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'pets' && styles.activeTabButton]}
          onPress={() => handleTabPress('pets')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'pets' && styles.activeTabButtonText]}>
            🐾 ペット
          </Text>
        </TouchableOpacity>
      </View>

      {/* カードリストエリアの幅を計測 */}
      <View
        style={styles.cardListArea}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setCardListWidth(width);
          console.log('🎯 タグ画面 Web版 カードリストエリアの幅:', width);
        }}
      >
        {/* Web環境用のグリッドレイアウト */}
        {filteredTags.length > 0 ? (
          <ScrollView
            style={styles.webScrollView}
            contentContainerStyle={styles.webScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.gridContainer}>
              {filteredTags.map((tag, index) => renderTagItem(tag, index))}
            </View>
          </ScrollView>
        ) : (
          renderEmptyComponent()
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    backgroundColor: colors.gray100,
    borderRadius: 8,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: colors.primary,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeTabButtonText: {
    color: colors.white,
  },
  cardListArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  webScrollView: {
    flex: 1,
  },
  webScrollContent: {
    flexGrow: 1,
  },
  gridContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 180,
    cursor: 'pointer',
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
});

export default TagsScreen;
