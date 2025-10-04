import { colors, spacing } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * ロゴヘッダーコンポーネント
 * アプリのロゴとアイコンを表示
 */
const LogoHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoIcon}>💕</Text>
        <Text style={styles.logo}>u25match</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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

export default LogoHeader;
