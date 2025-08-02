import React from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type ChatInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  sending: boolean;
  disabled?: boolean;
  placeholder?: string;
};

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
  onSend,
  sending,
  disabled = false,
  placeholder = "メッセージを入力"
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={!sending && !disabled}
        multiline
        maxLength={1000}
      />
      <TouchableOpacity
        style={[styles.sendButton, (!value.trim() || sending || disabled) && styles.sendButtonDisabled]}
        onPress={onSend}
        disabled={sending || !value.trim() || disabled}
      >
        {sending ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.sendButtonText}>送信</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 60,
  },
  sendButtonDisabled: {
    backgroundColor: "#ccc",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ChatInput; 
