import { colors, spacing } from '@styles/globalStyles';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import TabButton from './TabButton';

interface TabRoute {
  key: string;
  title: string;
}

interface TabScrollProps {
  routes: TabRoute[];
  activeIndex: number;
  onTabPress: (index: number) => void;
  screenWidth: number;
}

const TabScroll: React.FC<TabScrollProps> = ({
  routes,
  activeIndex,
  onTabPress,
  screenWidth,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollX, setScrollX] = useState(0);
  const tabWidth = 120; // タブの幅

  const handleTabPress = (tabIndex: number) => {
    onTabPress(tabIndex);
    // タブを中央にスクロール
    const scrollToX = Math.max(0, (tabIndex * tabWidth) - (screenWidth / 2) + (tabWidth / 2));
    scrollViewRef.current?.scrollTo({ x: scrollToX, animated: true });
  };

  const handleScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    setScrollX(scrollX);
    // スクロール位置に基づいてアクティブタブを更新
    const newIndex = Math.round(scrollX / tabWidth);
    if (newIndex >= 0 && newIndex < routes.length && newIndex !== activeIndex) {
      onTabPress(newIndex);
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={tabWidth}
      snapToAlignment="center"
      bounces={false}
      scrollEnabled={true}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={styles.tabScrollView}
      contentContainerStyle={styles.tabScrollContent}
    >
      {routes.map((route, tabIndex) => (
        <TabButton
          key={route.key}
          title={route.title}
          isActive={activeIndex === tabIndex}
          onPress={() => handleTabPress(tabIndex)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tabScrollView: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  tabScrollContent: {
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
  },
});

export default TabScroll;
