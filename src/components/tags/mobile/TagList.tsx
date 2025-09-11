import EmptyState from '@components/common/EmptyState';
import { tagCategories } from '@constants/tagDataMap';
import { spacing } from '@styles/globalStyles';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import TagItem, { Tag } from './TagItem';

/**
 * モバイルTagListのプロパティ定義
 */
interface TagListProps {
  tags: Tag[];                        // 表示するタグの配列
  category: string;                   // タグのカテゴリ名
  onTagPress: (tag: Tag) => void;     // タグがタップされた時のコールバック
  selectedTagIds?: string[];          // 選択されているタグのID配列
  isMaxReached?: boolean;             // 最大選択数に達しているかどうか
}

/**
 * モバイル用タグリストコンポーネント
 * 
 * タグを2列グリッドで表示するモバイル専用コンポーネント。
 * 選択状態の管理とパフォーマンス最適化を実装。
 * 
 * 主な機能：
 * - 2列グリッドレイアウトでのタグ表示
 * - 選択状態の管理と表示
 * - 空状態の表示
 * - パフォーマンス最適化（メモ化、バッチレンダリング）
 * - スクロール最適化
 */
const TagList: React.FC<TagListProps> = ({ tags, category, onTagPress, selectedTagIds = [], isMaxReached = false }) => {
  // タグアイテムのレンダリング（メモ化でパフォーマンス最適化）
  const renderTagItem = useCallback(({ item, index }: { item: Tag; index: number }) => {
    return (
      <TagItem
        tag={item}
        index={index}
        onPress={onTagPress}
        isSelected={selectedTagIds.includes(item.id)}  // 選択状態を判定
        isMaxReached={isMaxReached}
      />
    );
  }, [onTagPress, selectedTagIds, isMaxReached]);

  // タグが空の場合の空状態表示
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
      keyExtractor={(item, index) => `${category}-${item.id}-${index}`}  // 一意のキーを生成
      numColumns={2}                    // 2列グリッドレイアウト
      contentContainerStyle={styles.gridContainer}
      columnWrapperStyle={styles.row}   // 行のスタイリング
      showsVerticalScrollIndicator={false}  // スクロールインジケーターを非表示
      // パフォーマンス最適化設定
      removeClippedSubviews={true}      // 画面外のビューを削除
      maxToRenderPerBatch={10}          // バッチあたりの最大レンダリング数
      windowSize={10}                   // レンダリングウィンドウサイズ
      initialNumToRender={6}            // 初期レンダリング数
    />
  );
};

const styles = StyleSheet.create({
  // グリッドコンテナのスタイル
  gridContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,        // 下部に余分なパディングを追加
  },

  // 行のスタイル（2列グリッド用）
  row: {
    justifyContent: 'space-between',  // 列間のスペースを均等に配置
    paddingHorizontal: 0,
    marginBottom: spacing.sm,         // 行間のマージン
  },

  // 空状態コンテナのスタイル
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',         // 垂直方向の中央揃え
    alignItems: 'center',             // 水平方向の中央揃え
    padding: spacing.lg,
  },
});

export default TagList;
