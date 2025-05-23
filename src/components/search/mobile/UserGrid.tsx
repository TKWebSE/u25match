// src/components/search/mobile/UserGrid.tsx
// ユーザーグリッド表示コンポーネント

import EmptyState from '@components/common/EmptyState';
import UnifiedUserCard from '@components/common/mobile/UnifiedUserCard';
import { useCardSize } from '@hooks/useCardSize';
import { User as SearchUser } from '@types/search';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

interface UserGridProps {
  users: SearchUser[];
  onCardPress: (user: SearchUser) => void;
  emptyMessage?: string;
}

const UserGrid: React.FC<UserGridProps> = ({
  users,
  onCardPress,
  emptyMessage = "ユーザーがいません"
}) => {
  // 統一カードサイズを取得
  const gridCardSize = useCardSize('grid');

  // カードタップハンドラーをメモ化
  const handleCardPress = useCallback((user: SearchUser) => {
    onCardPress(user);
  }, [onCardPress]);

  // 統一カードを使用したレンダリング（メモ化）
  const renderUserItem = useCallback(({ item, index }: { item: SearchUser; index: number }) => {
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

  if (users.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <EmptyState message={emptyMessage} />
      </View>
    );
  }

  return (
    <FlatList
      data={users}
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
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    marginBottom: 8,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default UserGrid;
