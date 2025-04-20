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
        placeholderTextColor="#999999"
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
    alignItems: "flex-end",
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 12,
    maxHeight: 120,
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  sendButton: {
    backgroundColor: "#2196F3",
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80,
    height: 48,
  },
  sendButtonDisabled: {
    backgroundColor: "#ccc",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default ChatInput;
