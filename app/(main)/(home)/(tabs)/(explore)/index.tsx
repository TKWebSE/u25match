import EmptyState from '@components/common/EmptyState';
import { useCardLayout } from '@components/explore/CardLayoutCalculator';
import ExploreTabs from '@components/explore/ExploreTabs';
import UserCard from '@components/explore/UserCard';
import WebGridLayout from '@components/explore/WebGridLayout';
import { ExploreTabType, useUserSearch } from '@hooks/useUserSearch';
import { useSidebar } from '@layouts/WebLayout';
import { colors, spacing } from '@styles/globalStyles';
import { isWeb } from '@utils/platform';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface User {
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline: boolean;
  lastActiveAt: Date;
}

const ExploreScreen = () => {
  const router = useRouter();

  // カードリストエリアの幅を計測（シンプル化）
  const [cardListWidth, setCardListWidth] = useState(0);

  // アクティブなタブの状態管理
  const [activeTab, setActiveTab] = useState<ExploreTabType>('search');

  // カードレイアウト情報を取得（カードリストエリアの幅のみ使用）
  const cardLayout = useCardLayout(cardListWidth);

  // Web環境ではWebLayoutの検索クエリを使用、モバイルではローカル状態を使用
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const { searchQuery: webSearchQuery } = useSidebar();

  // 実際に使用する検索クエリを決定
  const actualSearchQuery = isWeb ? webSearchQuery : localSearchQuery;

  const {
    filteredUsers,
    hasSearchResults,
    hasSearchQuery
  } = useUserSearch(actualSearchQuery, activeTab);

  const handleCardPress = (user: User) => {
    const userId = user.name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/(main)/profile/${userId}`);
  };

  // タブ切り替えハンドラー
  const handleTabPress = (tab: ExploreTabType) => {
    setActiveTab(tab);
    // タブに応じた処理をここに追加（例：フィルタリング、データ取得など）
    console.log('🎯 タブ切り替え:', tab);
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <UserCard user={item} onPress={handleCardPress} layout={cardLayout} />
  );

  const renderEmptyComponent = () => {
    if (hasSearchQuery && !hasSearchResults) {
      return (
        <EmptyState
          message=""
          showSearchMessage={true}
          searchQuery={actualSearchQuery}
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

  // モバイル環境用のFlatList
  const renderMobileList = () => (
    <FlatList
      data={filteredUsers}
      renderItem={renderUserItem}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      numColumns={cardLayout.columnCount}
      key={`flatlist-${cardLayout.columnCount}`}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmptyComponent}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
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
            console.log('🎯 カードリストエリアの幅:', width);
          }}
        >
          {/* プラットフォームに応じてレイアウトを切り替え */}
          {isWeb ? renderWebGrid() : renderMobileList()}
        </View>
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
    backgroundColor: 'cyan', // 水色に変更
  },
  listContainer: {
    padding: spacing.lg,
    // paddingHorizontal: spacing.xl, // 左右に余分なスペースを追加
    // paddingRight: spacing.xl + spacing.xl + spacing.xl + spacing.base, // 右側により多くのスペースを追加

  },
  cardListArea: {
    flex: 1,
    backgroundColor: 'cyan', // カードリストエリア（水色）
  },
  // Web環境用のスクロールスタイル
  webScrollView: {
    flex: 1,
  },
  webScrollContent: {
    flexGrow: 1,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default ExploreScreen; 
