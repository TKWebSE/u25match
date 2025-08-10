
import ChatScreen from "@components/chat/ChatScreen";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert } from "react-native";

export default function ChatDetailScreen() {
  const { chatId } = useLocalSearchParams();

  const handleError = (error: string) => {
    Alert.alert("エラー", error);
  };

  return <ChatScreen chatUid={chatId as string} onError={handleError} />;
}

