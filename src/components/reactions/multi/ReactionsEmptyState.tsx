import EmptyState from '@components/common/EmptyState';
import React from 'react';

/**
 * リアクション画面の空状態表示コンポーネント
 */
interface ReactionsEmptyStateProps {
  /** 現在アクティブなタブ（いいね or 足あと） */
  activeTab: 'likes' | 'footprints';
}

/**
 * リアクション画面の空状態表示コンポーネント
 * 
 * いいねや足あとが存在しない場合に表示されるメッセージコンポーネント。
 * アクティブなタブに応じて適切なメッセージを表示する。
 * 
 * @param activeTab - 現在アクティブなタブ（'likes' | 'footprints'）
 * @returns EmptyStateコンポーネント（タブに応じたメッセージ付き）
 */
const ReactionsEmptyState: React.FC<ReactionsEmptyStateProps> = ({ activeTab }) => {
  // アクティブなタブに応じてメッセージを決定
  const message = activeTab === 'likes'
    ? 'まだ誰かからのいいねがありません。プロフィールを充実させてみましょう！'
    : 'まだ足あとがありません。プロフィールを見に来てくれる人がいないかもしれません。';

  return <EmptyState message={message} />;
};

export default ReactionsEmptyState;
