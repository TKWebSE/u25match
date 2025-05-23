// src/components/search/index.ts
// 検索コンポーネントの統一エクスポート

// モバイル版
export { default as MobileSearchScreen } from './mobile/MobileSearchScreen';
export { default as SearchHeader } from './mobile/SearchHeader';
export { default as SearchModal } from './mobile/SearchModal';
export { default as SearchResults } from './mobile/SearchResults';
export { default as UserGrid } from './mobile/UserGrid';

// Web版
export { default as ReactionTabs } from './web/ReactionTabs';
export { default as WebSearchScreen } from './web/WebSearchScreen';
export { default as WebUserGrid } from './web/WebUserGrid';

