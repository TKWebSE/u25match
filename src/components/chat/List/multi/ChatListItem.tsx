import { useProfile } from '@hooks/profile';
import { mockUsers } from '@mock/chatMock';
import { ChatRoom } from '@services/main/chat/types';
import { getMembershipType } from '@utils/membershipUtils';
import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ChatListItemProps {
  chatRoom: ChatRoom;
  currentUserId: string;
  onPress: (chatRoom: ChatRoom) => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chatRoom, currentUserId, onPress }) => {
  // プロフィール情報を取得
  const { profile } = useProfile(currentUserId);

  // 会員種別の判定
  const membershipType = getMembershipType(profile || undefined);

  // 相手のユーザーIDを取得（自分以外の参加者）
  const otherParticipantId = chatRoom.participants.find(id => id !== currentUserId) || '';

  // 相手のユーザー情報を取得
  const otherUser = mockUsers.find(user => user.id === otherParticipantId) || {
    id: otherParticipantId,
    name: `ユーザー${otherParticipantId}`,
    avatar: `https://i.pravatar.cc/150?u=${otherParticipantId}`,
    isOnline: false,
  };

  // 最後のメッセージの内容を取得
  const lastMessageContent = chatRoom.lastMessage?.content || 'メッセージがありません';

  // 最後のメッセージの時間をフォーマット
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}分前`;
    } else if (hours < 24) {
      return `${hours}時間前`;
    } else if (days < 7) {
      return `${days}日前`;
    } else {
      return date.toLocaleDateString('ja-JP');
    }
  };

  const lastMessageTime = chatRoom.lastMessage
    ? formatTime(chatRoom.lastMessage.timestamp)
    : '';

  // チャットアイテムが押下されたときの処理
  const handlePress = () => {
    // 無料会員の場合はアラートを表示
    if (membershipType !== 'premium') {
      Alert.alert(
        'プレミアム会員限定機能',
        'チャット機能をご利用いただくには、プレミアム会員への登録が必要です。',
        [
          {
            text: 'OK',
            onPress: () => {
              // アラートを閉じるだけ
            }
          }
        ]
      );
      return;
    }

    // プレミアム会員の場合は通常通りチャット詳細画面に遷移
    onPress(chatRoom);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {/* アバター */}
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: otherUser.avatar }}
          style={styles.avatar}
        />
        {/* オンラインステータスインジケーター */}
        {otherUser.isOnline && <View style={styles.onlineIndicator} />}
      </View>

      {/* チャット情報 */}
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.userName} numberOfLines={1}>
            {otherUser.name}
          </Text>
          {lastMessageTime && (
            <Text style={styles.timeText}>{lastMessageTime}</Text>
          )}
        </View>

        <Text style={styles.lastMessage} numberOfLines={2}>
          {lastMessageContent}
        </Text>
      </View>

      {/* 右矢印 */}
      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 12,
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
  },
  timeText: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 8,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  arrowContainer: {
    marginLeft: 8,
  },
  arrow: {
    fontSize: 18,
    color: '#cccccc',
    fontWeight: '300',
  },
});

export default ChatListItem;
