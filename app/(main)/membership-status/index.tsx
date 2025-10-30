import { EMOJIS } from '@constants/emojis';
import { Ionicons } from '@expo/vector-icons';
import { useStrictAuth } from '@hooks/auth';
import { useProfile } from '@hooks/profile';
import { mockUserSettings } from '@mock/settingsMock';
import { getMembershipType } from '@utils/membership/membershipUtils';
import { getPlanName } from '@utils/membership/planName';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

/**
 * 会員状態確認画面
 * 
 * 有料会員専用の画面で、現在の会員状態、プラン詳細、
 * 利用可能な機能、残り残量などを表示します。
 */
export default function MembershipStatusScreen() {
  const router = useRouter();
  const user = useStrictAuth();
  const { profile } = useProfile(user.uid);
  const [isLoading, setIsLoading] = useState(true);

  // 会員種別の判定
  const membershipType = getMembershipType(profile || undefined);
  const planName = getPlanName(profile || undefined);

  // 有効期限のフォーマット関数
  const formatExpiryDate = (dateString?: string) => {
    if (!dateString) return null;

    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}年${month}月${day}日まで`;
    } catch (error) {
      return null;
    }
  };

  // useEffect(() => {
  //   // 有料会員でない場合は前の画面に戻る
  //   if (membershipType !== 'premium') {
  //     router.back();
  //     return;
  //   }

  //   // ローディング完了
  //   setTimeout(() => setIsLoading(false), 1000);
  // }, [membershipType, router]);

  // ローディング完了（useEffectを非活性化）
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // ローディング中
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.loadingGradient}
        >
          <Text style={styles.loadingText}>{EMOJIS.PREMIUM} 読み込み中...</Text>
        </LinearGradient>
      </View>
    );
  }

  // 有料会員でない場合は何も表示しない
  if (membershipType !== 'premium') {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />

      {/* ヘッダー */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>会員状態</Text>
          <Text style={styles.headerSubtitle}>Membership Status</Text>
        </View>

        <View style={styles.headerIcon}>
          <Text style={styles.headerIconText}>{EMOJIS.PREMIUM}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 会員情報カード */}
        <View style={styles.membershipCard}>
          <LinearGradient
            colors={['#FFD700', '#FFA500', '#FF8C00']}
            style={styles.membershipGradient}
          >
            <View style={styles.membershipHeader}>
              <Text style={styles.membershipIcon}>{EMOJIS.PREMIUM}</Text>
              <View style={styles.membershipInfo}>
                <Text style={styles.membershipTitle}>{planName}</Text>
                <Text style={styles.membershipSubtitle}>Premium Member</Text>
              </View>
            </View>

            <View style={styles.membershipDetails}>
              <Text style={styles.membershipDescription}>
                プレミアム機能をすべて利用可能
              </Text>
              {mockUserSettings.membership.expiryDate && (
                <View style={styles.expiryContainer}>
                  <Text style={styles.expiryText}>
                    {formatExpiryDate(mockUserSettings.membership.expiryDate)}
                  </Text>
                </View>
              )}
            </View>
          </LinearGradient>
        </View>

        {/* 残り残量セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 残り残量</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#FF6B6B', '#FF8E8E']}
                style={styles.statGradient}
              >
                <Text style={styles.statIcon}>❤️</Text>
                <Text style={styles.statValue}>{profile?.remainingLikes ?? 0}</Text>
                <Text style={styles.statLabel}>いいね</Text>
              </LinearGradient>
            </View>

            <View style={styles.statCard}>
              <LinearGradient
                colors={['#4ECDC4', '#44A08D']}
                style={styles.statGradient}
              >
                <Text style={styles.statIcon}>🚀</Text>
                <Text style={styles.statValue}>{profile?.remainingBoosts ?? 0}</Text>
                <Text style={styles.statLabel}>ブースト</Text>
              </LinearGradient>
            </View>

            <View style={styles.statCard}>
              <LinearGradient
                colors={['#A8E6CF', '#7FCDCD']}
                style={styles.statGradient}
              >
                <Text style={styles.statIcon}>{EMOJIS.POINT}</Text>
                <Text style={styles.statValue}>{profile?.remainingPoints ?? 0}</Text>
                <Text style={styles.statLabel}>ポイント</Text>
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* 利用可能機能セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ 利用可能機能</Text>

          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>❤️</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>いいね付与</Text>
                <Text style={styles.featureDescription}>毎日いいねを付与</Text>
              </View>
              <View style={styles.featureStatus}>
                <Text style={styles.statusActive}>利用可能</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>💬</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>メッセージ機能</Text>
                <Text style={styles.featureDescription}>無制限でメッセージ送信</Text>
              </View>
              <View style={styles.featureStatus}>
                <Text style={styles.statusActive}>利用可能</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🚀</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>ブースト特典</Text>
                <Text style={styles.featureDescription}>プロフィールを目立たせる</Text>
              </View>
              <View style={styles.featureStatus}>
                <Text style={styles.statusActive}>利用可能</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🔍</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>高度な検索</Text>
                <Text style={styles.featureDescription}>詳細な条件で検索</Text>
              </View>
              <View style={styles.featureStatus}>
                <Text style={styles.statusActive}>利用可能</Text>
              </View>
            </View>
          </View>
        </View>

        {/* アクションボタン */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.8}
            onPress={() => router.push('/(main)/membership-registration')}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.actionGradient}
            >
              <Text style={styles.actionButtonText}>プランを変更</Text>
              <Ionicons name="arrow-forward" size={20} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },

  loadingContainer: {
    flex: 1,
  },

  loadingGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  backButton: {
    padding: 8,
    marginRight: 12,
  },

  headerContent: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },

  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },

  headerIcon: {
    padding: 8,
  },

  headerIconText: {
    fontSize: 24,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: 20,
  },

  membershipCard: {
    marginBottom: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },

  membershipGradient: {
    padding: 24,
    borderRadius: 16,
  },

  membershipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  membershipIcon: {
    fontSize: 32,
    marginRight: 16,
  },

  membershipInfo: {
    flex: 1,
  },

  membershipTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },

  membershipSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },

  statusBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },

  membershipDetails: {
    marginTop: 8,
  },

  membershipDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 24,
  },

  expiryContainer: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },

  expiryText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },

  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  statGradient: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },

  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },

  featuresList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },

  featureIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },

  featureContent: {
    flex: 1,
  },

  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },

  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
  },

  featureStatus: {
    marginLeft: 12,
  },

  statusActive: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10b981',
    backgroundColor: '#d1fae5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  actionSection: {
    marginTop: 8,
    marginBottom: 20,
  },

  actionButton: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
  },

  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 8,
  },
});
