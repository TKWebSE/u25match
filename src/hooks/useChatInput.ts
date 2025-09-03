// チャット入力フィールドの状態管理を行うカスタムフック
// - 入力テキストの管理
// - 送信状態の管理
// - 入力クリア機能

import { useState } from "react";

export const useChatInput = () => {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const clearInput = () => {
    setInput("");
  };

  const setSendingState = (isSending: boolean) => {
    setSending(isSending);
  };

  return {
    input,
    setInput,
    sending,
    clearInput,
    setSendingState,
  };
};
