import UnifiedUserCard, { User } from '@components/common/mobile/UnifiedUserCard';
import ReactionsEmptyState from '@components/reactions/multi/ReactionsEmptyState';
import ReactionsLoadingState from '@components/reactions/multi/ReactionsLoadingState';
import { spacing } from '@styles/globalStyles';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';

interface ReactionsTabListProps {
  /** 表示するユーザーのリスト */
  users: User[];
  /** データ読み込み中のフラグ */
  isLoading: boolean;
  /** 現在アクティブなタブ（いいね or 足あと） */
  activeTab: 'likes' | 'footprints';
  /** カードタップ時のハンドラー */
  onCardPress: (user: User) => void;
  /** グリッドカードのサイズ（幅・高さ） */
  gridCardSize: { width: number; height: number };
}

/**
 * リアクションタブのリスト表示コンポーネント（Native版）
 * いいね・足あとタブの共通レンダリング処理を提供
 * Native版では FlatList を使用
 * 
 * @param users - 表示するユーザーのリスト
 * @param isLoading - データ読み込み中のフラグ
 * @param activeTab - 現在アクティブなタブ（'likes' | 'footprints'）
 * @param onCardPress - カードタップ時のハンドラー
 * @param gridCardSize - グリッドカードのサイズ
 */
const ReactionsTabList: React.FC<ReactionsTabListProps> = ({
  users,
  isLoading,
  activeTab,
  onCardPress,
  gridCardSize,
}) => {
  /**
   * 統一カードを使用したレンダリング（メモ化）
   * 各ユーザーカードをグリッドレイアウトで表示
   */
  const renderUserItem = useCallback(
    ({ item, index }: { item: User; index: number }) => {
      return (
        <UnifiedUserCard
          key={`${item.name}-${index}`}
          user={item}
          onPress={onCardPress}
          size={gridCardSize}
          layout="grid"
        />
      );
    },
    [gridCardSize, onCardPress]
  );

  // ローディング中はローディング表示を返す
  if (isLoading) {
    return <ReactionsLoadingState />;
  }

  // データがない場合は空状態を返す
  if (users.length === 0) {
    return <ReactionsEmptyState activeTab={activeTab} />;
  }

  return (
    <FlatList
      data={users}
      renderItem={renderUserItem}
      keyExtractor={(item, index) => `${activeTab}-${item.name}-${index}`}
      numColumns={2}
      contentContainerStyle={styles.gridContainer}
      columnWrapperStyle={styles.row}
      showsVerticalScrollIndicator={false}
      // パフォーマンス最適化
      removeClippedSubviews={true} // 画面外のビューを削除
      maxToRenderPerBatch={10} // バッチ毎のレンダリング上限
      windowSize={10} // レンダリングウィンドウサイズ
      initialNumToRender={6} // 初期レンダリング数
      getItemLayout={(data, index) => ({
        length: gridCardSize.height,
        offset: gridCardSize.height * Math.floor(index / 2),
        index,
      })} // アイテムレイアウトの事前計算（スクロールパフォーマンス向上）
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
});

export default ReactionsTabList;

