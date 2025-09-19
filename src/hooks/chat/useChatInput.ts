// チャット入力フィールドの状態管理を行うカスタムフック
// - 入力テキストの管理
// - 送信状態の管理
// - 入力クリア機能

import { useState } from "react";

/**
 * チャット入力フィールドの状態を管理するカスタムフック
 * @returns 入力状態と操作関数のオブジェクト
 */
export const useChatInput = () => {
  // 入力テキストの状態
  const [input, setInput] = useState("");

  // 送信中の状態（ローディング表示用）
  const [sending, setSending] = useState(false);

  /**
   * 入力フィールドをクリアする
   */
  const clearInput = () => {
    setInput("");
  };

  /**
   * 送信状態を設定する
   * @param isSending 送信中かどうか
   */
  const setSendingState = (isSending: boolean) => {
    setSending(isSending);
  };

  return {
    input,           // 現在の入力テキスト
    setInput,        // 入力テキストを更新する関数
    sending,         // 送信中かどうか
    clearInput,      // 入力フィールドをクリアする関数
    setSendingState, // 送信状態を設定する関数
  };
};
