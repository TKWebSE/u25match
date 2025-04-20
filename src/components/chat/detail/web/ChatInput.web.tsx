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
  // Ctrl+Enter同時押しで送信するためのキーボードイベントハンドラー
  const handleKeyPress = (e: any) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      if (value.trim() && !sending && !disabled) {
        onSend();
      }
    }
  };

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
        onKeyPress={handleKeyPress}
      />
      <TouchableOpacity
        style={[styles.sendButton, (!value.trim() || sending || disabled) && styles.sendButtonDisabled]}
        onPress={onSend}
        disabled={sending || !value.trim() || disabled}
      >
        {sending ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.sendButtonText}>
            送信{'\n'}
            <Text style={styles.shortcutText}>Ctrl+Enter</Text>
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#fff",
    minHeight: 80,
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
    ...({
      outline: 'none',
      resize: 'none',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      ':focus': {
        borderColor: '#2196F3',
        backgroundColor: '#fff',
      },
    } as any),
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
    ...({
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: '#1976D2',
        transform: 'translateY(-1px)',
      },
      ':active': {
        transform: 'translateY(0)',
      },
    } as any),
  },
  sendButtonDisabled: {
    backgroundColor: "#ccc",
    ...({
      cursor: 'not-allowed',
      ':hover': {
        backgroundColor: '#ccc',
        transform: 'none',
      },
    } as any),
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
    ...({
      fontFamily: 'system-ui, -apple-system, sans-serif',
    } as any),
  },
  shortcutText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 12,
    opacity: 0.8,
    ...({
      fontFamily: 'system-ui, -apple-system, sans-serif',
    } as any),
  },
});

export default ChatInput;
