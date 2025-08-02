import EmptyChatMessage from '@/src/components/EmptyChatMessage';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatListScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>チャット</Text>
        <EmptyChatMessage
          title="チャット機能は準備中です"
          subtitle="チャット機能は現在開発中です。もうしばらくお待ちください。"
          warning=""
        />
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
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a1a1a',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ChatListScreen; 
