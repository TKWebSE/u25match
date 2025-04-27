import { tagDataMap } from '@constants/tagDataMap';
import { colors, spacing } from '@styles/globalStyles';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// タグの型定義
export interface Tag {
  id: string;
  name: string;
  imageUrl: string;
  userCount: number;
  category: string;
}

interface TagItemProps {
  tag: Tag;
  index: number;
  onPress: (tag: Tag) => void;
  isSelected?: boolean;
  isMaxReached?: boolean;
}

const TagItem: React.FC<TagItemProps> = ({ tag, index, onPress, isSelected = false, isMaxReached = false }) => {
  const tagImage = tagDataMap[tag.id as keyof typeof tagDataMap]?.image || require('@assets/tag-images/cat.jpg');
  const isDisabled = !isSelected && isMaxReached;

  return (
    <TouchableOpacity
      key={`${tag.name}-${index}`}
      style={[
        styles.tagItem,
        isSelected && styles.tagItemSelected,
        isDisabled && styles.tagItemDisabled
      ]}
      onPress={() => onPress(tag)}
      activeOpacity={isDisabled ? 1 : 0.8}
      disabled={isDisabled}
    >
      <View style={styles.imageContainer}>
        <Image source={tagImage} style={styles.tagImage} />
        {isSelected && (
          <View style={styles.selectedBadge}>
            <Text style={styles.selectedText}>✓</Text>
          </View>
        )}
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{tag.userCount}人</Text>
        </View>
      </View>
      <View style={styles.tagContent}>
        <Text style={[
          styles.tagName,
          isSelected && styles.tagNameSelected,
          isDisabled && styles.tagNameDisabled
        ]}>{tag.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
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
  countText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
  tagContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  tagName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2d3748',
    textAlign: 'center',
    lineHeight: 20,
  },
  tagItemSelected: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: colors.primary,
    borderWidth: 2,
  },
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
  tagItemDisabled: {
    opacity: 0.5,
  },
  tagNameDisabled: {
    color: colors.gray400,
  },
});

export default TagItem;
