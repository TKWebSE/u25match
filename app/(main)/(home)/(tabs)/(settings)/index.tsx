import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>設定</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>アプリ情報</Text>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>バージョン</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>ビルド番号</Text>
          <Text style={styles.infoValue}>1</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>その他</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>プライバシーポリシー</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>利用規約</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>お問い合わせ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#1a1a1a',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  button: {
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
  buttonText: {
    fontSize: 16,
    color: '#1a1a1a',
    textAlign: 'center',
  },
});

export default SettingsScreen; 
