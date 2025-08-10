import { ChatRoom } from '@services/main/chat/types';
import { ServiceRegistry } from '@services/ServiceRegistry';
import { useCallback, useEffect, useState } from 'react';
import { useStrictAuth } from './useStrictAuth';

export const useChatRooms = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = useStrictAuth();
  const chatService = ServiceRegistry.getChatService();

  const fetchChatRooms = useCallback(async () => {
    try {
      setError(null);
      const response = await chatService.getChatRooms(user.uid);

      if (response.success && response.data) {
        setChatRooms(response.data);
      } else {
        setError(response.error || 'チャット一覧の取得に失敗しました');
      }
    } catch (err) {
      setError('チャット一覧の取得中にエラーが発生しました');
      console.error('Error fetching chat rooms:', err);
    } finally {
      setLoading(false);
    }
  }, [user.uid, chatService]);

  const refreshChatRooms = useCallback(async () => {
    setRefreshing(true);
    await fetchChatRooms();
    setRefreshing(false);
  }, [fetchChatRooms]);

  useEffect(() => {
    fetchChatRooms();
  }, [fetchChatRooms]);

  return {
    chatRooms,
    loading,
    refreshing,
    error,
    refreshChatRooms,
  };
};
