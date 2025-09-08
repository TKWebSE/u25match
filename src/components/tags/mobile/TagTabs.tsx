import { colors } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

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
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={onIndexChange}
      initialLayout={{ width: screenWidth }}
      animationEnabled={true}
      swipeEnabled={true}
      lazy={false}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={styles.tabBar}
          tabStyle={styles.tabStyle}
          indicatorStyle={styles.tabIndicator}
          activeColor={colors.primary}
          inactiveColor={colors.textSecondary}
          scrollEnabled={true}
          pressColor="transparent"
          pressOpacity={0.8}
          indicatorContainerStyle={styles.indicatorContainer}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    position: 'relative',
  },
  tabStyle: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    minWidth: 80,
  },
  tabIndicator: {
    backgroundColor: colors.primary,
    height: 3,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    zIndex: 1,
  },
});

export default TagTabs;
