import React from 'react';
import { StyleSheet, Text } from 'react-native';

/**
 * セクションタイトルコンポーネントのプロパティ
 */
interface SectionTitleProps {
  /** タイトルテキスト */
  title: string;
  /** アイコン（絵文字、オプション） */
  icon?: string;
}

/**
 * セクションタイトルコンポーネント
 * 
 * 設定画面の各セクションのタイトルを表示します。
 * アイコンが指定された場合は、タイトルの前後にアイコンを表示します。
 * 
 * @param title - 表示するタイトルテキスト
 * @param icon - 表示するアイコン（絵文字、オプション）
 * @returns セクションタイトルのJSX要素
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({ title, icon }) => {
  return (
    <Text style={styles.sectionTitle}>
      {icon && `${icon} `}
      {title}
      {icon && ` ${icon}`}
    </Text>
  );
};

/**
 * コンポーネントのスタイル定義
 */
const styles = StyleSheet.create({
  // セクションタイトルのスタイル
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
