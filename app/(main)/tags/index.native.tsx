import { SceneRenderer, TagTabs } from '@components/tags';
import { useTagRoutes } from '@hooks/useTagRoutes';
import { Tag, useTagsData } from '@hooks/useTagsData';
import { colors } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

const TagsScreen = () => {
  const router = useRouter();
  const { index, setIndex, routes } = useTagRoutes();
  const { allTags, categorizedTags } = useTagsData();

  // タグタップハンドラーをメモ化
  const handleTagPress = useCallback((tag: Tag) => {
    console.log('タグがタップされました:', tag.name);
    // TODO: タグ詳細画面への遷移を実装
  }, []);

  // シーン定義
  const renderScene = ({ route }: { route: { key: string } }) => (
    <SceneRenderer
      routeKey={route.key}
      allTags={allTags}
      categorizedTags={categorizedTags}
      onTagPress={handleTagPress}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <TagTabs
          index={index}
          routes={routes}
          onIndexChange={setIndex}
          renderScene={renderScene}
          screenWidth={screenWidth}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default TagsScreen;
