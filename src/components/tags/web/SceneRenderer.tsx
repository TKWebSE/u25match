import { WebTagList } from '@components/tags';
import { TagCategory } from '@constants/tagDataMap';
import { Tag } from '@hooks/features/tags';
import React from 'react';

export interface SceneRendererProps {
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
      return <WebTagList tags={allTags} category="all" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    case 'food':
      return <WebTagList tags={categorizedTags.food} category="food" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    case 'hobby':
      return <WebTagList tags={categorizedTags.hobby} category="hobby" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    case 'entertainment':
      return <WebTagList tags={categorizedTags.entertainment} category="entertainment" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    case 'pets':
      return <WebTagList tags={categorizedTags.pets} category="pets" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    case 'sports':
      return <WebTagList tags={categorizedTags.sports} category="sports" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    case 'travel':
      return <WebTagList tags={categorizedTags.travel} category="travel" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    case 'art':
      return <WebTagList tags={categorizedTags.art} category="art" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    case 'tech':
      return <WebTagList tags={categorizedTags.tech} category="tech" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    case 'lifestyle':
      return <WebTagList tags={categorizedTags.lifestyle} category="lifestyle" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    case 'business':
      return <WebTagList tags={categorizedTags.business} category="business" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
    default:
      return <WebTagList tags={allTags} category="all" onTagPress={onTagPress} selectedTagIds={selectedTagIds} isMaxReached={isMaxReached} />;
  }
};

export default SceneRenderer;
