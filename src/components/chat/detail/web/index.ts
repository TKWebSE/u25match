// Web用チャットコンポーネントのエクスポート
// - Web向けのチャットレイアウト
// - 最大幅制限と中央寄せ

// 共通コンポーネントの再エクスポート
export * from '../multi';

// Web固有コンポーネント
export { default as WebChatContainer } from './ChatContainer.web';
export { default as ChatInput } from './ChatInput.web';
export { default as ChatMessage } from './ChatMessage.web';

