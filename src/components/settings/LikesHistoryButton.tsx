import { Colors } from '@constants/Colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface LikesHistoryButtonProps {
  onPress: () => void;
}

// いいね履歴ボタンコンポーネント
export const LikesHistoryButton: React.FC<LikesHistoryButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>いいね履歴</Text>
      <Text style={styles.buttonArrow}>›</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
  },
  buttonArrow: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.tint,
  },
});
