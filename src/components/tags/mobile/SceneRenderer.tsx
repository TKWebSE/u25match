import { Tag, TagList } from '@components/tags';
import { TagCategory } from '@constants/tagDataMap';
import React from 'react';

/**
 * モバイルSceneRendererのプロパティ定義
 */
interface SceneRendererProps {
  routeKey: string;                                    // 現在のルートキー（タブの識別子）
  allTags: Tag[];                                      // 全タグの配列
  categorizedTags: Record<TagCategory, Tag[]>;         // カテゴリ別に分類されたタグ
  onTagPress: (tag: Tag) => void;                      // タグがタップされた時のコールバック
  selectedTagIds?: string[];                           // 選択されているタグのID配列
  isMaxReached?: boolean;                              // 最大選択数に達しているかどうか
}

/**
 * モバイル用シーンレンダラーコンポーネント
 * 
 * タブのルートキーに応じて適切なタグリストを表示するモバイル専用コンポーネント。
 * カテゴリ別のタグ表示を管理し、選択状態を各タグリストに渡す。
 * 
 * 主な機能：
 * - ルートキーに基づくタグリストの切り替え
 * - カテゴリ別タグの表示
 * - 選択状態の管理と伝播
 * - 最大選択数の制御
 * - デフォルトフォールバック（全タグ表示）
 */
const SceneRenderer: React.FC<SceneRendererProps> = ({
  routeKey,
  allTags,
  categorizedTags,
  onTagPress,
  selectedTagIds = [],
  isMaxReached = false,
}) => {
  // ルートキーに応じて適切なタグリストを返す
  switch (routeKey) {
    case 'all':
      return <TagList tags={allTags} category="all" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    case 'food':
      return <TagList tags={categorizedTags.food} category="food" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    case 'hobby':
      return <TagList tags={categorizedTags.hobby} category="hobby" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    case 'entertainment':
      return <TagList tags={categorizedTags.entertainment} category="entertainment" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    case 'pets':
      return <TagList tags={categorizedTags.pets} category="pets" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    case 'sports':
      return <TagList tags={categorizedTags.sports} category="sports" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    case 'travel':
      return <TagList tags={categorizedTags.travel} category="travel" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    case 'art':
      return <TagList tags={categorizedTags.art} category="art" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    case 'tech':
      return <TagList tags={categorizedTags.tech} category="tech" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    case 'lifestyle':
      return <TagList tags={categorizedTags.lifestyle} category="lifestyle" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    case 'business':
      return <TagList tags={categorizedTags.business} category="business" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    default:
      // 未知のルートキーの場合は全タグを表示（フォールバック）
      return <TagList tags={allTags} category="all" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
  }
};

export default SceneRenderer;
