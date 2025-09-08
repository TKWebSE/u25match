// プラットフォーム別のコンポーネントをエクスポート
export { default as SceneRenderer } from './mobile/SceneRenderer';
export { default as TagItem } from './mobile/TagItem';
export type { Tag } from './mobile/TagItem';
export { default as TagList } from './mobile/TagList';
export { default as TagTabs } from './mobile/TagTabs';

// Web用のコンポーネントもエクスポート（必要に応じて使用）
export { default as WebSceneRenderer } from './web/SceneRenderer';
export { default as WebTagItem } from './web/TagItem';
export type { Tag as WebTag } from './web/TagItem';
export { default as WebTagList } from './web/TagList';
export { default as WebTagTabs } from './web/TagTabs';

