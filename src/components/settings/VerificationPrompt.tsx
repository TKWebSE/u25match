import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

/**
 * 本人確認プロンプトのプロパティ
 */
interface VerificationPromptProps {
  /** 本人確認ボタンのタップ処理 */
  onPress: () => void;
}

/**
 * 本人確認を促すコンポーネント
 * 
 * @param onPress - 本人確認ボタンのタップ処理
 */
export const VerificationPrompt: React.FC<VerificationPromptProps> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.title}>本人確認</Text>
      <Text style={styles.description}>
        本人確認を完了すると、より多くのユーザーとマッチングできます。
      </Text>
      <View style={styles.button}>
        <Text style={styles.buttonText}>本人確認を開始</Text>
      </View>
    </TouchableOpacity>
  );
};

/**
 * スタイル定義
 */
const styles = {
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#3182CE',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center' as const,
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600' as const,
  },
};
