import { colors } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import TabScroll from './TabScroll';

interface TabRoute {
  key: string;
  title: string;
}

interface TagTabsProps {
  index: number;
  routes: TabRoute[];
  onIndexChange: (index: number) => void;
  renderScene: ({ route }: { route: TabRoute }) => React.ReactNode;
  screenWidth: number;
}

const TagTabs: React.FC<TagTabsProps> = ({
  index,
  routes,
  onIndexChange,
  renderScene,
  screenWidth,
}) => {
  return (
    <View style={styles.container}>
      <TabScroll
        routes={routes}
        activeIndex={index}
        onTabPress={onIndexChange}
        screenWidth={screenWidth}
      />

      <View style={styles.content}>
        {renderScene({ route: routes[index] })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});

export default TagTabs;
