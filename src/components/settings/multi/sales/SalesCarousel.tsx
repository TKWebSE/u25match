import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const SalesCarousel: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>🔥 限定セール</Text>
        <Text style={styles.sectionSubtitle}>
          今だけの特別価格でお得にアップグレード！
        </Text>
      </View>

      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>
          セール情報は準備中です...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  placeholderContainer: {
    padding: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});
