import { tagDataMap } from '@constants/tagDataMap';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

// const tagMock: TagKeys = ['coffee', 'game', 'musiclive', 'dog', 'cat'];

export default function TagList({ tags }: { tags: string[] }) {
  return (
    <View style={styles.container}>
      {tags.map((tagKey) => {
        const tagInfo = tagDataMap[tagKey as keyof typeof tagDataMap];

        return (
          <View key={tagKey} style={styles.tagCard}>
            <Image source={tagInfo?.image} style={styles.tagImage} />
            <Text style={styles.tagText}>{tagInfo?.description}</Text>
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
    width: '100%', // 2 items per row
  },
  tagImage: { width: 80, height: 80, borderRadius: 8, marginRight: 20 },
  tagText: { fontSize: 20, fontWeight: '500', color: '#333' },
});
