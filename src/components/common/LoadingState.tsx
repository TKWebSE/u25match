import { colors } from '@styles/globalStyles';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface LoadingStateProps {
  message?: string;
  color?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = '読み込み中...',
  color = colors.primary
}) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={color} />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '500',
  },
}); 
