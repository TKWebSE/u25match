// src/components/chat/index.ts
// 💬 チャット関連コンポーネントの統一エクスポート

// List関連（チャットルーム一覧）
export { default as ChatListItem } from './List/multi/ChatListItem';
export { default as ChatRoomList } from './List/multi/ChatRoomList';

// Detail関連（チャット詳細）- 共通コンポーネント
export { default as ChatContainer } from './detail/multi/ChatContainer';
export { default as ChatList } from './detail/multi/ChatList';
export { default as ChatScreen } from './detail/multi/ChatScreen';
export { default as DateSeparator } from './detail/multi/DateSeparator';
export { default as EmptyChatMessage } from './detail/multi/EmptyChatMessage';

// Detail関連（チャット詳細）- プラットフォーム別コンポーネント
// デフォルトはWeb版、明示的にプラットフォーム指定も可能
export { default as ChatInputMobile } from './detail/mobile/ChatInput.native';
export { default as ChatMessageMobile } from './detail/mobile/ChatMessage.native';
export { default as ChatInput, default as ChatInputWeb } from './detail/web/ChatInput.web';
export { default as ChatMessage, default as ChatMessageWeb } from './detail/web/ChatMessage.web';

// プラットフォーム別コンテナ（Detail用）
export { default as MobileChatContainer } from './detail/mobile/ChatContainer.native';
export { default as WebChatContainer } from './detail/web/ChatContainer.web';

