import UserCard from '@components/UserCard';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { useAuth } from '@contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { mockUsers, MockUser } from '@mock/exploreUserMock';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ExploreScreen = () => {
  const { user } = useAuth();
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [likedUsers, setLikedUsers] = useState<string[]>([]);
  const [passedUsers, setPassedUsers] = useState<string[]>([]);
  
  // 現在のユーザーの性別と異なる性別のユーザーのみフィルタリング
  const currentGender = user?.gender ?? 'male';
  const availableUsers = mockUsers.filter(
    (u: MockUser) => u.gender !== currentGender && 
    !likedUsers.includes(u.id) && 
    !passedUsers.includes(u.id)
  );

  const currentUser = availableUsers[currentUserIndex];

  const handleSwipeLeft = () => {
    if (currentUser) {
      setPassedUsers(prev => [...prev, currentUser.id]);
      setCurrentUserIndex(prev => prev + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentUser) {
      setLikedUsers(prev => [...prev, currentUser.id]);
      setCurrentUserIndex(prev => prev + 1);
      
      // マッチのシミュレーション（50%の確率）
      if (Math.random() > 0.5) {
        Alert.alert(
          'マッチしました！🎉',
          `${currentUser.name}さんともマッチしました！メッセージを送ってみましょう。`,
          [{ text: 'チャットする', style: 'default' }, { text: '後で', style: 'cancel' }]
        );
      }
    }
  };

  const handleManualLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    handleSwipeRight();
  };

  const handleManualPass = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    handleSwipeLeft();
  };

  const handleUndo = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(prev => prev - 1);
      // 最後にアクションしたユーザーを取得
      const lastUser = availableUsers[currentUserIndex - 1];
      if (lastUser) {
        setLikedUsers(prev => prev.filter(id => id !== lastUser.id));
        setPassedUsers(prev => prev.filter(id => id !== lastUser.id));
      }
    }
  };

  if (!currentUser) {
    return (
      <ScreenWrapper>
        <View style={styles.emptyContainer}>
          <Ionicons name="search" size={80} color="#ccc" />
          <Text style={styles.emptyTitle}>お疲れ様でした！</Text>
          <Text style={styles.emptySubtitle}>
            すべてのユーザーをチェックしました。{'\n'}
            新しいユーザーが登録されるまでお待ちください。
          </Text>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={() => {
              setCurrentUserIndex(0);
              setLikedUsers([]);
              setPassedUsers([]);
            }}
          >
            <Text style={styles.resetButtonText}>最初からやり直す</Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>マッチング</Text>
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>
              {availableUsers.length - currentUserIndex} 人が近くにいます
            </Text>
          </View>
        </View>

        {/* Card Stack */}
        <View style={styles.cardContainer}>
          {/* Next card (背景) */}
          {availableUsers[currentUserIndex + 1] && (
            <UserCard
              user={availableUsers[currentUserIndex + 1]}
              onSwipeLeft={() => {}}
              onSwipeRight={() => {}}
              style={[styles.card, { transform: [{ scale: 0.95 }], opacity: 0.5 }]}
            />
          )}
          
          {/* Current card */}
          <UserCard
            user={currentUser}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            style={styles.card}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.undoButton]}
            onPress={handleUndo}
            disabled={currentUserIndex === 0}
          >
            <Ionicons 
              name="arrow-undo" 
              size={24} 
              color={currentUserIndex === 0 ? "#ccc" : "#6C63FF"} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.passButton]}
            onPress={handleManualPass}
          >
            <Ionicons name="close" size={28} color="#F44336" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.likeButton]}
            onPress={handleManualLike}
          >
            <Ionicons name="heart" size={28} color="#4CAF50" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.superLikeButton]}
            onPress={handleManualLike}
          >
            <Ionicons name="star" size={24} color="#2196F3" />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7fb',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statsContainer: {
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statsText: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: '500',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    position: 'absolute',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  resetButton: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
    gap: 20,
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  undoButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  passButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#F44336',
  },
  likeButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#4CAF50',
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  superLikeButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
});

export default ExploreScreen;
