// app/(main)/(home)/(tabs)/search/index.native.tsx
// モバイル版検索画面のメインコンポーネント

import SearchHeader from '@/src/components/search/mobile/SearchHeader';
import SearchModal from '@/src/components/search/mobile/SearchModal';
import SearchResults from '@/src/components/search/mobile/SearchResults';
import { premiumSearchCategories } from '@/src/constants/search/searchCategories';
import { getProfilePath } from '@constants/routes';
import { useStrictAuth } from '@hooks/auth';
import { useProfile } from '@hooks/profile';
import { User } from '@my-types/app/search';
import { searchByCategory } from '@usecases/search/searchByCategory';
import { ensurePremium } from '@utils/membership/guards';

import { showErrorToast } from '@/src/utils/showToast';
import { colors } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


// スクリーン読み込み時に、デフォルトカテゴリーのデータを取得する
// 取得したデータをsearchResultsに設定する
// カテゴリーが選択された場合、そのカテゴリを変更。
// カテゴリー変更を検知して、useEffectが起動し、データを取得する
// それだけ
// ストアには原罪のカテゴリやローディングの状態を保存するかどうかくらい。正直いらないと思っているが・・・
// 　ユースケースは基本的に一つでいいと思ってるが検索条件によっては二つとかになる可能性あり
// 　エクスプローラー画面と実装内容が同じでユースケースでの条件わけが複雑な印象
// あと、性別の項目を忘れているので、コレクションに追加して、条件にも異性であることを加える

//メンバーシップの有無でモーダルの選択できるカテゴリーの活性状態を変更する
const SearchScreen = () => {
  const router = useRouter();
  const user = useStrictAuth();
  const { profile } = useProfile(user.uid);//ストアから取りたいけど、どうしよう？

  // 検索モーダルの状態管理
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('recommended');
  const [searchResults, setSearchResults] = useState<User[]>([]);

  // リアクションデータを取得
  useEffect(() => {
    const fetchDefaultCategoryData = async () => {
      try {
        const users = await searchByCategory(selectedCategory || 'recommended');
        setSearchResults(users);
      } catch (error: any) {
        showErrorToast(error.message || 'デフォルトカテゴリーのデータ取得に失敗しました');
      }
    }
    fetchDefaultCategoryData();
  }, [selectedCategory]);

  // カードタップハンドラーをメモ化
  const handleCardPress = useCallback((user: User) => {
    const userId = user.name.toLowerCase().replace(/\s+/g, '-');
    router.push(getProfilePath(userId) as any);
  }, [router]);

  // カテゴリ選択ハンドラー
  const handleCategorySelect = (categoryKey: string) => {
    // プレミアム限定カテゴリのチェック
    const isPremiumCategory = (premiumSearchCategories as readonly string[]).includes(categoryKey);

    if (isPremiumCategory && !ensurePremium(profile || undefined)) return;

    setSelectedCategory(categoryKey);
    // モーダルを閉じる
    setIsSearchModalVisible(false);
  };

  // 検索モーダルを開く
  const handleOpenSearchModal = () => {
    setIsSearchModalVisible(true);
  };

  // 検索モーダルを閉じる
  const handleCloseSearchModal = () => {
    setIsSearchModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* ヘッダー */}
        <SearchHeader onSearchPress={handleOpenSearchModal} />

        {/* 検索結果 */}
        <SearchResults
          selectedCategory={selectedCategory}
          searchResults={searchResults}
          onCardPress={handleCardPress}
        />

        {/* 検索モーダル */}
        <SearchModal
          visible={isSearchModalVisible}
          selectedCategory={selectedCategory}
          onClose={handleCloseSearchModal}
          onCategorySelect={handleCategorySelect}
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

export default SearchScreen;
