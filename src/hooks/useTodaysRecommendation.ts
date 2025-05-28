import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'todays_recommendation_dismissed';
const DATE_KEY = 'todays_recommendation_date';

/**
 * 今日のおすすめバナーの表示状態を管理するカスタムフック
 * 
 * 機能：
 * - 日付が変わったら自動的にバナーを再表示
 * - ユーザーが閉じた場合はその日は表示しない
 * - ローカルストレージで状態を永続化
 */
export const useTodaysRecommendation = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 今日の日付を取得（YYYY-MM-DD形式）
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // バナーの表示状態を初期化
  useEffect(() => {
    const initializeVisibility = async () => {
      try {
        const today = getTodayString();
        const lastDismissedDate = await AsyncStorage.getItem(DATE_KEY);
        const isDismissed = await AsyncStorage.getItem(STORAGE_KEY);

        // 今日が初回表示または日付が変わった場合は表示
        if (!lastDismissedDate || lastDismissedDate !== today) {
          setIsVisible(true);
        } else {
          // 今日既に閉じられている場合は非表示
          setIsVisible(false);
        }
      } catch (error) {
        console.error('今日のおすすめバナーの初期化エラー:', error);
        // エラーの場合は表示する（安全側に倒す）
        setIsVisible(true);
      }
    };

    initializeVisibility();
  }, []);

  // バナーを閉じる処理
  const dismissBanner = async () => {
    try {
      const today = getTodayString();
      await AsyncStorage.setItem(STORAGE_KEY, 'true');
      await AsyncStorage.setItem(DATE_KEY, today);
      setIsVisible(false);
    } catch (error) {
      console.error('バナーの非表示処理エラー:', error);
      // エラーでもローカル状態は更新
      setIsVisible(false);
    }
  };

  // バナーを手動で表示（デバッグ用）
  const showBanner = () => {
    setIsVisible(true);
  };

  // バナーの状態をリセット（デバッグ用）
  const resetBanner = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, 'false');
      await AsyncStorage.setItem(DATE_KEY, '');
      setIsVisible(true);
    } catch (error) {
      console.error('バナーのリセットエラー:', error);
    }
  };

  return {
    isVisible,
    dismissBanner,
    showBanner,
    resetBanner,
  };
};
