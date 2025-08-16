import { MaterialIcons } from '@expo/vector-icons';
import { borderRadius, colors, shadows, spacing } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface ActionButtonsProps {
  onPass: () => void;
  onLike: () => void;
}

/**
 * 推奨ユーザーに対するアクションボタンコンポーネント
 * パス（×）とライク（♥）の2つのボタンを表示
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({ onPass, onLike }) => {
  return (
    <View style={styles.container}>
      {/* Pass ボタン */}
      <TouchableOpacity
        style={[styles.button, styles.passButton]}
        onPress={onPass}
        activeOpacity={0.8}
      >
        <MaterialIcons name="close" size={32} color={colors.error} />
      </TouchableOpacity>

      {/* Like ボタン */}
      <TouchableOpacity
        style={[styles.button, styles.likeButton]}
        onPress={onLike}
        activeOpacity={0.8}
      >
        <MaterialIcons name="favorite" size={32} color={colors.success} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.lg,
    elevation: 8,
  },
  passButton: {
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.error,
  },
  superLikeButton: {
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  likeButton: {
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.success,
  },
});

export default ActionButtons;
