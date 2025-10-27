import UnifiedUserCard, { User } from '@components/common/mobile/UnifiedUserCard';
import ReactionsEmptyState from '@components/reactions/multi/ReactionsEmptyState';
import ReactionsLoadingState from '@components/reactions/multi/ReactionsLoadingState';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

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
 * リアクションタブのリスト表示コンポーネント（Web版）
 * いいね・足あとタブの共通レンダリング処理を提供
 * Web版では ScrollView を使用
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
  // ローディング中はローディング表示を返す
  if (isLoading) {
    return <ReactionsLoadingState />;
  }

  // データがない場合は空状態を返す
  if (users.length === 0) {
    return <ReactionsEmptyState activeTab={activeTab} />;
  }

  return (
    <ScrollView
      style={styles.webScrollView}
      contentContainerStyle={styles.webScrollContent}
      showsVerticalScrollIndicator={false}
    >
      {users.map((user, index) => (
        <UnifiedUserCard
          key={`${activeTab}-${user.name}-${index}`}
          user={user}
          onPress={onCardPress}
          size={gridCardSize}
          layout="grid"
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  webScrollView: {
    flex: 1,
  },
  webScrollContent: {
    flexGrow: 1,
  },
});

export default ReactionsTabList;

