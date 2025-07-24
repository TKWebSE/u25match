import { auth, db } from "@/firebaseConfig";
import ChatInput from "@components/ChatInput";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import ChatList, { ChatMessageType } from "./ChatList";

type ChatScreenProps = {
  chatUid: string;
  onError?: (error: string) => void;
};

const ChatScreen: React.FC<ChatScreenProps> = ({ chatUid, onError }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  // チャットメッセージをDBから取得
  useEffect(() => {
    if (!chatUid) return;

    const q = query(
      collection(db, "chats", chatUid, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: ChatMessageType[] = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as ChatMessageType);
      });
      setMessages(msgs);
    }, (error) => {
      console.error("チャットメッセージの取得エラー:", error);
      onError?.("メッセージの取得に失敗しました");
    });

    return unsubscribe;
  }, [chatUid, onError]);

  // メッセージ送信
  const handleSend = async () => {
    if (!input.trim() || sending || !auth.currentUser) return;

    setSending(true);
    try {
      await addDoc(collection(db, "chats", chatUid, "messages"), {
        text: input,
        createdAt: serverTimestamp(),
        senderId: auth.currentUser.uid,
        senderName: auth.currentUser.displayName || "",
      });
      setInput("");
    } catch (error) {
      console.error("メッセージ送信エラー:", error);
      onError?.("送信に失敗しました");
    } finally {
      setSending(false);
    }
  };

  const currentUserId = auth.currentUser?.uid || "";

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <View style={styles.chatContainer}>
        <ChatList
          messages={messages}
          currentUserId={currentUserId}
        />
        <ChatInput
          value={input}
          onChangeText={setInput}
          onSend={handleSend}
          sending={sending}
          disabled={!auth.currentUser}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatContainer: {
    flex: 1,
  },
});

export default ChatScreen; 
