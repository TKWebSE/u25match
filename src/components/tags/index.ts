// 共通コンポーネントをエクスポート
export * from './multi';

// 共通型定義をエクスポート
export type { Tag } from './mobile/TagItem';
export type { SceneRendererProps } from './web/SceneRenderer';

// モバイル用コンポーネントをエクスポート
export { default as SceneRenderer } from './mobile/SceneRenderer';
export { default as TagItem } from './mobile/TagItem';
export { default as TagList } from './mobile/TagList';
export { default as TagTabs } from './mobile/TagTabs';

// Web用コンポーネントをエクスポート
export { default as WebSceneRenderer } from './web/SceneRenderer';
export { default as WebTagItem } from './web/TagItem';
export { default as WebTagList } from './web/TagList';
export { default as WebTagTabs } from './web/TagTabs';

