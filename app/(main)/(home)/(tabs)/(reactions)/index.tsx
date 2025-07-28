import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ReactionsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>リアクション</Text>
      <Text style={styles.subtitle}>リアクション機能は準備中です</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default ReactionsScreen; 
