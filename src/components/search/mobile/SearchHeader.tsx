// src/components/search/mobile/SearchHeader.tsx
// 検索画面のヘッダーコンポーネント

import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SearchHeaderProps {
  onSearchPress: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ onSearchPress }) => {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoIcon}>💕</Text>
        <Text style={styles.logo}>u25match</Text>
      </View>

      {/* 検索FAB */}
      <TouchableOpacity
        style={styles.searchFab}
        onPress={onSearchPress}
        activeOpacity={0.8}
      >
        <MaterialIcons
          name="search"
          size={20}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
    position: 'relative',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchFab: {
    position: 'absolute',
    right: spacing.lg,
    top: spacing.sm,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  logoIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1.2,
    textAlign: 'center',
    textTransform: 'lowercase',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default SearchHeader;
