// src/components/search/mobile/SearchModal.tsx
// 検索モーダルコンポーネント

import { MaterialIcons } from '@expo/vector-icons';
import { myProfileMock } from '@mock/myProfileMock';
import { colors, spacing } from '@styles/globalStyles';
import { SearchCategory } from '@types/search';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SearchModalProps {
  visible: boolean;
  selectedCategory: string | null;
  onClose: () => void;
  onCategorySelect: (categoryKey: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
  visible,
  selectedCategory,
  onClose,
  onCategorySelect,
}) => {
  // ユーザーの設定タグから動的にカテゴリを生成
  const getUserTagCategories = (): SearchCategory[] => {
    const userTags = myProfileMock.tags || [];
    return userTags.map((tag, index) => ({
      key: `tag-${tag.id}`,
      title: `🏷️ ${tag.name}好き`,
      icon: 'favorite',
    }));
  };

  // 基本的なカテゴリ（指定された順序）
  const basicCategories: SearchCategory[] = [
    { key: 'recommended', title: '⭐ おすすめ', icon: 'star' },
    { key: 'online', title: '🟢 オンライン', icon: 'circle' },
    { key: 'beginner', title: '🌱 ビギナー', icon: 'new-releases' },
    { key: 'popular', title: '🔥 人気', icon: 'whatshot' },
    { key: 'nearby', title: '📍 近くの人', icon: 'location-on' },
    { key: 'student', title: '🎓 学生', icon: 'school' },
    { key: 'working', title: '💼 社会人', icon: 'work' },
  ];

  // ユーザータグカテゴリと基本カテゴリを結合（ユーザータグを最後に配置）
  const searchCategories = [...basicCategories, ...getUserTagCategories()];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer} edges={['top']}>
        {/* モーダルヘッダー */}
        <View style={styles.modalHeader}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <MaterialIcons name="close" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>検索</Text>
          <View style={styles.placeholder} />
        </View>

        {/* 検索カテゴリボタン */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>カテゴリで絞り込み</Text>
          <View style={styles.categoryGrid}>
            {searchCategories.map((category) => (
              <TouchableOpacity
                key={category.key}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.key && styles.categoryButtonSelected
                ]}
                onPress={() => onCategorySelect(category.key)}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name={category.icon as any}
                  size={28}
                  color={selectedCategory === category.key ? '#FFFFFF' : colors.primary}
                />
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category.key && styles.categoryButtonTextSelected
                ]}>
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  closeButton: {
    padding: spacing.sm,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  placeholder: {
    width: 40,
  },
  categoryContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.base,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    width: '48%',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  categoryButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
  categoryButtonTextSelected: {
    color: '#FFFFFF',
  },
});

export default SearchModal;
