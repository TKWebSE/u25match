// src/components/search/mobile/SearchModal.tsx
// 検索モーダルコンポーネント

import { MaterialIcons } from '@expo/vector-icons';
import { useStrictAuth } from '@hooks/auth';
import { useProfile } from '@hooks/profile';
import { myProfileMock } from '@mock/myProfileMock';
import { SearchCategory } from '@my-types/app/search';
import { colors, spacing } from '@styles/globalStyles';
import { getMembershipType } from '@utils/membershipUtils';
import React from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
  const user = useStrictAuth();
  const { profile } = useProfile(user.uid);

  // 会員種別の判定
  const membershipType = getMembershipType(profile || undefined);

  // ユーザーの設定タグから動的にカテゴリを生成
  const getUserTagCategories = (): SearchCategory[] => {
    const userTags = myProfileMock.tags || [];
    return userTags.map((tag, index) => ({
      key: `tag-${tag.id}`,
      title: `🏷️ ${tag.name}`,
      icon: 'favorite',
      isPremiumRequired: true, // タグ系はプレミアム限定
    }));
  };

  // 基本的なカテゴリ（指定された順序）
  const basicCategories: SearchCategory[] = [
    { key: 'recommended', title: '⭐ おすすめ', icon: 'star', isPremiumRequired: false },
    { key: 'online', title: '🟢 オンライン', icon: 'circle', isPremiumRequired: false },
    { key: 'beginner', title: '🌱 ビギナー', icon: 'new-releases', isPremiumRequired: false },
    { key: 'popular', title: '🔥 人気', icon: 'whatshot', isPremiumRequired: false },
    { key: 'nearby', title: '📍 近くの人', icon: 'location-on', isPremiumRequired: false },
    { key: 'student', title: '🎓 学生', icon: 'school', isPremiumRequired: true },
    { key: 'working', title: '💼 社会人', icon: 'work', isPremiumRequired: true },
    { key: 'marriage', title: '💍 結婚したい', icon: 'favorite', isPremiumRequired: true },
  ];

  // カテゴリ選択時の処理
  const handleCategorySelect = (category: SearchCategory) => {
    // プレミアム限定カテゴリで無料会員の場合はアラートを表示
    if (category.isPremiumRequired && membershipType !== 'premium') {
      Alert.alert(
        'プレミアム会員限定機能',
        'この検索機能をご利用いただくには、プレミアム会員への登録が必要です。',
        [
          {
            text: 'OK',
            onPress: () => {
              // アラートを閉じるだけ
            }
          }
        ]
      );
      return;
    }

    // 通常のカテゴリ選択処理
    onCategorySelect(category.key);
  };

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
            {searchCategories.map((category) => {
              const isDisabled = category.isPremiumRequired && membershipType !== 'premium';

              // プレミアム限定で無料会員の場合はグレーアウトしたViewを表示
              if (isDisabled) {
                return (
                  <View
                    key={category.key}
                    style={[
                      styles.categoryButton,
                      styles.categoryButtonDisabled
                    ]}
                  >
                    <MaterialIcons
                      name={category.icon as any}
                      size={28}
                      color={colors.gray400}
                    />
                    <Text style={[
                      styles.categoryButtonText,
                      styles.categoryButtonTextDisabled
                    ]}>
                      {category.title}
                    </Text>
                    <Text style={styles.premiumBadge}>⭐</Text>
                  </View>
                );
              }

              // 通常のTouchableOpacityを表示
              return (
                <TouchableOpacity
                  key={category.key}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.key && styles.categoryButtonSelected
                  ]}
                  onPress={() => handleCategorySelect(category)}
                  activeOpacity={0.7}
                >
                  <MaterialIcons
                    name={category.icon as any}
                    size={28}
                    color={
                      selectedCategory === category.key
                        ? '#FFFFFF'
                        : colors.primary
                    }
                  />
                  <Text style={[
                    styles.categoryButtonText,
                    selectedCategory === category.key && styles.categoryButtonTextSelected
                  ]}>
                    {category.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
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
  categoryButtonDisabled: {
    backgroundColor: colors.gray100,
    borderColor: colors.gray300,
    opacity: 0.6,
  },
  categoryButtonTextDisabled: {
    color: colors.gray400,
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 16,
  },
});

export default SearchModal;
