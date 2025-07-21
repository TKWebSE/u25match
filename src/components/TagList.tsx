import type { TagKey } from '@/src/my-types/tag-type';
import { tagDataMap } from '@constants/tagDataMap';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type TagListProps = {
  tags: TagKey[]; // 🔥 型安全なタグキー配列
};

export default function TagList({ tags }: TagListProps) {
  return (
    <View style={styles.container}>
      {tags.map((tagKey) => {
        const tagInfo = tagDataMap[tagKey];

        return (
          <View key={tagKey} style={styles.tagCard}>
            <Image source={tagInfo.image} style={styles.tagImage} />
            <Text style={styles.tagText}>{tagInfo.description}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap', padding: 16 },
  tagCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f7fb',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  tagImage: { width: 40, height: 40, borderRadius: 8, marginRight: 10 },
  tagText: { fontSize: 14, fontWeight: '500', color: '#333' },
});
