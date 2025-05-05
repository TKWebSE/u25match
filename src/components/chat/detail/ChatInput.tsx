import React from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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
  // WebでCtrl+Enter同時押しで送信するためのキーボードイベントハンドラー
  const handleKeyPress = (e: any) => {
    if (Platform.OS === 'web' && e.ctrlKey && e.key === 'Enter') {
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
    ...Platform.select({
      web: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        minHeight: 80,
      },
    }),
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
    ...Platform.select({
      web: {
        outline: 'none' as any,
        resize: 'none' as any,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        ':focus': {
          borderColor: '#2196F3',
          backgroundColor: '#fff',
        } as any,
      },
    }),
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
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'all 0.2s ease' as any,
        ':hover': {
          backgroundColor: '#1976D2',
          transform: 'translateY(-1px)' as any,
        } as any,
        ':active': {
          transform: 'translateY(0)' as any,
        } as any,
      },
    }),
  },
  sendButtonDisabled: {
    backgroundColor: "#ccc",
    ...Platform.select({
      web: {
        cursor: 'not-allowed' as any,
        ':hover': {
          backgroundColor: '#ccc',
          transform: 'none' as any,
        } as any,
      },
    }),
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    ...Platform.select({
      web: {
        fontFamily: 'system-ui, -apple-system, sans-serif',
      },
    }),
  },
});

export default ChatInput; 
