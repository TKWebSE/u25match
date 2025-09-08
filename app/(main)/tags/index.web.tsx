import { WebSceneRenderer, WebTagTabs } from '@components/tags';
import { useTagRoutes } from '@hooks/useTagRoutes';
import { useTagsData, Tag as WebTag } from '@hooks/useTagsData';
import { colors } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const TagsScreen = () => {
  const router = useRouter();
  const { index, setIndex, routes } = useTagRoutes();
  const { allTags, categorizedTags } = useTagsData();

  // タグタップハンドラーをメモ化
  const handleTagPress = useCallback((tag: WebTag) => {
    console.log('タグがタップされました:', tag.name);
    // TODO: タグ詳細画面への遷移を実装
  }, []);

  // シーン定義
  const renderScene = ({ route }: { route: { key: string } }) => (
    <WebSceneRenderer
      routeKey={route.key}
      allTags={allTags}
      categorizedTags={categorizedTags}
      onTagPress={handleTagPress}
    />
  );

  return (
    <View style={styles.container}>
      <WebTagTabs
        index={index}
        routes={routes}
        onIndexChange={setIndex}
        renderScene={renderScene}
        screenWidth={screenWidth}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default TagsScreen;
