import { Ionicons } from '@expo/vector-icons';
import { borderRadius, colors, shadows, spacing, typography } from '@styles/globalStyles';
import React, { useState } from 'react';
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export interface FilterOptions {
  ageRange: [number, number];
  location: string[];
  onlineOnly: boolean;
  verifiedOnly: boolean;
  tags: string[];
  sortBy: 'newest' | 'popular' | 'distance' | 'relevance';
}

interface AdvancedFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  availableTags: string[];
  availableLocations: string[];
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  availableTags,
  availableLocations
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);
  const [slideAnim] = useState(new Animated.Value(0));

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    setIsModalVisible(false);
    // スライドアニメーション
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const resetFilters = () => {
    const defaultFilters: FilterOptions = {
      ageRange: [18, 65],
      location: [],
      onlineOnly: false,
      verifiedOnly: false,
      tags: [],
      sortBy: 'newest'
    };
    setLocalFilters(defaultFilters);
  };

  const openModal = () => {
    setIsModalVisible(true);
    Animated.spring(slideAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.ageRange[0] !== 18 || filters.ageRange[1] !== 65) count++;
    if (filters.location.length > 0) count++;
    if (filters.onlineOnly) count++;
    if (filters.verifiedOnly) count++;
    if (filters.tags.length > 0) count++;
    if (filters.sortBy !== 'newest') count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <>
      <TouchableOpacity style={styles.filterButton} onPress={openModal}>
        <Ionicons name="filter" size={20} color={colors.textPrimary} />
        <Text style={styles.filterButtonText}>フィルター</Text>
        {activeFiltersCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{activeFiltersCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>詳細フィルター</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Ionicons name="close" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {/* 年齢範囲 */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>年齢範囲</Text>
              <View style={styles.ageRangeContainer}>
                <Text style={styles.ageText}>{localFilters.ageRange[0]}歳</Text>
                <View style={styles.ageSlider}>
                  <View style={styles.ageSliderTrack} />
                  <View style={styles.ageSliderFill} />
                  <View style={styles.ageSliderThumb} />
                </View>
                <Text style={styles.ageText}>{localFilters.ageRange[1]}歳</Text>
              </View>
            </View>

            {/* 地域 */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>地域</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.tagContainer}>
                  {availableLocations.map((location) => (
                    <TouchableOpacity
                      key={location}
                      style={[
                        styles.tag,
                        localFilters.location.includes(location) && styles.tagActive
                      ]}
                      onPress={() => {
                        const newLocations = localFilters.location.includes(location)
                          ? localFilters.location.filter(l => l !== location)
                          : [...localFilters.location, location];
                        handleFilterChange('location', newLocations);
                      }}
                    >
                      <Text style={[
                        styles.tagText,
                        localFilters.location.includes(location) && styles.tagTextActive
                      ]}>
                        {location}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* オンライン状態 */}
            <View style={styles.filterSection}>
              <View style={styles.switchRow}>
                <Text style={styles.sectionTitle}>オンラインのみ</Text>
                <Switch
                  value={localFilters.onlineOnly}
                  onValueChange={(value) => handleFilterChange('onlineOnly', value)}
                  trackColor={{ false: colors.gray300, true: colors.primary }}
                  thumbColor={colors.white}
                />
              </View>
            </View>

            {/* 認証済み */}
            <View style={styles.filterSection}>
              <View style={styles.switchRow}>
                <Text style={styles.sectionTitle}>認証済みのみ</Text>
                <Switch
                  value={localFilters.verifiedOnly}
                  onValueChange={(value) => handleFilterChange('verifiedOnly', value)}
                  trackColor={{ false: colors.gray300, true: colors.primary }}
                  thumbColor={colors.white}
                />
              </View>
            </View>

            {/* タグ */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>興味・趣味</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.tagContainer}>
                  {availableTags.map((tag) => (
                    <TouchableOpacity
                      key={tag}
                      style={[
                        styles.tag,
                        localFilters.tags.includes(tag) && styles.tagActive
                      ]}
                      onPress={() => {
                        const newTags = localFilters.tags.includes(tag)
                          ? localFilters.tags.filter(t => t !== tag)
                          : [...localFilters.tags, tag];
                        handleFilterChange('tags', newTags);
                      }}
                    >
                      <Text style={[
                        styles.tagText,
                        localFilters.tags.includes(tag) && styles.tagTextActive
                      ]}>
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* ソート */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>並び順</Text>
              <View style={styles.sortOptions}>
                {[
                  { key: 'newest', label: '新着順', icon: 'time' },
                  { key: 'popular', label: '人気順', icon: 'heart' },
                  { key: 'distance', label: '距離順', icon: 'location' },
                  { key: 'relevance', label: '関連度順', icon: 'star' }
                ].map((option) => (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.sortOption,
                      localFilters.sortBy === option.key && styles.sortOptionActive
                    ]}
                    onPress={() => handleFilterChange('sortBy', option.key)}
                  >
                    <Ionicons
                      name={option.icon as any}
                      size={16}
                      color={localFilters.sortBy === option.key ? colors.white : colors.textSecondary}
                    />
                    <Text style={[
                      styles.sortOptionText,
                      localFilters.sortBy === option.key && styles.sortOptionTextActive
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Text style={styles.resetButtonText}>リセット</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.applyButtonText}>適用</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    marginRight: spacing.base,
    ...shadows.base,
  },
  filterButtonText: {
    fontSize: typography.sm,
    color: colors.textPrimary,
    marginLeft: spacing.xs,
    fontWeight: '500',
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.xs,
  },
  badgeText: {
    color: colors.white,
    fontSize: typography.xs,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  modalTitle: {
    fontSize: typography.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  modalContent: {
    flex: 1,
    padding: spacing.lg,
  },
  filterSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.base,
  },
  ageRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ageText: {
    fontSize: typography.base,
    color: colors.textSecondary,
    minWidth: 40,
  },
  ageSlider: {
    flex: 1,
    height: 4,
    backgroundColor: colors.gray300,
    borderRadius: 2,
    marginHorizontal: spacing.base,
    position: 'relative',
  },
  ageSliderTrack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: colors.gray300,
    borderRadius: 2,
  },
  ageSliderFill: {
    position: 'absolute',
    top: 0,
    left: '25%',
    right: '25%',
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  ageSliderThumb: {
    position: 'absolute',
    top: -6,
    left: '25%',
    width: 16,
    height: 16,
    backgroundColor: colors.primary,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.white,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  tag: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray300,
  },
  tagActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tagText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
  tagTextActive: {
    color: colors.white,
    fontWeight: '500',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sortOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray300,
    gap: spacing.xs,
  },
  sortOptionActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sortOptionText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
  sortOptionTextActive: {
    color: colors.white,
    fontWeight: '500',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: spacing.lg,
    gap: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.gray300,
  },
  resetButton: {
    flex: 1,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray300,
  },
  resetButtonText: {
    fontSize: typography.base,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  applyButton: {
    flex: 1,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: typography.base,
    color: colors.white,
    fontWeight: '600',
  },
});

export default AdvancedFilters;
