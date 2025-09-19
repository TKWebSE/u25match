// src/components/search/web/WebUserGrid.tsx
// Web版ユーザーグリッド表示コンポーネント

import { User } from '@/src/my-types/search';
import EmptyState from '@components/common/EmptyState';
import UserCard from '@components/common/UserCard';
import WebGridLayout from '@components/common/WebGridLayout';
import { getProfilePath } from '@constants/routes';
import { useCardLayout } from '@hooks/ui';
import { colors, spacing } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

interface WebUserGridProps {
  users: User[];
  emptyMessage?: string;
}

const WebUserGrid: React.FC<WebUserGridProps> = ({
  users,
  emptyMessage = "ユーザーがいません"
}) => {
  const router = useRouter();

  // カードリストエリアの幅を計測
  const [cardListWidth, setCardListWidth] = useState(0);

  // カードレイアウト情報を取得
  const cardLayout = useCardLayout(cardListWidth);

  // カードタップハンドラー
  const handleCardPress = useCallback((user: User) => {
    const userId = user.name.toLowerCase().replace(/\s+/g, '-');
    router.push(getProfilePath(userId) as any);
  }, [router]);

  const renderEmptyComponent = () => {
    if (users.length === 0) {
      return (
        <EmptyState message={emptyMessage} />
      );
    }
    return null;
  };

  return (
    <View
      style={styles.cardListArea}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setCardListWidth(width);
      }}
    >
      {/* Web環境用のグリッドレイアウト */}
      {users.length > 0 ? (
        <ScrollView
          style={styles.webScrollView}
          contentContainerStyle={styles.webScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <WebGridLayout
            gridTemplateColumns={cardLayout.gridTemplateColumns}
            gridGap={cardLayout.gridGap}
          >
            {users.map((user, index) => (
              <UserCard
                key={`${user.name}-${index}`}
                user={user}
                onPress={handleCardPress}
                layout={cardLayout}
              />
            ))}
          </WebGridLayout>
        </ScrollView>
      ) : (
        renderEmptyComponent()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardListArea: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: spacing.base,
  },
  webScrollView: {
    flex: 1,
  },
  webScrollContent: {
    flexGrow: 1,
  },
});

export default WebUserGrid;
