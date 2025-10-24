import { colors, spacing } from '@styles/globalStyles';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

/**
 * リアクション画面のローディング表示コンポーネント
 */
const ReactionsLoadingState: React.FC = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
});

export default ReactionsLoadingState;
