import { colors, spacing } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

/**
 * タブボタンのプロパティ定義
 */
interface TabButtonProps {
  title: string;         // ボタンに表示するテキスト
  isActive: boolean;     // ボタンがアクティブ（選択中）かどうか
  onPress: () => void;   // ボタンがタップされた時のコールバック
}

/**
 * 共通タブボタンコンポーネント
 * 
 * モバイルとWebの両方で使用される共通のタブボタンコンポーネント。
 * タブ切り替え機能を提供し、アクティブ状態に応じた視覚的フィードバックを表示する。
 * 
 * 主な機能：
 * - タブの表示とタップ処理
 * - アクティブ状態の視覚的フィードバック（背景色、ボーダー、テキスト色の変更）
 * - タッチフィードバック（activeOpacity）
 * - プラットフォーム非依存の実装
 */
const TabButton: React.FC<TabButtonProps> = ({ title, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.tabButton,
        isActive && styles.activeTabButton    // アクティブ状態のスタイル
      ]}
      onPress={onPress}
      activeOpacity={0.8}                     // タッチ時の透明度フィードバック
    >
      <Text
        style={[
          styles.tabButtonText,
          isActive && styles.activeTabButtonText  // アクティブ状態のテキストスタイル
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // 基本のタブボタンスタイル
  tabButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    minWidth: 80,                    // 最小幅を設定してタッチしやすくする
    alignItems: 'center',            // テキストを中央揃え
  },

  // アクティブ状態のタブボタンスタイル
  activeTabButton: {
    backgroundColor: colors.primary + '20',  // プライマリカラーの20%透明度
    borderBottomWidth: 2,                    // 下側にボーダーを追加
    borderBottomColor: colors.primary,       // ボーダーの色をプライマリカラーに
  },

  // 基本のテキストスタイル
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,     // 非アクティブ時はセカンダリテキスト色
    textAlign: 'center',
  },

  // アクティブ状態のテキストスタイル
  activeTabButtonText: {
    color: colors.primary,           // アクティブ時はプライマリカラー
    fontWeight: '700',              // アクティブ時は太字に
  },
});

export default TabButton;
