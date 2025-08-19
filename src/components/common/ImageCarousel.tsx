import { colors, spacing, typography } from '@styles/globalStyles';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

interface ImageCarouselProps {
  title: string;
  images: Array<{
    id: string;
    url: string;
    alt?: string;
  }>;
  onImagePress?: (imageId: string) => void;
}

/**
 * タイトルと画像を横スクロールで表示するカルーセルコンポーネント
 */
export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  title,
  images,
  onImagePress
}) => {
  const { width } = useWindowDimensions();

  // 画面幅に応じて画像サイズを調整
  const imageSize = Math.min(width * 0.3, 200); // 最大200px、画面幅の30%
  const imageSpacing = spacing.md;

  return (
    <View style={styles.container}>
      {/* タイトルセクション */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* 画像カルーセル */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
        style={styles.carousel}
      >
        {images.map((image, index) => (
          <View
            key={image.id}
            style={[
              styles.imageWrapper,
              {
                width: imageSize,
                height: imageSize,
                marginRight: index === images.length - 1 ? 0 : imageSpacing,
              }
            ]}
          >
            <View
              style={[
                styles.imageContainer,
                {
                  width: imageSize,
                  height: imageSize,
                }
              ]}
            >
              {/* 画像プレースホルダー（実際の実装ではImageコンポーネントを使用） */}
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>
                  {image.alt || '画像'}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.lg,
  },
  titleSection: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.base,
  },
  title: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  carousel: {
    flexGrow: 0,
  },
  carouselContainer: {
    paddingHorizontal: spacing.base,
  },
  imageWrapper: {
    borderRadius: spacing.base,
    overflow: 'hidden',
  },
  imageContainer: {
    borderRadius: spacing.base,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  imagePlaceholderText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
