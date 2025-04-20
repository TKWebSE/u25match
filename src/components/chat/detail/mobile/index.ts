// モバイル用チャットコンポーネントのエクスポート
// - モバイル向けのチャットレイアウト
// - キーボード対応の最適化

// 共通コンポーネントの再エクスポート
export * from '../multi';

// モバイル固有コンポーネント
export { default as MobileChatContainer } from './ChatContainer.native';
export { default as ChatInput } from './ChatInput.native';
export { default as ChatMessage } from './ChatMessage.native';

