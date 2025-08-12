import { Ionicons } from '@expo/vector-icons';
import { borderRadius, colors, shadows, spacing, typography } from '@styles/globalStyles';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface AdvancedSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onVoiceSearch: (query: string) => void;
  onImageSearch: (imageUri: string) => void;
  onAISearch: (query: string) => void;
  placeholder?: string;
}

const AdvancedSearchBar: React.FC<AdvancedSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onVoiceSearch,
  onImageSearch,
  onAISearch,
  placeholder = "名前、地域、年齢、趣味で検索..."
}) => {
  const [isAdvancedModalVisible, setIsAdvancedModalVisible] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    '東京の20代女性',
    '音楽好きな人',
    'ゲーム仲間',
    'カフェ好き'
  ]);
  const [recommendedSearches] = useState<string[]>([
    '同じ趣味の人',
    '近所の人',
    'オンラインの人',
    '写真が上手い人'
  ]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    ageRange: [18, 50],
    location: '',
    interests: [] as string[],
    onlineOnly: false,
    verifiedOnly: false
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    if (showSuggestions) {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: -50, duration: 200, useNativeDriver: true })
      ]).start();
    }
  }, [showSuggestions]);

  // 検索履歴に追加
  const addToHistory = (query: string) => {
    if (query.trim() && !searchHistory.includes(query.trim())) {
      const newHistory = [query.trim(), ...searchHistory.slice(0, 9)];
      setSearchHistory(newHistory);
    }
  };

  // 検索実行
  const handleSearch = (query: string) => {
    onSearchChange(query);
    addToHistory(query);
    setShowSuggestions(false);
  };

  // AI検索実行
  const handleAISearch = () => {
    if (searchQuery.trim()) {
      onAISearch(searchQuery);
      addToHistory(`AI検索: ${searchQuery}`);
      setShowSuggestions(false);
    }
  };

  // 画像検索実行
  const handleImageSearch = () => {
    // 実際の実装では、カメラロールから画像を選択する処理
    Alert.alert(
      '画像検索',
      '画像検索機能は現在開発中です。\n将来的に写真から人物を認識して検索できるようになります。',
      [{ text: 'OK' }]
    );
  };

  // 音声検索実行
  const handleVoiceSearch = () => {
    onVoiceSearch('音声検索機能は現在利用できません');
  };

  // 高度な検索モーダルを開く
  const openAdvancedSearch = () => {
    setIsAdvancedModalVisible(true);
  };

  // フィルター適用
  const applyFilters = () => {
    let filterQuery = `フィルター: ${filterOptions.ageRange[0]}-${filterOptions.ageRange[1]}歳`;
    if (filterOptions.location) filterQuery += ` ${filterOptions.location}`;
    if (filterOptions.interests.length > 0) filterQuery += ` ${filterOptions.interests.join(',')}`;
    if (filterOptions.onlineOnly) filterQuery += ' オンラインのみ';
    if (filterOptions.verifiedOnly) filterQuery += ' 認証済みのみ';

    handleSearch(filterQuery);
    setIsAdvancedModalVisible(false);
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder={placeholder}
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={(text) => {
              onSearchChange(text);
              setShowSuggestions(text.length > 0);
            }}
            onFocus={() => setShowSuggestions(true)}
            clearButtonMode="while-editing"
          />

          {/* AI検索ボタン */}
          <TouchableOpacity
            style={[styles.actionButton, styles.aiButton]}
            onPress={handleAISearch}
            disabled={!searchQuery.trim()}
          >
            <Ionicons name="sparkles" size={18} color={colors.primary} />
          </TouchableOpacity>

          {/* 画像検索ボタン */}
          <TouchableOpacity
            style={[styles.actionButton, styles.imageButton]}
            onPress={handleImageSearch}
          >
            <Ionicons name="camera" size={18} color={colors.secondary} />
          </TouchableOpacity>

          {/* 音声検索ボタン */}
          <TouchableOpacity
            style={[styles.actionButton, styles.voiceButton]}
            onPress={handleVoiceSearch}
          >
            <Ionicons name="mic-outline" size={18} color={colors.textSecondary} />
          </TouchableOpacity>

          {/* 高度な検索ボタン */}
          <TouchableOpacity
            style={[styles.actionButton, styles.advancedButton]}
            onPress={openAdvancedSearch}
          >
            <Ionicons name="options" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* 検索提案 */}
        {showSuggestions && (
          <Animated.View
            style={[
              styles.suggestionsContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <ScrollView style={styles.suggestionsScroll}>
              {/* 最近の検索 */}
              {recentSearches.length > 0 && (
                <View style={styles.suggestionSection}>
                  <Text style={styles.suggestionTitle}>最近の検索</Text>
                  {recentSearches.slice(0, 3).map((item, index) => (
                    <TouchableOpacity
                      key={`recent-${index}`}
                      style={styles.suggestionItem}
                      onPress={() => handleSearch(item)}
                    >
                      <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                      <Text style={styles.suggestionText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* おすすめ検索 */}
              <View style={styles.suggestionSection}>
                <Text style={styles.suggestionTitle}>おすすめ検索</Text>
                {recommendedSearches.map((item, index) => (
                  <TouchableOpacity
                    key={`recommended-${index}`}
                    style={styles.suggestionItem}
                    onPress={() => handleSearch(item)}
                  >
                    <Ionicons name="trending-up-outline" size={16} color={colors.primary} />
                    <Text style={styles.suggestionText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* 検索履歴 */}
              <View style={styles.suggestionSection}>
                <Text style={styles.suggestionTitle}>検索履歴</Text>
                {searchHistory.slice(0, 5).map((item, index) => (
                  <TouchableOpacity
                    key={`history-${index}`}
                    style={styles.suggestionItem}
                    onPress={() => handleSearch(item)}
                  >
                    <Ionicons name="search-outline" size={16} color={colors.textSecondary} />
                    <Text style={styles.suggestionText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Animated.View>
        )}
      </View>

      {/* 高度な検索モーダル */}
      <Modal
        visible={isAdvancedModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsAdvancedModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>高度な検索</Text>
              <TouchableOpacity onPress={() => setIsAdvancedModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {/* 年齢範囲 */}
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>年齢範囲</Text>
                <View style={styles.ageRangeContainer}>
                  <Text style={styles.ageText}>{filterOptions.ageRange[0]}歳</Text>
                  <View style={styles.ageSlider}>
                    <View style={[styles.ageSliderTrack, { width: `${(filterOptions.ageRange[1] - filterOptions.ageRange[0]) / 32 * 100}%` }]} />
                  </View>
                  <Text style={styles.ageText}>{filterOptions.ageRange[1]}歳</Text>
                </View>
              </View>

              {/* 地域 */}
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>地域</Text>
                <View style={styles.locationChips}>
                  {['東京', '大阪', '名古屋', '福岡', '札幌'].map((location) => (
                    <TouchableOpacity
                      key={location}
                      style={[
                        styles.locationChip,
                        filterOptions.location === location && styles.locationChipActive
                      ]}
                      onPress={() => setFilterOptions(prev => ({
                        ...prev,
                        location: prev.location === location ? '' : location
                      }))}
                    >
                      <Text style={[
                        styles.locationChipText,
                        filterOptions.location === location && styles.locationChipTextActive
                      ]}>
                        {location}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* 興味・趣味 */}
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>興味・趣味</Text>
                <View style={styles.interestChips}>
                  {['音楽', '映画', 'ゲーム', 'スポーツ', '料理', '旅行', 'アート', '読書'].map((interest) => (
                    <TouchableOpacity
                      key={interest}
                      style={[
                        styles.interestChip,
                        filterOptions.interests.includes(interest) && styles.interestChipActive
                      ]}
                      onPress={() => setFilterOptions(prev => ({
                        ...prev,
                        interests: prev.interests.includes(interest)
                          ? prev.interests.filter(i => i !== interest)
                          : [...prev.interests, interest]
                      }))}
                    >
                      <Text style={[
                        styles.interestChipText,
                        filterOptions.interests.includes(interest) && styles.interestChipTextActive
                      ]}>
                        {interest}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* その他のオプション */}
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>その他のオプション</Text>
                <View style={styles.optionRow}>
                  <Text style={styles.optionLabel}>オンラインのみ</Text>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      filterOptions.onlineOnly && styles.toggleButtonActive
                    ]}
                    onPress={() => setFilterOptions(prev => ({
                      ...prev,
                      onlineOnly: !prev.onlineOnly
                    }))}
                  >
                    <View style={[
                      styles.toggleCircle,
                      filterOptions.onlineOnly && styles.toggleCircleActive
                    ]} />
                  </TouchableOpacity>
                </View>
                <View style={styles.optionRow}>
                  <Text style={styles.optionLabel}>認証済みのみ</Text>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      filterOptions.verifiedOnly && styles.toggleButtonActive
                    ]}
                    onPress={() => setFilterOptions(prev => ({
                      ...prev,
                      verifiedOnly: !prev.verifiedOnly
                    }))}
                  >
                    <View style={[
                      styles.toggleCircle,
                      filterOptions.verifiedOnly && styles.toggleCircleActive
                    ]} />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsAdvancedModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>キャンセル</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyFilters}
              >
                <Text style={styles.applyButtonText}>適用</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
    position: 'relative',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    ...shadows.base,
  },
  searchIcon: {
    fontSize: typography.lg,
    marginRight: spacing.base,
    color: colors.textSecondary,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.lg,
    color: colors.textPrimary,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  aiButton: {
    backgroundColor: colors.primary + '15',
  },
  imageButton: {
    backgroundColor: colors.secondary + '15',
  },
  voiceButton: {
    backgroundColor: colors.surface,
  },
  advancedButton: {
    backgroundColor: colors.surface,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: spacing.xl,
    right: spacing.xl,
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    maxHeight: 400,
    ...shadows.base,
    zIndex: 1000,
  },
  suggestionsScroll: {
    padding: spacing.lg,
  },
  suggestionSection: {
    marginBottom: spacing.lg,
  },
  suggestionTitle: {
    fontSize: typography.sm,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    borderRadius: borderRadius.base,
  },
  suggestionText: {
    fontSize: typography.base,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.xl,
    width: '90%',
    maxWidth: 500,
    maxHeight: '90%',
    ...shadows.base,
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
  modalBody: {
    padding: spacing.lg,
  },
  filterSection: {
    marginBottom: spacing.xl,
  },
  filterLabel: {
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
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  locationChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  locationChip: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.gray300,
  },
  locationChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  locationChipText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
  locationChipTextActive: {
    color: colors.white,
  },
  interestChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  interestChip: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.gray300,
  },
  interestChipActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  interestChipText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
  interestChipTextActive: {
    color: colors.white,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  optionLabel: {
    fontSize: typography.base,
    color: colors.textPrimary,
  },
  toggleButton: {
    width: 44,
    height: 24,
    backgroundColor: colors.gray300,
    borderRadius: 12,
    padding: 2,
  },
  toggleButtonActive: {
    backgroundColor: colors.primary,
  },
  toggleCircle: {
    width: 20,
    height: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  toggleCircleActive: {
    transform: [{ translateX: 20 }],
  },
  modalFooter: {
    flexDirection: 'row',
    padding: spacing.lg,
    gap: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.gray300,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray300,
  },
  cancelButtonText: {
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

export default AdvancedSearchBar;
