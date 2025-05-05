// src/components/chat/index.ts
// 💬 チャット関連コンポーネントの統一エクスポート

// List関連（チャットルーム一覧）
export { default as ChatListItem } from './List/ChatListItem';
export { default as ChatRoomList } from './List/ChatRoomList';

// Detail関連（チャット詳細）
export { default as ChatContainer } from './detail/ChatContainer';
export { default as ChatInput } from './detail/ChatInput';
export { default as ChatList } from './detail/ChatList';
export { default as ChatMessage } from './detail/ChatMessage';
export { default as ChatScreen } from './detail/ChatScreen';
export { default as DateSeparator } from './detail/DateSeparator';
export { default as EmptyChatMessage } from './detail/EmptyChatMessage';

// プラットフォーム別コンテナ（Detail用）
export { default as MobileChatContainer } from './detail/mobile/ChatContainer';
export { default as WebChatContainer } from './detail/web/ChatContainer';

