// チャットルーム一覧の状態管理を行うカスタムフック
// - チャットルーム一覧の取得
// - ローディング状態の管理
// - エラーハンドリング
// - リフレッシュ機能

import { ChatRoom } from '@services/main/chat/types';
import { ServiceRegistry } from '@services/ServiceRegistry';
import { useCallback, useEffect, useState } from 'react';
import { useStrictAuth } from './useStrictAuth';

/**
 * チャットルーム一覧の状態を管理するカスタムフック
 * @returns チャットルーム一覧と操作関数のオブジェクト
 */
export const useChatRooms = () => {
  // チャットルーム一覧の状態
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  // 初回読み込み中の状態
  const [loading, setLoading] = useState(true);

  // リフレッシュ中の状態
  const [refreshing, setRefreshing] = useState(false);

  // エラー状態
  const [error, setError] = useState<string | null>(null);

  // 認証されたユーザー情報を取得
  const user = useStrictAuth();

  // チャットサービスを取得
  const chatService = ServiceRegistry.getChatService();

  /**
   * チャットルーム一覧を取得する
   */
  const fetchChatRooms = useCallback(async () => {
    try {
      setError(null);
      console.log('🔍 チャットルーム取得開始 - ユーザーID:', user.uid);
      const response = await chatService.getChatRooms(user.uid);
      console.log('🔍 チャットルーム取得結果:', response);

      if (response.success && response.data) {
        console.log('✅ チャットルーム取得成功:', response.data);
        setChatRooms(response.data);
      } else {
        console.log('❌ チャットルーム取得失敗:', response.error);
        setError(response.error || 'チャット一覧の取得に失敗しました');
      }
    } catch (err) {
      console.log('💥 チャットルーム取得エラー:', err);
      setError('チャット一覧の取得中にエラーが発生しました');
      console.error('Error fetching chat rooms:', err);
    } finally {
      setLoading(false);
    }
  }, [user.uid, chatService]);

  /**
   * チャットルーム一覧をリフレッシュする
   */
  const refreshChatRooms = useCallback(async () => {
    setRefreshing(true);
    await fetchChatRooms();
    setRefreshing(false);
  }, [fetchChatRooms]);

  // コンポーネントマウント時にチャットルーム一覧を取得
  useEffect(() => {
    fetchChatRooms();
  }, [fetchChatRooms]);

  return {
    chatRooms,        // チャットルーム一覧
    loading,          // 初回読み込み中かどうか
    refreshing,       // リフレッシュ中かどうか
    error,            // エラーメッセージ
    refreshChatRooms, // チャットルーム一覧をリフレッシュする関数
  };
};
