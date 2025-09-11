import { colors } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

/**
 * 画像インジケーターのプロパティ型定義
 */
interface ImageIndicatorProps {
  images: string[];
  currentIndex: number;
  onImageChange: (index: number) => void;
}

/**
 * 画像インジケーターコンポーネント
 * 
 * 画像カルーセルやギャラリーで現在の画像位置を表示するインジケーターです。
 * 線状のプログレスバーで画像の位置と進捗を視覚的に表現し、
 * タップすることで特定の画像に直接移動できます。
 * 
 * @param {ImageIndicatorProps} props - コンポーネントのプロパティ
 * @param {string[]} props.images - 画像URLの配列
 * @param {number} props.currentIndex - 現在表示中の画像のインデックス
 * @param {Function} props.onImageChange - 画像が変更された時のコールバック関数
 * @returns {React.ReactElement | null} 画像インジケーターコンポーネント（画像が1枚以下の場合はnull）
 */
export default function ImageIndicator({ images, currentIndex, onImageChange }: ImageIndicatorProps) {
  // 画像が1枚以下の場合は表示しない
  if (images.length <= 1) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* 線状のプログレスバー */}
      <View style={styles.progressContainer}>
        {images.map((image, index) => {
          const isActive = index === currentIndex; // 現在の画像かどうか
          const isPassed = index < currentIndex; // 既に通過した画像かどうか

          return (
            <TouchableOpacity
              key={`indicator-${index}`}
              style={[
                styles.progressBar,
                isActive && styles.activeProgressBar, // アクティブな画像のスタイル
                isPassed && styles.passedProgressBar, // 通過済み画像のスタイル
                index === images.length - 1 && styles.lastProgressBar // 最後の画像のスタイル
              ]}
              onPress={() => onImageChange(index)}
              activeOpacity={0.7}
            />
          );
        })}
      </View>
    </View>
  );
}

/**
 * スタイル定義
 */
const styles = StyleSheet.create({
  // インジケーター全体のコンテナ
  container: {
    width: '100%',
    marginTop: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  // プログレスバーのコンテナ
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // シンプルな背景
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  // 個別のプログレスバー
  progressBar: {
    height: 3,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 2,
    marginRight: 3,
  },
  // アクティブな画像のプログレスバー
  activeProgressBar: {
    backgroundColor: colors.primary,
    height: 4,
  },
  // 通過済み画像のプログレスバー
  passedProgressBar: {
    backgroundColor: `${colors.primary}70`, // 70% opacity
  },
  // 最後の画像のプログレスバー（右マージンなし）
  lastProgressBar: {
    marginRight: 0,
  },
}); 
