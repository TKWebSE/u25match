import CustomHeader from '@components/common/CustomHeader';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ReactionsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* カスタムヘッダー */}
      <CustomHeader title="リアクション" />

      <View style={styles.container}>
        <Text style={styles.subtitle}>リアクション機能は準備中です</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default ReactionsScreen; 
