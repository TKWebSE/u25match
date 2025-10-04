import UnifiedUserCard, { User } from '@components/common/mobile/UnifiedUserCard';
import { ExploreSectionHeader } from '@components/explore/mobile';
import { useCardSize } from '@hooks/ui';
import { colors, spacing } from '@styles/globalStyles';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface ExploreUserGridProps {
  users: User[];
  isLoading: boolean;
  activeTab: 'recommended' | 'beginner' | 'online' | 'nearby';
  onCardPress: (user: User) => void;
}

/**
 * 探索ユーザーグリッドコンポーネント
 * ユーザーカードのグリッド表示とローディング状態を管理
 */
const ExploreUserGrid: React.FC<ExploreUserGridProps> = ({
  users,
  isLoading,
  activeTab,
  onCardPress
}) => {
  // 統一カードサイズを取得
  const gridCardSize = useCardSize('grid');

  // ローディング状態
  if (isLoading && users.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>ユーザーを読み込み中...</Text>
      </View>
    );
  }

  // メインコンテンツ
  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <UnifiedUserCard
          user={item}
          onPress={onCardPress}
          size={gridCardSize}
          layout="grid"
        />
      )}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      numColumns={2}
      contentContainerStyle={styles.gridContainer}
      ListHeaderComponent={() => (
        <ExploreSectionHeader
          activeTab={activeTab}
          userCount={users.length}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  gridContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
});

export default ExploreUserGrid;
