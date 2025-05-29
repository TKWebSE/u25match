// src/components/common/index.ts
// 🔧 共通コンポーネントの統一エクスポート

// 両環境共通コンポーネント
export { default as CustomPagination } from './CustomPagination';
export { default as EmptyState } from './EmptyState';
export { default as ErrorState } from './ErrorState';
export { ImageCarousel } from './ImageCarousel';
export { default as LoadingState } from './LoadingState';
export { default as ScreenWrapper } from './ScreenWrapper';
export { default as VerificationMark } from './VerificationMark';

// モバイル専用コンポーネント
export * from './mobile';

// Web専用コンポーネント
export * from './web';

