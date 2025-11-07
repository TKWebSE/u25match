import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * 本人確認開始ボタンで利用する props
 */
interface VerificationActionsProps {
  isLoading: boolean;
  onSubmit: () => void;
}

/**
 * 本人確認開始ボタン（ロード中表示切替含む）を提供するコンポーネント
 */
const VerificationActions: React.FC<VerificationActionsProps> = ({ isLoading, onSubmit }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={onSubmit}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>{isLoading ? 'アップロード中...' : '本人確認を開始'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#3182CE',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#3182CE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
});

export default VerificationActions;

