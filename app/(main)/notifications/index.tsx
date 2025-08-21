import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * お知らせスクリーン
 * 
 * このスクリーンは以下の責務を持ちます：
 * - お知らせの一覧表示
 * - お知らせの詳細表示
 * - お知らせの既読管理
 */

// お知らせの型定義
interface Notification {
  id: string;
  title: string;
  content: string;
  date: string;
  isRead: boolean;
  type: 'info' | 'update' | 'maintenance' | 'event';
}

// モックデータ
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'アプリアップデートのお知らせ',
    content: 'U25Matchアプリの新バージョン（v1.1.0）がリリースされました。新しい機能として、プロフィール写真の複数枚アップロード機能が追加されました。より魅力的なプロフィールを作成できるようになります。',
    date: '2024-01-15',
    isRead: false,
    type: 'update'
  },
  {
    id: '2',
    title: 'メンテナンスのお知らせ',
    content: '2024年1月20日（土）の深夜2:00〜4:00にシステムメンテナンスを実施いたします。この時間帯はアプリの利用ができませんので、ご了承ください。',
    date: '2024-01-10',
    isRead: true,
    type: 'maintenance'
  },
  {
    id: '3',
    title: 'バレンタインデーイベント開催',
    content: '2月14日のバレンタインデーに向けて、特別なマッチングイベントを開催いたします。期間中はマッチング成功率が向上する特別機能が利用できます。',
    date: '2024-01-08',
    isRead: true,
    type: 'event'
  },
  {
    id: '4',
    title: 'プライバシーポリシーの更新',
    content: 'プライバシーポリシーを更新いたしました。主な変更点は、データの保持期間の明確化と、新しい機能に伴う情報収集についての説明です。',
    date: '2024-01-05',
    isRead: true,
    type: 'info'
  },
  {
    id: '5',
    title: '新機能「お気に入り」の追加',
    content: 'プロフィールにお気に入り機能が追加されました。気になるユーザーのプロフィールをお気に入りに登録して、後から簡単に見返すことができます。',
    date: '2024-01-01',
    isRead: true,
    type: 'update'
  }
];

const NotificationsScreen = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  // お知らせを既読にする
  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  // お知らせの詳細を表示
  const handleNotificationPress = (notification: Notification) => {
    markAsRead(notification.id);
    setSelectedNotification(notification);
  };

  // お知らせの種類に応じたアイコンを取得
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'update':
        return '🔄';
      case 'maintenance':
        return '🔧';
      case 'event':
        return '🎉';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  // お知らせの種類に応じた色を取得
  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'update':
        return '#3b82f6';
      case 'maintenance':
        return '#f59e0b';
      case 'event':
        return '#ec4899';
      case 'info':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <ScrollView
        style={{ flex: 1, padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ maxWidth: 800, alignSelf: 'center', width: '100%' }}>
          {/* タイトル */}
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#1a1a1a',
            marginBottom: 20,
            textAlign: 'center'
          }}>
            お知らせ
          </Text>

          {/* 説明文 */}
          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            color: '#666',
            marginBottom: 30,
            textAlign: 'center'
          }}>
            アプリからの重要な情報や更新をお知らせします。
          </Text>

          {/* お知らせ一覧 */}
          <View style={{ gap: 12 }}>
            {notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={{
                  backgroundColor: 'white',
                  padding: 16,
                  borderRadius: 12,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2,
                  borderLeftWidth: 4,
                  borderLeftColor: getNotificationColor(notification.type),
                  opacity: notification.isRead ? 0.7 : 1
                }}
                onPress={() => handleNotificationPress(notification)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
                  {/* アイコン */}
                  <Text style={{ fontSize: 24 }}>
                    {getNotificationIcon(notification.type)}
                  </Text>

                  {/* 内容 */}
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#1a1a1a',
                        flex: 1
                      }}>
                        {notification.title}
                      </Text>
                      {!notification.isRead && (
                        <View style={{
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: '#ef4444'
                        }} />
                      )}
                    </View>

                    <Text style={{
                      fontSize: 14,
                      color: '#666',
                      lineHeight: 20,
                      marginBottom: 8
                    }} numberOfLines={2}>
                      {notification.content}
                    </Text>

                    <Text style={{
                      fontSize: 12,
                      color: '#9ca3af'
                    }}>
                      {notification.date}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* お知らせがない場合 */}
          {notifications.length === 0 && (
            <View style={{
              backgroundColor: 'white',
              padding: 40,
              borderRadius: 12,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2
            }}>
              <Text style={{ fontSize: 48, marginBottom: 16 }}>📢</Text>
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#1a1a1a',
                marginBottom: 8
              }}>
                お知らせはありません
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#666',
                textAlign: 'center'
              }}>
                新しいお知らせがあると、ここに表示されます。
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* お知らせ詳細モーダル */}
      {selectedNotification && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20
        }}>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 20,
            maxWidth: 400,
            width: '100%',
            maxHeight: '80%'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <Text style={{ fontSize: 24 }}>
                {getNotificationIcon(selectedNotification.type)}
              </Text>
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#1a1a1a',
                flex: 1
              }}>
                {selectedNotification.title}
              </Text>
            </View>

            <ScrollView style={{ marginBottom: 16 }}>
              <Text style={{
                fontSize: 14,
                color: '#333',
                lineHeight: 20
              }}>
                {selectedNotification.content}
              </Text>
            </ScrollView>

            <Text style={{
              fontSize: 12,
              color: '#9ca3af',
              marginBottom: 16
            }}>
              {selectedNotification.date}
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: '#6C63FF',
                padding: 12,
                borderRadius: 8,
                alignItems: 'center'
              }}
              onPress={() => setSelectedNotification(null)}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                閉じる
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default NotificationsScreen;
