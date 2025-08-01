// app/(main)/(home)/(tabs)/(chat)/[uid].tsx

import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { auth, db } from "@/firebaseConfig";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ChatDetailScreen() {
  const { uid } = useLocalSearchParams();

  // 今までのチャットをDBから取得して、チャットコンポーネントに入れる
  // チャットコンポーネントをインポートして、自分のチャットは右側に相手のチャットは左に寄せる
  // チャットを打つ機能を実装し、送信ボタンでDBに送信。送信中はチャットコンポーネントを表示しつつその横にローディングサークルを表示。送信完了したらローディングサークルを消す
  // チャットコンポーネントには、チャットの内容、チャットの日時、チャットの送信者を表示する
  // チャットコンポーネントには、チャットの送信者が自分かどうかを判断して、自分のチャットは右側に相手のチャットは左に寄せる
  // チャットコンポーネントには、チャットの送信者が自分かどうかを判断して、自分のチャットは右側に相手のチャットは左に寄せる

  // チャットメッセージの型
  type ChatMessage = {
    id: string;
    text: string;
    createdAt: any;
    senderId: string;
    senderName?: string;
  };

  // チャットバブルコンポーネント
  const ChatBubble = ({ message, isMe }: { message: ChatMessage; isMe: boolean }) => (
    <View
      style={[
        styles.bubbleContainer,
        isMe ? styles.bubbleRight : styles.bubbleLeft,
      ]}
    >
      <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
        <Text style={styles.senderName}>{isMe ? "自分" : message.senderName || "相手"}</Text>
        <Text style={styles.messageText}>{message.text}</Text>
        <Text style={styles.timeText}>
          {message.createdAt?.toDate
            ? message.createdAt.toDate().toLocaleTimeString()
            : ""}
        </Text>
      </View>
    </View>
  );

  // 空のチャットメッセージコンポーネント
  const EmptyChatMessage = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>まだメッセージがありません</Text>
      <Text style={styles.emptySubtitle}>
        メッセージを送信して会話を始めましょう！
      </Text>
      <Text style={styles.emptyWarning}>
        ※ チャットは1週間で自動的に削除されます
      </Text>
    </View>
  );

  const ChatDetailScreenBody = ({ chatUid }: { chatUid: string }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [sending, setSending] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    // チャットメッセージをDBから取得
    useEffect(() => {
      if (!chatUid) return;
      const q = query(
        collection(db, "chats", chatUid, "messages"),
        orderBy("createdAt", "asc")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs: ChatMessage[] = [];
        snapshot.forEach((doc) => {
          msgs.push({ id: doc.id, ...doc.data() } as ChatMessage);
        });
        setMessages(msgs);
        // 新しいメッセージが来たら下までスクロール
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      });
      return unsubscribe;
    }, [chatUid]);

    // メッセージ送信
    const handleSend = async () => {
      if (!input.trim() || sending) return;
      setSending(true);
      try {
        await addDoc(collection(db, "chats", chatUid, "messages"), {
          text: input,
          createdAt: serverTimestamp(),
          senderId: auth.currentUser?.uid,
          senderName: auth.currentUser?.displayName || "",
        });
        setInput("");
      } catch (e) {
        // エラー処理
        alert("送信に失敗しました");
      }
      setSending(false);
    };

    return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#fff" }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatBubble
              message={item}
              isMe={item.senderId === auth.currentUser?.uid}
            />
          )}
          contentContainerStyle={{
            padding: 12,
            paddingBottom: 80,
            flexGrow: 1,
            justifyContent: messages.length === 0 ? 'center' : 'flex-start'
          }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListEmptyComponent={EmptyChatMessage}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="メッセージを入力"
            editable={!sending}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSend}
            disabled={sending || !input.trim()}
          >
            {sending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.sendButtonText}>送信</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  };

  // スタイル
  const styles = StyleSheet.create({
    bubbleContainer: {
      flexDirection: "row",
      marginVertical: 4,
    },
    bubbleLeft: {
      justifyContent: "flex-start",
    },
    bubbleRight: {
      justifyContent: "flex-end",
      alignSelf: "flex-end",
    },
    bubble: {
      maxWidth: "75%",
      padding: 10,
      borderRadius: 12,
      marginHorizontal: 8,
    },
    myBubble: {
      backgroundColor: "#DCF8C6",
      alignSelf: "flex-end",
    },
    otherBubble: {
      backgroundColor: "#eee",
      alignSelf: "flex-start",
    },
    senderName: {
      fontSize: 10,
      color: "#888",
      marginBottom: 2,
    },
    messageText: {
      fontSize: 16,
      color: "#222",
    },
    timeText: {
      fontSize: 10,
      color: "#aaa",
      alignSelf: "flex-end",
      marginTop: 2,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#666",
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 14,
      color: "#999",
      textAlign: "center",
      marginBottom: 16,
    },
    emptyWarning: {
      fontSize: 12,
      color: "#ff6b6b",
      textAlign: "center",
      fontStyle: "italic",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 8,
      borderTopWidth: 1,
      borderColor: "#eee",
      backgroundColor: "#fff",
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
    },
    input: {
      flex: 1,
      backgroundColor: "#f5f5f5",
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
      fontSize: 16,
      marginRight: 8,
    },
    sendButton: {
      backgroundColor: "#2196F3",
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    sendButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
  });

  // 画面本体
  return <ChatDetailScreenBody chatUid={uid as string} />;
