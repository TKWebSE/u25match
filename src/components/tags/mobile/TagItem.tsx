import { tagDataMap } from '@constants/tagDataMap';
import { colors, spacing } from '@styles/globalStyles';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * タグの型定義
 * タグアイテムで使用される基本的なタグ情報を定義
 */
export interface Tag {
  id: string;           // タグの一意ID
  name: string;         // タグの表示名
  imageUrl: string;     // タグの画像URL
  userCount: number;    // そのタグを使用しているユーザー数
  category: string;     // タグのカテゴリ
}

/**
 * モバイルTagItemのプロパティ定義
 */
interface TagItemProps {
  tag: Tag;                           // 表示するタグ情報
  index: number;                      // リスト内でのインデックス
  onPress: (tag: Tag) => void;        // タグがタップされた時のコールバック
  isSelected?: boolean;               // タグが選択されているかどうか
  isMaxReached?: boolean;             // 最大選択数に達しているかどうか
}

/**
 * モバイル用タグアイテムコンポーネント
 * 
 * タグの選択・表示機能を提供するモバイル専用コンポーネント。
 * 選択状態や最大選択数に応じた視覚的フィードバックを表示する。
 * 
 * 主な機能：
 * - タグ画像とユーザー数の表示
 * - 選択状態の視覚的フィードバック（チェックマーク、色変更）
 * - 最大選択数に達した場合の無効化表示
 * - タップによる選択/選択解除
 * - モバイル特有のタッチフィードバック
 */
const TagItem: React.FC<TagItemProps> = ({ tag, index, onPress, isSelected = false, isMaxReached = false }) => {
  // タグデータマップから画像を取得、見つからない場合はデフォルト画像を使用
  const tagImage = tagDataMap[tag.id as keyof typeof tagDataMap]?.image || require('@assets/tag-images/cat.jpg');

  // 無効状態の判定：選択されていない かつ 最大選択数に達している
  const isDisabled = !isSelected && isMaxReached;

  return (
    <TouchableOpacity
      key={`${tag.name}-${index}`}
      style={[
        styles.tagItem,
        isSelected && styles.tagItemSelected,      // 選択状態のスタイル
        isDisabled && styles.tagItemDisabled      // 無効状態のスタイル
      ]}
      onPress={() => onPress(tag)}
      activeOpacity={isDisabled ? 1 : 0.8}        // 無効時はタッチフィードバックを無効化
      disabled={isDisabled}                       // 無効状態の場合はタップを無効化
    >
      {/* タグ画像コンテナ */}
      <View style={styles.imageContainer}>
        <Image source={tagImage} style={styles.tagImage} />
        {/* 選択状態のチェックマーク */}
        {isSelected && (
          <View style={styles.selectedBadge}>
            <Text style={styles.selectedText}>✓</Text>
          </View>
        )}
        {/* ユーザー数バッジ */}
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{tag.userCount}人</Text>
        </View>
      </View>
      {/* タグ名コンテナ */}
      <View style={styles.tagContent}>
        <Text style={[
          styles.tagName,
          isSelected && styles.tagNameSelected,    // 選択状態のテキストスタイル
          isDisabled && styles.tagNameDisabled    // 無効状態のテキストスタイル
        ]}>{tag.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // メインのタグアイテムスタイル
  tagItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    width: '48%',
    marginBottom: spacing.base,
    minHeight: 180,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
  },

  // 画像コンテナ
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
  },

  // タグ画像
  tagImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },

  // ユーザー数バッジ
  countBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 32,
    alignItems: 'center',
  },

  // ユーザー数テキスト
  countText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },

  // タグ名コンテナ
  tagContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },

  // タグ名テキスト
  tagName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2d3748',
    textAlign: 'center',
    lineHeight: 20,
  },

  // === 選択状態のスタイル ===
  tagItemSelected: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: colors.primary,
    borderWidth: 2,
  },

  // 選択状態のチェックマークバッジ
  selectedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  tagNameSelected: {
    color: colors.primary,
  },

  // === 無効状態のスタイル ===
  tagItemDisabled: {
    opacity: 0.5,
  },
  tagNameDisabled: {
    color: colors.gray400,
  },
});

export default TagItem;
