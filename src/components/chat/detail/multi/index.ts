// チャット詳細画面の共通コンポーネント
// プラットフォーム別のChatInputとChatMessageをエクスポート

// 共通コンポーネント
export { default as ChatContainer } from './ChatContainer';
export { default as ChatList } from './ChatList';
export { default as ChatScreen } from './ChatScreen';
export { default as DateSeparator } from './DateSeparator';
export { default as EmptyChatMessage } from './EmptyChatMessage';

// プラットフォーム別コンポーネント（デフォルトはWeb版）
export { default as ChatInputMobile } from '../mobile/ChatInput.native';
export { default as ChatMessageMobile } from '../mobile/ChatMessage.native';
export { default as ChatInput } from '../web/ChatInput.web';
export { default as ChatMessage } from '../web/ChatMessage.web';

