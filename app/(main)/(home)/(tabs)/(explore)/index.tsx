import { users } from '@mock/exploreUserMock';
import { getOnlineStatus } from '@utils/getOnlineStatus';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type User = {
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline: boolean;
  lastActiveAt: Date;
};

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;
const imageHeight = 180;

const ExploreScreen = () => {
  const router = useRouter();

  const handleCardPress = (user: User) => {
    const userId = user.name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/(main)/profile/${userId}`);
  };

  const renderUserItem = ({ item }: { item: User }) => {
    const onlineStatus = getOnlineStatus(item.lastActiveAt);
    const isOnline = onlineStatus === '🟢 オンライン';

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleCardPress(item)}
        activeOpacity={0.8}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
          {isOnline && <View style={styles.onlineIndicator} />}

          {/* 年齢バッジ */}
          <View style={styles.ageBadge}>
            <Text style={styles.ageBadgeText}>{item.age}</Text>
          </View>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.userName} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.userLocation} numberOfLines={1}>
              {item.location}
            </Text>
          </View>
          <Text style={styles.onlineStatus} numberOfLines={1}>
            {onlineStatus}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ユーザーを探す</Text>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  listContainer: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: cardWidth,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: imageHeight,
    resizeMode: 'cover',
  },
  onlineIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
  },
  ageBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ageBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333',
  },
  cardContent: {
    padding: 12,
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationIcon: {
    fontSize: 10,
    marginRight: 3,
  },
  userLocation: {
    fontSize: 11,
    color: '#666',
    flex: 1,
  },
  onlineStatus: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: '500',
  },
});

export default ExploreScreen; 
