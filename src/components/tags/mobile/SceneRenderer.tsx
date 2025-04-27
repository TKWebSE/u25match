import { Tag, TagList } from '@components/tags';
import { TagCategory } from '@constants/tagDataMap';
import React from 'react';

interface SceneRendererProps {
  routeKey: string;
  allTags: Tag[];
  categorizedTags: Record<TagCategory, Tag[]>;
  onTagPress: (tag: Tag) => void;
  selectedTagIds?: string[];
  isMaxReached?: boolean;
}

const SceneRenderer: React.FC<SceneRendererProps> = ({
  routeKey,
  allTags,
  categorizedTags,
  onTagPress,
  selectedTagIds = [],
  isMaxReached = false,
}) => {
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
      return <TagList tags={allTags} category="all" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
  }
};

export default SceneRenderer;
