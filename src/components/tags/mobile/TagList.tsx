import EmptyState from '@components/common/EmptyState';
import { tagCategories } from '@constants/tagDataMap';
import { spacing } from '@styles/globalStyles';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import TagItem, { Tag } from './TagItem';

interface TagListProps {
  tags: Tag[];
  category: string;
  onTagPress: (tag: Tag) => void;
}

const TagList: React.FC<TagListProps> = ({ tags, category, onTagPress }) => {
  // タグアイテムのレンダリング（メモ化）
  const renderTagItem = useCallback(({ item, index }: { item: Tag; index: number }) => {
    return (
      <TagItem
        tag={item}
        index={index}
        onPress={onTagPress}
      />
    );
  }, [onTagPress]);

  if (tags.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <EmptyState
          message={
            category === 'all'
              ? 'タグがありません。'
              : `${tagCategories[category as keyof typeof tagCategories]}のタグがありません。`
          }
        />
      </View>
    );
  }

  return (
    <FlatList
      data={tags}
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
};

const styles = StyleSheet.create({
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
});

export default TagList;
