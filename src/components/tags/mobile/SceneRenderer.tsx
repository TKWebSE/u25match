import { Tag, TagList } from '@components/tags';
import { TagCategory } from '@constants/tagDataMap';
import React from 'react';

interface SceneRendererProps {
  routeKey: string;
  allTags: Tag[];
  categorizedTags: Record<TagCategory, Tag[]>;
  onTagPress: (tag: Tag) => void;
}

const SceneRenderer: React.FC<SceneRendererProps> = ({
  routeKey,
  allTags,
  categorizedTags,
  onTagPress,
}) => {
  switch (routeKey) {
    case 'all':
      return <TagList tags={allTags} category="all" onTagPress={onTagPress} />;
    case 'food':
      return <TagList tags={categorizedTags.food} category="food" onTagPress={onTagPress} />;
    case 'hobby':
      return <TagList tags={categorizedTags.hobby} category="hobby" onTagPress={onTagPress} />;
    case 'entertainment':
      return <TagList tags={categorizedTags.entertainment} category="entertainment" onTagPress={onTagPress} />;
    case 'pets':
      return <TagList tags={categorizedTags.pets} category="pets" onTagPress={onTagPress} />;
    case 'sports':
      return <TagList tags={categorizedTags.sports} category="sports" onTagPress={onTagPress} />;
    case 'travel':
      return <TagList tags={categorizedTags.travel} category="travel" onTagPress={onTagPress} />;
    case 'art':
      return <TagList tags={categorizedTags.art} category="art" onTagPress={onTagPress} />;
    case 'tech':
      return <TagList tags={categorizedTags.tech} category="tech" onTagPress={onTagPress} />;
    case 'lifestyle':
      return <TagList tags={categorizedTags.lifestyle} category="lifestyle" onTagPress={onTagPress} />;
    case 'business':
      return <TagList tags={categorizedTags.business} category="business" onTagPress={onTagPress} />;
    default:
      return <TagList tags={allTags} category="all" onTagPress={onTagPress} />;
  }
};

export default SceneRenderer;
