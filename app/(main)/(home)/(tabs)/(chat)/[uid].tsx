// app/(main)/(home)/(tabs)/(chat)/[uid].tsx

import ChatScreen from "@components/chat/ChatScreen";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert } from "react-native";

export default function ChatDetailScreen() {
  const { uid } = useLocalSearchParams();

  const handleError = (error: string) => {
    Alert.alert("エラー", error);
  };

  return <ChatScreen chatUid={uid as string} onError={handleError} />;
}
