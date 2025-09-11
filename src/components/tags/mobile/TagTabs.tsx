import { colors } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

/**
 * タブルートの型定義
 */
interface TabRoute {
  key: string;      // タブの一意キー
  title: string;    // タブに表示するタイトル
}

/**
 * モバイルTagTabsのプロパティ定義
 */
interface TagTabsProps {
  index: number;                                                      // 現在アクティブなタブのインデックス
  routes: TabRoute[];                                                 // タブのルート配列
  onIndexChange: (index: number) => void;                            // タブが変更された時のコールバック
  renderScene: ({ route }: { route: TabRoute }) => React.ReactNode;  // 各タブのシーンをレンダリングする関数
  screenWidth: number;                                               // 画面幅（レイアウト計算用）
}

/**
 * モバイル用タグタブコンポーネント
 * 
 * react-native-tab-viewを使用したモバイル専用のタブ実装。
 * スワイプ操作とタップ操作の両方でタブ切り替えが可能。
 * 
 * 主な機能：
 * - タブの表示と切り替え
 * - スワイプによるタブ切り替え
 * - アニメーション付きのタブ切り替え
 * - カスタムタブバーのスタイリング
 * - パフォーマンス最適化（lazy loading無効）
 */
const TagTabs: React.FC<TagTabsProps> = ({
  index,
  routes,
  onIndexChange,
  renderScene,
  screenWidth,
}) => {
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={onIndexChange}
      initialLayout={{ width: screenWidth }}  // 初期レイアウト幅を設定
      animationEnabled={true}                 // アニメーションを有効化
      swipeEnabled={true}                     // スワイプ操作を有効化
      lazy={false}                            // レイジーローディングを無効化（パフォーマンス重視）
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={styles.tabBar}
          tabStyle={styles.tabStyle}
          indicatorStyle={styles.tabIndicator}
          activeColor={colors.primary}        // アクティブタブの色
          inactiveColor={colors.textSecondary} // 非アクティブタブの色
          scrollEnabled={true}                // タブバーのスクロールを有効化
          pressColor="transparent"            // タップ時の色を透明に
          pressOpacity={0.8}                  // タップ時の透明度
          indicatorContainerStyle={styles.indicatorContainer}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  // タブバーのメインスタイル
  tabBar: {
    backgroundColor: colors.background,
    elevation: 0,                    // Androidの影を無効化
    shadowOpacity: 0,                // iOSの影を無効化
    borderBottomWidth: 1,            // 下側にボーダーを追加
    borderBottomColor: colors.gray200,
    position: 'relative',
  },

  // 個別タブのスタイル
  tabStyle: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    minWidth: 80,                    // 最小幅を設定してタッチしやすくする
  },

  // アクティブタブのインジケーター（下線）
  tabIndicator: {
    backgroundColor: colors.primary,
    height: 3,                       // インジケーターの高さ
  },

  // インジケーターコンテナのスタイル
  indicatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    zIndex: 1,                       // 他の要素より前面に表示
  },
});

export default TagTabs;
