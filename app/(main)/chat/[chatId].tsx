import ChatScreen from "@components/chat/ChatScreen";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatDetailScreen() {
  const { chatId } = useLocalSearchParams();
  const router = useRouter();

  console.log('📱 チャット詳細画面 - chatId:', chatId);

  const handleError = (error: string) => {
    Alert.alert("エラー", error);
  };

  const handleBack = () => {
    router.back();
  };

  // チャットIDからチャット相手の情報を取得（簡易的な実装）
  const getChatTitle = (chatId: string) => {
    // 実際のアプリでは、チャットルームの情報から相手の名前を取得する
    const chatTitles: { [key: string]: string } = {
      'chat_123': '佐藤花子',
      'chat_456': '鈴木一郎',
      'chat_789': '高橋美咲',
      'chat_101': '伊藤健太',
      'chat_202': '渡辺愛',
    };
    return chatTitles[chatId] || 'チャット';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ChatScreen chatUid={chatId as string} onError={handleError} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});
