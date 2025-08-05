import EmptyChatMessage from '@components/chat/EmptyChatMessage';
import CustomHeader from '@components/common/CustomHeader';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatListScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* カスタムヘッダー */}
      <CustomHeader title="チャット" />

      <View style={styles.container}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatListScreen; 
