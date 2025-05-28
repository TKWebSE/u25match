import EmptyState from '@components/common/EmptyState';
import { useCardLayout } from '@components/explore/CardLayoutCalculator';
import ExploreTabs from '@components/explore/ExploreTabs';
import TodaysRecommendationBanner from '@components/explore/TodaysRecommendationBanner';
import UserCard from '@components/explore/UserCard';
import WebGridLayout from '@components/explore/WebGridLayout';
import { getProfilePath, RECOMMENDATIONS_SCREEN_PATH } from '@constants/routes';
import { useTodaysRecommendation } from '@hooks/useTodaysRecommendation';
import { ExploreTabType, useUserSearch } from '@hooks/useUserSearch';
import { useSidebar } from '@layouts/WebLayout';
import { colors, spacing } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

interface User {
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline: boolean;
  lastActiveAt: Date;
}

// 探索画面コンポーネント - ユーザー検索・探索機能（Web版）
const ExploreScreen = () => {
  const router = useRouter();

  // カードリストエリアの幅を計測
  const [cardListWidth, setCardListWidth] = useState(0);

  // アクティブなタブの状態管理
  const [activeTab, setActiveTab] = useState<ExploreTabType>('search');

  // カードレイアウト情報を取得
  const cardLayout = useCardLayout(cardListWidth);

  // Web環境ではWebLayoutの検索クエリを使用
  const { searchQuery: webSearchQuery } = useSidebar();

  // 今日のおすすめバナーの状態管理
  const { isVisible: showTodaysRecommendation, dismissBanner } = useTodaysRecommendation();

  const {
    filteredUsers,
    hasSearchResults,
    hasSearchQuery
  } = useUserSearch(webSearchQuery, activeTab);

  const handleCardPress = (user: User) => {
    const userId = user.name.toLowerCase().replace(/\s+/g, '-');
    router.push(getProfilePath(userId) as any);
  };

  // タブ切り替えハンドラー
  const handleTabPress = (tab: ExploreTabType) => {
    setActiveTab(tab);
  };

  const renderEmptyComponent = () => {
    if (hasSearchQuery && !hasSearchResults) {
      return (
        <EmptyState
          message=""
          showSearchMessage={true}
          searchQuery={webSearchQuery}
        />
      );
    }

    if (!hasSearchQuery && !hasSearchResults) {
      return <EmptyState message="ユーザーが見つかりません" />;
    }

    return null;
  };

  // Web環境用のグリッドレイアウト
  const renderWebGrid = () => (
    <ScrollView
      style={styles.webScrollView}
      contentContainerStyle={styles.webScrollContent}
      showsVerticalScrollIndicator={false}
    >
      <WebGridLayout
        gridTemplateColumns={cardLayout.gridTemplateColumns}
        gridGap={cardLayout.gridGap}
      >
        {filteredUsers.map((user, index) => (
          <UserCard key={`${user.name}-${index}`} user={user} onPress={handleCardPress} layout={cardLayout} />
        ))}
      </WebGridLayout>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* 今日のおすすめバナー */}
      {showTodaysRecommendation && (
        <TodaysRecommendationBanner
          onPress={() => {
            router.push(RECOMMENDATIONS_SCREEN_PATH as any);
          }}
          onClose={dismissBanner}
          visible={showTodaysRecommendation}
        />
      )}

      {/* タブエリア */}
      <ExploreTabs
        activeTab={activeTab}
        onTabPress={handleTabPress}
        cardListWidth={cardListWidth}
      />

      {/* カードリストエリアの幅を計測 */}
      <View
        style={styles.cardListArea}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setCardListWidth(width);
        }}
      >
        {/* Web環境用のグリッドレイアウト */}
        {renderWebGrid()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  cardListArea: {
    flex: 1,
  },
  // Web環境用のスクロールスタイル
  webScrollView: {
    flex: 1,
  },
  webScrollContent: {
    flexGrow: 1,
  },
});

export default ExploreScreen;
