// Web用リアクションタブコンポーネント
// - いいねと足あとのタブ切り替え
// - アクティブ状態の表示
// - Web向けのスタイリング

import { colors, spacing } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * リアクションタブのプロパティ
 */
interface ReactionTabsProps {
  activeTab: 'likes' | 'footprints';  // 現在アクティブなタブ
  onTabPress: (tab: 'likes' | 'footprints') => void;  // タブが押された時のコールバック
}

/**
 * Web用リアクションタブコンポーネント
 * いいねと足あとのタブを表示し、切り替え機能を提供
 * @param activeTab 現在アクティブなタブ
 * @param onTabPress タブが押された時のコールバック関数
 */
const ReactionTabs: React.FC<ReactionTabsProps> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      {/* いいねタブ */}
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'likes' && styles.activeTab
        ]}
        onPress={() => onTabPress('likes')}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'likes' && styles.activeTabText
        ]}>
          💕 いいね
        </Text>
      </TouchableOpacity>

      {/* 足あとタブ */}
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'footprints' && styles.activeTab
        ]}
        onPress={() => onTabPress('footprints')}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'footprints' && styles.activeTabText
        ]}>
          👣 足あと
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // タブコンテナのスタイル
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 4,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.base,
  },
  // 個別タブのスタイル
  tab: {
    flex: 1,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
  },
  // アクティブなタブのスタイル
  activeTab: {
    backgroundColor: colors.primary,
  },
  // タブテキストのスタイル
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  // アクティブなタブのテキストスタイル
  activeTabText: {
    color: colors.white,
  },
});

export default ReactionTabs;
