import { WebTagList } from '@components/tags';
import { TagCategory } from '@constants/tagDataMap';
import { Tag } from '@hooks/useTagsData';
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
      return <WebTagList tags={allTags} category="all" onTagPress={onTagPress} />;
    case 'food':
      return <WebTagList tags={categorizedTags.food} category="food" onTagPress={onTagPress} />;
    case 'hobby':
      return <WebTagList tags={categorizedTags.hobby} category="hobby" onTagPress={onTagPress} />;
    case 'entertainment':
      return <WebTagList tags={categorizedTags.entertainment} category="entertainment" onTagPress={onTagPress} />;
    case 'pets':
      return <WebTagList tags={categorizedTags.pets} category="pets" onTagPress={onTagPress} />;
    case 'sports':
      return <WebTagList tags={categorizedTags.sports} category="sports" onTagPress={onTagPress} />;
    case 'travel':
      return <WebTagList tags={categorizedTags.travel} category="travel" onTagPress={onTagPress} />;
    case 'art':
      return <WebTagList tags={categorizedTags.art} category="art" onTagPress={onTagPress} />;
    case 'tech':
      return <WebTagList tags={categorizedTags.tech} category="tech" onTagPress={onTagPress} />;
    case 'lifestyle':
      return <WebTagList tags={categorizedTags.lifestyle} category="lifestyle" onTagPress={onTagPress} />;
    case 'business':
      return <WebTagList tags={categorizedTags.business} category="business" onTagPress={onTagPress} />;
    default:
      return <WebTagList tags={allTags} category="all" onTagPress={onTagPress} />;
  }
};

export default SceneRenderer;
