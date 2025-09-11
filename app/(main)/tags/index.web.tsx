import { WebSceneRenderer, WebTagTabs } from '@components/tags';
import { useTagRoutes } from '@hooks/useTagRoutes';
import { Tag, useTagsData } from '@hooks/useTagsData';
import { useTagSelection } from '@hooks/useTagSelection';
import { colors, spacing } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const TagsScreen = () => {
  const router = useRouter();
  const { index, setIndex, routes } = useTagRoutes();
  const { allTags, categorizedTags } = useTagsData();
  const {
    selectedTagIds,
    selectedTags,
    toggleTagSelection,
    saveSelectedTags,
    selectedCount,
    maxTags,
    isMaxReached
  } = useTagSelection();
  const [isSaving, setIsSaving] = useState(false);

  // タグタップハンドラーをメモ化
  const handleTagPress = useCallback((tag: Tag) => {
    toggleTagSelection(tag.id);
  }, [toggleTagSelection]);

  // 保存ボタンハンドラー
  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      const result = await saveSelectedTags();
      if (result.success) {
        Alert.alert('保存完了', 'タグの設定を保存しました。');
        router.back();
      } else {
        Alert.alert('エラー', '保存に失敗しました。');
      }
    } catch (error) {
      Alert.alert('エラー', '保存に失敗しました。');
    } finally {
      setIsSaving(false);
    }
  }, [saveSelectedTags, router]);

  // シーン定義
  const renderScene = ({ route }: { route: { key: string } }) => (
    <WebSceneRenderer
      routeKey={route.key}
      allTags={allTags}
      categorizedTags={categorizedTags}
      onTagPress={handleTagPress}
      selectedTagIds={selectedTagIds}
      isMaxReached={isMaxReached}
    />
  );

  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>← 戻る</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>タグを選択</Text>
        <TouchableOpacity
          style={[
            styles.saveButton,
            isSaving && styles.saveButtonDisabled
          ]}
          onPress={handleSave}
          disabled={isSaving}
          activeOpacity={0.7}
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? '保存中...' : '保存'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 選択されたタグ数表示 */}
      <View style={styles.selectedCountContainer}>
        <Text style={[
          styles.selectedCountText,
          isMaxReached && styles.selectedCountTextMax
        ]}>
          {selectedCount}/{maxTags}個のタグが選択されています
        </Text>
      </View>

      {/* 選択中のタグ一覧 */}
      {selectedCount > 0 && (
        <View style={styles.selectedTagsContainer}>
          <Text style={styles.selectedTagsTitle}>選択中のタグ</Text>
          <View style={styles.selectedTagsList}>
            {selectedTags.map((tag) => (
              <TouchableOpacity
                key={tag.id}
                style={styles.selectedTagItem}
                onPress={() => toggleTagSelection(tag.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.selectedTagText}>{tag.name}</Text>
                <Text style={styles.removeTagText}>×</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* タグタブ */}
      <WebTagTabs
        index={index}
        routes={routes}
        onIndexChange={setIndex}
        renderScene={renderScene}
        screenWidth={screenWidth}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  backButton: {
    padding: spacing.sm,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  saveButtonDisabled: {
    backgroundColor: colors.gray300,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  selectedCountContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.gray100,
  },
  selectedCountText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  selectedCountTextMax: {
    color: colors.primary,
    fontWeight: '600',
  },
  selectedTagsContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  selectedTagsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  selectedTagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  selectedTagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginBottom: spacing.xs,
  },
  selectedTagText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
    marginRight: spacing.xs,
  },
  removeTagText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    lineHeight: 16,
  },
});

export default TagsScreen;
